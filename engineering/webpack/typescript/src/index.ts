import * as _ from 'lodash';

class A {
  name: string;
  constructor(message: string) {
    this.name = message;
  }
  say(): string {
    return _.join([1, 2, 3, 'ss'], '**');
  }
}

let xio = new A('xx');
xio.say();
