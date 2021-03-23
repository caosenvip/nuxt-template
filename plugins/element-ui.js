/*
 * @Author: casen
 * @Date: 2021-03-23 11:40:11
 * @LastEditors: casen
 * @LastEditTime: 2021-03-23 17:23:27
 * @FilePath: /nuxt-template/plugins/element-ui.js
 */
import Vue from 'vue'
// import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Button,
  Form,
  FormItem,
  Input
} from 'element-ui'

const components = [
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Button,
  Form,
  FormItem,
  Input
]

const Element = {
  install (Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Element, { locale })
