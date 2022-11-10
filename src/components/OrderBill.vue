<template>
<div class="cart__block">
  <ul class="cart__orders">
    <li class="cart__order" v-for="item in cartItems" :key="'cartElement' + item.id">
      <h3>{{ (item.quantity > 1 ? item.quantity + (' x ') : '') +
      item.productOffer.product.title }}</h3>
      <b>{{ formatPrice(item.productOffer.price * item.quantity) }} ₽</b>
      <span>Артикул: {{ item.id }}</span>
    </li>
  </ul>

  <div class="cart__total">
    <p>Доставка: <b>{{ formatPrice(deliveryCost) }} ₽</b></p>
    <p>Итого: <b>{{ productsAmount }}</b> товара на сумму <b>
      {{ formatPrice(Number(totalPrice) + Number(deliveryCost)) }} ₽</b></p>
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
  props: ['deliveryCost', 'orderSending', 'items'],
  methods: {
    formatPrice(price) {
      return numberFormat(price);
    },
  },
  computed: {
    cartItems() {
      return this.items;
    },
    totalPrice() {
      return this.cartItems.reduce((acc, item) => (item.price * item.quantity) + acc, 0);
    },
    productsAmount() {
      let count = 0;
      this.cartItems.forEach((item) => { count += item.quantity; });
      return count;
    },
  },
};
</script>
