const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTIme = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

//global variable 
let ctrStopTimeout = null;
let ctrLeaveTimeout = null;
let volumeValue  = 0.5;
video.volume = volumeValue; // 실제 볼륨 , range - value 와 맞춰주기 

const handlePlayClick = () => {
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = () => {
    if(video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange =  (event) => {
    const {
        target: {value},
    } = event;
    console.log(event.target.value);
    if(video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
};
const formatTime = (seconds) => {
    return new Date(seconds*1000).toISOString().substring(14,19); // return 안해도 되나? 
};
const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration)); //ceil
    timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
    currentTIme.innerText = formatTime(Math.floor(video.currentTime))+" ";
    timeline.value = Math.floor(video.currentTime);
}
const handleTimelineChange = (event) => {
    const {
        target: {value},
    } = event;
    video.currentTime = value;
};
const handleFullScreen = () => {
    const fullscreen  = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
    fullScreenIcon.classList = fullscreen ? "fas fa-expand" : "fas fa-compress";

};
const hideControls = () => videoControls.classList.remove("showing");
// mouse 움직일 때 control 보여주기 
const handleMouseMove = () => { 
    if(ctrLeaveTimeout){
    clearTimeout(ctrLeaveTimeout); 
    controlsTimeout = null;
    }
    if(ctrStopTimeout){
        clearTimeout(ctrStopTimeout); 
        controlsTimeout = null;
        }
    videoControls.classList.add("showing");
    ctrStopTimeout = setTimeout(hideControls,2000);
};
const handleMouseLeave = () => {
    ctrLeaveTimeout = setTimeout(hideControls,2000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange); // value 변화 감지 
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown",handlePlayClick);

