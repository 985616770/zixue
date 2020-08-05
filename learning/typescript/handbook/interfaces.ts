function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }

printLabel(myObj)
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal
  [x: number]: Dog
}
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
  select() {}
}

class Location {}
