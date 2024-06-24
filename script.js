// Selecting elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Variables to keep track of time and timer state
let isRunning = false;   // Tracks if the stopwatch is currently running
let startTime = 0;       // The start time of the stopwatch
let elapsedTime = 0;     // The elapsed time when the stopwatch is paused
let intervalId;          // The ID of the setInterval function

// Function to format time
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = ms % 1000;

    // Pad with zeros
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    milliseconds = Math.floor(milliseconds / 10).toString().padStart(2, '0'); // Display 2 digits for ms

    return `${minutes}:${seconds}:${milliseconds}`;
}

// Function to update the display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Function to start or resume the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

// Function to stop the stopwatch
function stopStopwatch() {
    clearInterval(intervalId);
}

// Start or resume the stopwatch
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startStopwatch();
        startBtn.textContent = 'Resume';
        pauseBtn.disabled = false;
        isRunning = true;
    }
});

// Pause the stopwatch
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
        startBtn.textContent = 'Resume';
        isRunning = false;
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    stopStopwatch();
    elapsedTime = 0;
    updateDisplay();
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    isRunning = false;
});
