import Vue from 'vue'
import Router from 'vue-router'
import MainView from  '@/pages/main'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home';
import dashboard from '@/pages/dashboard/index'
import order from '@/pages/order/order'
import orderDetail from '@/pages/order/orderDetail'
import goods from '@/pages/goods/goods'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:dashboard,
      children:[{
          path:'/home',
          name:'home',
          component:Home
      },
      {
        path:'/goods',
        name:'goods',
        component:goods
      },
      {
        path:'/order',
        name:'order',
        component:order
      },
      {
        path:'/orderDetail/:id',
        name:'orderDetail',
        component:orderDetail
      },
      ]
    }

  ]
})
