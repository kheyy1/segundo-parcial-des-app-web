// router/index.js — Configuración de rutas con vue-router
import { createRouter, createWebHistory } from 'vue-router'

import LoginView     from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView   from '../views/ProductView.vue'

const routes = [
  // Ruta raíz redirige al login
  { path: '/', redirect: '/login' },

  // Vista de login
  { path: '/login', name: 'Login', component: LoginView },

  // Dashboard con protección de ruta y vistas hijas
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      // Si no hay sesión activa, bloquea el acceso y manda al login
      if (!localStorage.getItem('loggedIn')) {
        next('/login')
      } else {
        next()
      }
    },
    children: [
      { path: '', redirect: '/dashboard/productos' },
      { path: 'productos', name: 'Productos', component: ProductView },
    ]
  },

  // Cualquier ruta desconocida va al login
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
