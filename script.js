const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");


let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer); //verifica cada celula da lista se contem o simbolo do jogador atual (X ou O)
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}   

const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener("click", handleClick, { once: true }) //eventlistener acontecendo apenas uma vez
    }

    isCircleTurn = false;

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "DRAW!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn
            ? "O WINS!"
            : "X WINS!";
    }

    winningMessage.classList.add("show-winning-message");
};



const placeMark = (cell, classToAdd) => { //função para mudar a classe css
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    //remove classe css
    board.classList.remove("circle");
    board.classList.remove("x");

    //adiciona classe css
    if (isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x");
    }
}

const swapTurns = () => { //função para mudar o simbolo (X ou O)
    isCircleTurn = !isCircleTurn; //transformar o isCircleTurn no contrario para passar a vez
    setBoardHoverClass();
}

const handleClick = (e) => {
    // Colocar a marca (X ou O)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x"; //condicao para mudar a classe css
    placeMark(cell, classToAdd);
    //verificar por vitoria
    const isWin = checkForWin(classToAdd);
    //verificar por empate 
    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        //mudar o simbolo
        swapTurns();
    }
}

startGame();

restartButton.addEventListener("click", startGame);







