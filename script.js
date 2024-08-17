let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return (hours < 10 ? '0' + hours : hours) + ':' +
           (minutes < 10 ? '0' + minutes : minutes) + ':' +
           (seconds < 10 ? '0' + seconds : seconds) + '.' +
           (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopBtn.innerHTML = 'Pause';
        running = true;
        resetBtn.disabled = true;
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerHTML = 'Start';
        running = false;
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    display.innerHTML = '00:00:00.00';
    startStopBtn.innerHTML = 'Start';
    running = false;
    laps.innerHTML = '';
    lapCount = 0;
    lapBtn.disabled = true;
}

function lap() {
    lapCount++;
    const lapTime = display.innerHTML;
    const li = document.createElement('li');
    li.innerHTML = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(li);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
