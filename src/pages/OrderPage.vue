<template>
<main class="content container">
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
      Корзина
    </h1>
    <span class="content__info">
      {{ $store.getters.cartItemsCount}} товара
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
            <li class="options__item" v-for="(delivery, index) in deliveries"
            :key="'deleviry' + delivery.id">
              <label class="options__label" :for="'deleviry' + delivery.id">
                <input class="options__radio sr-only" type="radio"
                  name="delivery" :id="'deleviry' + delivery.id" :value="delivery"
                  v-model="deliveryItem" :checked="index == 0">
                <span class="options__value">
                  {{ delivery.title }}
                  <b v-if="delivery.price == 0">бесплатно</b>
                </span>
              </label>
            </li>
          </ul>
          <h3 class="cart__title">Оплата</h3>
          <ul class="cart__options options">
            <li class="options__item"
            v-for="(payType, index) in paymentTypes" :key="'pay'+payType.id">
              <label class="options__label" :for="'pay'+payType.id">
                <input class="options__radio sr-only" type="radio" name="pay"
                  :id="'pay'+payType.id" v-model="paymentType" :value="payType"
                  :checked="index == 0" />
                <span class="options__value">
                  {{ payType.title }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <OrderBill :deliveryCost="deliveryItem.price" :orderSending="orderSending"
      :items="this.$store.getters.cartDetailItems" />
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
      payType: '',
      deliveries: [],
      deliveryItem: {},
      paymentTypes: [],
      paymentType: {},
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
            {
              ...this.formData,
              deliveryTypeId: this.deliveryItem.id,
              paymentTypeId: this.paymentType.id,
            },
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
    loadDelivires() {
      axios
        .get(`${API_BASE_URL}/api/deliveries`)
        .then((response) => {
          this.deliveries = response.data;
          this.deliveryItem.id = this.deliveries[0].id;
          this.deliveryItem.title = this.deliveries[0].title;
          this.deliveryItem.price = this.deliveries[0].price;
          this.loadPaymentTypes();
        });
    },
    loadPaymentTypes() {
      axios
        .get(`${API_BASE_URL}/api/payments?deliveryTypeId=${this.deliveryItem.id}`)
        .then((response) => {
          this.paymentTypes = response.data;
          this.paymentType.id = this.paymentTypes[0].id;
          this.paymentType.title = this.paymentTypes[0].title;
        });
    },
  },
  watch: {
    deliveryItem() {
      this.loadPaymentTypes();
    },
  },
  created() {
    this.loadDelivires();
  },
};
</script>
