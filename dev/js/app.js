window.onload = () => {
    // function to handle creating the matrix
    function initializeMatrix(containerID, isReversed, sizeOfMatrix) {
        // gets the container element for the matrix
        const matrixBox = document.getElementById(containerID);

        // check the size of the matrix
        if (sizeOfMatrix === 0) {
            // alert message if the input is out of bounds
            alert(`Please enter a number between 2 and 40`);
            return;
        }

        // create the table for the matrix
        const matrixTable = document.createElement(`table`);
        matrixBox.appendChild(matrixTable);

        const matrixBody = document.createElement(`tableBody`);
        matrixTable.appendChild(matrixBody);

        //  for loop to create rows for the matrix
        for (let i = 0; i < sizeOfMatrix; i++) {
            const row = document.createElement(`tr`);

            for (let j = 0; j < sizeOfMatrix; j++) {
                console.log(`Row: `, i, `Col: `, j, `Size `, sizeOfMatrix);
                // attempted debugging
                const value = cellValue(i, j, sizeOfMatrix, isReversed);
                const cell = document.createElement(`td`);
                cell.textContent = value;

                // check if the cell is on the second diagonal
                if (secondDiagonal(i, j, sizeOfMatrix)) {
                    cell.classList.add(`highlighter`);
                    // CSS class to highlight the box on the second diagonal
                }

                row.appendChild(cell);
            }

            matrixBody.appendChild(row);
        }
    }

    // takes the users input to create the matrix
    function userMatrixSize() {
        let size = 0;

        while (size === 0) {
            const input = prompt(`Input a size for your matrix?`);
            const userInput = parseInt(input, 10);

            // check to make sure the user's input is valid
            if (isNaN(userInput) || userInput < 2 || userInput > 40) {
                alert(`Try again. Please enter a number between 2 and 40.`);
            } else {
                size = userInput;
            }
        }

        return size;
    }

    // calculates the cell value based on row, column, and matrix size
    function cellValue(row, col, size, isReversed) {
        const value = (row * size) + (col + 1);

        // adjust the value if reversed
        if (isReversed) {
            return (size * size) - value + 1;
        }

        return value;
    }

    // function to check if a cell is on the second diagonal
    function secondDiagonal(row, col, size) {
        return (row + col) === (size - 1);
    }

    // original matrix
    const originalMatrixSize = userMatrixSize();
    initializeMatrix(`original-matrix`, false, originalMatrixSize);

    // reversed matrix
    initializeMatrix(`flipped-matrix`, true, originalMatrixSize);
    // pass the same size for reversed matrix
};
