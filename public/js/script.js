function searchVideo() {
    const videoLink = document.getElementById('videoLink').value;
    const errorMsg = document.getElementById('errorMsg');
    const options = document.getElementById('options');

    // Regex untuk validasi link YouTube
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    if (youtubeRegex.test(videoLink)) {
        errorMsg.textContent = '';
        options.style.display = 'block';
    } else {
        errorMsg.textContent = 'Pastikan link YouTube benar.';
        options.style.display = 'none';
    }
}

function download(format) {
    const videoLink = document.getElementById('videoLink').value;
    window.location.href = `/download?url=${encodeURIComponent(videoLink)}&format=${format}`;
}
