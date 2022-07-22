<template>
<li class="catalog__item">
  <a class="catalog__pic" href="#" @click.prevent="emit('gotoPage', 'product', {id: product.id})">
    <img :src="product.image" srcset="{{product.image}} 2x" alt="{{product.title}}">
  </a>

  <h3 class="catalog__title">
    <a href="#">
      {{product.title}}
    </a>
  </h3>

  <span class="catalog__price">
    {{formatPrice}} ₽
  </span>

  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in product.colors" :key="product.id + '_' + color.id">
      <label :for="product.id + '_' + color.id" class="colors__label">
        <input class="colors__radio sr-only" type="radio" :id="product.id + '_' + color.id"
          :name="'colorProduct' + product.id" :value="color.id">
        <span class="colors__value" :style="{backgroundColor: color.code,}">
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
      a: 55,
    };
  },
  props: ['product'],
  computed: {
    formatPrice() {
      return numberFormat(this.product.price);
    },
  },
  methods: {
    emit(method, param1, param2) {
      this.emitter.emit(method, { page: param1, parametrs: param2 });
    },
  },
};

</script>
