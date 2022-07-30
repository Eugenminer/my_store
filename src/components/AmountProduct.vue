<template>
<div :class="(size === 12 ? 'product__counter' : '') + 'form__counter'">
  <button type="button" aria-label="Убрать один товар" @click.prevent="amountProd--">
    <svg :width="size" :height="size" fill="currentColor">
      <use xlink:href="#icon-minus"></use>
    </svg>
  </button>

  <label for="#">
  <input type="text" v-model.number:="amountProduct" name="count">
  </label>

  <button type="button" aria-label="Добавить один товар" @click.prevent="amountProd++">
    <svg :width="size" :height="size" fill="currentColor">
      <use xlink:href="#icon-plus"></use>
    </svg>
  </button>
</div>
</template>

<script>
export default {
  props: ['size', 'amount'],
  model: {
    prop: 'amount',
    event: 'update:amount',
  },
  watch: {
    amountProduct(value) {
      this.$emit('update:amount', value);
    },
  },
  data() {
    return {
      amountProduct: this.amount,
    };
  },
  computed: {
    amountProd: {
      get() {
        return this.amountProduct;
      },
      set(value) {
        if (value > 0) this.amountProduct = value;
      },
    },
  },
};
</script>
