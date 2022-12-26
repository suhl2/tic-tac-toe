//DOM Selectors
const board = document.getElementById("board");

//Game State
const gameState = {
    currentPlayer: "Player 1"
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
    if(gameState.currentPlayer === "Player 1") {
        const targetCell = event.target;
        targetCell.innerHTML = '<i class="fa-solid fa-x"></i>';
        gameState.currentPlayer = "Player 2";
    } else {
        const targetCell = event.target;
        targetCell.innerHTML = '<i class="fa-solid fa-o"></i>';
        gameState.currentPlayer = "Player 1";
    }
   }
   console.log(gameState.currentPlayer);
});

