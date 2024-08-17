import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import NotFoundPage from "@/views/NotFoundView.vue"
import RegisterOkView from "@/views/RegisterOkView.vue"
import DiagnosisView from "@/views/DiagnosisView.vue"
import UserCenterView from "@/views/UserCenterView.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      hideNavBar: true,
      disableTransition: false,
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginView,
    meta: {
      hideNavBar: true,
      disableTransition: false,
    }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterView,
    meta: {
      hideNavBar: true,
      disableTransition: false,
    }
  },
  {
    path: '/register/ok',
    name: 'RegistrationSuccessPage',
    component: RegisterOkView,
    meta: {
      hideNavBar: true,
      disableTransition: false,
    }
  },
  {
    path: '/diagnosis',
    name: 'DiagnosisPage',
    component: DiagnosisView,
    meta: {
      hideNavBar: false,
      disableTransition: false,
    }
  },
  {
    path: '/user',
    name: 'UserCenterPage',
    component: UserCenterView,
    meta: {
      hideNavBar: false,
      disableTransition: false,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      hideNavBar: true,
      disableTransition: false,
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/register/ok','/:pathMatch(.*)*']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token')
  const tokenExpiration = localStorage.getItem('tokenExpiration')

  if (authRequired) {
    if (!token || !tokenExpiration) {
      // 如果需要认证的页面没有 token 或过期时间，重定向到登录页
      return next('/login')
    } else {
      // 检查 token 是否过期
      const now = new Date()
      const expirationDate = new Date(tokenExpiration)

      if (now > expirationDate) {
        // token 已过期，清除 localStorage 并重定向到登录页
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
        return next('/login')
      }
    }
  }

  // 对于公开页面或 token 有效的情况，允许访问
  next()
})

export default router
