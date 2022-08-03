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
      :count="countProducts" :perPages="productNumOnPage"
      v-if="stateLoading === 'ready'" />
      <PreLoader v-else :state="stateLoading" @reload="loadProducts"/>
  </div>
</main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import ProductSearch from '@/components/ProductSearch.vue';
import PreLoader from '@/components/PreLoader.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  components: {
    ProductList,
    ProductSearch,
    PreLoader,
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
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
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    stateLoading() {
      if (this.productsLoadingFailed) return 'error';
      if (this.productsLoading) return 'loading';
      return 'ready';
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    products() {
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      })) : [];
    },
    stringNumProducts() {
      let str = String(this.countProducts);
      let temp = this.countProducts % 100;
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
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productNumOnPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 200);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
