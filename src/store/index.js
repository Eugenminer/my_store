import { createStore } from 'vuex';
import products from '@/data/Products';

const store = createStore(
  {
    state() {
      return {
        cartProducts: [{ productId: 1, amount: 3 }],
      };
    },
    mutations: {
      addProductToCart(state, { productId, amount }) {
        const item = state.cartProducts.find((el) => el.productId === productId);

        if (item) item.amount += amount;
        else state.cartProducts.push({ productId, amount });
      },
      changeAmountProduct(state, { productId, amount }) {
        const item = state.cartProducts.find((el) => el.productId === productId);
        item.amount = amount;
      },
      deleteProductFromCart(state, productId) {
        state.cartProducts = state.cartProducts.filter((el) => el.productId !== productId);
      },
    },
    getters:
    {
      cartDetailProducts(state) {
        return state.cartProducts.map((item) => ({
          ...item,
          product: products.find((el) => el.id === item.productId),
        }));
      },
      cartTotalPrice(state, getters) {
        const prods = getters.cartDetailProducts;
        return prods.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      },
    },
  },
);

export default store;
