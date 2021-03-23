import Vue from 'vue'
import Cookies from 'js-cookie'

const tokenFiled = 'PPU'
// 过期时间，默认7天
const age = 7 * 24 * 60 * 60 * 1000

const Utils = {
  /* accessToken */
  saveToken (token, expires) {
    // Cookies.set(tokenFiled, token, { expires })
    this.setCookies(tokenFiled, token, expires)
  },
  getToken () {
    return this.getCookies(tokenFiled)
  },
  removeToken: () => Cookies.remove(tokenFiled),

  // setCookies: (key, value, expires = (new Date(new Date() * 1 + 10 * 1000))) => {
  setCookies: (key, value, expires = 7) => {
    // if (value) Cookies.set(key, value, { expires })
    // else Cookies.remove(key)
    Cookies.remove(key)
    const isObject = value instanceof Object
    const _time = new Date().getTime()
    const _age = age

    // 如果不是对象，新建一个对象把 value 存起来
    if (!isObject) {
      const b = value
      value = {}
      value._value = b
    }
    // 加入时间
    value._time = _time
    // 过期时间
    value._age = _time + _age
    // 是否一个对象
    value._isObject = isObject
    Cookies.set(key, JSON.stringify(value), { expires })
  },
  getCookies (key) {
    // Cookies.get(key)
    const isExpire = this.isExpire(key)
    let value = null
    if (!isExpire) {
      value = Cookies.get(key)
      value = JSON.parse(value)
      if (!value._isObject) {
        value = value._value
      }
    } else {
      Cookies.remove(key)
    }
    return value
  },
  removeCookies: key => Cookies.remove(key),
  /**
   * 判断一个 localStorage 是否过期
   * @param key
   * @returns {boolean}
   */
  isExpire (key) {
    let isExpire = true // true-过期
    let value = Cookies.get(key)
    const now = new Date().getTime()

    if (value) {
      value = JSON.parse(value)
      // 当前时间是否大于过期时间
      isExpire = now > value._age
    } else {
      // 没有值也是过期
    }
    return isExpire
  },

  // 设置localStorage
  setStorage: (name, val) => {
    sessionStorage.setItem(name, JSON.stringify(val))
  },
  // 获取localStorage
  getStorage: (name) => {
    return JSON.parse(sessionStorage.getItem(name)) || null
  },
  // 设置token，cookie与localStorage上都需要设置
  setToken: (token) => {
    Cookies.set(tokenFiled, token)
    Utils.setStorage(tokenFiled, token)
  },
  // 获取token
  getStorageToken: () => {
    return Utils.getStorage(tokenFiled)
  },
  // 获取request的cookie
  getCookieFromReq: (req, name) => {
    if (!req.headers.cookie) { return }
    const valCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${name}=`))
    if (!valCookie) { return }
    const val = valCookie.split('=')[1]
    return val
  },

  getListInfo: (list, type, value, want) => {
    return list.find((item) => {
      return item[type] === value
    })[want]
  },
  validator: {
    username: (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_-]{1,20}$/.test(value)) {
        callback(new Error('用户名只能是字母、数字、下划线'))
      } else {
        callback()
      }
    },
    password: (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_-]{1,20}$/.test(value)) {
        callback(new Error('密码只能是字母、数字、下划线'))
      } else {
        callback()
      }
    },
    email: (rule, value, callback) => {
      if (!value) { callback() }
      const reg = /^([A-Za-z0-9_\-.\u4E00-\u9FA5])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,8})$/
      if (!reg.test(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    },
    phone: (rule, value, callback) => {
      if (!/^1[345789]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    },
    validateCreditCode: (rule, value, callback) => {
      if (/^[a-zA-Z0-9]{18}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('统一社会信用代码格式不正确'))
      }
    },
    validatePositive: (rule, value, callback) => {
      if (!value || /^[0-9]+\.?[0-9]{0,9}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('输入格式错误'))
      }
    },
    validatePositiveInt: (rule, value, callback) => {
      if (!value || /^[0-9]+$/.test(value)) {
        callback()
      } else {
        return callback(new Error('输入格式错误'))
      }
    },
    validateNumber: (rule, value, callback) => {
      if (!value) {
        callback()
      }
      if (!isNaN(value)) {
        if (value.includes('.')) {
          if (value.indexOf('.') > 0 && value.indexOf('.') < value.length - 1) {
            callback()
          } else {
            return callback(new Error('输入格式错误'))
          }
        } else {
          callback()
        }
      } else {
        return callback(new Error('输入格式错误'))
      }
    },
    validateEn: (rule, value, callback) => {
      // 选填项如果为空，不校验
      if (value === '') { callback() }
      if (/^(?=.*[A-Za-z])[A-Za-z\d$@$!%*#?&]/.test(value)) {
        callback()
      } else {
        return callback(new Error('输入格式错误'))
      }
    }
  },
  openNewBlank (url) {
    const el = document.createElement('a')
    document.body.appendChild(el)
    el.href = url
    el.target = '_blank'
    el.click()
    document.body.removeChild(el)
  }
}

Vue.prototype.$utils = Utils
export default Utils
