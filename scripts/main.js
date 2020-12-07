/*
TO DO:
-separate print sheet! @media delete
-add footer

(-add Title)
(-auto demo matrixes inputed)
(-color fixed dept in best table)
(-D symetry button)

-remove demos from calculate costs
-bug if size not exactly 4? --> maybe because costmatrix demos hardfixed??
-test bigger matrix values (time) + how they look


LEARNED:
-learned how to make HTML table
-learned how to make a matrix with it, and use input fields + then collect those inputs
-figured out special double iteration which goes diagonally
-practiced module pattern

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
        //checks if empty
        if(storage.getDlength()==false || storage.getTlength()==false) {
            return;
        }

        //checks if lower than
        if(storage.getDlength()>'7' || storage.getTlength()>'7') {
            alert('You can only choose sizes between 1-7');
            return;
        }

        //check if matrix length values == whole numbers
        if(storage.getDlength()%1==0 && storage.getTlength()%1==0) {
            _cleanInputContainers();

            //_createMatrixName('D', elements.div1);
            //_createMatrixName('T', elements.div1);
            //_createMatrixTable(storage.getDlength(), elements.container1);
            //_createMatrixTable(storage.getTlength(), elements.container2);
            _createMatrixDiv('D', elements.container1, storage.getDlength());
            _createMatrixDiv('T', elements.container2, storage.getTlength());

            //removes start button
            elements.div1.removeChild(elements.start);
            //creates enter
            _createEnterButton();
        } else {
            alert('You can only input whole numbers (integers)!');
            return;
        }
    });

    const _createMatrixName= (matrix, div) => {
        let name= document.createElement('div');
        name.textContent= matrix + ' =';
        name.classList.add('names');
        name.setAttribute('id', 'name' + matrix);
        div.appendChild(name);
    }

    const _createMatrixDiv= (matrix, parent, length) => {
        let divMatrix= document.createElement('div');
        divMatrix.classList.add('divMatrix');
        
        _createMatrixName(matrix, divMatrix);
        _createMatrixTable(length, divMatrix, matrix);

        //only for centering -style
        let extraDiv= document.createElement('div');
        extraDiv.style.cssText= 'height: 57px; width: 57px;';
        divMatrix.appendChild(extraDiv);

        parent.appendChild(divMatrix);
    }

    const _cleanInputContainers= () => {
        elements.inputContainers.forEach(container=> {
            while(container.lastElementChild) {
                container.removeChild(container.lastElementChild);
            }
        })
    }

    const _createMatrixTable = (length, container, matrix) => {
        let headSign='';
        if(matrix== 'D') {
            headSign= 'L';
        } else if(matrix== 'T') {
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
                                input.setAttribute("type", "text");
                                input.required= true;
                                cell.appendChild(input);
                            row.appendChild(cell);
                        }
                table.appendChild(row);
            }
            //put it into a div
            let div= document.createElement('div');
            div.classList.add('tableCTDiv');
            div.appendChild(table);

        container.appendChild(div);
    }

    const _createFixInput = (parent) => {
        let label= document.createElement('label');
        //label.setAttribute('for', 'fixDeptInput');  //no need for ID unless we create custom idName for each?

        let round= '';
        if(storage.fixedDepts.length==0) {
            round= 'first';
        } else {
            round= 'next';
        }
        label.textContent= `Which department to fix ${round}: `;

        let fixDeptInput= document.createElement('input');
        fixDeptInput.classList.add('fixInputInput');
        fixDeptInput.setAttribute('type', 'text');
        fixDeptInput.setAttribute('placeholder', 'W1');

        let div= document.createElement('div');
        div.classList.add('fixInput');
        div.appendChild(label);
        div.appendChild(fixDeptInput);

        parent.classList.remove('divs');
        parent.classList.add('inputDiv');
        parent.appendChild(div);
    }

    const _createNewDiv= () => {
        let newDiv= document.createElement('div');
        let number= document.querySelectorAll('.divs').length + document.querySelectorAll('.inputDiv').length;

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
            room.classList.add('layoutTableCell');
            firstRow.appendChild(room);
        }

        let secondRow= document.createElement('tr');
        for(let i=0; i<length; i++) {
            let dept= document.createElement('td');
            dept.textContent= Object.keys(layout)[i];
            dept.classList.add('layoutTableCell');
            secondRow.appendChild(dept);
        }

        table.appendChild(firstRow);
        table.appendChild(secondRow);

        table.classList.add('layoutTable');

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
            //put it into a div
            let div= document.createElement('div');
            div.classList.add('tableCTDiv');
            div.appendChild(table);

        parent.appendChild(div);
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

    const _createNewLayout= (layout, cost, costCT, status, bestOrFix) => {
        let div= _createNewDiv();
        let table= _createLayoutTable(layout);
        let equation= _createEquation(layout);
        let result= _addResult(cost);
        let equationCT= _createEquationCT(layout);
        let resultCT= _addResult(costCT);

        let layoutName= document.createElement('p');

        if(/[0-9]+/.test(status)) {
            layoutName.textContent=`Layout: ${status}`;
            layoutName.classList.add('layoutName');

            let layoutFix= document.createElement('p');
            layoutFix.textContent= `Fixing: ${bestOrFix}`;
            //div.appendChild(layoutFix);
            div.appendChild(layoutName);
            
        } else if(status == 'best') {
            layoutName.textContent= `Best layout: ${bestOrFix}`;

            layoutName.classList.add('layoutName');
            layoutName.classList.add('layoutNameBest');

            result.classList.add('resultBest');
            resultCT.classList.add('resultBest');

            div.appendChild(layoutName);

        } else if(status == 'optimal') {
            layoutName.textContent= 'OPTIMAL LAYOUT';
            layoutName.classList.add('layoutName');
            layoutName.classList.add('layoutNameBest');

            result.classList.add('resultBest');
            resultCT.classList.add('resultBest');

            div.classList.add('optimalDiv');

            div.appendChild(layoutName);

            div.appendChild(_printNumberOfCombos());
        }

        div.appendChild(table);
        div.appendChild(equation);
        div.appendChild(result);
        div.appendChild(equationCT);
        div.appendChild(resultCT);

        document.body.appendChild(div);
    }

    const _printNumberOfCombos= () => {
        let combos= document.createElement('p');
        let num= Logic.getNumberOfCombinations();
        combos.textContent= `Number of all combinations (N)= ${num}`;
        combos.classList.add('allCombos');

        return combos;
    }

    const _createCTDiv = (parent) => {
        let ctDiv= document.createElement('div');
        ctDiv.classList.add('ctDiv');

        _createMatrixName('CT', ctDiv);
        _createCTtable(ctDiv);

        //only for style purposes --> it allows to center CT matrix
        let extraDiv= document.createElement('div');
        extraDiv.style.cssText= "height: 57px; width: 57px";
        ctDiv.appendChild(extraDiv);

        parent.appendChild(ctDiv);
    }

    const _endButtonsDiv= () => {
        let finalDiv= document.createElement('div');
        finalDiv.classList.add('finalDiv');

        let printBtn= document.createElement('button');
        printBtn.textContent= 'PRINT';
        printBtn.classList.add('endBtns');
        printBtn.addEventListener('click', _printPage);

        let clearResultsBtn= document.createElement('button');
        clearResultsBtn.textContent= 'Clear RESULTS';
        clearResultsBtn.classList.add('endBtns');
        clearResultsBtn.addEventListener('click', _clearResults);

        let clearAllBtn= document.createElement('button');
        clearAllBtn.textContent= 'Clear ALL';
        clearAllBtn.classList.add('endBtns');
        clearAllBtn.addEventListener('click', function(){
            location.reload();
        });


        finalDiv.appendChild(clearResultsBtn);
        finalDiv.appendChild(printBtn);
        finalDiv.appendChild(clearAllBtn);

        return finalDiv;
    }

    const _clearResults= () => {
        //clears DOM
        while(document.querySelector('body').children.length>5) {
            document.body.removeChild(document.body.lastChild)
        }
        document.querySelector('#footer').style.setProperty('bottom', '0');

        //clears storage
        //you cannot just reassing an empty array A=[] , if it is referenced elsewhere
        //solution: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        storage.matrixD.length= 0;
        storage.matrixT.length= 0;
        storage.matrixCT.length= 0;

        //same problem with objects
        //https://stackoverflow.com/questions/684575/how-to-quickly-clear-a-javascript-object
        storage.emptyObject(storage.CRAFTlayouts);
        storage.emptyObject(storage.CRAFTlayoutCosts);

        storage.emptyObject(storage.OPTIMALlayouts);
        storage.emptyObject(storage.OPTIMALlayoutCosts);

        storage.currentBestLayout.length= 0;
        storage.fixedDepts.length= 0;

        storage.craftLayoutCounter= 0;
        storage.craftLayoutCostCounter= 0;
        storage.optimalLayoutCounter= 0;
        storage.optimalLayoutCostCounter= 0;

        //adds ENTER btn
        _createEnterButton();
    }

    const _printPage= () => {
        window.print();
    }


    //ENTER
    const _createEnterButton= () => {
        let enter= document.createElement('button');
        enter.textContent= 'ENTER';
        enter.setAttribute('id', 'enter');

        enter.addEventListener('click', function() {
            /*
            //checks if all inputs correct
            let regex= /[0-9]/;
            let mtx1= Array.from(getAllContainerInputElements(elements.container1));
            let mtx1Arr= [];
            mtx1.forEach(element => mtx1Arr.push(element.value));

            let mtx2= Array.from(getAllContainerInputElements(elements.container2));
            let mtx2Arr= [];
            mtx2.forEach(element => mtx2Arr.push(element.value));

            if(mtx1Arr.includes('') || mtx1Arr.filter(input => regex.test(input)==false).length>0
            || mtx2Arr.includes('') || mtx2Arr.filter(input => regex.test(input)==false).length>0) {
                alert('Incorrect or empty inputs!');
                return;
            }
            */

            //saves both tables to multidimensional arrays

            storage.saveTable(elements.container1);
            storage.saveTable(elements.container2);


            //creates new div w/ CT matrix, fixInput & calcBtn
            let div= _createNewDiv();
                //_createMatrixName('CT', div);
                //_createCTtable(div);
            _createCTDiv(div);
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

            console.log(storage.craftLayoutCostCounter);
            storage.saveLayoutCost(cost);
            console.log(storage.craftLayoutCostCounter);

            let fixing= getCurrentFixInput();
            _createNewLayout(layout, cost, costCT, i, fixing);
        }
    }

    const _createCalcBtn= (parent) => {
        let calc= document.createElement('button');
        calc.textContent= "CALCULATE";
        calc.classList.add('calcBtn');

        _pushFooterToBottom();

        calc.addEventListener('click', function(e) {
            //remove calc btn
            if(getCurrentFixInput()=='') {
                alert('Choose which department to fix:');
                return;
            }

            if(storage.fixedDepts.includes(getCurrentFixInput())) {
                alert('Chosen department is already fixed!');
                return;
            }

            if(storage.currentBestLayout.includes(getCurrentFixInput())==false) {
                alert('Incorrect input! (example of allowed input: W3)');
                return;
            }


            e.target.parentElement.removeChild(e.target);
            

            //Process
            Logic.getRemainingLayouts(storage.currentBestLayout, getCurrentFixInput());

            _calculate();

            //print best layout
            let best= Logic.getBestLayout();
            _createNewLayout(storage.CRAFTlayouts[best], storage.CRAFTlayoutCosts[best], storage.CRAFTlayoutCosts[best], 'best', best);

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

                _createNewLayout(storage.OPTIMALlayouts[optimal], storage.OPTIMALlayoutCosts[optimal], storage.OPTIMALlayoutCosts[optimal], 'optimal', 0);

                //adds ending buttons
                document.body.appendChild(_endButtonsDiv());

                //scrolls to bottom
                window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

                //adds copyright
                _pushFooterToBottom();
                return;
            } else {
                //create new input
                let div= _createNewDiv();
                _createFixInput(div);
                _createCalcBtn(div);

                document.body.appendChild(div);
            }
            //scrolls to bottom
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        })
        parent.appendChild(calc);
    }

    //PRINT BUTTON
    document.getElementById('print').addEventListener('click', _printPage);


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

    const _pushFooterToBottom= () => {
        let height= document.body.scrollHeight;  
        
        document.querySelector('#footer').style.removeProperty('bottom');
        document.documentElement.style.setProperty('--footerPos', `${height+300}px`);
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
        //you have to call storage, otherwise it doesnt update the 'global' variable OR get a getter function
        //https://stackoverflow.com/questions/53726729/why-value-of-x-in-iife-chage-based-on-the-way-we-access-it
        storage.craftLayoutCostCounter++;
        CRAFTlayoutCosts[storage.craftLayoutCostCounter]= cost;
    }

    let OPTIMALlayouts= {
        //all layouts
    }

    let OPTIMALlayoutCosts= {
        //optimal costs
    }

    const saveOptimalCost= (cost) => {
        //https://stackoverflow.com/questions/53726729/why-value-of-x-in-iife-chage-based-on-the-way-we-access-it
        storage.optimalLayoutCostCounter++;
        OPTIMALlayoutCosts[storage.optimalLayoutCostCounter]= cost;
    }
    
    let currentBestLayout=[/*gets initial values from creation of CT table*/];
    
    let fixedDepts= [];

    let craftLayoutCounter= 0;
    let craftLayoutCostCounter= 0;

    let optimalLayoutCounter= 0;
    let optimalLayoutCostCounter= 0;


    const emptyObject = (object) => {
        for (let member in object) delete object[member];
    }


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
        craftLayoutCostCounter,
        OPTIMALlayouts,
        OPTIMALlayoutCosts,
        saveOptimalCost,
        optimalLayoutCounter,
        optimalLayoutCostCounter,
        emptyObject,

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

    const _factorial = (n) => {
        return (n != 1) ? n * _factorial(n - 1) : 1;
    }

    const getNumberOfCombinations= () => {
        //if matrixes same length
        if(storage.getTlength() == storage.getDlength()) {
            return _factorial(storage.getDlength());
        }
    }

    return {
        createMatrixCT,
        getRemainingLayouts,
        getAllPermutations,
        calculateLayoutCost,
        calculateLayoutCostCT,
        getBestLayout,
        getNumberOfCombinations
    }
})();