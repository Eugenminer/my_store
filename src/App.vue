<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{stringNumProducts}}
      </span>
    </div>

    <div class="content__catalog">
      <ProductSearch v-model:category-id="filterCategoryId" v-model:price-from="filterPriceFrom"
          v-model:price-to="filterPriceTo" v-model:color-id="filterColorId" />
      <ProductList :products="products" v-model:page="page"
        :count="countProducts" :perPages="productNumOnPage" />
    </div>
  </main>
</template>

<script>
import ProductList from './components/ProductList.vue';
import ProductSearch from './components/ProductSearch.vue';
import products from './data/Products';
import categories from './data/Categories';

export default {
  name: 'App',
  components: {
    ProductList,
    ProductSearch,
  },
  watch: {
    filterColorId() {
      this.page = 1;
    },
    filterCategoryId() {
      this.page = 1;
    },
    filterPriceFrom() {
      this.page = 1;
    },
    filterPriceTo() {
      this.page = 1;
    },
    productNumOnPage() {
      this.page = 1;
    },
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productNumOnPage: 3,
    };
  },
  computed: {
    filterProducts() {
      let result = products;

      if (this.filterPriceFrom) {
        result = result.filter((p) => p.price >= this.filterPriceFrom);
      }

      if (this.filterPriceTo) {
        result = result.filter((p) => p.price <= this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        result = result.filter((p) => p.categoryId === this.filterCategoryId);
      }

      if (this.filterColorId > 0) {
        result = result.filter((p) => p.colors.find((el) => el.id === this.filterColorId)
          !== undefined);
      }

      return result;
    },
    countProducts() {
      return this.filterProducts.length;
    },
    categories() {
      return categories;
    },
    products() {
      const end = this.productNumOnPage * this.page;
      const begin = end - this.productNumOnPage;
      return this.filterProducts.slice(begin, end);
    },
    stringNumProducts() {
      let str = String(products.length);
      let temp = (products.length + 56434) % 100;
      if (temp > 10 && temp < 15) {
        temp = 10;
      }
      temp %= 10;
      if (temp === 1) {
        str += ' товар';
      } else if (temp > 1 && temp < 5) {
        str += ' товара';
      } else {
        str += ' товаров';
      }
      return str;
    },
  },
};
</script>
