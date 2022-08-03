import { createStore } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

const store = createStore(
  {
    state() {
      return {
        cartProducts: [],
        userAccessKey: null,
        cartProductsData: [],
        orderInfo: null,
        productsLoading: false,
        productsLoadingFailed: false,
        orderLoading: false,
        orderLoadingFailed: false,
      };
    },
    mutations: {
      resetCart(state) {
        state.cartProducts = [];
        state.cartProductsData = [];
      },
      updateOrderInfo(state, orderInfo) {
        state.orderInfo = orderInfo;
      },
      updateProductsLoading(state, value) {
        state.productsLoading = value;
      },
      updateProductsLoadingFailed(state, value) {
        state.productsLoadingFailed = value;
      },
      updateOrderLoading(state, value) {
        state.orderLoading = value;
      },
      updateOrderLoadingFailed(state, value) {
        state.orderLoadingFailed = value;
      },
      changeAmountProduct(state, { productId, amount }) {
        const item = state.cartProducts.find((el) => el.productId === productId);
        item.amount = amount;
      },
      deleteProductFromCart(state, productId) {
        state.cartProducts = state.cartProducts.filter((el) => el.productId !== productId);
      },
      updateCartProductsData(state, productsData) {
        state.cartProductsData = productsData;
      },
      updateUserAccessKey(state, userAccessKey) {
        state.userAccessKey = userAccessKey;
      },
      syncCartProduct(state) {
        state.cartProducts = state.cartProductsData.map((item) => ({
          productId: item.product.id,
          amount: item.quantity,
        }));
      },
    },
    getters:
    {
      cartDetailProducts(state) {
        const products = state.cartProducts.map((item) => ({
          ...item,
          product: state.cartProductsData.find(
            (p) => p.product.id === item.productId,
          ).product,
        }));

        return products.map((item) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image.file.url,
          },
        }));
      },
      cartTotalPrice(state, getters) {
        const prods = getters.cartDetailProducts;
        return prods.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      },
      stateLoadingCart(state) {
        if (state.productsLoadingFailed) return 'error';
        if (state.productsLoading) return 'loading';
        return 'ready';
      },
      stateLoadingOrder(state) {
        if (state.orderLoadingFailed) return 'notFound';
        if (state.orderLoading) return 'loading';
        return 'ready';
      },
    },
    actions: {
      loadOrderInfo(context, orderId) {
        context.commit('updateOrderLoading', true);
        context.commit('updateOrderLoadingFailed', false);
        clearTimeout(this.loadOrderTimer);
        this.loadOrderTimer = setTimeout(() => {
          axios
            .get(`${API_BASE_URL}/api/orders/${orderId}`, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              context.commit('updateOrderInfo', response.data);
            })
            .catch(() => { context.commit('updateOrderLoadingFailed', true); })
            .then(() => { context.commit('updateOrderLoading', false); });
        }, 200);
      },
      loadCart(context) {
        context.commit('updateProductsLoading', true);
        context.commit('updateProductsLoadingFailed', false);
        clearTimeout(this.loadCartTimer);
        this.loadCartTimer = setTimeout(() => {
          axios
            .get(`${API_BASE_URL}/api/baskets`, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
              }
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProduct');
            })
            .catch(() => { context.commit('updateProductsLoadingFailed', true); })
            .then(() => { context.commit('updateProductsLoading', false); });
        }, 200);
      },
      addProductToCart(context, { productId, amount }) {
        return axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProduct');
          });
      },
      updateProductToCart(context, { productId, amount }) {
        if (amount < 1) return {};

        context.commit('changeAmountProduct', { productId, amount });

        return axios
          .put(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
          })
          .catch(() => { context.commit('syncCartProduct'); });
      },
      deleteProductFromCart(context, productId) {
        context.commit('deleteProductFromCart', productId);

        const url = 'https://vue-study.skillbox.cc/api/baskets/products';
        // `${API_BASE_URL}/api/baskets/products`
        return axios
          .delete(url, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId,
            },
          })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
          })
          .catch(() => { context.commit('syncCartProduct'); });
      },
    },
  },
);

export default store;
