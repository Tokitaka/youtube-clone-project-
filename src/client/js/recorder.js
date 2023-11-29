const startBtn = document.getElementById("startBtn");
const videoPreview= document.getElementById("preview");

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

startBtn.addEventListener("click", handleStart);