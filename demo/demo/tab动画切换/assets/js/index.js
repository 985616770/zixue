// 1. 对图片进行分类
// 2. 生成dom元素
// 3. 绑定事件
// 4. 显示到页面上

// 公用方法
const methods = {
  appendChild(parent, ...children) {
    children.forEach(el => {
      parent.appendChild(el);
    });
  },
  $(ele, root = document) {
    return root.querySelector(ele);
  },
  $$(ele, root = document) {
    return root.querySelectorAll(ele);
  },
  createElement(ele) {
    return document.createElement(ele);
  }
};
(function(window, document) {
  let Img = class Img {
    constructor(option) {
      this._init(option);
      this._createElement();
      this._show();
      this._bind();
    }
    _init({ data, initType, parasitifer }) {
      this.types = ['all']; // 所有的类型
      this.all = []; // 所有的figure元素
      this.classified = { all: [] }; // 已分类的数据
      this.curType = initType; // 当前显示的类型
      this.parasitifer = methods.$(parasitifer); // 选择显示的地方
      this.imgContainer = null; // img的主容器
      this.wrap = null; // 主容器
      this.typeBtnEls = null; // 所有的分类按钮
      this.figures = null; // 页面显示的dom pic
      this._classify(data); // 分类
    }
    // 分类
    _classify(data) {
      let srcs = [];
      // 对数据进行 循环 获取`分类` `类型` `图片地址(地址相同则认为是同一张图片)`
      data.forEach(({ title, type, alt, src }) => {
        // 判断类型 是否存在 (否创建)
        if (!this.types.includes(type)) {
          this.types.push(type);
        }
        // 判断classified中是否存在这个类型,不存在则创建
        if (!Object.keys(this.classified).includes(type)) {
          this.classified[type] = [];
        }
        // 判断srcs中是否存在该图片地址
        if (!srcs.includes(src)) {
          /**
           * 1. 图片没有生成过
           * 2 .生成图片
           * 3. 添加图片 到对应分类
           */
          srcs.push(src);
          // 创建 `figure` `img` `figcaption`
          let figure = methods.createElement('figure');
          let img = methods.createElement('img');
          let figcaption = methods.createElement('figcaption');

          // 设置显示到页面的
          img.src = src;
          img.setAttribute('alt', alt);
          figcaption.innerText = title;
          // 将 figcaption 和 img 传入 figure 中
          methods.appendChild(figure, img, figcaption);

          // 添加所有的figure元素
          this.all.push(figure);
          // 在分类数组中存放 `图片的索引`
          this.classified[type].push(this.all.length - 1);
        } else {
          /**
           * 1.  在this.all中查找图片地址,判断是否相同的图片
           * 2.  由于图片是依次循环 且没有重复的图片 srcs === all 在图片索引上
           */
          // 存储索引
          this.classified[type].push(srcs.findIndex(ele => ele === src));
        }
      });
    }
    _createElement() {
      // 创建按钮
      let typesBtn = [];
      for (const type of this.types) {
        // 通过三元表达式添加active样式
        typesBtn.push(`
        <li class="__Img__classify__type-btn ${
          type === this.curType ? '__Img__type-btn-active' : ''
        }">${type}</li>
        `);
      }
      // 整体模板
      let template = `
      <ul class="__Img__classify">
          ${typesBtn.join('')}
      </ul>
      <div class="__Img__img-container"></div>
      `;

      // 整体容器
      let wrap = methods.createElement('div');
      wrap.className = '__Img__container';
      wrap.innerHTML = template;

      // 图片容器
      this.imgContainer = methods.$('.__Img__img-container', wrap);

      // 在图片容器 初始化 传入配置的所选中的类型的图片
      methods.appendChild(
        this.imgContainer,
        ...this._getImgsByType(this.curType)
      );

      this.wrap = wrap;
      this.typeBtnEls = [...methods.$$('.__Img__classify__type-btn', wrap)];
      this.figures = Array.from(methods.$$('figure', wrap));

      // 遮罩层
      let overlay = methods.createElement('div');
      overlay.className = '__Img__overlay';
      overlay.innerHTML = `
      <div class="__Img__overlay-prev-btn"></div>
      <div class="__Img__overlay-next-btn"></div>
      <img src="/assets/images/1.jpg" alt="">
      `;
      methods.appendChild(this.wrap, overlay);
      this.overlay = overlay;
      this.previewImg = methods.$('img', overlay); // 选择遮罩层的img元素

      // 计算每个figure的位置
      this._calcPosition(this.figures);
    }
    // 根据分类获取figure
    _getImgsByType(type) {
      // two condition
      // 1. all
      // 2. 获取图片 根据this.all 的索引 获取图片
      return type === 'all'
        ? [...this.all]
        : this.classified[type].map(item => this.all[item]);
    }
    // 找出上次 和 这次 相同的图片
    _diff(prevImgs, nextImgs) {
      let diffArr = [];
      // return [...new Set([...prevImgs, ...nextImgs])];

      prevImgs.forEach((src1, index1) => {
        let index2 = nextImgs.findIndex(src2 => src1 === src2);
        if (index2 !== -1) {
          diffArr.push([index1, index2]);
        }
      });
      return diffArr;
      // [[1,2],[3,2]]
    }
    // ***** important part
    _bind() {
      // 是否切换中
      let canChange = true;
      // 当前遮罩层的默认的图片索引
      let curShowImgIndex = 0;
      methods
        .$('.__Img__classify', this.wrap)
        .addEventListener('click', ({ target }) => {
          if (target.nodeName !== 'LI') return;
          if (!canChange) return;
          canChange = false;

          // 获取类型
          const { innerText: type } = target;
          // 获取根据类型 所需要生成的图片
          const els = this._getImgsByType(type);

          // 当前显示的图片
          let prevImgs = this.figures.map(
            figure => methods.$('img', figure).src
          );
          // 点击后将显示的图片
          let nextImgs = els.map(figure => methods.$('img', figure).src);

          // 显示 和 将显示 的相同的图片
          const diffArr = this._diff(prevImgs, nextImgs);

          // 通过遍历 将重复的图片 从当前的图片数组中删除,不会在渲染
          diffArr.forEach(([, i2]) => {
            this.figures.every((figure, index) => {
              let src = methods.$('img', figure).src;

              if (src === nextImgs[i2]) {
                this.figures.splice(index, 1);
                return false;
              }
              return true;
            });
          });
          // 计算每个figure的位置
          this._calcPosition(els);

          // 将显示的图片
          let needAppendEls = [];

          // 有相同的就只添加新的,否则直接进入全部重新渲染
          if (diffArr.length) {
            let nextElsIndex = diffArr.map(([, i2]) => i2);

            // 遇到相同的不处理,只添加相同的
            els.forEach((figure, index) => {
              if (!nextElsIndex.includes(index)) needAppendEls.push(figure);
            });
          } else {
            needAppendEls = els;
          }

          // 将删除后的 figure 隐藏 (删除的figure不受影响)
          this.figures.forEach(el => {
            el.style.transform = `scale(0,0) translate(0,100%)`;
            el.style.opacity = `0`;
          });

          // 添加新的figure
          methods.appendChild(this.imgContainer, ...needAppendEls);

          // 显示新的图片
          requestAnimationFrame(() => {
            els.forEach(el => {
              el.style.transform = `scale(1,1) translate(0,0)`;
              el.style.opacity = `1`;
            });
            // 显示新的图片,并把 `将显示图片` 赋值 `给当前显示图片 `
            requestAnimationFrame(() => {
              this.figures.forEach(figure => {
                this.imgContainer.removeChild(figure);
              });
              this.figures = els;
              // 可以继续点击 类型了
              canChange = true;
            });
          });

          // 添加active样式
          this.typeBtnEls.forEach(item => {
            item.classList.remove('__Img__type-btn-active');
          });
          target.classList.add('__Img__type-btn-active');
        });

      this.imgContainer.addEventListener(
        'click',
        ({ target }) => {
          if (target.nodeName !== 'FIGURE' && target.nodeName !== 'FIGCAPTION')
            return;
          if (target.nodeName === 'FIGCAPTION') {
            target = target.parentNode;
          }
          const src = methods.$('img', target).src;
          curShowImgIndex = this.figures.findIndex(
            figure => src === methods.$('img', figure).src
          );

          this.previewImg.src = src;

          this.overlay.style.display = 'flex';
          requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
          });
        },
        true
      );
      this.overlay.addEventListener('click', () => {
        this.overlay.style.opacity = `0`;
        this.overlay.style.display = 'none';
      });
      methods
        .$('.__Img__overlay-prev-btn', this.overlay)
        .addEventListener('click', e => {
          e.stopPropagation();
          curShowImgIndex =
            curShowImgIndex === 0
              ? this.figures.length - 1
              : curShowImgIndex - 1;
          this.previewImg.src = methods.$(
            'img',
            this.figures[curShowImgIndex]
          ).src;
        });
      methods
        .$('.__Img__overlay-next-btn', this.overlay)
        .addEventListener('click', e => {
          e.stopPropagation();
          curShowImgIndex =
            curShowImgIndex === this.figures.length - 1
              ? 0
              : curShowImgIndex + 1;
          this.previewImg.src = methods.$(
            'img',
            this.figures[curShowImgIndex]
          ).src;
        });
    }
    // show DOM
    _show() {
      // 显示默认的样式
      methods.appendChild(this.parasitifer, this.wrap);
      requestAnimationFrame(() => {
        this.figures.forEach(el => {
          el.style.transform = `scale(1,1) translate(0,0)`;
          el.style.opacity = `1`;
        });
      });
    }
    // 计算每个figure的位置
    _calcPosition(figures) {
      // everyone figure `left` `top`
      figures.forEach((figure, index) => {
        figure.style.top =
          parseInt(index / 4) * 140 + parseInt(index / 4) * 15 + 'px';
        // 让图片从上部 缩放显示
        figure.style.transform = `scale(0,0) translate(0,-100%)`;
        figure.style.left =
          parseInt(index % 4) * 240 + parseInt(index % 4) * 15 + 'px';
      });

      // this.imgContainer.style.height
      let len = Math.ceil(figures.length / 4);
      this.imgContainer.style.height = len * 140 + (len - 1) * 15 + 'px';
    }
  };
  // 暴露方法
  window.$Img = Img;
})(window, document);
