<template>
<main class="content container" v-if="stateLoadingCart !== 'ready'">
  <PreLoader :state="stateLoadingCart" @reload="loadCart" />
</main>
<main class="content container" v-else>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          Корзина
        </a>
      </li>
    </ul>

    <h1 class="content__title">
      Корзина
    </h1>
    <span class="content__info" v-if="$store.getters.cartDetailItems.length > 0">
      {{ $store.getters.cartItemsCount }} товара
    </span>
    <span class="content__info" v-else>
      Ваша корзина пуста
    </span>
  </div>

  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <ul class="cart__list">
          <CartItem :item="item" v-for="item in items"
            :key="'cartItem' + item.id"  />
        </ul>
      </div>

      <div class="cart__block">
        <p class="cart__desc">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
          Итого: <span>{{ formatPrice(totalPrice) }} ₽</span>
        </p>
        <router-link :to="{name: 'order'}" v-if="$store.getters.cartDetailItems.length > 0">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </router-link>
      </div>
    </form>
  </section>
</main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import PreLoader from '@/components/PreLoader.vue';

export default {
  components: {
    CartItem,
    PreLoader,
  },
  methods: {
    ...mapActions(['loadCart']),
    formatPrice(price) {
      return numberFormat(price);
    },
  },
  computed: {
    ...mapGetters({
      items: 'cartDetailItems',
      totalPrice: 'cartTotalPrice',
      stateLoadingCart: 'stateLoadingCart',
    }),
  },
};
</script>
