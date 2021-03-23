/*
 * @Author: casen
 * @Date: 2021-03-23 16:29:24
 * @LastEditors: casen
 * @LastEditTime: 2021-03-23 17:23:09
 * @FilePath: /nuxt-template/plugins/axios.js
 */
import ApiConfig from '@/configs/api.config'
import qs from 'qs'
import { Notification } from 'element-ui'
import Utils from '@/plugins/utils'

export default function ({ store, redirect, req, router, route, app: { $axios } }) {
  // 数据访问前缀
  $axios.defaults.baseURL = ApiConfig.baseURL
  // request拦截器
  $axios.onRequest((config) => {
    // 将获取到token加入到请求头中
    const token = Utils.getToken()
    if (token) { config.headers.common.PPU = token }
    config.headers.common.os = 'PC'
    // POST传参序列化
    if (
      config.method === 'post' &&
      config.headers['Content-Type'] !== 'multipart/form-data' &&
      config.headers['Content-Type'] !== 'application/json'
    ) {
      config.data = qs.stringify(config.data)
    }
  })
  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    (response) => {
      if (response.data.code === 10000) { return response.data } else if (response.data.code === -2 && response.data.msg === 'no login') {
        /* 登录权鉴判断部分 */
        const isClient = process.client // 是否是客户端
        const isServer = process.server // 是否是服务端

        let redirectURL = '/login'
        let path
        // 在服务端
        if (isServer) {
          path = req.originalUrl
        }
        // 在客户端
        if (isClient) {
          path = route.path
        }
        if (path) {
          redirectURL = '/login?ref=' + encodeURIComponent(path)
        }
        /* 跳转到登录页 */
        redirect(redirectURL)
        return Promise.reject(response)
      } else if (response.request.responseURL.includes('user/mp/login')) {
        return Promise.reject(response)
      } else {
        Notification.warning({
          title: '提示',
          message: response.data.msg
        })
        return Promise.reject(response)
      }
    },
    (error) => {
      return Promise.reject(error.response) // 返回接口返回的错误信息
    })
}
