const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

// 逻辑
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}
// 事件
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

// 逻辑
function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}
// 事件
skipButtons.forEach(button => button.addEventListener('click', skip))

function handleRangeUpdate() {
  video[this.name] = this.value
}

//遍历 ranges 给两个滑动条都绑定事件
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

video.addEventListener('timeupdate', handleProgress)

// 根据点击位置设置播放时间
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

// 点击事件监听
progress.addEventListener('click', scrub)

let mousedown = false

// 鼠标在 progress 上移动时更新进度
progress.addEventListener('mousemove', e => mousedown && scrub(e))

// 鼠标按下改变标志
progress.addEventListener('mousedown', () => (mousedown = true))

// 鼠标抬起恢复标志
progress.addEventListener('mouseup', () => (mousedown = false))
