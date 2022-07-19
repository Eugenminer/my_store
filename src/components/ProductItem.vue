<template>
<li class="catalog__item">
  <a class="catalog__pic" href="#">
    <img :src="product.image" srcset="{{product.image}} 2x" alt="{{product.title}}">
  </a>

  <h3 class="catalog__title">
    <a href="#">
      {{product.title}}
    </a>
  </h3>

  <span class="catalog__price">
    {{product.price}} ₽
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
export default {
  name: 'ProductItem',
  components: {

  },
  props: {
    isLastInLine: Boolean,
    product: {
      title: String,
      price: Number,
      image: String,
    },
  },
};
</script>
