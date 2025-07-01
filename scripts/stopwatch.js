document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let startTime;
    let elapsedTime = 0;
    let running = false;



    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    startBtn.style.display = '';
    resetBtn.style.display = 'none';
    stopBtn.style.display = 'none';


    function updateDisplay() {
        const t = elapsedTime + (running ? Date.now() - startTime : 0)
        const date = new Date(t);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function startTimer() {
        if (!running) {
            startTime = Date.now();
            timer = setInterval(updateDisplay, 10);
            running = true;
            startBtn.style.display = 'none';
            resetBtn.style.display = '';
            stopBtn.style.display = '';
        }
    }

    function stopTimer() {
        if (running) {
            elapsedTime += Date.now() - startTime;
            clearInterval(timer);
            running = false;
            startBtn.style.display = '';
            stopBtn.style.display = 'none';
        }
    }

    function resetTimer() {
        clearInterval(timer);
        elapsedTime = 0;
        running = false;
        updateDisplay();
        startBtn.style.display = '';
        resetBtn.style.display = 'none';
        stopBtn.style.display = 'none';
    }
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    updateDisplay(); // initialize
});