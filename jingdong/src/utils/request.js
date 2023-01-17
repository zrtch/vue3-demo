import axios from 'axios'

// 创建一个promise对象，发送一个ajax请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      baseURL: "https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd",
      headers: {
        //可以修改content-type类型
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}