// const gameContainer = document.querySelector("#game-container");
const gameBoard = document.querySelector("#game-board");
const ctx = gameBoard.getContext("2d");
const scoreDisplay = document.querySelector("#scoreDisplay");
const resetButton = document.querySelector("#reset-button");
const GAME_WIDTH = gameBoard.width;
const GAME_HEIGHT = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const UNIT_SIZE = 20;

let timeBetweenTick = 100;
let timeOutID = null;
let running = false;
let velocityX = UNIT_SIZE;
let velocityY = 0;
let snake = [
    {x: 3 * UNIT_SIZE, y:0},
    {x: 2 * UNIT_SIZE, y:0},
    {x: 1 * UNIT_SIZE, y:0},
    {x: 0 * UNIT_SIZE, y:0}
];
let foodX = null;
let foodY = null;
let score = 0;

window.addEventListener("keydown", changeDirection);
window.addEventListener("keydown", (event) => {
    if (!running) {
        resetGame();
    }
    else if (event.key == "Enter") {
        resetGame();
    } 
});
resetButton.addEventListener("click", resetGame);


function gameStart() {
    running = true;
    scoreDisplay.textContent = score;
    createFood();
    nextTick();

}
function nextTick(){
    if (running) {
        timeOutID = setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, timeBetweenTick)
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0, GAME_WIDTH, GAME_HEIGHT)
};
function createFood(){
    function getRandomPosition(min, max) {
        return Math.floor(Math.random() * (max/ UNIT_SIZE)) * UNIT_SIZE;
    }
    foodX = getRandomPosition(0, GAME_WIDTH);
    foodY = getRandomPosition(0, GAME_HEIGHT);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);
};
function moveSnake(){
    const head = {x:(snake[0].x + velocityX), y:(snake[0].y + velocityY)};
    snake.unshift(head);
    if (head.x == foodX && head.y == foodY) {
        scoreDisplay.textContent = ++score;
        createFood()
        --timeBetweenTick;
        return;
    }
    snake.pop();
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(bodyPart => {
        ctx.fillRect(bodyPart.x, bodyPart.y, UNIT_SIZE, UNIT_SIZE);
        ctx.strokeRect(bodyPart.x, bodyPart.y, UNIT_SIZE, UNIT_SIZE)
    })
};
function changeDirection(event){
    const key = event.key;
    const goesLeft = velocityX == -UNIT_SIZE;
    const goesUp = velocityY == -UNIT_SIZE;
    const goesRight = velocityX == UNIT_SIZE;
    const goesDown = velocityY == UNIT_SIZE;

    // test 
    console.log("Key: " + key);

    if (key == "ArrowLeft" && !goesRight) {
        console.log("to the left")
        velocityX = -UNIT_SIZE;
        velocityY = 0;
    } else if (key == "ArrowUp" && !goesDown) {
        console.log("to the top");
        velocityX = 0;
        velocityY = -UNIT_SIZE;
    } else if (key == "ArrowRight" && !goesLeft) {
        console.log("to the right")
        velocityX = UNIT_SIZE;
        velocityY = 0;
    } else if (key == "ArrowDown" && !goesUp) {
        console.log("to the bottom")
        velocityX = 0;
        velocityY = UNIT_SIZE;
    }
};
function checkGameOver(){
    let x = snake[0].x;
    let y = snake[0].y;
    function isOut(x, y) {
        return ((x < 0) || (x >= GAME_WIDTH) || (y < 0 ) || (y >= GAME_HEIGHT));
    }
    function hasHitBody(x, y) {
        for(let i = 1; i < snake.length; i++) {
            if (snake[i].x == x && snake[i].y == y)
            return true;
        }
        return false;
    }
    if (isOut(x,y) || hasHitBody(x,y)) {
        console.log("Game OVer")
        running = false;
        displayGameOver();
    }
};
function displayGameOver(){
    ctx.fillStyle = "black";
    ctx.textAlign = "center"
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", GAME_WIDTH / 2, GAME_HEIGHT / 2);
};
function resetGame(){
    clearTimeout(timeOutID);
    timeBetweenTick = 100;
    score = 0;
    velocityX = UNIT_SIZE;
    velocityY = 0;
    snake = [
        {x: 3 * UNIT_SIZE, y:0},
        {x: 2 * UNIT_SIZE, y:0},
        {x: 1 * UNIT_SIZE, y:0},
        {x: 0 * UNIT_SIZE, y:0}
    ];
    gameStart();
};

//todo: fix bug: when game is reset, game runs faster (have a look at setTimeout).
//todo: center game over message. 