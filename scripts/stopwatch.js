document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let startTime;
    let elapsedTime = 0;
    let running = false;



    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    startBtn.style.display = '';
    resetBtn.style.display = 'none';


    function updateDisplay() {
        const t = elapsedTime + (running ? Date.now() - startTime : 0)
        const date = new Date(t);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
    function saveTimer(timerString) {
        chrome.storage.local.get("timers", (data) => {
            const timers = data.timers || [];
            timers.unshift(timerString); // add new one at top
            chrome.storage.local.set({ timers });
        });
    }

    function startTimer() {
        if (!running) {
            startTime = Date.now();
            timer = setInterval(updateDisplay, 10);
            running = true;
            startBtn.style.display = 'none';
            resetBtn.style.display = '';
            saveState(); // save on start
        }
    }

    function resetTimer() {
        clearInterval(timer);
        elapsedTime = 0;
        running = false;
        updateDisplay();
        startBtn.style.display = '';
        resetBtn.style.display = 'none';
        saveState(); // save on reset
    }


    function updateButtons() {
        startBtn.style.display = running ? 'none' : '';
        resetBtn.style.display = elapsedTime > 0 ? '' : 'none';
    }

    function saveState() {
        chrome.storage.local.set({
            stopwatch: {
                startTime: running ? startTime : null,
                elapsedTime,
                running
            }
        });
    }

    function restoreState() {
        chrome.storage.local.get('stopwatch', (data) => {
            if (data.stopwatch) {
                const state = data.stopwatch;
                elapsedTime = state.elapsedTime || 0;
                running = state.running || false;

                if (running && state.startTime) {
                    const now = Date.now();
                    const timeSinceStart = now - state.startTime;
                    elapsedTime += timeSinceStart;
                    startTime = now;
                    timer = setInterval(updateDisplay, 10);
                }

                updateDisplay();
                updateButtons();
                saveState();
            }
        });
    }

    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    restoreState();

});