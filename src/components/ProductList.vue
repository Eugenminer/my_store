<template>
<section class="catalog">
  <ul class="catalog__list">
    <ProductItem :isLastInLine="(index+1)%3 == 0"  v-for="(product, index) in products"
      :key="product.id" :product="product" />
  </ul>
  <BasePagination v-model:page="currentPage" :count="count" :perPages="perPages" />
</section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
    BasePagination,
  },
  props: ['products', 'page', 'count', 'perPages'],
  watch: {
    currentPage(value) {
      this.$emit('update:page', value);
    },
    page(value) {
      this.currentPage = value;
    },
  },
  data() {
    return {
      currentPage: this.page,
    };
  },
};
</script>
