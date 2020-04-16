/* 继承本身就是一个抽象的话题，在JavaScript中继承更是一个复杂的话题，因为JavaScript想要实现继承有两种实现方式，分别是类式继承和原型式继承，每种实现的方式都需要采取不少措施，下面本人通过分析例子的方式讲解JavaScript中这个很重要的话题。 */
/* -- 类式继承 -- */
function Person(name) {
  this.name = name;
} //给这个超类的原型对象上添加方法 getName

