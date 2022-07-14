<template>
<div class="products">
  <div class="cl">&nbsp;</div>
  <ul>
    <ProductItem :isLastInLine="(index+1)%3 == 0"  v-for="(product, index) in products"
      :key="'product' + index" :product="product"/>
  </ul>
  <div class="cl">&nbsp;</div>
</div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
  props: ['products'],
};
</script>
