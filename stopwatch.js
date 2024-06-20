let startStopButton = document.getElementById('startStop');
let lapButton = document.getElementById('lap');
let resetButton = document.getElementById('reset');
let display = document.getElementById('display');
let lapsContainer = document.getElementById('laps');

let timer;
let isRunning = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let lapCounter = 0;

function updateDisplay() {
    let formattedHours = String(hours).padStart(2, '0');
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');
    display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('stop');
    } else {
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }, 1000);
        startStopButton.textContent = 'Stop';
        startStopButton.classList.add('stop');
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCounter = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    startStopButton.textContent = 'Start';
    startStopButton.classList.remove('stop');
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        let lapTime = document.createElement('li');
        let formattedHours = String(hours).padStart(2, '0');
        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedSeconds = String(seconds).padStart(2, '0');
        lapTime.textContent = `Lap ${lapCounter}: ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        lapsContainer.appendChild(lapTime);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

updateDisplay();


