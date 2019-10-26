// 类
class Unlock {
  constructor(obj) {
    this.o = Object.assign({}, Unlock.DEFAULT, obj);
    this.n = this.o.n;
    this.width = this.o.width;
    this.height = this.o.height;

    this.init();
  }

  init() {
    this.initDom();
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');
    this.touchFlag = false;

    this.getRadius();
    this.renderCircle();

    this.bindEvent();

    console.log(this.arr, this.radius, this.canvas.width, this.o.password);
  }
  // 动态添加HTML元素
  initDom() {
    let div = document.createElement('div');
    div.innerHTML = '<h4 id="title">解锁</h4>';
    div.setAttribute(
      'style',
      'position: absolute;top:0;left:0;right:0;bottom:0;'
    );
    let canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.cssText =
      'background-color: #305066;display: inline-block;margin-top: 15px;';
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';
    canvas.setAttribute('id', 'canvas');
    div.appendChild(canvas);
    document.body.appendChild(div);
  }
  // 获取所有的圆的个数
  getRadius() {
    this.radius = this.width / (this.n * 4 + 2);
    this.arr = [];
    this.addPoint = [];
    this.restPoint = [];
    let index = 0;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        let obj = {
          x: 3 * this.radius + j * 4 * this.radius,
          y: 3 * this.radius + i * 4 * this.radius,
          index: ++index
        };

        this.arr.push(obj);
        this.restPoint.push(obj);
      }
    }
  }
  renderCircle() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.arr.forEach(value => {
      this.ctx.strokeStyle = '#CFE6FF';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(value.x, value.y, this.radius, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.stroke();
    });
  }
  bindEvent() {
    this.canvas.addEventListener(
      'touchstart',
      e => {
        let po = this.getPosition(e);

        this.arr.forEach((ele, i) => {
          if (
            Math.abs(ele.x - po.x) < this.radius &&
            Math.abs(ele.y - po.y) < this.radius
          ) {
            this.touchFlag = true;
            this.addPoint.push(ele);
            this.restPoint.splice(i, 1);
            return;
          }
        });
      },
      false
    );

    this.canvas.addEventListener('touchmove', e => {
      if (this.touchFlag) {
        this.update(this.getPosition(e));
      }
    });
    this.canvas.addEventListener('touchend', e => {
      if (this.touchFlag) {
        this.storePass(this.addPoint);
        // this.touchFlag = false;
        setTimeout(() => {
          this.getRadius();
          this.renderCircle();
        }, 200);
      }
    });
  }
  getPosition(e) {
    return {
      x: e.touches[0].clientX - this.canvas.offsetLeft,
      y: e.touches[0].clientY - this.canvas.offsetTop
    };
  }
  update(position) {
    // 重画
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.renderCircle();

    this.drawPoint();
    this.drawLine(position);

    this.restPoint.forEach((value, i) => {
      if (
        Math.abs(value.x - position.x) < this.radius &&
        Math.abs(value.y - position.y) < this.radius
      ) {
        this.drawPoint();
        this.addPoint.push(value);
        this.restPoint.splice(i, 1);
        return;
      }
    });
  }
  drawPoint() {
    this.addPoint.forEach(value => {
      this.ctx.fillStyle = '#CFE6FF';
      this.ctx.beginPath();
      this.ctx.arc(value.x, value.y, this.radius / 2, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fill();
    });
  }
  drawLine(position) {
    // 解锁轨迹
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(this.addPoint[0].x, this.addPoint[0].y);
    for (let i = 1; i < this.addPoint.length; i++) {
      const value = this.addPoint[i];
      this.ctx.lineTo(value.x, value.y);
    }
    this.ctx.lineTo(position.x, position.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  checkPass() {
    let p1 = this.o.password,
      p2 = '';
    this.addPoint.forEach((value, i) => {
      p2 += value.index;
    });
    console.log(p1, p2);
    return p1 === p2;
  }
  storePass() {
    if (this.checkPass()) {
      document.querySelector('#title').innerHTML = '解锁成功';
      this.drawStatusPoint('#0f0');
      this.addPoint = [];
      this.restPoint = [];
    } else {
      document.querySelector('#title').innerHTML = '解锁失败';
      this.drawStatusPoint('red');
    
    }
  }
  drawStatusPoint(type) {
    console.log('1111');
    this.addPoint.forEach(value => {
      this.ctx.strokeStyle = type;
      this.ctx.beginPath();
      this.ctx.arc(value.x, value.y, this.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
  }
}
Unlock.DEFAULT = {
  width: 300,
  height: 300,
  n: 3,
  password: '123'
};
var unlock = new Unlock({ n: 3 });
