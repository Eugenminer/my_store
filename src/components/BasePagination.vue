<template>
<div class="pages">
  <div class="page"><a :class="{'pageActive': page === 1}"
    href="#" @Click.prevent="paginate(page-1)">&lt;</a></div>
  <div class="page" :key="'pageNum' + index" v-for="index in pages">
    <a href="#" :class="{'pageActive': page === index}" @Click.prevent="paginate(index)">
      {{index}}
    </a>
  </div>
  <div class="page"><a :class="{'pageActive': page === pages}"
    href="#" @Click.prevent="paginate(page+1)">&gt;</a></div>
</div>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'update:page',
  },
  props: ['page', 'count', 'perPages'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPages);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('update:page', page);
    },
  },
};
</script>

<style lang="stylus">
.pages {
  padding: 5px 0px 5px 0px;
}
.page {
  position: relative;
  display: inline;
  margin: 0 3% 0px 0px;
  font-weight: bold;
}
.page a {
    text-decoration: none;
}
.pageActive {
  position: relative;
  text-decoration: none;
  cursor: default;
  pointer-events: none;
  top: 3px;
  color: black;
}

</style>
