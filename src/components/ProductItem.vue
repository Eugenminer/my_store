<template>
<li class="catalog__item">
  <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
    <img :src="product.image" srcset="{{product.image}} 2x" alt="{{product.title}}"
    style="object-fit:  scale-down;
        max-width: 100%;
        max-height: 100%;">
  </router-link>
  <h3 class="catalog__title">
    <a href="#">
      {{product.title}}
    </a>
  </h3>

  <span class="catalog__price">
    {{ formatPrice }} ₽
  </span>

<!--
  <ul class="colors colors--black" v-if="product.mainProp.code !== 'color'">
    <li class="colors__item" v-for="offer in product.offers" :key="product.id + '_' + offer.id">
      <label :for="product.id + '_' + offer.id" class="colors__label">
        <input class="colors__radio sr-only" type="radio" :id="product.id + '_' + color.id"
          :name="'colorProduct' + product.id" :value="color.id">
        <span class="colors__value" :style="{backgroundColor: color.color.code,}">
        </span>
      </label>
    </li>
  </ul>
-->

  <ul class="sizes" v-for="(prop, propIndex) in product.offers[0].propValues"
  :key="'prop' + prop.id">
    <li class="sizes__item" v-for="(offer, index) in product.offers" :key="'offer' + offer.id">
      <label :class="prop.productProp.code !== 'color' ? 'sizes__label' : 'colors__label'"
      :for="'offer' + offer.id + 'prop' + offer.propValues[propIndex].value">
        <input :id="'offer' + offer.id + 'prop' +
          offer.propValues[propIndex].value" class="sizes__radio colors__radio sr-only"
          type="radio" :name="offer.propValues[propIndex].productProp.code + product.id"
          :value="offer.price" v-model="offerprice" :checked="index === 0"/>
        <span class="sizes__value" v-if="prop.productProp.code !== 'color'">
          {{ offer.propValues[propIndex].value }}
        </span>
        <span class="colors__value" v-else
          :style="{backgroundColor: colorByName(offer.propValues[propIndex].value),}">
        </span>
      </label>
    </li>
  </ul>

</li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  components: {

  },
  data() {
    return {
      offerprice: 0,
    };
  },
  props: ['product'],
  computed: {
    formatPrice() {
      return numberFormat((this.offerprice === 0 ? this.product.price : this.offerprice));
    },
  },
  methods: {
    colorByName(value) {
      const color = this.product.colors.find((el) => el.color.title.replace('ё', 'е') === value.replace('ё', 'е'));
      return color.color.code;
    },
  },
};

</script>
