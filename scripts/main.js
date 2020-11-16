const DOM = (function() {
    const elements= {
        start: document.querySelector('#start'),

        inputContainers: document.querySelectorAll('.inputContainer'),

        DSizeInput: document.querySelector('#Dmatrix-size'),
        LSizeInput: document.querySelector('#Tmatrix-size'),

        container1: document.querySelector('#container1'),
        container2: document.querySelector('#container2')
    }

    //EVENT LISTENERS
    elements.start.addEventListener('click', function() {
        cleanInputContainers();
        createMatrices(storage.Dlength, storage.Tlength);
    });

    const cleanInputContainers= () => {
        elements.inputContainers.forEach(container=> {
            while(container.lastElementChild) {
                container.removeChild(container.lastElementChild);
            }
        })
    }

    const createMatrices= (Dlength, Tlength) => {
        //create custom grid

        //add input elements
        for(let i=0; i<Dlength**2; i++) {
            let input= document.createElement('input');
            //add type
            elements.container1.appendChild(input);
        }

        for(let i=0; i<Tlength**2; i++) {
            let input= document.createElement('input');
            elements.container2.appendChild(input);
        }
    }


    return {
        elements,
    }
})();

const storage= (function() {
    let Dlength= DOM.elements.DSizeInput.value;
    let Tlength= DOM.elements.LSizeInput.value;
    

    return {
        Dlength,
        Tlength
    }
})();