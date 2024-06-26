import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')  },
  { path: '*', name: 'Error404', component: () => import(/* webpackChunkName: "error404" */ '../views/Errors/Error404.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
