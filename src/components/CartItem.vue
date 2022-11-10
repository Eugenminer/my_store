<template>
<li class="cart__item product">
  <div class="product__pic">
    <img :src="item.productOffer.product.preview.file.url" width="120" height="120"
    :alt="item.productOffer.product.title">
  </div>
  <h3 class="product__title">
    {{ item.productOffer.product.title }}
  </h3>
  <div class="product__info product__info--color">
    <div>{{ item.productOffer.product.mainProp.title }}:
      <span>
        <i  v-if="item.productOffer.product.mainProp.code === 'color'"
          :style="{ backgroundColor: colorByName(item.productOffer.propValues[0].value) }">
        </i>
        {{ item.productOffer.propValues[0].value }}
      </span>
    </div>
  </div>
  <span class="product__code">
    Артикул: {{item.productOffer.id}}
  </span>

  <AmountProduct size="10" v-model:amount="amountItem" />

  <b class="product__price">
    {{ formatPrice(item.productOffer.price * item.quantity) }} ₽
  </b>

  <button class="product__del button-del" type="button"
  @click.prevent="deleteProductFromCart(item.id)" aria-label="Удалить товар из корзины">
    <svg width="20" height="20" fill="currentColor">
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</li>
</template>

<script>
import AmountProduct from '@/components/AmountProduct.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  components: {
    AmountProduct,
  },
  methods: {
    ...mapActions(['updateProductToCart', 'deleteProductFromCart', 'loadColors']),
    formatPrice(price) {
      return numberFormat(price);
    },
    colorByName(value) {
      const color = this.item.productOffer.product.colors.find((el) => el.color.title.replace('ё', 'е') === value.replace('ё', 'е'));
      if (color === undefined) return 'none';
      return color.color.code;
    },
  },
  computed: {
    amountItem: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        this.updateProductToCart({ productId: this.item.id, amount: value });
      },
    },
  },
  props: ['item'],
};
</script>
