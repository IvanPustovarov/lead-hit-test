import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/analitics',
    // redirect: () => {
    //   if(localStorage.getItem('leadhit-site-id') != "5f8475902b0be670555f1bb3")
    //   return { path: '/' }
    // },
    name: 'analitics',
    component: () => import(/* webpackChunkName: "about" */ '../views/AnalyticsView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
