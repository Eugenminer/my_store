<template>
<ul class="catalog__pagination pagination">
  <li class="pagination__item">
    <a class="pagination__link pagination__link--arrow"
      :class="{'pagination__link--disabled': currentPage === 1}"
      href="#" @Click.prevent="paginate(currentPage-1)" aria-label="Предыдущая страница">
      <svg width="8" height="14" fill="currentColor">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
    </a>
  </li>
  <li class="pagination__item" :key="'pageNum' + index" v-for="index in pages">
    <a href="#" class="pagination__link"
      :class="{'pagination__link--current': currentPage === index}"
      @Click.prevent="paginate(index)">
      {{index}}
    </a>
  </li>
  <li class="pagination__item">
    <a class="pagination__link pagination__link--arrow"
    :class="{'pagination__link--disabled': currentPage === pages}" href="#"
    @Click.prevent="paginate(currentPage+1)" aria-label="Следующая страница">
      <svg width="8" height="14" fill="currentColor">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
</ul>
</template>

<script>
export default {
  watch: {
    currentPage(value) {
      this.$emit('update:page', value);
    },
    page(value) {
      this.currentPage = value;
    },
  },
  model: {
    prop: 'page',
    event: 'update:page',
  },
  data() {
    return {
      currentPage: this.page,
    };
  },
  props: ['page', 'count', 'perPages'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPages);
    },
  },
  methods: {
    paginate(page) {
      if (page > 0 && page <= this.pages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
