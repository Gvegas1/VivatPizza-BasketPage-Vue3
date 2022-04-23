import axios from "axios";

export const productsModule = {
  namespaced: true,
  state: () => ({
    _pricesArray: [],
    totalCurrentPrice: null,
    totalPrevPrice: null,
    loyalitySystemPoints: 0,
    promocodeArray: [],
    promocodeSuccessItemID: null,
    conditionsSuccessItemsArray: [],
    sliderDataArray: [],
    productDialogItem: {},
    _basketDataArray: [],
    _giftsDataArray: [],
  }),
  getters: {
    getMinConditionPrice(state) {
      let minConditionPrice = state._giftsDataArray.map(
        ({ conditions }) => conditions.if_price_is_more
      );
      return Math.min(...minConditionPrice);
    },
    getSliderCardDataArray(state) {
      state.sliderDataArray.push(...state._basketDataArray);
      return state.sliderDataArray;
    },
    getTotalPrevPrice(state) {
      state.totalPrevPrice = state._pricesArray.reduce((a, b) => {
        let lastPrevPrice;
        if (b.lastPrevPrice === null) {
          lastPrevPrice = 0;
        } else {
          lastPrevPrice = b.lastPrevPrice;
        }
        return a + lastPrevPrice;
      }, 0);

      return state.totalPrevPrice;
    },
    getTotalCurrentPrice(state) {
      state.totalCurrentPrice = state._pricesArray.reduce(
        (a, b) => a + b.lastCurrentPrice,
        0
      );

      return state.totalCurrentPrice;
    },
    getLoyalitySystemPoints(state) {
      state.loyalitySystemPoints = Math.ceil(state.totalCurrentPrice * 0.1553);
      return state.loyalitySystemPoints;
    },
    getPromocodeArray(state) {
      state.promocodeArray = state._giftsDataArray.map(({ id, conditions }) => ({
        id,
        promocode: conditions.promocode,
      }));
      return state.promocodeArray;
    },
    getConditionsSuccessItemsArray(state) {
      let conditionSuccessPriceArray = state._giftsDataArray.map(
        (initialItem) => {
          if (
            initialItem.conditions.if_price_is_more < state.totalCurrentPrice
          ) {
            return initialItem;
          }
        }
      );
      let conditionSuccessPromocodeItem = state._giftsDataArray.filter(
        ({ id }) => id === state.promocodeSuccessItemID
      );

      state.conditionsSuccessItemsArray = [
        ...conditionSuccessPromocodeItem,
        ...conditionSuccessPriceArray.filter((item) => item),
      ];

      return state.conditionsSuccessItemsArray;
    },
  },
  mutations: {
    setProductDialogItem(state, id) {
      state.productDialogItem = state._basketDataArray.find(
        (item) => item.id === id
      );
    },
    setBasketDataArray(state, receivedData) {
      state._basketDataArray = receivedData;
    },
    setGiftsDataArray(state, receivedData) {
      state._giftsDataArray = receivedData;
    },
    setPricesArray(state, newValue) {
      if (state._pricesArray.some((item) => item.id === newValue.id)) {
        let index = state._pricesArray.findIndex(
          (item) => item.id === newValue.id
        );
        state._pricesArray.splice(index, 1);
      }
      state._pricesArray.push(newValue);
    },
    setPromocodeSuccessItemID(state, id) {
      state.promocodeSuccessItemID = id;
    },
    deleteCard(state, id) {
      state._basketDataArray = state._basketDataArray.filter(
        (item) => item.id !== id
      );
    },
    setNewBasketItem(state, newProduct) {
      let { priceData } = state._basketDataArray.find(
        ({ id }) => id === newProduct.id
      );

      let newProductData = {
        ...state._basketDataArray.find(({ id }) => id === newProduct.id),
        id: state._basketDataArray.length + 1,
        priceData: {
          ...priceData,
          currentPrice: newProduct.newProductTotalPrice,
        },
      };

      state._basketDataArray.push(newProductData);
    },
  },
  actions: {
    async fetchBasketData({ commit }) {
      try {
        const response = await axios.get("http://localhost:7000/products");
        commit("set_BasketDataArray", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchGiftsData({ commit }) {
      try {
        const response = await axios.get("http://localhost:7000/gifts");
        commit("set_GiftsDataArray", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
