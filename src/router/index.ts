import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import login from "@/store/login";
import {useStore} from "vuex";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children:[
      {
        path: '/',
        name: 'start',
        component: ()=> import('@/views/Start/index.vue')
      },
      {
        path: '/listen',
        name: 'listen',
        component: ()=> import('@/views/Listen/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: ()=> import('@/views/Video/index.vue')
      },
      {
        path: '/demo',
        name: 'demo',
        component: ()=> import('@/views/demo.vue')
      },
      {
        path: '/puzzle',
        name: 'puzzle',
        component: ()=> import('@/views/Game/index.vue')
      },
      {
        path: '/slither',
        name: 'slither',
        component: ()=> import('@/views/Game/slither.vue')
      },
      {
        path: '/learn',
        name: 'learn',
        component: ()=> import('@/views/learn.vue')
      },
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: '/login',
    name: 'loginview',
    component: () => import('../views/LoginView.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView/login.vue')
      },
      {
        path: '/login/register',
        name: 'register',
        component: () => import('../views/LoginView/register.vue')
      },
      {
        path: '/login/forget',
        name: 'forget',
        component: () => import('../views/LoginView/forget.vue')
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach( (to, from) => {
  if (
    // 检查用户是否已登录
    !localStorage.getItem('token') &&
    // 避免无限重定向
    to.name !== 'login' && to.name !== 'register' && to.name !== 'forget'
  ) {
    // 将用户重定向到登录页面
    return { name: 'login'}
  }

  // if (localStorage.getItem('token')){
  //   if (to.name == 'login' || 'register' || 'forget'){
  //     return {name: 'from.name'}
  //   }
  // }

})

export default router;
