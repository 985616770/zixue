interface Person {
  name: string
  age?: number
  [propName: string]: string | number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}
function sum() {
  let args: {
    [index: number]: number
    length: number
    callee: Function
  } = arguments
}

function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
interface Animal {
  name: string
}
interface Cat {
  name: string
  run(): void
}


