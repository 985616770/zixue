// function minxin(sourceObj, targetObj) {
//   for (const key in sourceObj) {
//     if (!(key in targetObj)) {
//       targetObj[key] = sourceObj[key];
//     }
//   }
//   return mixin;
// }

// var Vehicle = {
//   engine: 1,
//   ignition: function() {
//     console.log('Turnning on my engine');
//   },

//   drive: function() {
//     this.ignition();
//     console.log('Steering and moving forward');
//   }
// };

// var Car = mixins(Vehicle, {
//   wheels: 4,
//   drive: function() {
//     Vehicle.drive.call(this);
//     console.log('Rolling on all ' + this.wheels + ' wheels!');
//   }
// });

function Vehicle() {
  this.engine = 1;
}

Vehicle.prototype.ignition = function() {
  console.log('Turnning on my engine');
};

Vehicle.prototype.drive = function() {
  this.ignition();
  console.log('Steering and moving forward');
};

function Car() {
  var car = new Vehicle();
  car.wheels = 4;
  var vehDrive = car.drive;

  car.drive = function() {
    vehDrive.call(this);
    console.log('Rolling on all' + this.wheels + ' wheels!');
  };
}

// 隐式混入
var Something = {
  cool: function() {
    this.greeting = 'Hello World';
    this.count = this.count ? this.count + 1 : 1;
  }
};

Something.cool();
Something.greeting();
Something.count;

var Another = {
  cool: function() {
    Something.cool.call(this);
  }
};

Another.cool();
Another.greeting;
Another.count;