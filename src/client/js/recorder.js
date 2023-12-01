import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const videoPreview= document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
}

const fileDownload = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
};



const handleStart = ()=>{
	startBtn.innerText = "Stop Recording";
	startBtn.removeEventListener("click", handleStart);
	startBtn.addEventListener("click", handleStop);
	//start recording
	recorder = new MediaRecorder(stream, {mimeType: "video/webm"});
	//dataavailable event handler 등록 
	recorder.ondataavailable = (event) => {
		event.data; // -> file recorded
		videoFile = URL.createObjectURL(event.data);
		// preview 제거 
		videoPreview.srcObject = null;
		// 녹화된 video 재생 
		videoPreview.src = videoFile;
		videoPreview.loop = true;
		videoPreview.play();
};
	recorder.start();
};


const handleStop = ()=>{
	startBtn.innerText = "Download Recording";
	startBtn.removeEventListener("click", handleStop);
	startBtn.addEventListener("click", handleDownload);
	//stop recording
	recorder.stop();
	
};
const handleDownload = async ()=>{
    console.log("download 시작");
    startBtn.removeEventListener("click", handleDownload);
    startBtn.innerText = "Transcoding";
    startBtn.disabled = true;

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

    await ffmpeg.run("-i", files.input, "-r", "60", files.output);
    await ffmpeg.run(
        "-i",
        files.input,
        "-ss",
        "00:00:01",
        "-frames:v",
        "1",
        files.thumb
      );
    const mp4File = ffmpeg.FS("readFile", files.output);
    console.log(mp4File,",mp4")
    const thumbFile = ffmpeg.FS("readFile", files.thumb);
    console.log(thumbFile,",thumb")

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);
    
    fileDownload(mp4Url, "MyRecording.mp4");
    fileDownload(thumbUrl, "MyThumbnail.jpg");
  
    // ffmpeg.FS("unlink", files.input);
    // ffmpeg.FS("unlink", files.output);
    // ffmpeg.FS("unlink", files.thumb);
  
    // URL.revokeObjectURL(mp4Url);
    // URL.revokeObjectURL(thumbUrl);
    // URL.revokeObjectURL(videoFile);

    startBtn.disabled = false;
    startBtn.innerText = "Start Recording";
    startBtn.addEventListener("click", handleStart);
};

//preview 
const init= async ()=>{
	stream = await navigator.mediaDevices.getUserMedia(
{
	audio: true, 
	video: { width: 480, height: 250 }
});
	videoPreview.srcObject = stream;
	videoPreview.play(); 	
};
init();

startBtn.addEventListener("click", handleStart);