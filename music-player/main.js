const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const timeDisplay = document.getElementById('time-display');
const sound = document.getElementById('sound');

// Song title
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

console.log(uppercaseFristLetter('song'));

// Uppercase first Letter
function uppercaseFristLetter(song) {
  return song.charAt(0).toUpperCase() + song.slice(1);
}

// Update song details
function loadSong(song) {
  title.innerText = uppercaseFristLetter(song);
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Update ProgressBar
function updateProgessBar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  let timeRemain = Math.floor(duration - currentTime);

  const minute = Math.floor(timeRemain / 60);
  const second =
    Math.floor(timeRemain % 60) < 10
      ? '0' + Math.floor(timeRemain % 60)
      : Math.floor(timeRemain % 60);

  timeDisplay.innerText = `${minute}:${second}`;
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// SetProgress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Eventlisteners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/Song Update
audio.addEventListener('timeupdate', updateProgessBar);

// Click on progressBar
progressContainer.addEventListener('click', setProgress);

//Song End
audio.addEventListener('ended', nextSong);

// Add volume control
// sound.addEventListener('input', e => {
//   audio.volume = e.target.value;
// });
