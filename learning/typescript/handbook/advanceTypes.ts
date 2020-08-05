interface Person {
  name: string
  age: number
}

type PersonPartial = Partial<Person>
type ReadonlyPerson = Readonly<Person>
type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean }
function f() {
  console.log('f(): evaluated')
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called')
  }
}

function g() {
  console.log('g(): evaluated')
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called')
  }
}

class C {
  @f()
  @g()
  method() {}
}
