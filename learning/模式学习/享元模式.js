(function() {
  'use strict';
  //汽车登记示例

  var Car = function(make, model, year, owner, tag, renewDate) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
    this.tag = tag;
    this.renewDate = renewDate;
  };
  Car.prototype = {
    getMake: function() {
      return this.make;
    },
    getModel: function() {
      return this.model;
    },
    getYear: function() {
      return this.year;
    },
    transferOwner: function(owner, tag, renewDate) {
      this.owner = owner;
      this.tag = tag;
      this.renewDate = renewDate;
    },
    renewRegistration: function(renewDate) {
      this.renewDate = renewDate;
    }

  }; 
  //数据量小到没多大的影响，数据量大的时候对计算机内存会产生压力，下面介绍享元模式优化后
   //包含核心数据的Car类
  var Car = function(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  };
  Car.prototype = {
    getMake: function() {
      return this.make;
    },
    getModel: function() {
      return this.model;
    },
    getYear: function() {
      return this.year;
    }
  };
   //中间对象，用来实例化Car类
  var CarFactory = (function() {
    var createdCars = {};
    return {
      createCar: function(make, model, year) {
        var car = createdCars[make + '-' + model + '-' + year];
        return car
          ? car
          : (createdCars[make + '-' + model + '-' + year] = new Car(
              make,
              model,
              year
            ));
      }
    };
  })(); 
  //数据工厂，用来处理Car的实例化和整合附加数据
  var CarRecordManager = (function() {
    var carRecordDatabase = {};
    return {
      addCarRecord: function(make, model, year, owner, tag, renewDate) {
        var car = CarFactory.createCar(make, model, year);
        carRecordDatabase[tag] = {
          owner: owner,
          tag: tag,
          renewDate: renewDate,
          car: car
        };
      },
      transferOwnership: function(tag, newOwner, newTag, newRenewDate) {
        var record = carRecordDatabase[tag];
        record.owner = newOwner;
        record.tag = newTag;
        record.renewDate = newRenewDate;
      },
      renewRegistration: function(tag, newRenewDate) {
        carRecordDatabase[tag].renewDate = newRenewDate;
      },
      getCarInfo: function(tag) {
        return carRecordDatabase[tag];
      }
    };
  })();
})();
