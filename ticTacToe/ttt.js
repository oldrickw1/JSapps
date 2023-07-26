const board = ['','','','','','','','',''];
let isPlayerXTurn = null;
let playerXState = new Set();
let playerOState = new Set();
let gameIsStarted = false;

let outcome = null;

const WINNING_SOLUTIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const controlButtons = document.querySelectorAll(".control-button")
const buttons = document.querySelectorAll(".field");
const menu = document.querySelector(".menu");

let whosTurnDisplay = null;

// This sets up which player begins, and starts the game.
controlButtons.forEach(btn => {
    btn.onclick = (src) => {
        let val = src.target.value;
        isPlayerXTurn = val == 'x' ? true : false;
        changeMenu();
        gameIsStarted = true;
    }
})


// Making a move when a valid field is clicked.
// The timeout is too give some time to the program to draw the last 'x' or 'y' before showing the alert and refreshing.
buttons.forEach(btn => {
    btn.onclick = (src) => {
        if (src.target.innerText == "" && gameIsStarted) {
            makeAMove(src);
            setTimeout(() => {
                checkForEndGame();
                if (outcome != null) {
                    handleEndGame();
                }
              }, 10);
        } 
    }
})

// Once the beginning player is selected, remove the buttons and add a display that show's who's turn it is.
function changeMenu() {
    controlButtons.forEach(btn => {
        btn.style.display = "none";
    })
    whosTurnDisplay = document.createElement('p');
    whosTurnDisplay.innerText = (isPlayerXTurn ? "Turn: Player X" : "Turn: Player O");
    whosTurnDisplay.style.border = "2px solid white";
    whosTurnDisplay.style.padding = "5px";
    whosTurnDisplay.style.color = "white";
    whosTurnDisplay.style.color = "white";
    menu.appendChild(whosTurnDisplay);
}


function makeAMove(src) {
    let position = src.target.value;
    currentPlayerSymbol = isPlayerXTurn ? 'x' : 'o';
    board[position] = currentPlayerSymbol;
    src.target.innerText = currentPlayerSymbol;
    let set = isPlayerXTurn ? playerXState : playerOState;
    set.add(parseInt(position));
    isPlayerXTurn = !isPlayerXTurn;
    whosTurnDisplay.innerText = isPlayerXTurn ? "Turn: Player X" : "Turn: Player O";
}

function checkForEndGame() {
    console.log("Checking for end of game")
    for (const solution of WINNING_SOLUTIONS) {
        if (areAllElementsInSet(solution, playerXState)) {
            outcome = 'x';
            return;
        } else if (areAllElementsInSet(solution, playerOState)) {
            outcome = 'o';
            return;
        } else if (board.filter(e => e == "").length == 0) {
            outcome = 'd';
        }
    }
}

function areAllElementsInSet(array, set) {
    for (const element of array) {
      if (!set.has(element)) {
        return false;
      }
    }
    return true;
}

function handleEndGame() {
    let message = outcome == "x" ? "Player X wins!" : outcome == "o" ? "Player O wins!" : "Draw!";
    alert(message);
    window.location.reload();
}