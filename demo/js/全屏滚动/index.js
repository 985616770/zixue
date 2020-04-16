const $ = ele => document.querySelector(ele)
const $$ = ele => document.querySelectorAll(ele)
const debounce = (action, delay) => {
  let last
  return function (arg) {
    clearTimeout(last)
    last = setTimeout(() => {
      action(arg)
    }, delay)
  }
}
const throttle = (action, delay) => {
  let last = 0
  return function (args) {
    let curr = +new Date()
    if (curr - last > delay) {
      action(args)
      last = curr
    }
  }
}

/**
 * 滚轮事件的兼容监听函数
 */
;(function (window, document) {
  let prefix = '',
    _addEventListener,
    onwheel,
    support

  // 检测可用模式
  if (window.addEventListener) {
    _addEventListener = 'addEventListener'
  } else {
    _addEventListener = 'attachEvent'
    prefix = 'on'
  }

  // 检测可用wheel事件
  support =
    'onwheel' in document.createElement('div')
      ? 'wheel' // 各个厂商的高版本浏览器都支持"wheel"
      : document.onmousewheel !== undefined
      ? 'mousewheel' // Webkit 和 IE一定支持"mousewheel"
      : 'DOMMouseScroll' // 低版本firefox

  window.addWheelListener = function (elem, callback, useCapture) {
    _addWheelListener(elem, support, callback, useCapture)

    // 低版本火狐
    if (support === 'DOMMouseScroll') {
      _addWheelListener(elem, 'MozMousePixelScroll', callback, useCapture)
    }
  }

  function _addWheelListener(elem, eventName, callback, useCapture) {
    elem[_addEventListener](
      prefix + eventName,
      support === 'wheel'
        ? callback
        : function (originalEvent) {
            !originalEvent && (originalEvent = window.event)

            // create a normalized event object
            const event = {
              // keep a ref to the original event object
              originalEvent: originalEvent,
              target: originalEvent.target || originalEvent.srcElement,
              type: 'wheel',
              deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
              deltaX: 0,
              deltaZ: 0,
              preventDefault() {
                originalEvent.preventDefault ? originalEvent.preventDefault() : (originalEvent.returnValue = false)
              }
            }

            // calculate deltaY (and deltaX) according to the event
            if (support === 'mousewheel') {
              event.deltaY = (-1 / 40) * originalEvent.wheelDelta
              // Webkit also support wheelDeltaX
              originalEvent.wheelDeltaX && (event.deltaX = (-1 / 40) * originalEvent.wheelDeltaX)
            } else {
              event.deltaY = originalEvent.detail
            }

            // it's time to fire the callback
            return callback(event)
          },
      useCapture || false
    )
  }
})(window, document)
/**
 * 全屏滚动类
 */
class PureFullPage {
  constructor(elem, list, delay) {
    this.elem = elem
    this.listLength = list.length
    this.viewHeight = ''
    this.currentPosition = 0
    this.delay = delay
    this.navDots = null
    this.index = 0
  }
  getWheelDelta(event) {
    if (event.wheelDelta) {
      return event.wheelDeltaY
    } else {
      // 兼容火狐
      return -event.deltaY
    }
  }
  pcWheelListener() {
    window.addWheelListener(document, throttle(this.scrollMouse.bind(this), this.delay))
  }
  mobileWheelListener() {
    // 手指接触屏幕
    let startY
    document.addEventListener(
      'touchstart',
      throttle(event => {
        startY = event[0].touches[0].pageY
      }, this.delay),
      { passive: false }
    )
    //手指离开屏幕
    document.addEventListener(
      'touchend',
      throttle(event => {
        let endY = event[0].changedTouches[0].pageY
        if (endY - startY < 0) {
          // 手指向上滑动，对应页面向下滚动
          this.goDown()
        } else {
          // 手指向下滑动，对应页面向上滚动
          this.goUp()
        }
      }, this.delay),
      { passive: false }
    )
    document.addEventListener(
      'touchmove',
      throttle(event => {
        event[0].preventDefault()
      }, this.delay),
      { passive: false }
    )
  }
  // 鼠标滚动逻辑（全屏滚动关键逻辑）
  scrollMouse(event) {
    let delta = this.getWheelDelta(event)
    console.log(delta)

    // delta < 0，鼠标往前滚动，页面向下滚动
    if (delta < 0) {
      this.goDown()
    } else {
      this.goUp()
    }
  }
  goDown() {
    if (-this.elem.offsetTop <= this.viewHeight * (this.listLength - 2)) {
      this.currentPosition = this.currentPosition - this.viewHeight
      this.index++
      this.refresh(this.currentPosition)
    }
  }
  goUp() {
    if (-this.elem.offsetTop >= this.viewHeight) {
      this.currentPosition = this.currentPosition + this.viewHeight
      this.index--
      this.refresh(this.currentPosition)
    }
  }
  refresh(location) {
    this.elem.style.top = `${location}px`
    // 更改样式
    this.navDots.forEach(el => {
      el.classList.remove('active')
    })
    this.navDots[this.index].classList.add('active')
  }
  // 创建右侧点式导航
  createNav() {
    const nav = document.createElement('div')
    nav.className = 'nav'
    this.elem.appendChild(nav)
    // 有几页，显示几个点
    for (let i = 0; i < this.listLength; i++) {
      nav.innerHTML += '<p class="nav-dot"><span></span></p>'
    }
    const navDots = $$('.nav-dot')
    this.navDots = Array.prototype.slice.call(navDots)
    // 添加初始样式
    this.navDots[0].classList.add('active')
    // 添加点式导航点击事件
    this.navDots.forEach((el, i) => {
      el.addEventListener('click', event => {
        // 页面跳转
        this.currentPosition = -(i * this.viewHeight)
        this.index = i
        this.refresh(this.currentPosition)
      })
    })
  }
  init() {
    this.viewHeight = document.documentElement.clientHeight
    this.elem.style.height = `${this.viewHeight}px`
    this.createNav()
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      //移动端
      this.mobileWheelListener()
    } else {
      this.pcWheelListener()
    }
  }
}

const newFullPage = new PureFullPage($('#pureFullPage'), $$('#pureFullPage > .page'), 400)
newFullPage.init()
