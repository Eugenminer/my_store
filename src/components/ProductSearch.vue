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
      <br>
      <div class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="'color' + color.id">
            <label class="colors__label" :for="'color' + color.id">
              <input class="colors__radio sr-only" type="radio"
              :id="'color' + color.id" name="color" :value="color.id" v-model="currentColorId">
              <span class="colors__value" v-bind:style="{ backgroundColor: color.code,}">
            </span></label>
          </li>
        </ul>
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
import colors from '../data/Colors';

export default {
  components: {

  },
  props: ['categoryId', 'priceFrom', 'priceTo', 'keyWord', 'colorId'],
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
      currentColorId: 0,
    };
  },
  methods: {
    submit() {
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:keyWord', this.currentKeyWord);
      this.$emit('update:colorId', this.currentColorId);
    },
    reset() {
      this.$emit('update:categoryId', 0);
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:keyWord', '');
      this.$emit('update:colorId', 0);

      this.currentCategoryId = 0;
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentKeyWord = '';
      this.currentColorId = 0;
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
    colors() {
      return colors;
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

.form__block{border:0;padding:0;margin:0 0 35px}
form__legend{margin-bottom:12px;font-size:14px;line-height:1}
.form__label{position:relative;display:block;background-color:#000; color:#737373}
.form__label:not(:last-child){margin-bottom:25px}
.colors{
  margin:0;padding:0;list-style:none;--border-color: #000;
  display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;
  -ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap
}
.colors--black{--border-color: #555}
.colors__item:not(:last-child){margin-right:4px}
.colors__label{position:relative;cursor:pointer;display:block;border-radius:50%;padding:3px}
.colors__value,.colors__value::before{
  border-radius:50%;-webkit-transition:all .2s ease;
  border: solid 1px black;
  transition:all .2s ease
}
.colors__value{display:block;width:20px;height:20px}
.colors__value::before{
  content:'';position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);
  transform:translate(-50%,-50%);width:26px;height:26px;border:1px solid transparent
}
.colors__label:focus .colors__value::before,
  .colors__label:hover .colors__value::before,
  .colors__radio:checked~.colors__value::before{
    border-color:var(--border-color)
  }
.colors__radio:focus~.colors__value::before{opacity:.7}
.sr-only{
  position:absolute;width:1px;height:1px;
  margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0,0,0,0)
}
</style>
