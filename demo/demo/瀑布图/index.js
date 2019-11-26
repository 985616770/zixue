class Multiply {
  constructor(option) {
    this.option = Object.assign({}, Multiply.DEFAULT, option);
    this.el = this.option.el;
    this.num = this.option.num;
    this.init();
  }
  init() {
    this.createDOMItem(this.num);
  }
  createDOMItem(num) {
    const frag = document.createDocumentFragment();
    let length = new Array(num).fill(num);
    length.forEach((item) => {
      let div = document.createElement('div');
      div.innerHTML = item;
      div.className = 'item';
      frag.appendChild(div);
    });
    this.el.appendChild(frag);
  }
}

Multiply.DEFAULT = {
  el: document.querySelector('#app'),
  num: 10,
};
