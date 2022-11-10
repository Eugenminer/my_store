<template>
<router-link class="header__cart" :to="{ name: 'cart' }"
aria-label="Корзина с товарами" v-if="stateLoadingCart === 'ready'">
  <svg width="30" height="21" fill="currentColor">
    <use xlink:href="#icon-cart"></use>
  </svg>
  <span class="header__count" aria-label="Количество товаров"
    v-if="$store.state.cartItems.length > 0">
    {{ cartItemsCount }}
  </span>
</router-link>
<router-link class="header__cart" :to="{ name: 'cart' }"
aria-label="Корзина с товарами" v-else>
  <PreLoader :state="stateLoadingCart" @reload="loadCart" />
</router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PreLoader from '@/components/PreLoader.vue';

export default {
  components: {
    PreLoader,
  },
  methods: {
    ...mapActions(['loadCart']),
  },
  computed: {
    ...mapGetters(['stateLoadingCart', 'cartItemsCount']),
  },
};
</script>
