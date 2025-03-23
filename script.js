document.addEventListener("DOMContentLoaded", function () {
    const record = document.querySelector(".record");

    let audioContext;
    let audioElement;
    let track;
    let isPlaying = false;

    function setupAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioElement = new Audio("audio.mp3");
            audioElement.loop = true;

            track = audioContext.createMediaElementSource(audioElement);
            track.connect(audioContext.destination);
        }
    }

    record.addEventListener("click", function () {
        setupAudio();

        if (!isPlaying) {
            audioContext.resume().then(() => {
                audioElement.play();
                record.classList.add("spin"); // Начинаем вращение фото
                isPlaying = true;
            });
        } else {
            audioElement.pause();
            record.classList.remove("spin"); // Останавливаем вращение
            isPlaying = false;
        }
    });
});
