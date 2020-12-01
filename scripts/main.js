/*
TO DO:
-make all input fields required
-center table headings + td
*beautify

[DONE] bugfix: creating wrong diagonal values between same depts in CT

(-figure out how to make names always a certain amount from the table --> stick table into a div elem??)

-add layout name to each div + what is getting fixed: 'Fix: W2'
    -best div: 'Best layout: 3'
-fixInput label text: custom for each input?

-remove demos from calculate costs

LEARNED:
-learned how to make HTML table
-learned how to make a matrix with it, and use input fields + then collect those inputs
-special double iteration which goes diagonally

*/

const DOM = (function() {
    const elements= {
        div1: document.querySelector('#div1'),

        start: document.querySelector('#start'),

        inputContainers: document.querySelectorAll('.inputContainer'),
        container1: document.querySelector('#container1'),
        container2: document.querySelector('#container2'),

        DSizeInput: document.querySelector('#Dmatrix-size'),
        TSizeInput: document.querySelector('#Tmatrix-size'),
    }

    //EVENT LISTENERS
    //START
    elements.start.addEventListener('click', function() {
        //check if matrix length values == whole numbers
        if(storage.getDlength()%1==0 && storage.getTlength()%1==0) {
            _cleanInputContainers();

            _createMatrixName('D', elements.div1);
            _createMatrixName('T', elements.div1);
            _createMatrixTable(storage.getDlength(), elements.container1);
            _createMatrixTable(storage.getTlength(), elements.container2);
            //removes start button
            elements.div1.removeChild(elements.start);
            //creates enter
            _createEnterButton();
        }
    });

    const _createMatrixName= (matrix, div) => {
        let name= document.createElement('div');
        name.textContent= matrix + ' =';
        name.classList.add('names');
        name.setAttribute('id', 'name' + matrix);
        div.appendChild(name);
    }

    const _cleanInputContainers= () => {
        elements.inputContainers.forEach(container=> {
            while(container.lastElementChild) {
                container.removeChild(container.lastElementChild);
            }
        })
    }

    const _createMatrixTable = (length, container) => {
        let headSign='';
        if(container== elements.container1) {
            headSign= 'L';
        } else if(container== elements.container2) {
            headSign= 'W';
        }

        let table= document.createElement('table');
            //first row: all headings
            let firstRow= document.createElement('tr');
                //empty 0,0 cell
                let cell00= document.createElement('td');
                firstRow.appendChild(cell00);
                //remaining headings top
                for(let i=1; i<=length; i++) {
                    let heading= document.createElement('th');
                    heading.textContent= headSign + i;
                    heading.classList.add('matrix-headings');
                    firstRow.appendChild(heading);
                }
            table.appendChild(firstRow);

            //remaining rows: heading + data
            for(let i=1; i<=length; i++) {
                let row= document.createElement('tr');
                    //add row elements
                        //first heading
                        let heading= document.createElement('th');
                        heading.textContent= headSign + i;
                        heading.classList.add('matrix-headings');
                        row.appendChild(heading);
                        //data
                        for(let i=0; i<length; i++) {
                            let cell= document.createElement('td');
                                let input=document.createElement('input');
                                input.classList.add('matrix-inputs');
                                input.setAttribute("type", "number");
                                cell.appendChild(input);
                            row.appendChild(cell);
                        }
                table.appendChild(row);
            }
        container.appendChild(table);
    }

    const _createFixInput = (parent) => {
        let label= document.createElement('label');
        //label.setAttribute('for', 'fixDeptInput');  //no need for ID unless we create custom idName for each?
        label.textContent= 'Which department to fix first: ';

        let fixDeptInput= document.createElement('input');
        //fixDeptInput.setAttribute('id', 'fixDeptInput');
        fixDeptInput.setAttribute('type', 'text');
        fixDeptInput.setAttribute('placeholder', 'W1');

        let div= document.createElement('div');
        div.classList.add('fixInput');
        div.appendChild(label);
        div.appendChild(fixDeptInput);

        parent.appendChild(div);
    }

    const _createNewDiv= () => {
        let newDiv= document.createElement('div');
        let number= document.querySelectorAll('.divs').length;

        newDiv.setAttribute('id', `div${number+1}`);
        newDiv.classList.add('divs');

        return newDiv;
    }

    const _createLayoutTable= (layout) => {
        let table= document.createElement('table');

        let length= Object.keys(layout).length;

        let firstRow= document.createElement('tr');
        for(let i=0; i<length; i++) {
            let room= document.createElement('td');
            room.textContent= `L${i+1}`;
            room.classList.add('layoutTable');
            firstRow.appendChild(room);
        }

        let secondRow= document.createElement('tr');
        for(let i=0; i<length; i++) {
            let dept= document.createElement('td');
            dept.textContent= Object.keys(layout)[i];
            dept.classList.add('layoutTable');
            secondRow.appendChild(dept);
        }

        table.appendChild(firstRow);
        table.appendChild(secondRow);

        return table;
    }

    const _createCTtable= (parent) => {
        let length= storage.getTlength();
        let matrix= Logic.createMatrixCT(length, storage.matrixT);

        let table= document.createElement('table');
            //first row: all headings
            let firstRow= document.createElement('tr');
                //empty 0,0 cell
                let cell00= document.createElement('td');
                firstRow.appendChild(cell00);
                //remaining headings top
                for(let i=1; i<=length; i++) {
                    let heading= document.createElement('th');
                    heading.textContent= 'W' + i;
                    heading.classList.add('CTmatrix-headings');
                    firstRow.appendChild(heading);

                    //first layout to be used in calculations
                    storage.currentBestLayout.push(heading.textContent);
                }
            table.appendChild(firstRow);

            //remaining rows: heading + data
            for(let i=1; i<=length; i++) {
                let row= document.createElement('tr');
                    //add row elements
                        //first heading
                        let heading= document.createElement('th');
                        heading.textContent= 'W' + i;
                        heading.classList.add('CTmatrix-headings');
                        row.appendChild(heading);
                        //data
                        for(let j=0; j<length; j++) {
                            let cell= document.createElement('td');
                            cell.textContent= matrix[i-1][j]
                            cell.classList.add('CTmatrix-cells');
                            row.appendChild(cell);
                        }
                table.appendChild(row);
            }
            table.classList.add('CT');
        parent.appendChild(table);
    }

    const _createEquation= (layoutObject) => {
        let equation= '';

        let length= Object.keys(layoutObject).length;
        for(let i=0; i<length; i++) {
            for(let j=0; j<length; j++) {
                equation=equation + ` + T${i+1}${j+1}*D${layoutObject[`W${i+1}`]+1}${layoutObject[`W${j+1}`]+1}`;
            }
        }
        //removes first '+' and adds 'S='
        equation= equation.substring(2);
        equation='S='.concat(equation);

        let eqElem= document.createElement('p');
        eqElem.textContent= equation;
        eqElem.classList.add('equations');

        return eqElem;
    }

    const _createEquationCT = (layoutObject) => {
        let equation= '';
        let j=0;

        let length= Object.keys(layoutObject).length;
        for(let i=0; i<length; i++) {
            j=i;
            for(j; j<length; j++) {
                equation=equation + ` + CT${i+1}${j+1}*D${layoutObject[`W${i+1}`]+1}${layoutObject[`W${j+1}`]+1}`;
            }
        }
        //removes first '+' and adds 'S='
        equation= equation.substring(2);
        equation='S='.concat(equation);

        let eqElem= document.createElement('p');
        eqElem.textContent= equation;
        eqElem.classList.add('equations');

        return eqElem;
    }

    const _addResult = (cost) => {
        let string= '= ' + cost;

        let costElem= document.createElement('p');
        costElem.textContent= string;

        return costElem;
    }

    const _createNewLayout= (layout, cost, costCT) => {
        let div= _createNewDiv();
        let table= _createLayoutTable(layout);
        let equation= _createEquation(layout);
        let result= _addResult(cost);
        let equationCT= _createEquationCT(layout);
        let resultCT= _addResult(costCT);

        div.appendChild(table);
        div.appendChild(equation);
        div.appendChild(result);
        div.appendChild(equationCT);
        div.appendChild(resultCT);

        document.body.appendChild(div);
    }


    //ENTER
    const _createEnterButton= () => {
        let enter= document.createElement('button');
        enter.textContent= 'ENTER';

        enter.addEventListener('click', function() {
            //saves both tables to multidimensional arrays
            storage.saveTable(elements.container1);
            storage.saveTable(elements.container2);

            //creates new div w/ CT matrix, fixInput & calcBtn
            let div= _createNewDiv();
            _createMatrixName('CT', div);
            _createCTtable(div);
            _createFixInput(div);
            _createCalcBtn(div);
            document.body.appendChild(div);
    
            //removes ENTER button
            elements.div1.removeChild(enter);

        })

        elements.div1.appendChild(enter);
    }

    //CALCULATE
    function _calculate() {
        let layoutsLength= Object.keys(storage.CRAFTlayouts).length;
        let costLength= Object.keys(storage.CRAFTlayoutCosts).length;
        
        for(let i= costLength+1; i<=layoutsLength; i++) {
            let layout= storage.CRAFTlayouts[i];
            let cost= Logic.calculateLayoutCost(layout);
            let costCT= Logic.calculateLayoutCostCT(layout);

            storage.saveLayoutCost(cost);

            _createNewLayout(layout, cost, costCT);
        }
    }

    const _createCalcBtn= (parent) => {
        let calc= document.createElement('button');
        calc.textContent= "CALCULATE";
        calc.classList.add('calcBtn');

        calc.addEventListener('click', function(e) {
            //remove calc btn
            if(getCurrentFixInput()=='') {
                console.log('no input');
                return;
            }
            e.target.parentElement.removeChild(e.target);
            

            //Process
            Logic.getRemainingLayouts(storage.currentBestLayout, getCurrentFixInput());

            _calculate();

            //print best layout
            let best= Logic.getBestLayout();
            _createNewLayout(storage.CRAFTlayouts[best], storage.CRAFTlayoutCosts[best], storage.CRAFTlayoutCosts[best]);

            //checks if DONE --> last layout
            if(storage.fixedDepts.length == storage.currentBestLayout.length-1) {
                //prints optimal div
                Logic.getAllPermutations(storage.currentBestLayout);

                let layoutsLength= Object.keys(storage.OPTIMALlayouts).length;
                for(let i=1; i<=layoutsLength; i++) {
                    let layout= storage.OPTIMALlayouts[i];
                    let cost= Logic.calculateLayoutCost(layout);

                    storage.saveOptimalCost(cost);
                }

                let sortedArr = Object.entries(storage.OPTIMALlayoutCosts).sort(([,a],[,b]) => a-b);
                let optimal= sortedArr[0][0];

                _createNewLayout(storage.OPTIMALlayouts[optimal], storage.OPTIMALlayoutCosts[optimal], storage.OPTIMALlayoutCosts[optimal]);
                return;
            } else {
                //create new input
                let div= _createNewDiv();
                _createFixInput(div);
                _createCalcBtn(div);

                document.body.appendChild(div);
            }
        })
        parent.appendChild(calc);
    }


    const getAllContainerInputElements= (container) => {
        return container.querySelectorAll('table tr input');
    }

    const getCurrentFixInput= () => {
        let inputs= document.body.querySelectorAll('div input[type=text]');
        //get last value
        let last= inputs[inputs.length -1];
        let value= last.value;

        return value;
    }

    return {
        elements,
        getAllContainerInputElements,
        getCurrentFixInput, //only used in calc button?

        _createEquation,
        _createEquationCT
    }
})();


const storage= (function() {
    
    const getDlength= () => {
        return DOM.elements.DSizeInput.value;
    }
    const getTlength= () => {
        return DOM.elements.TSizeInput.value;
    }

    let matrixD=[];
    let matrixT=[];
    
    let matrixCT=[];

    const saveTable= (container) => {
        let matrix=[];
        
        let arr= Array.from(DOM.getAllContainerInputElements(container));
            arr.forEach(input => {
                matrix.push(Number(input.value));
            });
        //turn array of numbers into array of arrays --> each array is 1 row, and each element in array is the column index
        while(matrix.length) {
            if(container == DOM.elements.container1) {
                matrixD.push(matrix.splice(0, getDlength()));
            } else if(container == DOM.elements.container2) {
                matrixT.push(matrix.splice(0, getTlength()));
            }
        }      
    }


    let CRAFTlayouts = {
        //layouts get stored here   
       }

    let CRAFTlayoutCosts= {
        //craft cost stored here
    };

    const saveLayoutCost= (cost) => {
        craftLayoutCostCounter= craftLayoutCostCounter + 1;
        CRAFTlayoutCosts[craftLayoutCostCounter]= cost;
    }

    let OPTIMALlayouts= {
        //all layouts
    }

    let OPTIMALlayoutCosts= {
        //optimal costs
    }

    const saveOptimalCost= (cost) => {
        optimalLayoutCostCounter= optimalLayoutCostCounter + 1;
        OPTIMALlayoutCosts[optimalLayoutCostCounter]= cost;
    }
    
    let currentBestLayout=[/*gets initial values from creation of CT table*/];
    
    let fixedDepts= [];

    let craftLayoutCounter= 0;
    let craftLayoutCostCounter= 0;

    let optimalLayoutCounter= 0;
    let optimalLayoutCostCounter= 0;


    let matrixDdemo= [
        [0, 6, 8, 2],
        [6, 0, 4, 10],
        [8, 4, 0, 2],
        [2, 10, 2, 0]
    ];

    let matrixTdemo= [
        [0, 80, 50, 30],
        [20, 0, 100, 0],
        [10, 0, 0, 40],
        [60, 10, 50, 0]
    ];

    let matrixCTdemo= [
        [0, 100, 60, 90],
        [0, 0, 100, 10],
        [0, 0, 0, 90],
        [0, 0, 0, 0]
    ];

    return {
        getDlength,
        getTlength,
        saveTable,
        matrixD,
        matrixT,
        matrixCT,
        CRAFTlayouts,
        CRAFTlayoutCosts,
        saveLayoutCost,
        currentBestLayout,
        fixedDepts,
        craftLayoutCounter,
        OPTIMALlayouts,
        OPTIMALlayoutCosts,
        saveOptimalCost,
        optimalLayoutCounter,

        matrixDdemo,
        matrixTdemo,
        matrixCTdemo
    }
})();

const Logic = (function() {

    const createMatrixCT= (Tlength, T) => {
        let j=0;
        let matrix=[];
        for(let i=0; i<Tlength; i++) {
            j=i;
            matrix.push([]);
            //add zeros to non-used fields
            for(let h=0; h<j; h++) {
                matrix[i].push(0);
            }
            //adds cummulative transfers per depts.
            for(j; j<Tlength; j++) {
                let ct=0;
                //if diagonal (in case of non-zero between depts)
                if(j==i) {
                    ct= T[i][j];
                } else {
                    ct= T[i][j] + T[j][i];
                }
                matrix[i].push(ct);
            }
        }
        storage.matrixCT= matrix;
        return matrix;
    }

    const _getRemainingIndexes= (bestLayoutArr, fixedDeptsArr) => {
        let alreadyFixedIndexes= [];
        fixedDeptsArr.forEach(dept => alreadyFixedIndexes.push(bestLayoutArr.indexOf(dept)));
        
        let indexes= [0, 1, 2, 3];
        alreadyFixedIndexes.forEach(fixed => indexes.splice(fixed, 1));

        return indexes;
    }

    const getRemainingLayouts= (bestLayoutArr, fixDept) => {
        //remaining locations
        let remLoc= _getRemainingIndexes(storage.currentBestLayout, storage.fixedDepts);
       
        let fixIndex= bestLayoutArr.indexOf(fixDept);

        let numCombos= remLoc.length;


        for(let i=0; i<numCombos; i++) { //length should equal length of remainingIndexes and loop through those
            let arr= [...bestLayoutArr];
            let swaped= [arr[fixIndex], arr[remLoc[i]]] = [arr[remLoc[i]], arr[fixIndex]];

            //checks if layout equals to already best layout
            if(remLoc.length != bestLayoutArr.length && arr.every((value, index) => value === bestLayoutArr[index])) {
                console.log('same value');
                console.log(arr);
                console.log(bestLayoutArr);
                continue;
            } else {
                //saves the layout
                storage.craftLayoutCounter= storage.craftLayoutCounter + 1;
                storage.CRAFTlayouts[storage.craftLayoutCounter] = {};
                for(let j=0; j<bestLayoutArr.length; j++) {
                    storage.CRAFTlayouts[storage.craftLayoutCounter][arr[j]] = j;
                }
            }
        }
    }

    const _permutator= (bestLayoutArr) => {
        let result = [];

        const permute = (arr, m = []) => {
          if (arr.length === 0) {
            result.push(m)
          } else {
            for (let i = 0; i < arr.length; i++) {
              let curr = arr.slice();
              let next = curr.splice(i, 1);
              permute(curr.slice(), m.concat(next))
           }
         }
       }
      
       permute(bestLayoutArr)
      
       return result;
    }

    const getAllPermutations= (startingArr) => {
        let perms= _permutator(startingArr);

        perms.forEach(perm => {
            storage.optimalLayoutCounter= storage.optimalLayoutCounter + 1;
            storage.OPTIMALlayouts[storage.optimalLayoutCounter] = {};
            for(let i=0; i<perm.length; i++) {
                storage.OPTIMALlayouts[storage.optimalLayoutCounter][perm[i]] = i;
            }
        })      
    }

    //remove DEMOS!!!!
    const calculateLayoutCost= (layoutObject) => {
        let sumCost= 0;

        let length= Object.keys(layoutObject).length;
        for(let i=0; i<length; i++) {
            for(let j=0; j<length; j++) {
                sumCost=sumCost + storage.matrixTdemo[i][j] * storage.matrixDdemo[layoutObject[`W${i+1}`]][layoutObject[`W${j+1}`]];
            }
        }
        //storage.saveLayoutCost(sumCost);
        return sumCost;
    }

    const calculateLayoutCostCT= (layoutObject) => {
        let sumCost= 0;
        let j=0;

        let length= Object.keys(layoutObject).length;
        for(let i=0; i<length; i++) {
            j=i;
            for(j; j<length; j++) {
                sumCost=sumCost + storage.matrixCTdemo[i][j] * storage.matrixDdemo[layoutObject[`W${i+1}`]][layoutObject[`W${j+1}`]];
            }
        }
        return sumCost;
    }


    const getBestLayout = () => {
        //no need to iterate through all just last added layouts???

        //SORTING ALL
        let sortedArr = Object.entries(storage.CRAFTlayoutCosts)
        .sort(([,a],[,b]) => a-b);

        let best= sortedArr[0][0];

        //updates current best layout arr
        storage.currentBestLayout= Object.keys(storage.CRAFTlayouts[best]);

        //updated values of fixed depts - adds current fixDept value to array
        storage.fixedDepts.push(DOM.getCurrentFixInput());

        return best;
    }

    return {
        createMatrixCT,
        getRemainingLayouts,
        getAllPermutations,
        calculateLayoutCost,
        calculateLayoutCostCT,
        getBestLayout
    }
})();