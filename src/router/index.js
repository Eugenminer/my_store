import { createRouter, createWebHashHistory } from 'vue-router';
import ProductsPage from '@/pages/ProductsPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NothingPage from '@/pages/NothingPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import qWa from '@/pages/qWa.vue';

const routes = [
  { name: 'main', component: ProductsPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: CartPage, path: '/cart/' },
  { name: 'order', component: OrderPage, path: '/order/' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
  { name: 'qWa', component: qWa, path: '/qWa/' },
  { name: 'nothingPage', component: NothingPage, path: ('/:pathMatch(.*)*') },
];

const router = createRouter({
  // предоставляем реализацию истории посещений
  history: createWebHashHistory(),
  routes,
});

export default router;
