<template>
<main class="content container" v-if="this.$store.getters.stateLoadingOrder === 'ready'">
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
          Корзина
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          Оформление заказа
        </a>
      </li>
    </ul>

    <h1 class="content__title">
      Заказ оформлен <span>№ {{ this.$store.state.orderInfo.id }}</span>
    </h1>
  </div>

  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">
          Благодарим за&nbsp;выбор нашего магазина. На&nbsp;
          Вашу почту придет письмо с&nbsp;деталями заказа.
          Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;
          течение часа
          <span v-if="this.$store.state.orderInfo.deliveryType.id == 2">
           &nbsp;для уточнения деталей доставки
          </span>.
        </p>

        <ul class="dictionary">
          <li class="dictionary__item">
            <span class="dictionary__key">
              Получатель
            </span>
            <span class="dictionary__value">
              {{  this.$store.state.orderInfo.name }}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Адрес доставки
            </span>
            <span class="dictionary__value">
              {{  this.$store.state.orderInfo.address }}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Телефон
            </span>
            <span class="dictionary__value">
              {{  this.$store.state.orderInfo.phone }}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Email
            </span>
            <span class="dictionary__value">
              {{  this.$store.state.orderInfo.email }}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Способ оплаты
            </span>
            <span class="dictionary__value">
              {{ this.$store.state.orderInfo.paymentType }}
            </span>
          </li>
        </ul>
      </div>
      <OrderBill :deliveryCost="this.$store.state.orderInfo.deliveryType.price"
      :items="this.$store.state.orderInfo.basket.items" />
      <span class="dictionary__key">
        {{ this.$store.state.orderInfo.status.title }}
      </span>
    </form>
  </section>
</main>
<main class="content container" v-else>
  <PreLoader :state="this.$store.getters.stateLoadingOrder"/>
</main>
</template>

<script>
import OrderBill from '@/components/OrderBill.vue';
import PreLoader from '@/components/PreLoader.vue';

export default {
  components: {
    OrderBill,
    PreLoader,
  },
  methods: {
    loadOrder() {
      if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
        return;
      }
      this.$store.dispatch('loadOrderInfo', this.$route.params.id);
    },
  },
  created() {
    this.loadOrder();
  },
};
</script>
