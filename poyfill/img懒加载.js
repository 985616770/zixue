let imgAll = document.querySelectorAll('.recommend-img')
let imgArray = [].slice.call(imgAll)
loadImg()
window.addEventListener('scroll', function () {
  clearTimeout(timer)
  timer = setTimeout(() => {
    loadImg()
    console.log('imgArray')
  }, 500)
})

function loadImg() {
  imgArray.forEach((item, i, arr) => {
    if (isVisible(item)) {
      item.src = item.dataset.src
      arr.splice(i, 1)
      i--
    }
  })
}
function isVisible(el) {
  let rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0
}
