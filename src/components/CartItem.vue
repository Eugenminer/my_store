<template>
<li class="cart__item product">
  <div class="product__pic">
    <img :src="item.product.image" width="120" height="120"
    :alt="item.product.title">
  </div>
  <h3 class="product__title">
    {{ item.product.title }}
  </h3>
  <p class="product__info">
    Объем: <span>---</span>
  </p>
  <span class="product__code">
    Артикул: {{item.product.id}}
  </span>

  <AmountProduct size="10" v-model:amount="amountItem" />

  <b class="product__price">
    {{ formatPrice(item.product.price * item.amount) }} ₽
  </b>

  <button class="product__del button-del" type="button"
  @click.prevent="deleteProduct(item.productId)" aria-label="Удалить товар из корзины">
    <svg width="20" height="20" fill="currentColor">
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</li>
</template>

<script>
import AmountProduct from '@/components/AmountProduct.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';

export default {
  components: {
    AmountProduct,
  },
  methods: {
    ...mapMutations({ changeAmount: 'changeAmountProduct', deleteProduct: 'deleteProductFromCart' }),
    formatPrice(price) {
      return numberFormat(price);
    },
  },
  computed: {
    amountItem: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.changeAmount({ productId: this.item.productId, amount: value });
      },
    },
  },
  props: ['item'],
};
</script>
