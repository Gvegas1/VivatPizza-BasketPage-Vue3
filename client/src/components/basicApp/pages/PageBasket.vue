<template>
  <div class="page-basket">
    <div class="container">
      <div class="page-basket__path-router-wrap path-router-wrap">
        <span class="path-router__text active">Корзина</span>
        <span class="path-router__rectangle"></span>
        <span class="path-router__text">Оформление заказа</span>
        <span class="path-router__rectangle"></span>
        <span class="path-router__text">Готово</span>
      </div>
      <div class="page-basket__main-content">
        <div>
          <SectionBasket
            :productsDataArray="basketDataArray"
            @totalPrices="setPricesArray"
            @deleteCard="deleteCard"
          />
          <SectionGifts
            :minConditionPrice="setMinConditionPrice()"
            :productsDataArray="setConditionsSuccessItemsArray"
          />
        </div>
        <aside>
          <LoyaltySystemCard
            :totalPrices="setTotalPrices"
            :loyalitySystemPoints="setLoyalitySystemPoints"
            :promocodeArray="setPromocodeArray"
            @promocodeSuccessItem="setPromocodeSuccessItemID"
          />
        </aside>
      </div>
    </div>
    <div class="page-basket__content-bottom">
      <SectionRecommendations
        :productsDataArray="setSliderCardDataArray"
        @selectedProductID="setProductItemForProductDialog"
        :productItemForProductDialog="productItemForProductDialog"
        @setNewProduct="setNewProduct"
      />
      <div class="container">
        <NextPageBlock :totalPrices="setTotalPrices" />
      </div>
    </div>
  </div>
</template>
<script>
import { useCardData } from "@/hooks/useCardData";

import SectionBasket from "@/components/basicApp/sections/SectionBasket";
import SectionGifts from "@/components/basicApp/sections/SectionGifts";
import SectionRecommendations from "@/components/basicApp/sections/SectionRecommendations.vue";

import LoyaltySystemCard from "@/components/basicApp/general/LoyaltySystemCard";
import NextPageBlock from "@/components/basicApp/general/NextPageBlock.vue";

export default {
  components: {
    SectionBasket,
    SectionGifts,
    LoyaltySystemCard,
    SectionRecommendations,
    NextPageBlock,
  },
  data() {
    return {
      pricesArray: [],
      totalCurrentPrice: null,
      totalPrevPrice: null,
      loyalitySystemPoints: 0,
      promocodeArray: [],
      promocodeSuccessItemID: null,
      conditionSuccessItemsPriceArray: [],
      conditionsSuccessItemsArray: [],
      sliderDataArray: [],
      productItemForProductDialog: {},
    };
  },
  mounted() {},
  setup() {
    const PRODUCTS_PATH = "products";
    const GIFTS_PATH = "gifts";

    const basketDataArray = (() => {
      const { productsDataArray } = useCardData(PRODUCTS_PATH);
      return productsDataArray;
    })();
    const giftsDataArray = (() => {
      const { productsDataArray } = useCardData(GIFTS_PATH);
      return productsDataArray;
    })();

    return {
      basketDataArray,
      giftsDataArray,
    };
  },
  methods: {
    setPricesArray(newValue) {
      if (this.pricesArray.some((item) => item.id === newValue.id)) {
        let index = this.pricesArray.findIndex(
          (item) => item.id === newValue.id
        );
        this.pricesArray.splice(index, 1);
      }
      this.pricesArray.push(newValue);
    },
    setPromocodeSuccessItemID(id) {
      this.promocodeSuccessItemID = id;
    },
    setMinConditionPrice() {
      let minConditionPrice = this.giftsDataArray.map(
        ({ conditions }) => conditions.if_price_is_more
      );
      return Math.min(...minConditionPrice);
    },
    deleteCard(id) {
      this.basketDataArray = this.basketDataArray.filter(
        (item) => item.id !== id
      );
    },
    setProductItemForProductDialog(id) {
      this.productItemForProductDialog = this.basketDataArray.find(
        (item) => item.id === id
      );
    },
    setNewProduct(newProduct) {
      let { priceData } = this.basketDataArray.find(
        ({ id }) => id === newProduct.id
      );

      let newProductData = {
        ...this.basketDataArray.find(({ id }) => id === newProduct.id),
        id: this.basketDataArray.length + 1,
        priceData: {
          ...priceData,
          currentPrice: newProduct.newProductTotalPrice,
        },
      };

      this.basketDataArray.push(newProductData);
    },
  },
  computed: {
    setSliderCardDataArray() {
      this.sliderDataArray.push(...this.basketDataArray);
      return this.sliderDataArray;
    },
    setTotalPrices() {
      this.totalCurrentPrice = this.pricesArray.reduce(
        (a, b) => a + b.lastCurrentPrice,
        0
      );

      this.totalPrevPrice = this.pricesArray.reduce((a, b) => {
        let lastPrevPrice;
        if (b.lastPrevPrice === null) {
          lastPrevPrice = 0;
        } else {
          lastPrevPrice = b.lastPrevPrice;
        }
        return a + lastPrevPrice;
      }, 0);

      return {
        totalCurrentPrice: this.totalCurrentPrice,
        totalPrevPrice: this.totalPrevPrice,
      };
    },
    setLoyalitySystemPoints() {
      this.loyalitySystemPoints = Math.ceil(
        this.setTotalPrices.totalCurrentPrice * 0.1553
      );
      return this.loyalitySystemPoints;
    },
    setPromocodeArray() {
      this.promocodeArray = this.giftsDataArray.map(({ id, conditions }) => ({
        id,
        promocode: conditions.promocode,
      }));
      return this.promocodeArray;
    },
    setConditionsSuccessItemsArray() {
      this.conditionSuccessItemsPriceArray = this.giftsDataArray.map(
        (initialItem) => {
          if (
            initialItem.conditions.if_price_is_more <
            this.setTotalPrices.totalCurrentPrice
          ) {
            return initialItem;
          }
        }
      );

      this.conditionsSuccessItemsArray = [
        ...this.giftsDataArray.filter(
          ({ id }) => id === this.promocodeSuccessItemID
        ),
        ...this.conditionSuccessItemsPriceArray.filter(
          (item) => item !== undefined
        ),
      ];

      return this.conditionsSuccessItemsArray;
    },
  },
};
</script>
