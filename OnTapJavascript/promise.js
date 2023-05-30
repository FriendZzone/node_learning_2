const handle2 = () => {
  return Promise.resolve(true)
}
handle2()
  .then((res) => {
    throw new Error('error')
  })
  .catch((e) => {
    console.log('Chắc chắn sẽ nhảy vào đây')
    // return Promise.reject(e)
    // throw e
  })
  .then((v) => {
    console.log(v)
    console.log(
      'Nhảy vào đây vì trước đó đã catch, và giá trị v là undefined vì trong catch không return gì cả'
    )
  })
  .catch((e) => {
    console.log(e)
  })
