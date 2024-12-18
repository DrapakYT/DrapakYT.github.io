const { createFFmpeg, fetchFile } = FFmpeg; // Importing from the FFmpeg library
const dropArea = document.getElementById('drop-area');
const fileElem = document.getElementById('fileElem');
const speedInput = document.getElementById('speed');
const blendInput = document.getElementById('blend');
const processBtn = document.getElementById('processBtn');
const outputVideo = document.getElementById('outputVideo');

let videoFile;

dropArea.addEventListener('click', () => {
    fileElem.click();
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('highlight');
    videoFile = event.dataTransfer.files[0];
    if (videoFile) {
        console.log('File uploaded:', videoFile.name);
    }
});

processBtn.addEventListener('click', async () => {
    if (!videoFile) {
        alert('Please upload a video file first.');
        return;
    }

    const speed = speedInput.value;
    const blend = blendInput.value;

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));
    await ffmpeg.run('-i', 'input.mp4', '-filter:v', `tblend=all_mode=average:all_opacity=${blend / 100}`, '-filter:v', `setpts=${1 / speed}*PTS`, 'output.mp4');
    
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const videoURL = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    outputVideo.src = videoURL;
    outputVideo.load();
});
