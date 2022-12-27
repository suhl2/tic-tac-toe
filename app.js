//DOM Selectors
const board = document.getElementById("board");
const playerOneInput = document.getElementById("player-one-input");
const playerTwoInput = document.getElementById("player-two-input");
const playerOneButton = document.getElementById("player-one-button");
const playerTwoButton = document.getElementById("player-two-button");
const playersSection = document.getElementById("players");
const playerOneSection = document.getElementById("player-one");
const playerTwoSection = document.getElementById("player-two");
const currentPlayerDisplay = document.getElementById("current-player");
const versus = document.getElementsByTagName("h2");
const testButton = document.getElementById("test");

//Game State
const gameState = {
    currentPlayer: "Player 1",
    playerOneName: "",
    playerTwoName: "",
    playersSelected: false,
    boardState: [["", "", ""], ["", "", ""], ["", "", ""]]
}

//Generate blank board

const makeBoard = () => {
    for(let i = 0; i < 9; i++) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "cell");
        board.appendChild(newDiv);
    }
}

//Initial Run
// makeBoard();
// const cells = document.getElementsByClassName("cell");

//clicking adds an x to the board

board.addEventListener("click", (event) => {
   if (event.target.tagName === "DIV" && gameState.playersSelected === true){ 
    if(gameState.currentPlayer === gameState.playerOneName) {
        const targetCell = event.target;
        targetCell.innerHTML = '<i class="fa-solid fa-x"></i>';
        gameState.currentPlayer = gameState.playerTwoName;
        currentPlayerDisplay.innerText = `Current Player: ${gameState.currentPlayer}`;
    } else {
        const targetCell = event.target;
        targetCell.innerHTML = '<i class="fa-solid fa-o"></i>';
        gameState.currentPlayer = gameState.playerOneName;
        currentPlayerDisplay.innerText = `Current Player: ${gameState.currentPlayer}`;
    }
   }
   console.log(gameState.currentPlayer);
});

//Click to set player names
playersSection.addEventListener("click", (event) => {
    const buttonId = event.target.getAttribute("id");
    if(buttonId === "player-one-button") {
        gameState.playerOneName = playerOneInput.value;
        playerOneInput.value = "";
        playerOneSection.style.display = "none";
    } else if (buttonId === "player-two-button") {
        gameState.playerTwoName = playerTwoInput.value;
        playerTwoInput.value = "";
        playerTwoSection.style.display = "none";
    }
    if (gameState.playerOneName !== "" && gameState.playerTwoName !== "") {
        versus[0].innerText = `It's ${gameState.playerOneName} vs ${gameState.playerTwoName}`;
        versus[0].style.display = "block";
        gameState.currentPlayer = gameState.playerOneName;
        currentPlayerDisplay.innerText = `Current Player: ${gameState.currentPlayer}`;
        currentPlayerDisplay.style.display = "flex";
        gameState.playersSelected = true;
        makeBoard();
        const cells = document.getElementsByClassName("cell");
    }
});

// Check for victory
//get the content of the board
const getBoardState = (array) => {
    let count = 0;
    console.log (array[count].innerHTML);
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            const cellStatus = array[count].innerHTML;
            if(cellStatus === '<i class="fa-solid fa-x"></i>') {
                gameState.boardState[i][j] = "X";
                count++;
            }
            else if(cellStatus === '<i class="fa-solid fa-o"></i>') {
                gameState.boardState[i][j] = "O";
                count++;
            } else {
                count++;
            }
        }
    }
};
//get one row of the board
const getRow = (array, index) => {
    let row = [];
    for (let i = 0; i < array[index].length; i++) {
        row.push(array[index][i]);
    }
    return row;
}
//get one column of the board
const getCol = (array, index) => {
    let col = [];
    for (let i = 0; i < array.length; i++) {
        col.push(array[i][index]);
    }
    return col;
}
//check for 3 in a row vertically

//check for 3 in a row horizontally
//check for 3 in a row diagonally

//Test button
testButton.addEventListener("click", () => {
    const board = getBoardState(document.getElementsByClassName("cell"));
    // console.log(document.getElementsByClassName("cell"));
    console.log(gameState.boardState);
    console.log(getRow(gameState.boardState, 0));
    console.log(getCol(gameState.boardState, 1));
});

//Bugs
//entering same name means players don't switch