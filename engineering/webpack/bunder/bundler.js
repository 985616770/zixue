const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 将代码分析为ast,且转义为对象传出
const modelAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      const newFile = '.\\' + path.join(dirname, node.source.value);
      dependencies[node.source.value] = newFile;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  return {
    filename,
    dependencies,
    code,
  };
};
// 分析所有的模块,对对象进行处理,易于使用
const makeDependenciesGraph = (entry) => {
  const entryModule = modelAnalyser(entry);
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    const { dependencies } = item;
    if (dependencies) {
      for (const j in dependencies) {
        if (dependencies.hasOwnProperty(j)) {
          const item = dependencies[j];
          graphArray.push(modelAnalyser(item));
        }
      }
    }
  }
  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  // console.log(graph);
  return graph;
};
// 生成代码
const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  return `
  
  (function(graph) {
  
    function require(module){

      function localRequire(relativePath){
        return require(graph[module].dependencies[relativePath])
      };
      var exports = {};

      (function(require,exports,code) {
        eval(code)
      })(localRequire,exports,graph[module].code)

      return exports;
    };
    require('${entry}')
  })(${graph})
  
  `;
};
const generateInfo = generateCode('./src/index.js');
console.log(generateInfo);
