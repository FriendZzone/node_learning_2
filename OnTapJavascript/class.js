// Class không phải là object
// Class là template để tạo object

class Car {
  constructor(name, color) {
    this.name = name
    this.color = color
  }

  getName = () => {
    return this.name
  }

  getColor = () => {
    return this.color
  }
}

class SuperCar extends Car {
  constructor(name, color, signature) {
    super(name, color)
    this.signature = signature
  }
}

const bmw = new Car('BMW', 'Black')
const toyota = new Car('Toyota', 'Red')
const ferrari = new SuperCar('Ferrari', 'Red', 'Ferrari Signature')
// console.log(JSON.stringify(bmw))
// console.log(JSON.stringify(toyota))
console.log(ferrari)
