import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from "@/views/LoginView.vue";
import registerView from "@/views/RegisterView.vue";

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
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: registerView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
