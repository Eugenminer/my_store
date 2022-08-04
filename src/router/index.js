import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/pages/ProductsPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NothingPage from '@/pages/NothingPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import qWa from '@/pages/qWa.vue';

const routes = [
  { name: 'main', component: ProductsPage, path: '/my_store_pub/' },
  { name: 'product', component: ProductPage, path: '/my_store_pub/product/:id' },
  { name: 'cart', component: CartPage, path: '/my_store_pub/cart/' },
  { name: 'order', component: OrderPage, path: '/my_store_pub/order/' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/my_store_pub/order/:id' },
  { name: 'qWa', component: qWa, path: '/my_store_pub/qWa/' },
  { name: 'nothingPage', component: NothingPage, path: ('/my_store_pub/:pathMatch(.*)*') },
];

const router = createRouter({
  // предоставляем реализацию истории посещений
  history: createWebHistory(),
  routes,
});

export default router;
