/*
TO DO:
-separate eventListeners for ENter button??
-remove ENTER once clicked (add eventListener to it + all other functions it needs to do)--> continue logic with CALCULATE button
-make all input field required
-center table headings

LEARNED:
-learned how to make HTML table
-learned how to make a matrix with it, and use input fields + then collect those inputs

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
            cleanInputContainers();
            createMatrixTable(storage.getDlength(), elements.container1);
            createMatrixTable(storage.getTlength(), elements.container2);
            //removes start button
            elements.div1.removeChild(elements.start);
            //creates enter
            createEnterButton();
        }
    });

    const cleanInputContainers= () => {
        elements.inputContainers.forEach(container=> {
            while(container.lastElementChild) {
                container.removeChild(container.lastElementChild);
            }
        })
    }

    const createMatrixTable = (length, container) => {
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

    const getAllContainerInputElements= (container) => {
        return container.querySelectorAll('table tr input');
    }


/* SOLVED THIS PROBLEM BY USING HTML TABLE
    const createMatrix= (length, container) => {
        //create custom matrix grid size
        if(container== elements.container1) {
            document.documentElement.style.setProperty('--matrix-length-D', length);
        } else if(container== elements.container2) {
            document.documentElement.style.setProperty('--matrix-length-T', length);
        }

        //add input elements
        for(let i=0; i<length**2; i++) {
            let input= document.createElement('input');
            input.classList.add('matrix-inputs');
            input.setAttribute("type", "number");
            container.appendChild(input);
        }
    }
*/

    //ENTER
    const createEnterButton= () => {
        let btn= document.createElement('button');
        btn.textContent= 'ENTER';
        btn.setAttribute('type', 'button');

        btn.addEventListener('click', function() {
            storage.saveTable(elements.container1);
            storage.saveTable(elements.container2);
        })

        elements.div1.appendChild(btn);
    }


    return {
        elements,
        getAllContainerInputElements
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

    const saveTable= (container) => {
        let matrix=[];
        
        let arr= Array.from(DOM.getAllContainerInputElements(container));
            arr.forEach(input => {
                matrix.push(input.value);
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

/* REPLACED-by saveTable
    const saveMatrix= (container) => {
        let matrix=[];
        if(container == DOM.elements.container1) {
            let arr= Array.from(container.children);
            arr.forEach(input => {
                matrix.push(input.value);
            });
            //turn array of numbers into array of arrays --> each array is 1 row, and each element in array is the column index
            while(matrix.length) {
                matrixD.push(matrix.splice(0, getDlength()));
            }

        } else if(container== DOM.elements.container2) {
            let arr= Array.from(container.children);
            arr.forEach(input => {
                matrix.push(input.value);
            });
            //turn array of numbers into array of arrays --> each array is 1 row, and each element in array is the column index
            while(matrix.length) {
                matrixT.push(matrix.splice(0, getTlength()));
            }
        }
    }
*/

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

    return {
        getDlength,
        getTlength,
        saveTable,
        matrixD,
        matrixT,

        matrixDdemo,
        matrixTdemo
    }
})();

const logic = (function() {

    const createMatrixCT= (length, T) => {
        let j=0;
        let matrixCT=[];
        for(let i=0; i<length; i++) {
            j=i;
            matrixCT.push([]);
            //add zeros to non-used fields
            for(let h=0; h<j; h++) {
                matrixCT[i].push(0);
            }
            //adds cummulative transfers per depts.
            for(j; j<length; j++) {
                let ct= T[i][j] + T[j][i];
                matrixCT[i].push(ct);
            }
        }
        return matrixCT;
    }


    return {
        createMatrixCT,
    }
})();