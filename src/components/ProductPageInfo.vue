<template>
<div class="item__desc">
  <ul class="tabs" style="display: flex;">
    <li class="tabs__item">
      <a href="#" class="tabs__link" :class="{'tabs__link--current': menuNum==0}"
      @click.prevent="menuNum = 0">
        Описание
      </a>
    </li>
    <li class="tabs__item">
      <a href="#" class="tabs__link" :class="{'tabs__link--current': menuNum==1}"
      @click.prevent="menuNum = 1">
        Характеристики
      </a>
    </li>
    <li class="tabs__item">
      <a href="#" class="tabs__link" :class="{'tabs__link--current': menuNum==2}"
      @click.prevent="menuNum = 2">
        Гарантия
      </a>
    </li>
    <li class="tabs__item">
      <a href="#" class="tabs__link" :class="{'tabs__link--current': menuNum==3}"
      @click.prevent="menuNum = 3">
        Оплата и доставка
      </a>
    </li>
  </ul>

  <div class="item__content" v-if="menuNum === 0">
    <p>
      <span v-for="char in product.specifications" :key="'specifications'+char.id">
        {{ char.value }} <br/>
      </span>
    </p>
    <a href="#" @click.prevent="menuNum = 1">
      Все характеристики
    </a>
    {{ product.content }}
  </div>
  <div class="item__content" v-else-if="menuNum === 1">
    <div v-for="char in product.specifications" :key="'specifications'+char.id">
      <h3>{{ char.title }}</h3>
      <p>{{ char.value }}</p>
    </div>
  </div>
  <div class="item__content" v-else-if="menuNum === 2">
    <h1><i style="color: #bbb; margin: 30%;">Гарантия...</i></h1>
  </div>
  <div class="item__content" v-else-if="menuNum === 3">
    <h1><i style="color: #bbb; margin: 30%;">Оплата и доставка...</i></h1>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductPageInfo',
  props: ['product'],
  data() {
    return {
      menuNum: 0,
    };
  },
  methods: {
    menuChange(value) {
      this.menuNum = value;
    },
  },
};
</script>
