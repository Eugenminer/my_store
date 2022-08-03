<template>
<main class="content container">
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link" href="index.html">
          Каталог
        </a>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link" href="cart.html">
          Корзина
        </a>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          Оформление заказа
        </a>
      </li>
    </ul>

    <h1 class="content__title">
      Корзина
    </h1>
    <span class="content__info">
      {{ this.$store.state.cartProductsData.length }} товара
    </span>
  </div>

  <section class="cart">
    <form class="cart__form form" action="#" method="POST" @submit.prevent="orderSend">
      <div class="cart__field">
        <div class="cart__data">
          <BaseFormText :error="formError.name" title="ФИО"
            placeholder="Введите ваше имя" v-model="formData.name" />

          <BaseFormText :error="formError.address" title="Адрес доставки"
            placeholder="Введите ваш адрес" v-model="formData.address" />

          <BaseFormText :error="formError.phone" title="Телефон"
            placeholder="Введите ваш телефон" v-model="formData.phone" type="tel" />

          <BaseFormText :error="formError.email" title="Email"
            placeholder="Введи ваш Email" v-model="formData.email" type="email" />

          <BaseFormTextarea :error="formError.comment" title="Комментарий к заказу"
            placeholder="Ваши пожелания" v-model="formData.comment" />
        </div>

        <div class="cart__options">
          <h3 class="cart__title">Доставка</h3>
          <ul class="cart__options options">
            <li class="options__item">
              <label class="options__label" for="deliveryPickup">
                <input class="options__radio sr-only" type="radio"
                  name="delivery" id="deliveryPickup" value="0"
                  v-model="deliveryCost" checked="">
                <span class="options__value">
                  Самовывоз <b>бесплатно</b>
                </span>
              </label>
            </li>
            <li class="options__item">
              <label class="options__label" for="deliveryCourier">
                <input class="options__radio sr-only" type="radio"
                  name="delivery" id="deliveryCourier" v-model="deliveryCost" value="500">
                <span class="options__value">
                  Курьером <b>500 ₽</b>
                </span>
              </label>
            </li>
          </ul>
          <h3 class="cart__title">Оплата</h3>
          <ul class="cart__options options">
            <li class="options__item">
              <label class="options__label" for="payCard">
                <input class="options__radio sr-only" type="radio" name="pay"
                  id="payCard" value="card">
                <span class="options__value">
                  Картой при получении
                </span>
              </label>
            </li>
            <li class="options__item">
              <label class="options__label" for="payCash">
                <input class="options__radio sr-only" type="radio" name="pay"
                  id="payCash" value="cash">
                <span class="options__value">
                  Наличными при получении
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <OrderBill :deliveryCost="deliveryCost" :orderSending="orderSending"
      :products="this.$store.state.cartProductsData"/>

      <div class="cart__error form__error-block" v-if="formErrorMessage">
        <h4>Заявка не отправлена!</h4>
        <p>
          {{ formErrorMessage }}
        </p>
      </div>
    </form>
  </section>
</main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import OrderBill from '@/components/OrderBill.vue';

export default {
  components: {
    BaseFormText, BaseFormTextarea, OrderBill,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderSending: false,
      deliveryCost: 0,
    };
  },
  methods: {
    orderSend() {
      this.orderSending = true;
      this.formErrorMessage = '';
      this.formError = {};
      clearTimeout(this.sendOrderTimer);
      this.sendOrderTimer = setTimeout(() => {
        axios
          .post(
            `${API_BASE_URL}/api/orders`,
            { ...this.formData },
            {
              params: {
                userAccessKey: this.$store.state.userAccessKey,
              },
            },
          )
          .then((response) => {
            this.$store.commit('updateOrderInfo', response.data);
            this.$store.commit('resetCart');
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
          .then(() => {
            this.orderSending = false;
          });
      }, 200);
    },
  },
};
</script>
