import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AuthGuard from './auth-guard'
import Orders from '@/components/User/Orders'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Add from '@/components/Adds/Add'
import AdList from '@/components/Adds/AdList'
import NewAdd from '@/components/Adds/NewAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Add
    },
    {
      path: '/list',
      name: 'adList',
      component: AdList,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'new-add',
      component: NewAdd,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
