 
  (function(graph) {
  
    function require(module){

      function localRequire(relativePath){
        return require(graph[module].dependencies[relativePath])
      };
      var exports = {};

      (function(require,exports,code) {
        eval(code)
      })(localRequire,exports,graph[module].code)
      console.log(exports)
      return exports;
    };
    require('./src/index.js.js');
  })({"./src/index.js":{"dependencies":{"./message.js":".\\src\\message.js"},"code":"\"use strict\";\n\nvar _message = require(\"./message.js\");\n\nconsole.log(_message.message);"},".\\src\\message.js":{"dependencies":{"./word.js":".\\src\\word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.message = void 0;\n\nvar _word = require(\"./word.js\");\n\nvar message = \"say \".concat(_word.word);\nexports.message = message;"},".\\src\\word.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = void 0;\nvar word = 'hello';\nexports.word = word;"}})
  