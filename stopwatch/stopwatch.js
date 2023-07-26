let time = 0;
let myInterval;
let isTimer = false;
let isRunning = false;

const timeDisplay = document.querySelector("#time-display");

const startBtn = document.querySelector("#start-button");
const pauseBtn = document.querySelector("#pause-button");
const resetBtn = document.querySelector("#reset-button");

const modusToggleBtn = document.querySelector("#modus-toggle-button")

modusToggleBtn.onclick = () => {
    if (isTimer) {
        modusToggleBtn.textContent = "Timer";
        isTimer = false;
        const inputDisplay = document.createElement("input");
        inputDisplay.setAttribute("type", "text");
        inputDisplay.setAttribute("value", "--:--:--")
        document.querySelector("#time-display") = timeDisplay;
        // timeDisplay.

    } else {
        modusToggleBtn.textContent = "Stopwatch";
        isTimer = true;
       
        document.querySelector("#time-display");
    }
}

startBtn.onclick = () => {
    if (!isRunning) {
        isRunning = true;
        myInterval = setInterval(() => {
            time += 1;
            updateTime();
        }, 1000);
    }
}

pauseBtn.onclick = () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(myInterval);
        updateTime();
    }
}

resetBtn.onclick = () => {
    isRunning = false;
    clearInterval(myInterval);
    time = 0;
    updateTime();
}

const updateTime = () => timeDisplay.textContent = fortmatTime(time);

function fortmatTime(time) {
    let hours = Math.floor(time / 3600);
    let mins = Math.floor((time % 3600) / 60);
    let secs = time % 60;

    return `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`
}