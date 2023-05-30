// function hello() {
//   return 'Hello World'
// }

// const hello = () => {
//   return 'Hello World'
// }

// const hello = () => [1, 2].map((item) => item * 2)

// const result = hello()

// console.log(result)

function getName1() {
  console.log(this)
}

const getName2 = () => {
  console.log(this)
}

const user = {
  name: 'John',
  getName: getName1,
  getName2: getName2
}
const car = {
  name: 'BMW',
  getName: getName1,
  getName2: getName2
}
// This đại diện cho đối tượng gọi đến nó
// user.getName()
// car.getName()
// user.getName2()
// car.getName2()
