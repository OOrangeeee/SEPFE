import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from "@/views/LoginView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: loginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
