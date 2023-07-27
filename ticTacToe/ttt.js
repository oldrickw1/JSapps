const controlButtons = document.querySelectorAll(".control-button");
const buttons = document.querySelectorAll(".field");
const menu = document.querySelector(".menu");
const WINNING_SOLUTIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = null;
let running = false;
let whosTurnDisplay = null;

setUpControlButtons();
setUpBoard();

function setUpControlButtons() {
    controlButtons.forEach(btn => btn.addEventListener("click", startGame));
}

function startGame(){
    currentPlayer = this.value;;
    changeMenu();
    running = true;
}
function setUpBoard(){
    buttons.forEach(btn => btn.addEventListener("click", cellClicked));
}

function cellClicked() {
    if (this.innerText == "" && running) {
        makeAMove(this);
        checkForEndGame();
    }
}

function changeMenu() {
    controlButtons.forEach(btn => {
        btn.style.display = "none";
    })
    menu.appendChild(getDisplay());
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'x') ? 'o' : 'x';
    whosTurnDisplay.innerText = `${currentPlayer}'s turn`;
}

function makeAMove(btn) {
    let position = btn.value;
    board[position] = currentPlayer;
    btn.innerText = currentPlayer;
}

function checkForEndGame() {
    for (const solution of WINNING_SOLUTIONS) {
        let a = board[solution[0]];
        let b = board[solution[1]];
        let c = board[solution[2]];
        
        if(!(a == "") && (a == b && b == c)){
            handleEndGame(false);
            return;
        }
    } 
    if (!board.includes("")) {
        handleEndGame(true); 
    } else {
        changePlayer();
    }
}

function handleEndGame(isDraw) {
    message = isDraw ? "Draw!" : `Player ${currentPlayer} wins!`;
    setTimeout(()=> {
        alert(message);
        window.location.reload();
    }, 100);
}

function getDisplay() {
    whosTurnDisplay = document.createElement('p');
    whosTurnDisplay.innerText = `${currentPlayer}'s turn`;
    whosTurnDisplay.style.border = "2px solid white";
    whosTurnDisplay.style.padding = "5px";
    whosTurnDisplay.style.color = "white";
    whosTurnDisplay.style.color = "white";
    return whosTurnDisplay;
}