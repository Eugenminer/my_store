import { createStore } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

const store = createStore(
  {
    state() {
      return {
        cartItems: [],
        userAccessKey: null,
        cartItemsData: [],
        orderInfo: null,
        productsLoading: false,
        productsLoadingFailed: false,
        orderLoading: false,
        orderLoadingFailed: false,
        colors: [],
      };
    },
    mutations: {
      resetCart(state) {
        state.cartItems = [];
        state.cartItemsData = [];
      },
      updateColors(state, colors) {
        state.colors = colors.items;
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
        const item = state.cartItems.find((el) => el.itemId === productId);
        item.amount = amount;
      },
      deleteProductFromCart(state, productId) {
        state.cartItems = state.cartItems.filter((el) => el.itemId !== productId);
      },
      updateCartItemsData(state, productsData) {
        state.cartItemsData = productsData;
      },
      updateUserAccessKey(state, userAccessKey) {
        state.userAccessKey = userAccessKey;
      },
      syncCartItem(state) {
        state.cartItems = state.cartItemsData.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        }));
      },
    },
    getters:
    {
      colors(state) {
        return state.colors;
      },
      cartDetailItems(state) {
        return state.cartItemsData;
      },
      cartItemsCount(state) {
        let count = 0;
        state.cartItems.forEach((item) => { count += item.quantity; });
        return count;
      },
      cartTotalPrice(state, getters) {
        const prods = getters.cartDetailItems;
        return prods.reduce((acc, item) => (item.price * item.quantity) + acc, 0);
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
      loadColors(context) {
        axios
          .get(`${API_BASE_URL}/api/colors`)
          .then((response) => {
            context.commit('updateColors', response.data);
          });
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
              context.commit('updateCartItemsData', response.data.items);
              context.commit('syncCartItem');
            })
            .catch(() => { context.commit('updateProductsLoadingFailed', true); })
            .then(() => { context.commit('updateProductsLoading', false); });
        }, 200);
      },
      addProductToCart(context, { productOfferId, colorId, quantity }) {
        return axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productOfferId,
            colorId,
            quantity,
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
            context.commit('updateCartItemsData', response.data.items);
            context.commit('syncCartItem');
          })
          .catch(() => { console.log([productOfferId, colorId, quantity]); });
      },
      updateProductToCart(context, { productId, amount }) {
        if (amount < 1) return {};

        context.commit('changeAmountProduct', { productId, amount });

        return axios
          .put(`${API_BASE_URL}/api/baskets/products`, {
            basketItemId: productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartItemsData', response.data.items);
            context.commit('syncCartItem');
          })
          .catch(() => { context.commit('syncCartItem'); });
      },
      deleteProductFromCart(context, productId) {
        context.commit('deleteProductFromCart', productId);

        const url = `${API_BASE_URL}/api/baskets/products`;
        //
        return axios
          .delete(url, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              basketItemId: productId,
            },
          })
          .then((response) => {
            context.commit('updateCartItemsData', response.data.items);
          })
          .catch(() => { context.commit('syncCartItem'); });
      },
    },
  },
);

export default store;
