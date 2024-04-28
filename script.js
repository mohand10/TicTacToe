const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const sparklesContainer = document.getElementById('sparklesContainer');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
};

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // const winner = checkWin();
    // if (winner) {
    //     gameActive = false;
    //     message.textContent = `${winner} wins!`;
    //     return;
    // }
    const winner = checkWin();
        if (winner) {
        gameActive = false;
        message.textContent = `${winner} wins!`;
        message.classList.add('winner');
        //addSparkles(); // Add sparkles when someone wins
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        gameActive = false;
        message.textContent = 'Draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
};

const handleRestart = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    message.classList.remove('winner');
};

// const createSparkle = () => {
//     const sparkle = document.createElement('div');
//     sparkle.classList.add('sparkle');
//     sparklesContainer.appendChild(sparkle);

//     setTimeout(() => {
//         sparkle.remove(); // Remove the sparkle after a certain time
//     }, 1000);
// };

// const addSparkles = () => {
//     for (let i = 0; i < 10; i++) {
//         createSparkle();
//     }
// };



cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestart);
