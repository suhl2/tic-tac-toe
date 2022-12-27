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

//Game State
const gameState = {
    currentPlayer: "Player 1",
    playerOneName: "",
    playerTwoName: ""
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
makeBoard();
const cells = document.getElementsByClassName("cell");

//clicking adds an x to the board

board.addEventListener("click", (event) => {
   if (event.target.tagName === "DIV"){ 
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
    }
});

