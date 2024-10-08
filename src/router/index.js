import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '@/views/Products/ProductsView.vue'
import CreateView from '@/views/Products/CreateView.vue'
import EditView from '@/views/Products/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products/create',
      name: 'productsCreate',
      component: CreateView
    },
    {
      path: '/produtos/:id/edit',
      name: 'productsEdit',
      component: EditView
    }
  ]
})

export default router
