<template>
<aside class="filter">
  <h2 class="filter__title">Фильтры</h2>

  <form class="filter__form form" action="#" @submit.prevent="submit" method="get">
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label for="#" class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
        <span class="form__value">От</span>
      </label>
      <label for="#" class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категория</legend>
      <label for="#" class="form__label form__label--select">
        <select class="form__select" type="text" name="category" v-model="currentCategoryId">
          <option :value="category.id" v-for="category in categories" :key="category.id">
            {{category.title}}
          </option>
        </select>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Цвет</legend>
      <ul class="colors">
        <li class="colors__item" v-for="color in colors" :key="'color' + color.id">
          <label class="colors__label" :for="'color' + color.id">
            <input class="colors__radio sr-only" type="radio"
              :id="'color' + color.id" name="color" :value="color.id" v-model="currentColorId">
            <span class="colors__value"  :style="{ backgroundColor: color.code,}">
            </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Объем в ГБ</legend>
      <ul class="check-list">
        <li class="check-list__item">
          <label for="#" class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox"
              name="volume" value="8" checked="">
            <span class="check-list__desc">
              8
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label for="#" class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
            <span class="check-list__desc">
              16
              <span>(461)</span>
            </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <button class="filter__submit button button--primery" type="submit">
      Применить
    </button>
    <button class="filter__reset button button--second" type="reset" @click.prevent="reset">
      Сбросить
    </button>
  </form>
</aside>
</template>

<script>
import categories from '../data/Categories';
import colors from '../data/Colors';

export default {
  components: {

  },
  props: ['categoryId', 'priceFrom', 'priceTo', 'colorId'],
  watch: {
    colorId(value) {
      this.currentColorId = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
  },
  data() {
    return {
      currentCategoryId: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentColorId: 0,
    };
  },
  methods: {
    submit() {
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:colorId', this.currentColorId);
    },
    reset() {
      this.$emit('update:categoryId', 0);
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:colorId', 0);

      this.currentCategoryId = 0;
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentColorId = 0;
    },
  },
  computed: {
    categories() {
      return categories;
    },
    colors() {
      return colors;
    },
  },
};
</script>
