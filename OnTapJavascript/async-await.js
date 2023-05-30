const promise1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1'), 2000)
  })

const promise2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 2'), 1000)
  })

const promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 3'), 1500)
  })

// Promise.all([promise1(), promise2(), promise3()])
//   .then((results) => {
//     console.log('Results:', results)
//   })
//   .catch((error) => {
//     console.log('Error:', error)
//   })

// Hoặc dùng async await
const main = async () => {
  try {
    const result = await Promise.all([promise1(), promise2(), promise3()])
    console.log(result)
  } catch (error) {
    console.log('Error:', error)
  }
}

main()
