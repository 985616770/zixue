/*
 * @Author: xuanji
 * @Date: 2019-08-20 16:53:24
 * @LastEditors: xuanji
 * @LastEditTime: 2019-08-20 17:30:00
 * @Description: file content0;
 */
let a = 20;
const b = 30;
var c;
function multiply(e, f) {
  var g = 20;
  return e * f * g;
}

c = multiply(20, 30);


/* GlobalExectionContext = {





  LexicalEnvironment: {
      EnviromentRecord: {
      Type: "Object",
//  在这里绑定标识符
    a: < uninitialized>,
    b: < uninitialized >,
    multiply: < func >
          }
          outer: < null >
          ThisBind: <Global Object>,
            },

    VariableEnvironment : {
              EnviromentRecord: {
              Type: "Object"
// 在这里绑定标识符
c: undefined,
}
outer: < null >
              }
} */

/*
FunctionExectionContext = {


  LexicalEnvironment: {
    EnvironmentRecord : {
      Type:"Declarative",

      Arguments: {0:20,1: 30, length: 2},

    },
    outer: < GlobalLexicalEnvironment>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
    Type: "Declarative",
      // 在这里绑定标识符
        g: undefined
    },
    outer: < GlovalLexicalEnvironment>
    ThisBind: < Gloval Object >,
  }

}

*/