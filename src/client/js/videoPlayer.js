const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTIme = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

//global variable 
let volumeValue  = 0.5;
video.volume = volumeValue; // 실제 볼륨 , range - value 와 맞춰주기 

const handlePlayClick = () => {
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = () => {
    if(video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
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
};
const handleTimeUpdate = () => {
    currentTIme.innerText = formatTime(Math.floor(video.currentTime))+" ";
};
//비디오 시간이 변결될 떄 
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange); // value 변화 감지 
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);