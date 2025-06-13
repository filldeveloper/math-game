const acertoAudio = new Audio('assets/audio/acerto.wav');
const erroAudio = new Audio('assets/audio/erro.wav');

export function tocarSomAcerto() {
    acertoAudio.currentTime = 0;
    acertoAudio.play();
}

export function tocarSomErro() {
    erroAudio.currentTime = 0;
    erroAudio.play();
}