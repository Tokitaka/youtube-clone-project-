import { createFFmpeg, fetchFile } from "@ffmepg/ffmpeg";
import { async } from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const videoPreview= document.getElementById("preview");

let stream;
let recorder;
let videoFile;

//preview 
const init= async ()=>{
	const stream = await navigator.mediaDevices.getUserMedia(
{
	audio: true, 
	video: { width: 480, height: 250 }
});
	videoPreview.srcObject = stream;
	videoPreview.play(); 	
};
init();

const handleStart = ()=>{
	startBtn.innerText = "Stop Recording";
	startBtn.removeEventListener("click", handleStart);
	startBtn.addEventListener("click", handleStop);
	//start recording
	recorder = new MediaRecorder(stream);
	//dataavailable event handler 등록 
	recorder.ondataavailable = (event) => {
		event.data; // -> file recorded
		const videoFile = URL.createObjectURL(event.data);
		// preview 제거 
		videoPreview.srcObject = null;
		// 녹화된 video 재생 
		videoPreview.src = videoFile;
		videoPreview.loop = true;
		videoPreview.play();
};
	recorder.start();
};

const handleDownload = async ()=>{
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    const mp4File = ffmpeg.FS("readFile", "output.mp4");

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

    const mp4Url = URL.createObjectURL(mp4Blob);

    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();
};

const handleStop = ()=>{
	startBtn.innerText = "Download Recording";
	startBtn.removeEventListener("click", handleStop);
	startBtn.addEventListener("click", handleDownload);
	//stop recording
	recorder.stop();
	
};

startBtn.addEventListener("click", handleStart);