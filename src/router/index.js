import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import ('../views/Register.vue')
  },
  {
    path: '/botbar',
    name: 'BotBar',
    component: () => import ('../views/botNav.vue'),
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        name: 'Index',
        component: () => import ('../views/Index.vue')
      },{
        path: 'list',
        name: 'List',
        component: () => import ('../views/List.vue')
      },{
        path: 'search',
        name: 'Search',
        component: () => import ('../views/Search.vue')
      },{
        path: 'cart',
        name: 'Cart',
        // 添加额外参数，进行登陆权限判断
        meta: {
          needLogin: true
        },
        component: () => import ('../views/Cart.vue')
      },,{
        path: 'mine',
        name: 'Mine',
        meta: {
          needLogin: true
        },
        component: () => import ('../views/Mine.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
