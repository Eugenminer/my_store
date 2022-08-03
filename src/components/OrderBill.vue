<template>
<div class="cart__block">
  <ul class="cart__orders">
    <li class="cart__order" v-for="item in products" :key="'cartElement' + item.productId">
      <h3>{{ (item.quantity > 1 ? item.quantity + (' x ') : '') + item.product.title }}</h3>
      <b>{{ formatPrice(item.product.price * item.quantity) }} ₽</b>
      <span>Артикул: {{ item.productId }}</span>
    </li>
  </ul>

  <div class="cart__total">
    <p>Доставка: <b>{{ formatPrice(deliveryCost) }} ₽</b></p>
    <p>Итого: <b>{{ productsAmount }}</b> товара на сумму <b>
      {{ formatPrice(totalPrice) }} ₽</b></p>
  </div>

  <button class="cart__button button button--primery" type="submit"
  :disabled="orderSending" v-show="orderSending !== undefined">
    <PreLoader :state="orderSending ? 'loading' : 'ready'" type="button" />
    <div v-show="!orderSending">Оформить заказ</div>
  </button>
</div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import PreLoader from '@/components/PreLoader.vue';

export default {
  components: {
    PreLoader,
  },
  props: ['deliveryCost', 'orderSending', 'products'],
  methods: {
    formatPrice(price) {
      return numberFormat(price);
    },
  },
  computed: {
    totalPrice() {
      return this.products.reduce((acc, item) => (item.product.price * item.quantity) + acc, 0);
    },
    productsAmount() {
      return this.products.length;
    },
  },
};
</script>
