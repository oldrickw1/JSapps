let playerChoice = null;
let computerChoice = null;
const options = ["rock", "paper", "scissors"];
let result = null;

const table = new Map();
table.set("draw", ["rock-rock", "paper-paper", "scissors-scissors"])
table.set("player wins", ["rock-scissors", "paper-rock", "scissors-paper"])
table.set("computer wins", ["rock-paper", "paper-scissors", "scissors-rock"])

const score = new Map();
score.set("computer", 0);
score.set("player", 0);




const playerChoiceDisplay = document.querySelector("#player-choice");
const computerChoiceDisplay = document.querySelector("#computer-choice");
const resultDisplay = document.querySelector("#game-result");

const buttons = document.getElementsByClassName("option")

const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");

Array.from(buttons).forEach(btn => {
    btn.onclick = playRound;
})

function displayResult() {
    playerChoiceDisplay.textContent = "Player: " + playerChoice;
    computerChoiceDisplay.textContent = "Computer: " + computerChoice;
    resultDisplay.textContent = "Result: " + result;
    displayScore();
}

function makeComputerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    computerChoice = options[randomIndex];
    console.log("Computer choice: " + computerChoice)
}

function determineOutcome() {
    let outcomePair = playerChoice + "-" + computerChoice;

    table.forEach((arrayOfResults, key) => {
        arrayOfResults.forEach(resultOption => {
            if (resultOption == outcomePair) {
                result = key;
                console.log("result of game: " + result);
                return;
            }
        })
    })
}

function updateScore() {
    if (result === "player wins") {
        score.set("player", score.get("player") + 1);

    } else if (result === "computer wins") {
        score.set("computer", score.get("computer") + 1);
    }
}

function displayScore() {
    playerScoreDisplay.textContent = score.get("player");
    computerScoreDisplay.textContent = score.get("computer");
    console.log("Player score: " + score.get("player") + ",\nComputer score: " + score.get("computer"));
}

function playRound(event) {
    playerChoice = event.target.innerHTML.toLowerCase();
    console.log("Player choice: " + playerChoice);
    makeComputerChoice();
    determineOutcome();
    updateScore();
    displayResult();
}