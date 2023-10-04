const audio = document.querySelector('#audio')
const playIcon = document.querySelector('#play-icon')
const pauseIcon = document.querySelector('#pause-icon')
const seekbar = document.querySelector('.seekbar')
const currentSpan = document.querySelector('.current')
const afterSpan = document.querySelector('.after')
const disk = document.querySelector('.disk')


playIcon.addEventListener('click', () => {
  audio.load()
  audio.play()
  disk.style.animationPlayState = 'running'
  playIcon.style.display = 'none'
  pauseIcon.style.display = 'inline-block'
});

pauseIcon.addEventListener('click', () => {
  audio.pause()
  disk.style.animationPlayState = 'paused'
  pauseIcon.style.display = 'none'
  playIcon.style.display = 'inline-block'
})

audio.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audio.currentTime)
  const duration = Math.floor(audio.duration)
  seekbar.value = (currentTime / duration) * 100
  currentSpan.textContent = formatTime(currentTime)
  afterSpan.textContent = formatTime(duration - currentTime)
})

seekbar.addEventListener('input', () => {
  const duration = audio.duration;
  const seekTime = (seekbar.value / 100) * duration
  audio.currentTime = seekTime
})

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  seconds = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

