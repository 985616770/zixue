const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

interface Alarm {
  alert():void
}

class Car implements Alarm{
  alert(){
    console.log('Car is opening');

  }
}
