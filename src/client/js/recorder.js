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
	video: { width: 400, height: 200 }
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

const handleDownload = ()=>{
	const a = document.createElement("a");
	a.href = videoFile;
	a.download = "MyRecordingFileName.webm";
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