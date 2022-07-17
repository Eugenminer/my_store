<template>
<div class="box search">
  <h2>Search by <span></span></h2>
  <div class="box-content">
    <form action="#"  @submit.prevent="submit">
      Keyword
      <input class="field" v-model="currentKeyWord"/>
      Category
      <select class="field" v-model="currentCategoryId">
        <option :value="category.id" v-for="category in categories" :key="category.id">
          {{category.title}}
        </option>
      </select>
      <div class="inline-field">
        Price
        <select class="field small-field" v-model="currentPriceFrom">
          <option :value="price" v-for="price in filterRangePrice" :key="'priceFrom:' + price">
            {{price === 0 ? '-' : '$' + price}}
          </option>
        </select>
        to:
        <select class="field small-field" v-model="currentPriceTo">
          <option :value="price" v-for="price in filterRangePrice" :key="'priceTo' + price">
            {{price === 0 ? '-' : '$' + price}}
          </option>
        </select>
      </div>
      <div class="inline-field">
        <input type="submit" class="search-submit" value="Search" />
        <input type="reset" class="search-submit" value="Reset" @click.prevent="reset" />
      </div>
      <p> <a href="#" class="bul">Advanced search</a><br />
        <a href="#" class="bul">Contact Customer Support</a> </p>
    </form>
  </div>
</div>
</template>

<script>
import products from '../data/Products';
import categories from '../data/Categories';

export default {
  components: {

  },
  props: ['categoryId', 'priceFrom', 'priceTo', 'keyWord'],
  watch: {
    categoryId(value) {
      this.currentCategoryId = value;
    },
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    keyWord(value) {
      this.currentKeyWord = value;
    },
  },
  data() {
    return {
      currentCategoryId: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentKeyWord: '',
    };
  },
  methods: {
    submit() {
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:keyWord', this.currentKeyWord);
    },
    reset() {
      this.$emit('update:categoryId', 0);
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:keyWord', '');
    },
  },
  computed: {
    filterRangePrice() {
      const prods = products;
      prods.sort((a, b) => a.price - b.price);
      const startPrice = Math.floor(prods[0].price);
      const endPrice = Math.ceil(prods[prods.length - 1].price);
      const range = [];
      const numberDigit = String(endPrice - startPrice).length;
      let step = (endPrice - startPrice) / 10;
      step /= (10 ** (numberDigit - 2));
      step = Math.round(step) * (10 ** (numberDigit - 2));
      range.push(0);
      let val = Math.floor(startPrice / 10 ** (numberDigit - 2)) * 10 ** (numberDigit - 2);
      while (val < endPrice) {
        range.push(val === 0 ? startPrice : val);
        val += step;
      }
      range.push(Math.ceil(endPrice));

      return range;
    },
    categories() {
      return categories;
    },
  },
};
</script>

<style lang="stylus">
.search { min-height:252px;}
.search label { display:block; padding-bottom:3px; }

.search .field { display:block; margin-bottom:10px; }
.search .inline-field label { display:inline; padding:0; }
.search .inline-field .field { display:inline; margin:0; }
.search input.field { width:206px; }
.search select.field { width:212px; }
.search select.small-field { width:60px; }

.search-submit {
  width:70px; background:#8b0000; border:0; color:#fff; height:27px;
  display:inline; line-height:26px; cursor:pointer; margin:12px 10px 10px 0px;}

.field { background:#ebebeb; border:solid 1px #dedede; padding:2px;}
</style>
