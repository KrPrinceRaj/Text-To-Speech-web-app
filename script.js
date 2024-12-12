let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');
let stopButton = document.getElementById('stop-button');
let textInput = document.querySelector('textarea');
let speedInput = document.getElementById('speed');
let voiceSelect = document.querySelector('select');

let speech = new SpeechSynthesisUtterance();
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.add(option);
    });
};

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

playButton.addEventListener('click', () => playText(textInput.value));
pauseButton.addEventListener('click', pauseText);
stopButton.addEventListener('click', stopText);

speedInput.addEventListener('input', () => {
    speech.rate = speedInput.value;
});

function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }
    if (speechSynthesis.speaking) return;
    speech.text = text;
    speech.rate = speedInput.value || 1;
    speechSynthesis.speak(speech);
}

function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
}

document.querySelector('.row button').addEventListener('click', () => {
    speech.text = textInput.value;
    speech.rate = speedInput.value || 1;
    window.speechSynthesis.speak(speech);
});
