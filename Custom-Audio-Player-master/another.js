var songs = ["Song1.mp3","Song2.mp3","Song3.mp3"];

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');


var song = new Audio();
var currentSong = 0;

window.onload = loadSong;

function loadSong () {
	song.src = songs[currentSong];
    songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
    if (RepeatPlayback == True) {
        currentSong = (currentSong >= songs.length - 1) ? currentSong = -1 : currentSong;    
    }
    
	nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1];
	song.playbackRate = 1;
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider () {
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c);
	if(song.ended){
		next();
	}
}


function convertTime (secs) {
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;
	return (min + ":" + sec);
}

function showDuration () {
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max", d);
	duration.textContent = convertTime(d);
}

function playOrPauseSong (img) {
	song.playbackRate = 1;
	if(song.paused){
		song.play();
		img.src = "pause.png";
	}else{
		song.pause();
		img.src = "play.png";
	}
}

function next(){
    currentSong++;
    // currentSong = currentSong + 1;
    currentSong = (currentSong >= songs.length) ? currentSong = 0 : currentSong;
    loadSong();
    console.log(currentSong)
}

function previous () {
	currentSong--;
	currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
	loadSong();
}

function seekSong () {
	song.currentTime = songSlider.value;
	currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume () {
	song.volume = volumeSlider.value;
}

// function increasePlaybackRate () {
// 	songs.playbackRate += 0.5;
// }

// function decreasePlaybackRate () {
// 	songs.playbackRate -= 0.5;
// }


