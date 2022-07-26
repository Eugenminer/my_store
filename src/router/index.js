import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/pages/ProductsPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NothingPage from '@/pages/NothingPage.vue';
import CartPage from '@/pages/CartPage.vue';

const routes = [
  { name: 'main', component: ProductsPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: CartPage, path: '/cart/' },
  { name: 'nothingPage', component: NothingPage, path: ('/:pathMatch(.*)*') },
];

const router = createRouter({
  // предоставляем реализацию истории посещений
  history: createWebHistory(),
  routes,
});

export default router;
