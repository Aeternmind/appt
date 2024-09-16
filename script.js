let timerInterval;
let stopwatchInterval;
let isTimerRunning = false;
let isStopwatchRunning = false;
let time = 0;
let alarmSound;  // Variable para almacenar el sonido de alarma

// Mostrar Fecha y Hora Local
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    dateTimeElement.textContent = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);



function startTimer() {
    if (!isTimerRunning) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        time = hours * 3600 + minutes * 60 + seconds;
        
        if (time > 0) {
            isTimerRunning = true;
            timerInterval = setInterval(() => {
                time--;
                updateDisplay(time);
                if (time <= 0) {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    playAlarm();
                }
            }, 1000);
        }
    }
}

function startStopwatch() {
    if (!isStopwatchRunning) {
        isStopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            time++;
            updateDisplay(time);
        }, 1000);
    }
}

function stop() {
    clearInterval(timerInterval);
    clearInterval(stopwatchInterval);
    isTimerRunning = false;
    isStopwatchRunning = false;

    if (alarmSound) {
        alarmSound.pause();  // Pausar el audio si está reproduciéndose
        alarmSound.currentTime = 0;  // Reiniciar el tiempo del audio
    }
}

function reset() {
    stop();
    time = 0;
    updateDisplay(time);
}

function updateDisplay(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
}

function playAlarm() {
    alarmSound = new Audio('alarm.mp3');  // Inicializar el sonido de alarma
    alarmSound.play();
}