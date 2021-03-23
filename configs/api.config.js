/*
 * @Author: casen
 * @Date: 2021-03-23 16:54:16
 * @LastEditors: casen
 * @LastEditTime: 2021-03-23 17:29:57
 * @FilePath: /nuxt-template/configs/api.config.js
 */
const envUrl = {
  production: {
    baseURL: 'https://www.baidu.com'
  },
  test: {
    baseURL: 'https://www.baidu.com'
  },
  development: {
    baseURL: 'https://www.baidu.com'
  }
}

const Url = {
  baseURL: envUrl[process.env.NODE_ENV].baseURL
}

export default Url
