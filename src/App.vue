<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"
    @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)" />
</template>

<script>
import ProductsPage from '@/pages/ProductsPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NothingPage from '@/pages/NothingPage.vue';

const routing = {
  main: 'ProductsPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  components: {
    ProductsPage, ProductPage, NothingPage,
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  computed: {
    currentPageComponent() {
      return routing[this.currentPage] || 'NothingPage';
    },
  },
};
</script>
