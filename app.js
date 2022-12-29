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
    boardState: [["", "", ""], ["", "", ""], ["", "", ""]],
    winner: ""
}

//Generate blank board

const makeBoard = () => {
    for(let i = 0; i < 9; i++) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "cell");
        board.appendChild(newDiv);
    }
}
// Check for victory
//get the content of the board
const getBoardState = (array) => {
    let count = 0;
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
//flatten the board array
const flattenBoard = (array) => {
    let flatArray = [];
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[i].length; j++){
            flatArray.push(array[i][j]);
        }
    }
    return flatArray;
}

//get a diagonal section of the board
const getDiag = (array, index) => {
    array = flattenBoard(array);
    let diag = [];
    if (index === 0){
        for(let i = index; i < array.length; i+= 4) {
            diag.push(array[i]);
        }
    }
    if (index === 2){
        for(let i = index; i < 7; i+= 2){
            diag.push(array[i]);
        }
    }
    return diag;
}


const winCheck = (array) => {
    let rowWin = false;
    for (let i = 0; i < 3; i++){ 
        const testRow = getRow(array, i);
        if(testRow[0] !== ""){
            if(testRow[0] === testRow[1] && testRow[0] === testRow[2]){
                rowWin = true;
            }
           }
        }
    let colWin = false;
    for (let i = 0; i < 3; i++){
        const testCol = getCol(array, i);
        if(testCol[0] !== ""){
            if(testCol[0] === testCol[1] && testCol[0] === testCol[2]) {
                colWin = true;
            }
    }
}   
    let diagWin = false;
    for (let i = 0; i < 3; i+=2){
        const testDiag = getDiag(array, i);
        if(testDiag[0] !== ""){
            if(testDiag[0] === testDiag[1] && testDiag[0] === testDiag[2]) {
                diagWin = true;
            }
        }
    }

    if (rowWin || colWin || diagWin){
        return true;
    } else{
        return false;
    }
}

//check for a tie
const tieCheck = (array) => {
    const board = flattenBoard(array);
    for (let i = 0; i < board.length; i++){
        if(!board[i]) {
            return false;
        }
    }
    return true;
}
//Initial Run
// makeBoard();
// const cells = document.getElementsByClassName("cell");

//clicking adds an x to the board

board.addEventListener("click", (event) => {
   if (event.target.tagName === "DIV" && gameState.playersSelected === true && !gameState.winner){ 
    if(gameState.currentPlayer === gameState.playerOneName) {
        const targetCell = event.target;
        targetCell.innerHTML = '<i class="fa-solid fa-x"></i>';
        getBoardState(document.getElementsByClassName("cell"));
        const isWinner = winCheck(gameState.boardState);
        if (isWinner){
            gameState.winner = gameState.currentPlayer;
            alert(`${gameState.winner} wins!`);
            currentPlayerDisplay.innerText = `${gameState.winner} is the winner!`;
            return;
        }
        const isTie = tieCheck(gameState.boardState);
        if (isTie){
            alert("The game is a draw.");
            currentPlayerDisplay.innerText = "The game is a draw";
            return;
        }
        gameState.currentPlayer = gameState.playerTwoName;
        currentPlayerDisplay.innerText = `Current Player: ${gameState.currentPlayer}`;
    } else {
        const targetCell = event.target;
        targetCell.innerHTML = '<i class="fa-solid fa-o"></i>';
        getBoardState(document.getElementsByClassName("cell"));
        const isWinner = winCheck(gameState.boardState);
        if (isWinner){
            gameState.winner = gameState.currentPlayer;
            alert(`${gameState.winner} wins!`);
            currentPlayerDisplay.innerText = `${gameState.winner} is the winner!`;
            return;
        }
        gameState.currentPlayer = gameState.playerOneName;
        currentPlayerDisplay.innerText = `Current Player: ${gameState.currentPlayer}`;
    }
   }
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



//Test button
testButton.addEventListener("click", () => {
    const board = getBoardState(document.getElementsByClassName("cell"));
    // console.log(document.getElementsByClassName("cell"));
    // console.log(gameState.boardState);
    // console.log(getRow(gameState.boardState, 0));
    // console.log(getCol(gameState.boardState, 1));
    // console.log(flattenBoard(gameState.boardState));
    // console.log(getDiag(gameState.boardState, 0));
    // console.log(getDiag(gameState.boardState, 2))
    // console.log(winCheck(getRow(gameState.boardState, 0)));
    // console.log(winCheck(gameState.boardState));
    console.log(tieCheck(gameState.boardState));
    
});

//Bugs
//entering same name means players don't switch

//To Do
//check for tie
//reset game button