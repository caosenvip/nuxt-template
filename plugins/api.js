/*
 * @Author: casen
 * @Date: 2021-03-23 16:55:45
 * @LastEditors: casen
 * @LastEditTime: 2021-03-23 17:21:50
 * @FilePath: /nuxt-template/plugins/api.js
 */
export default ({ $axios }, inject) => {
  const axios = $axios
  const formHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  const JsonHeaders = {
    'Content-Type': 'application/json'
  }
  const http = {
    testGet (params) {
      return axios.post('/gateway/ce/search', params, {
        headers: JsonHeaders
      })
    },
    getUserInfo (params) {
      return axios.post('/gateway/user/info', params, {
        headers: formHeaders
      })
    }
  }
  inject('http', http)
}
