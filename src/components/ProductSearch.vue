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
        <select class="form__select" name="category" v-model="currentCategoryId">
          <option :value="0" key="0">
            Все категории
          </option>
          <option :value="category.id" v-for="category in categories" :key="category.id">
            {{category.title}}
          </option>
        </select>
      </label>
    </fieldset>

    <div  v-if="currentCategoryId">

     <fieldset class="form__block" v-for="prop in categorie.productProps"
      :key="'productProp' + prop.id">
      <legend class="form__legend">{{ prop.title }}</legend>
        <ul class="check-list">
        <li class="check-list__item"
          v-for="(val, index) in prop.availableValues" :key="prop.code + index">
          <label class="check-list__label"
            :for="prop.code + index">
            <input :id="prop.code + index" type="checkbox" :value="val.value"
              class="check-list__check sr-only"
              @click="checkboxClick(prop.code, val.value)">
            <span class="check-list__desc">
              <span class="colors__value" v-if="prop.code === 'color'"
                :style="{ backgroundColor: colorByName(val.value), float: 'left', }">
              </span>
              {{ '&nbsp;' + val.value }}
              <span>({{ val.productsCount }})</span>
            </span>
          </label>
        </li>
      </ul>
     </fieldset>
    </div>

    <button class="filter__submit button button--primery" type="submit">
      Применить
    </button>
    <button class="filter__reset button button--second"
    type="reset" @click.prevent="reset" v-if="anyParams">
      Сбросить
    </button>
  </form>
</aside>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {

  },
  props: ['categoryId', 'priceFrom', 'priceTo', 'categoryProps'],
  watch: {
    categoryProps(value) {
      this.currentCategoryProps = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    currentCategoryId(value) {
      this.currentCategoryProps = {};
      this.loadCategorie(value);
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
      currentCategorie: null,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryProps: {},
      productCategories: null,
    };
  },
  methods: {
    ...mapActions(['loadColors']),
    submit() {
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryProps', this.currentCategoryProps);

      this.$emit('applyFilter');
    },
    reset() {
      this.currentCategoryId = 0;
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryProps = {};

      this.submit();
    },
    checkboxClick(code, value) {
      if (this.currentCategoryProps[code] === undefined) {
        this.currentCategoryProps[code] = [];
      }
      const index = this.currentCategoryProps[code].indexOf(value);
      if (index >= 0) {
        this.currentCategoryProps[code].splice(index, 1);
      } else {
        this.currentCategoryProps[code].push(value);
      }
    },
    loadCategories() {
      axios
        .get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => { this.productCategories = response.data; });
    },
    loadCategorie(id) {
      if (id === 0) return;
      axios
        .get(`${API_BASE_URL}/api/productCategories/${id}`)
        .then((response) => { this.currentCategorie = response.data; });
    },
    colorByName(value) {
      const color = this.colors.find((el) => el.title.replace('ё', 'е') === value.replace('ё', 'е'));
      return color.code;
    },
  },
  computed: {
    ...mapGetters({ colors: 'colors' }),
    categories() {
      return this.productCategories ? this.productCategories.items : [];
    },
    categorie() {
      return this.currentCategorie ? this.currentCategorie : [];
    },
    anyParams() {
      return this.currentPriceFrom > 0 || this.currentPriceTo > 0
      || this.currentCategoryId > 0;
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
