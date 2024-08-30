window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resultTextarea = document.getElementById('result');
const statusText = document.getElementById('status');

let isRecording = false;

startBtn.addEventListener('click', () => {
    if (!isRecording) {
        recognition.start();
        statusText.textContent = 'Listening...';
        isRecording = true;
    }
});

stopBtn.addEventListener('click', () => {
    if (isRecording) {
        recognition.stop();
        statusText.textContent = 'Recognition stopped.';
        isRecording = false;
    }
});

recognition.addEventListener('result', (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    resultTextarea.value = transcript;
});

recognition.addEventListener('end', () => {
    if (isRecording) {
        recognition.start(); // Restart recognition for continuous listening
    }
});
