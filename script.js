// Get references to the HTML elements
const tracks = document.querySelectorAll('.track');
const audioPlayer = new Audio();
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeControl = document.getElementById('volumeControl');

let currentTrackIndex = 0;

// Function to load and play the selected track
function loadTrack(index) {
  const track = tracks[index];
  const songSrc = track.getAttribute('data-src');
  const songTitle = track.querySelector('h3').textContent;
  const artist = track.querySelector('p').textContent;
  const trackImg = track.querySelector('img').src;

  audioPlayer.src = songSrc;  // Set the audio source
  audioPlayer.load();         // Reload the track
  
  // Update player details
  document.getElementById('currentSongTitle').textContent = songTitle;
  document.getElementById('currentArtist').textContent = artist;
  document.getElementById('currentTrackImg').src = trackImg;

  // Play the track
  audioPlayer.play();
  playPauseBtn.textContent = '❚❚';
}

// Event listeners for track selection
tracks.forEach((track, index) => {
  track.addEventListener('click', () => {
    loadTrack(index);
  });
});

// Play/Pause button functionality
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '❚❚';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶';
  }
});

// Next track functionality
nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
});

// Previous track functionality
prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration > 0) {  // Prevent division by zero
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
  }

  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  durationDisplay.textContent = formatTime(audioPlayer.duration);
});

// Format time function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec < 10 ? '0' + sec : sec}`;
}

// Volume control functionality
volumeControl.addEventListener('input', () => {
  audioPlayer.volume = volumeControl.value / 100;
});

// When the track ends, automatically load the next track
audioPlayer.addEventListener('ended', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
});

// Initialize the first track
loadTrack(currentTrackIndex);
