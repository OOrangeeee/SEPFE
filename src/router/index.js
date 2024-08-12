import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from "@/views/LoginView.vue";
import registerView from "@/views/RegisterView.vue";
import NotFoundPage from "@/views/NotFoundView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      hideNavBar: true,
      disableTransition:false,
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: loginView,
    meta: {
      hideNavBar: true,
      disableTransition:false,
    }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: registerView,
    meta: {
      hideNavBar: true,
      disableTransition:false,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      hideNavBar: true,
      disableTransition:false,
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
