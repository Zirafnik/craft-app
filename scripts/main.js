const DOM = (function() {
    const elements= {
        start: document.querySelector('#start'),

        inputContainers: document.querySelectorAll('.inputContainer'),
        container1: document.querySelector('#container1'),
        container2: document.querySelector('#container2'),

        DSizeInput: document.querySelector('#Dmatrix-size'),
        LSizeInput: document.querySelector('#Tmatrix-size'),
    }

    //EVENT LISTENERS
    elements.start.addEventListener('click', function() {
        cleanInputContainers();
        createMatrix(storage.Dlength, elements.container1);
        createMatrix(storage.Tlength, elements.container2);
    });

    const cleanInputContainers= () => {
        elements.inputContainers.forEach(container=> {
            while(container.lastElementChild) {
                container.removeChild(container.lastElementChild);
            }
        })
    }

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
            input.setAttribute("type", "text");
            container.appendChild(input);
        }
    }


    return {
        elements,
    }
})();

const storage= (function() {
    let Dlength= DOM.elements.DSizeInput.value;
    let Tlength= DOM.elements.LSizeInput.value;

    let matrixD=[];
    let matrixT=[];

    const saveMatrix= (container) => {
        let matrix=[];
        if(container == DOM.elements.container1) {
            let arr= Array.from(container.children);
            arr.forEach(input => {
                matrix.push(input.value);
            });
            //turn array of numbers into array of arrays --> each array is 1 row, and each element in array is the column index
            while(matrix.length) {
                matrixD.push(matrix.splice(0, Dlength));
            }

        } else if(container== DOM.elements.container2) {
            let arr= Array.from(container.children);
            arr.forEach(input => {
                matrix.push(input.value);
            });
            //turn array of numbers into array of arrays --> each array is 1 row, and each element in array is the column index
            while(matrix.length) {
                matrixT.push(matrix.splice(0, Tlength));
            }
        }
    }

    return {
        Dlength,
        Tlength,
        saveMatrix,
        matrixD,
        matrixT
    }
})();