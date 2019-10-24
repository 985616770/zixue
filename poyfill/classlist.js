var CC = {
  getClass(ele) {
    console.log();
    return ele.className.replace(/\s+/, ' ').split(' ');
  },
  hasClass(ele, cls) {
    return -1 < ` ${ele.className} `.indexOf(` ${cls} `);
  },
  addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) {
      ele.className += ` ${cls}`;
    }
  },
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp(`(\\s|^)${cls}(\\s|$)`, 'gi');
      ele.className = ele.className.replace(reg, ' ');
      console.log(reg);
    }
  },
  toggleClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      this.removeClass(ele, cls);
    } else {
      this.addClass(ele, cls);
    }
  }
};
