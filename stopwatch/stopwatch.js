let time = 0;
let myInterval;

const timeDisplay = document.querySelector("#time-display");

const startBtn = document.querySelector("#start-button");
const pauseBtn = document.querySelector("#pause-button");
const resetBtn = document.querySelector("#reset-button");

startBtn.onclick = () => {
    console.log("start");
    myInterval = setInterval(() => {
        time += 1;
        updateTime();
    }, 1000);
    
}

pauseBtn.onclick = () => {
    console.log("pause");
    clearInterval(myInterval);
    updateTime();
}

resetBtn.onclick = () => {
    console.log("reset");
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