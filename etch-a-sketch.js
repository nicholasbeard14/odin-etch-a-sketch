const container = document.querySelector('#container');
const containerSize = container.clientHeight;

const resetButton = document.querySelector("#reset");

const styleSelector = document.querySelector("#etch-style");

const createGrid = (numSqaures = 16) => {
    if (numSqaures > 100) {
        let message = document.createElement('div');
        
        message.textContent = "Error: The maximum dimension is 100x100.";
        message.style.fontSize = "24px";
        message.style.fontWeight = "bold";

        container.appendChild(message);
    } else {
        const squareSize = ((containerSize / numSqaures) - 2).toString() + "px";

        for (let i = 0; i < numSqaures*numSqaures; i++) {
            let square = document.createElement('div');

            square.style.height = squareSize;
            square.style.width = squareSize;

            square.style.borderStyle = "solid";
            square.style.borderWidth = "1px";
            square.style.display = "inline-block";

            container.appendChild(square);
        }
    }

    addHoverFunctionalityToGrid();
}

const addHoverFunctionalityToGrid = () => {
    const grids = document.querySelectorAll('#container div');
    const colorInType = document.querySelector('#etch-style').value;

    let hoverFunc;

    if (colorInType == 'Rainbow') {
        hoverFunc = colorInRandom;
    } else if (colorInType == 'Gradient Gray') {
        hoverFunc = colorInGradient;
    } else {
        hoverFunc = colorInBlack;
    }

    grids.forEach(grid => grid.addEventListener('mouseenter', hoverFunc));
}

const resetGrid = () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const numSqaures = prompt("How many squares per side would you like this grid? (Press enter for default of 16)", 16);

    createGrid(numSqaures);
}

const colorInBlack = (event) => {
    const grid = event.target;
    
    grid.classList.add("black");
}

const colorInGradient = (event) => {
    const grid = event.target;
    let currentColor = grid.style.backgroundColor;
    
    if (currentColor) {
        const currentTransparency = currentColor.split(',')[3].split(')')[0];
        const newTransparency = parseFloat(currentTransparency) + 0.1;
        
        grid.style.backgroundColor = `rgba(0,0,0,${newTransparency})`
    } else {
        grid.style.backgroundColor = "rgba(0,0,0,0.1)"
    }
    
    console.log(currentColor);
}

const colorInRandom = (event) => {
    const grid = event.target;

    const r = Math.round(Math.random()*255).toString();
    const g = Math.round(Math.random()*255).toString();
    const b = Math.round(Math.random()*255).toString();

    grid.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

const swtichStyle = (event) => {
    const currentSize = container.childElementCount;
    const numSqauresPerSide = Math.sqrt(currentSize);

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    createGrid(numSqauresPerSide);

    addHoverFunctionalityToGrid();
}

createGrid();

resetButton.addEventListener('click', resetGrid);

styleSelector.addEventListener('change', swtichStyle);
