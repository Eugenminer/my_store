<template>
<div class="box categories">
  <h2>Categories <span></span></h2>
  <div class="box-content">
    <ul>
      <li v-for="category in categories" :key="category.id">
        <a href="#" @click.prevent="changeCategory(category.id);"
        :class="{'categoryActive': category.id === categoryId}">
          {{category.title}}
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import categories from '../data/Categories';

export default {
  components: {

  },
  props: ['categoryId'],
  computed: {
    categories() {
      return categories;
    },
  },
  methods: {
    changeCategory(id) {
      this.$emit('update:categoryId', id);
    },
  },
};
</script>

<style lang="stylus">
.categories { min-height:383px; }
.categories ul { list-style-type: none; font-size:13px;}
.categories ul li{ border-bottom:dashed 1px #ccc; padding:5px 0;}
.categories ul li.last{ border-bottom:0; padding-bottom:0;}
.categories ul li a{
  color:#5f5f5f; text-decoration: none;
  background:url(.././assets/Images/cat.gif) no-repeat 0 4px; padding-left:17px;}
.categories ul li a.categoryActive{
  color:#000000; text-decoration: none;
  }
.categories ul li a.categoryActive:hover{ color:#000000; cursor: default; }
.categories ul li a:hover{ color:#8b0000; }

</style>
