const { createFFmpeg, fetchFile } = FFmpeg; // Importing from the FFmpeg library
const dropArea = document.getElementById('drop-area');
const fileElem = document.getElementById('fileElem');
const speedInput = document.getElementById('speed');
const blendInput = document.getElementById('blend');
const processBtn = document.getElementById('processBtn');
const outputVideo = document.getElementById('outputVideo');

let videoFile;

// Open file dialog when the drop area is clicked
dropArea.addEventListener('click', () => {
    fileElem.click();
});

// Prevent default behavior when dragging over the drop area
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('highlight');
});

// Remove highlight when dragging leaves the drop area
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

// Handle file drop
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('highlight');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        videoFile = files[0];
        console.log('File uploaded:', videoFile.name);
        document.getElementById('fileLabel').innerText = videoFile.name; // Show the file name
    }
});

// Handle file selection
fileElem.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        videoFile = files[0];
        console.log('File uploaded:', videoFile.name);
        document.getElementById('fileLabel').innerText = videoFile.name; // Show the file name
    }
});

// Process the video when the button is clicked
processBtn.addEventListener('click', async () => {
    if (!videoFile) {
        alert('Please upload a video file first.');
        return;
    }

    const speed = speedInput.value;
    const blend = blendInput.value;

    const ffmpeg = createFFmpeg({ log: true });
