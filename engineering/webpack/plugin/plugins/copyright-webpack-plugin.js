class Copy {
  apply(complier) {
    complier.hooks.emit.tapAsync('Copy', (complication, cb) => {
      debugger
      complication.assets['copyright.txt'] = {
        source: function() {
          return '123456';
        },
        size: function() {
          return 6;
        },
      };
      cb();
    });
  }
}

module.exports = Copy;
