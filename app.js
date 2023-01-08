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
const newGameButton = document.getElementById("new-game");
const playerNumberSection = document.getElementById("select-player-number");
const playerNumberInput = document.getElementById("player-number-input");
const playerNumberButton = document.getElementById("player-number-button");

//create computer interval so we can call it later if needed
let computerInterval = null;

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

//Check for a win
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

//Computer AI
const computerTurn = () => {
    if(gameState.currentPlayer === "Computer"){
        const currentBoard = document.getElementsByClassName("cell");
        const compCanWin = computerWinPossible();
        const compCanBlock = computerBlockPossible();
        if (compCanWin){
            currentBoard[compCanWin].innerHTML = '<i class="fa-solid fa-o"></i>';
        } else if(compCanBlock){
            currentBoard[compCanBlock].innerHTML = '<i class="fa-solid fa-o"></i>';
        } else{
            let randomSquare = Math.floor(Math.random() * 9);
            let count = 0;
            while(count < 1){
                if (!currentBoard[randomSquare].innerHTML){
                    currentBoard[randomSquare].innerHTML = '<i class="fa-solid fa-o"></i>';
                    count++;
               } else {
                randomSquare = Math.floor(Math.random() * 9);
               }
            }   
    }
        getBoardState(document.getElementsByClassName("cell"));
        const isWinner = winCheck(gameState.boardState);
        if (isWinner){
            gameState.winner = gameState.currentPlayer;
            setTimeout(() => {
                alert(`${gameState.winner} wins!`);
            }, 100);
            currentPlayerDisplay.innerText = `${gameState.winner} is the winner!`;
            newGameButton.style.display = "flex";
            clearInterval(computerInterval);
            return;
        }
        const isTie = tieCheck(gameState.boardState);
        if (isTie){
            setTimeout(() => {
                alert("The game is a draw.");
            }, 100);
            currentPlayerDisplay.innerText = "The game is a draw";
            newGameButton.style.display = "flex";
            clearInterval(computerInterval);
            return;
        }
        gameState.currentPlayer = gameState.playerOneName;
        currentPlayerDisplay.innerText = `Current Player: ${gameState.currentPlayer}`;
    }
}

//Check row for computer win and return array id of the cell if it is possible
const computerWinPossible = () => {
    getBoardState(document.getElementsByClassName("cell"));
    //check rows for possible win
    for(let i = 0; i < gameState.boardState.length; i++) {
        const row = getRow(gameState.boardState, i);
        let openSlots = [];
        let openSlotIdx = -1;
        let occupiedSlots = [];
        for (let j = 0; j < row.length; j++){
            if(!row[j]) {
                openSlots.push(j);
                openSlotIdx = j;
            } else if(row[j] === "O") {
                occupiedSlots.push(row[j]);
            }
        }
        if(openSlots.length === 1 && occupiedSlots.length == 2 && occupiedSlots[0] === occupiedSlots[1]){
            return (i * 3) + openSlotIdx;
        }

    }
    //check columns for possible win
    for(let i = 0; i < gameState.boardState.length; i++) {
        const col = getCol(gameState.boardState, i);
        let openSlots = [];
        let openSlotIdx = -1;
        let occupiedSlots = [];
        for (let j = 0; j < col.length; j++){
            if(!col[j]) {
                openSlots.push(j);
                openSlotIdx = j;
            } else if(col[j] === "O") {
                occupiedSlots.push(col[j]);
            }
        }
        if(openSlots.length === 1 && occupiedSlots.length == 2 && occupiedSlots[0] === occupiedSlots[1]){
            return (openSlotIdx * 3) + i;
        }
    }
    //check diagonals for possible win
    for(let i = 0; i < 3; i+=2) {
        const diag = getDiag(gameState.boardState, i);
        let openSlots = [];
        let openSlotIdx = -1;
        let occupiedSlots = [];
        for (let j = 0; j < diag.length; j++){
            if(!diag[j]) {
                openSlots.push(j);
                if(i === 0){
                    openSlotIdx = j * 4;
                } else {
                    openSlotIdx = (j * 2) + 2;
                }
            } else if(diag[j] === "O") {
                occupiedSlots.push(diag[j]);
            }
        }
        if(openSlots.length === 1 && occupiedSlots.length == 2 && occupiedSlots[0] === occupiedSlots[1]){
            return openSlotIdx;
        }
    }
}
    
const computerBlockPossible = () => {
    getBoardState(document.getElementsByClassName("cell"));
    //check rows for possible block
    for(let i = 0; i < gameState.boardState.length; i++) {
        const row = getRow(gameState.boardState, i);
        let openSlots = [];
        let openSlotIdx = -1;
        let occupiedSlots = [];
        for (let j = 0; j < row.length; j++){
            if(!row[j]) {
                openSlots.push(j);
                openSlotIdx = j;
            } else if(row[j] === "X") {
                occupiedSlots.push(row[j]);
            }
        }
        if(openSlots.length === 1 && occupiedSlots.length == 2 && occupiedSlots[0] === occupiedSlots[1]){
            return (i * 3) + openSlotIdx;
        }
    }
    //check columns for possible block
    for(let i = 0; i < gameState.boardState.length; i++) {
        const col = getCol(gameState.boardState, i);
        let openSlots = [];
        let openSlotIdx = -1;
        let occupiedSlots = [];
        for (let j = 0; j < col.length; j++){
            if(!col[j]) {
                openSlots.push(j);
                openSlotIdx = j;
            } else if(col[j] === "X") {
                occupiedSlots.push(col[j]);
            }
        }
        if(openSlots.length === 1 && occupiedSlots.length == 2 && occupiedSlots[0] === occupiedSlots[1]){
            return (openSlotIdx * 3) + i;
        }
    }
    //check diagonals for possible block
    for(let i = 0; i < 3; i+=2) {
        const diag = getDiag(gameState.boardState, i);
        let openSlots = [];
        let openSlotIdx = -1;
        let occupiedSlots = [];
        for (let j = 0; j < diag.length; j++){
            if(!diag[j]) {
                openSlots.push(j);
                if(i === 0){
                    openSlotIdx = j * 4;
                } else {
                    openSlotIdx = (j * 2) + 2;
                }
            } else if(diag[j] === "X") {
                occupiedSlots.push(diag[j]);
            }
        }
        if(openSlots.length === 1 && occupiedSlots.length == 2 && occupiedSlots[0] === occupiedSlots[1]){
            return openSlotIdx;
        }
    }
}
//Zero Player Easter Egg
const clearBoard = () => {
    const board = document.getElementsByClassName("cell");
    for(let i = 0; i < board.length; i++){
        board[i].innerHTML = "";
    }
}
const computerVsComputer = () => {
    let computerTurn = 1;
    const board = document.getElementsByClassName("cell");
    getBoardState(board);
    for(let i = 0; i < 9; i++){
        let isEmpty = false;
        let index = 0;
        while(!isEmpty){
            index = Math.floor(Math.random() * 9);
            if(!board[index].innerHTML){
                isEmpty = true;
            }
        }
        if(computerTurn % 2 === 1) {
            board[index].innerHTML = '<i class="fa-solid fa-x"></i>';
            computerTurn = 2;
        } else {
            board[index].innerHTML = '<i class="fa-solid fa-o"></i>';
            computerTurn = 1;
        }
    }
}
const easterEgg = () => {
    let count = 0;
    alert("Computer will play itself");
    playerNumberSection.style.display = "none";
    makeBoard();
    playersSection.style.display = "block";
    playerOneSection.style.display = "none";
    playerTwoSection.style.display = "none";
    versus[0].innerText = `It's Computer vs Computer`;
    versus[0].style.display = "block";
    const cells = document.getElementsByClassName("cell");
    const interval = setInterval( () => {
        count++;
        computerVsComputer();
        setTimeout(clearBoard, 1000);
        if(count > 5){
            clearInterval(interval);
        }
    }, 1200);
    setTimeout( () =>{
        alert("A strange game.  The only winning move is not to play.  How about a nice game of chess?");
    }, 8500);
    newGameButton.style.display = "flex";
}
//Set number of players
playerNumberButton.addEventListener("click", () => {
    const inputValue = Number(playerNumberInput.value);
    if(inputValue > 2 || inputValue < 0) {
        alert("The maximum number of players is 2 and the minimum number of players is 0");
        playerNumberInput.value = "";
    } else if (!inputValue && inputValue !== 0){
        alert("Please enter a valid number");
        playerNumberInput.value = "";
    }
    else {
        if(inputValue === 1){
            playerNumberSection.style.display = "none";
            playersSection.style.display = "block";
            playerOneSection.style.display = "block";
            playerTwoSection.style.display = "none";
            playerNumberInput.value = "";
            gameState.playerTwoName = "Computer";
        } else if(inputValue === 2) {
            playerNumberSection.style.display = "none";
            playersSection.style.display = "block";
            playerOneSection.style.display = "block";
            playerTwoSection.style.display = "block";
            playerNumberInput.value = "";
        } else {
            playerNumberInput.value = "";
            easterEgg();
        }
    }
} );

//Click functionality

board.addEventListener("click", (event) => {
   if (event.target.tagName === "DIV" && gameState.playersSelected === true && !gameState.winner){ 
    if(gameState.currentPlayer === gameState.playerOneName) {
        const targetCell = event.target;
        targetCell.innerHTML = '<i class="fa-solid fa-x"></i>';
        getBoardState(document.getElementsByClassName("cell"));
        const isWinner = winCheck(gameState.boardState);
        if (isWinner){
            gameState.winner = gameState.currentPlayer;
            setTimeout(() => {
                alert(`${gameState.winner} wins!`);
            }, 100);
            currentPlayerDisplay.innerText = `${gameState.winner} is the winner!`;
            newGameButton.style.display = "flex";
            return;
        }
        const isTie = tieCheck(gameState.boardState);
        if (isTie){
            setTimeout(() => {
                alert(`The game is a draw.`);
            }, 100);
            currentPlayerDisplay.innerText = "The game is a draw";
            newGameButton.style.display = "flex";
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
            setTimeout(() => {
                alert(`${gameState.winner} wins!`);
            }, 100);
            currentPlayerDisplay.innerText = `${gameState.winner} is the winner!`;
            newGameButton.style.display = "flex";
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
        if(gameState.playerOneName === gameState.playerTwoName){
            gameState.playerTwoName += "2";
        }
        versus[0].innerText = `It's ${gameState.playerOneName} vs ${gameState.playerTwoName}`;
        versus[0].style.display = "block";
        gameState.currentPlayer = gameState.playerOneName;
        currentPlayerDisplay.innerText = `Current Player: ${gameState.currentPlayer}`;
        currentPlayerDisplay.style.display = "flex";
        gameState.playersSelected = true;
        makeBoard();
        const cells = document.getElementsByClassName("cell");
        computerInterval = setInterval(computerTurn, 500);
    }
});

//Reset Game
const resetGame = () => {
    gameState.currentPlayer = "Player 1";
    gameState.playersSelected = false;
    gameState.boardState = [["", "", ""], ["", "", ""], ["", "", ""]];
    gameState.winner = "";
    gameState.playerOneName = "";
    gameState.playerTwoName = "";
    board.innerHTML = "";
    currentPlayerDisplay.innerText = "";
    versus[0].innerText = "";
    playerNumberSection.style.display = "block";
    newGameButton.style.display = "none";
}

newGameButton.addEventListener("click", resetGame);
