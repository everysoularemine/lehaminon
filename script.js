document.addEventListener("DOMContentLoaded", function () {
    const record = document.querySelector(".record");

    let audioContext;
    let audioElement;
    let track;
    let gainNode;
    let isPlaying = false;

    function setupAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioElement = new Audio("audio.mp3");
            audioElement.loop = true;

            track = audioContext.createMediaElementSource(audioElement);
            gainNode = audioContext.createGain();
            gainNode.gain.value = 0; // Начинаем с нулевой громкости

            track.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Увеличиваем громкость плавно после старта
            audioElement.addEventListener("canplaythrough", () => {
                gainNode.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + 2);
            });
        }
    }

    record.addEventListener("click", function () {
        if (!isPlaying) {
            setupAudio();
            audioContext.resume().then(() => {
                audioElement.play();
                record.classList.add("spin"); // Начинаем вращение фото
                isPlaying = true;
            });
        }
    });
});
