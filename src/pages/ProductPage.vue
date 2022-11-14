<template>
<main class="content container" v-if="stateLoading !== 'ready'">
  <section class="item">
    <PreLoader :state="stateLoading" @reload="loadProduct" />
  </section>
</main>
<main class="content container" v-else>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
          {{ category.title }}
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          {{ product.title }}
        </a>
      </li>
    </ul>
  </div>

  <section class="item">
    <div class="item__pics pics">
      <div class="pics__wrapper">
        <img width="570" height="570" :src="product.image"
         :alt="product.title">
      </div>
      <ul class="pics__list">
        <li class="pics__item" v-for="index in 4" :key="'pic'+index">
          <a href="" class="pics__link pics__link--current" :id="'pic'+index">
            <img width="98" height="98" :src="product.image"
            :alt="product.title">
          </a>
        </li>
      </ul>
    </div>

    <div class="item__info">
      <span class="item__code">Артикул: {{ product.id }}</span>
      <h2 class="item__title">
        {{ product.title }}
      </h2>
      <div class="item__form">
        <form class="form" action="#" method="POST" @submit.prevent="AddToCart">
          <b class="item__price">
            {{ formatPrice }} ₽
          </b>

          <fieldset class="form__block" v-if="product.mainProp.code !== 'color'">
            <legend class="form__legend">Цвет:</legend>
            <ul class="colors">
              <li class="colors__item" v-for="(color, index) in product.colors"
                :key="'color' + index">
                <label :for="'color' + index" class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                    name="color-item" :value="color.color.id" v-model="currentColorId"
                    :id="'color' + index" :checked="index === 0" />
                  <span class="colors__value"
                  :style="{ 'background-color': color.color.code }" />
                </label>
              </li>
            </ul>
          </fieldset>
          <fieldset class="form__block" v-for="(props, key) in existPropertyList"
          :key="'props' + key">
            <legend class="form__legend">
              {{ props[0].productProp.title }}:
            </legend>
            <ul class="sizes sizes--primery">
              <li class="sizes__item" v-for="(prop, index) in props"
              :key="'value' + prop.value">
                <label :for="'value' + prop.value" class="sizes__label">
                  <input class="sizes__radio sr-only" type="radio"
                    :value="prop.value" :id="'value' + prop.value"
                    :name="prop.productProp.code"
                    v-model="currentProductProps[prop.productProp.code]"
                    :checked="index === 0" @change="changedProductProps()">
                  <span class="sizes__value">
                    <span class="colors__value" v-if="prop.productProp.code === 'color'"
                      :style="{ backgroundColor: colorByName(prop.value).code, float: 'left', }">
                    </span>
                    &nbsp;&nbsp;{{ prop.value }}&nbsp;&nbsp;&nbsp;
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>
          <div class="item__row">
            <AmountProduct size="12" v-model:amount="productAmount" />

            <button class="button button--primery" type="submit" :disabled="productsAdding">
              <PreLoader :state="productsAdding ? 'loading' : 'ready'" type="button" />
              <div v-show="!productsAdding">В корзину</div>
            </button>
          </div>
          <div v-show="productsAdded">Товар добавлен в корзину</div>
          <div v-show="productsAdding">Добавляем товар в корзину...</div>
        </form>
      </div>
    </div>
    <ProductPageInfo :product="product"/>
  </section>
</main>
</template>

<script>
import PreLoader from '@/components/PreLoader.vue';
import ProductPageInfo from '@/components/ProductPageInfo.vue';
import AmountProduct from '@/components/AmountProduct.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  components: {
    PreLoader,
    AmountProduct,
    ProductPageInfo,
  },
  data() {
    return {
      productAmount: 1,
      productData: null,
      categoryData: null,
      productsLoading: false,
      productsLoadingFailed: false,
      productsAdded: false,
      productsAdding: false,
      currentColorId: null,
      currentProductProps: {},
      existPropertyList: {},
      currentOfferId: null,
      currentOfferPrice: null,
    };
  },
  computed: {
    ...mapGetters({ colors: 'colors' }),
    stateLoading() {
      if (this.productsLoadingFailed) return 'error';
      if (this.productsLoading) return 'loading';
      return 'ready';
    },
    product() {
      return this.productData ? {
        ...this.productData,
        image: this.productData.preview.file.url,
      } : [];
    },
    category() {
      return this.productData.category ? this.productData.category : [];
    },
    formatPrice() {
      return numberFormat(this.currentOfferPrice);
    },
  },
  methods: {
    ...mapActions(['addProductToCart', 'loadColors']),
    AddToCart() {
      this.productsAdded = false;
      this.productsAdding = true;

      let color = this.currentColorId;
      if (this.productData.mainProp.code === 'color') {
        const offer = this.productData.offers.find((el) => el.id === this.currentOfferId);
        const prop = offer.propValues.find((el) => el.productProp.code === 'color');
        color = this.colorByName(prop.value).id;
      }

      this.loadProductTimer = setTimeout(() => {
        this.addProductToCart({
          productOfferId: this.currentOfferId,
          colorId: color,
          quantity: this.productAmount,
        })
          .then(() => { this.productsAdding = false; this.productsAdded = true; });
      }, 200);
    },
    colorByName(value) {
      const color = this.colors.find((el) => el.title.replace('ё', 'е') === value.replace('ё', 'е'));
      return color;
    },
    loadProduct() {
      if (!this.$route.params.id) return;
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => { this.productData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 200);
    },
    loadPropertyProduct(product) {
      product.offers.forEach((offer) => {
        offer.propValues.forEach((prop) => {
          if (this.existPropertyList[prop.productProp.code] === undefined) {
            this.existPropertyList[prop.productProp.code] = [];
          }
          this.existPropertyList[prop.productProp.code].push(prop);
        });
      });
      this.currentOfferId = product.offers[0].id;
      this.currentOfferPrice = product.offers[0].price;
      this.currentColorId = product.colors[0].color.id;
    },
    changedProductProps() {
      const offers = [].concat(this.product.offers);
      Object.keys(this.currentProductProps).forEach((key) => {
        offers.forEach((offer, index) => {
          offer.propValues.forEach((prop) => {
            if (prop.productProp.code === key && prop.value !== this.currentProductProps[key]) {
              offers.splice(index, 1);
            }
          });
        });
      });
      this.currentOfferId = offers[0].id;
      this.currentOfferPrice = offers[0].price;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
    productData(value) {
      this.loadPropertyProduct(value);
    },
  },
  created() {
    this.loadColors();
  },
};
</script>
