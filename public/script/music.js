const audio = document.querySelector('#audio')
const playPauseButton = document.querySelector('.play-pause')
const seekbar = document.querySelector('.seekbar')
const currentSpan = document.querySelector('.current')
const afterSpan = document.querySelector('.after')

const disk = document.querySelector('.disk')

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    playPauseButton.textContent = 'Pause'
    disk.style.animationPlayState = 'running'
  } else {
    audio.pause()
    playPauseButton.textContent = 'Play'
    disk.style.animationPlayState = 'paused'
    
  }
})

audio.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audio.currentTime);
  const duration = Math.floor(audio.duration);
  seekbar.value = (currentTime / duration) * 100;
  currentSpan.textContent = formatTime(currentTime);
  afterSpan.textContent = formatTime(duration - currentTime);
})

seekbar.addEventListener('input', () => {
  const duration = audio.duration;
  const seekTime = (seekbar.value / 100) * duration;
  audio.currentTime = seekTime;
})

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
