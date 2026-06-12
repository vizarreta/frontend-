import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConstanciaView from '../views/ConstanciaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Buscar Matrícula | EPIS' }
    },
    {
      path: '/constancia/:cui',
      name: 'constancia',
      component: ConstanciaView,
      meta: { title: 'Constancia de Matrícula | EPIS' }
    },
    {
      // Redirige cualquier ruta no encontrada al inicio
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Actualizar el título de la pestaña según la ruta
router.afterEach((to) => {
  document.title = to.meta.title || 'Sistema de Matrícula EPIS'
})

export default router
