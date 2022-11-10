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
        v-model:price-to="filterPriceTo" v-model:category-props="filterCategoryProps"
        @applyFilter="loadProducts" />
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
import qs from 'qs';

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
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterCategoryProps: {},
      page: 1,
      productNumOnPage: 12,
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
        image: product.preview.file.url,
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
      axios
        .get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productNumOnPage,
            categoryId: this.filterCategoryId,
            props: this.filterCategoryProps,
            minPrice: this.filterPriceFrom === 0 ? undefined : this.filterPriceFrom,
            maxPrice: this.filterPriceTo === 0 ? undefined : this.filterPriceTo,
          },
          paramsSerializer: (params) => qs.stringify(params, {
            arrayFormat: 'brackets',
            encode: false,
          }),
        })
        .then((response) => { this.productsData = response.data; })
        .catch(() => { this.productsLoadingFailed = true; })
        .then(() => { this.productsLoading = false; });
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
