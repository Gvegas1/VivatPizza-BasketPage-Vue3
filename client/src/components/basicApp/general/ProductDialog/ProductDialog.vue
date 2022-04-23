<template>
  <div v-if="show === true" class="dialog-background" @click.stop="hideDialog">
    <div @click.stop class="dialog">
      <div class="dialog__content">
        <div>
          <div
            :style="`background: url(${require('../../../../static/img/BasketCardImages/' +
              productData.img +
              '.jpg')}) 0 0 / cover no-repeat;`"
            class="dialog__img"
          ></div>
          <div>
            <div class="dialog__radio-btn-wrap radio-btn_product-size">
              <div
                :style="`transform: translateX(${selectedSizeTrasnform.translateX}px) scaleX(${selectedSizeTrasnform.scaleX})`"
                class="selected-radio-btn_bg"
              ></div>
              <button @click="goLeftProductSize">
                Большая <span class="text--muted">(36 см)</span>
              </button>
              <button @click="goMiddleProductSize">
                Средняя<span class="text--muted">(36 см)</span>
              </button>
              <button @click="goRightProductSize">
                Маленькая<span class="text--muted">(36 см)</span>
              </button>
            </div>
            <div class="dialog__radio-btn-wrap">
              <div
                :style="`transform: translateX(${selectedDoughTranslateX}px)`"
                class="selected-radio-btn_bg"
              ></div>
              <button class="btn_dough" @click="goLeftDoughSize">
                Тонкое <span class="text--muted">565г</span>
              </button>
              <button class="btn_dough" @click="goRightDoughSize">
                Пышное <span class="text--muted">820г</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <span class="dialog__title">{{ productData.name }}</span>
          <p class="dialog__description">
            {{ productData.description }}
            <br />
            <span>На 100г. продукта:</span>
            <br />
            <span> К - {{ productData.calories_data.calories }} ккал; </span>
            <span> Б - {{ productData.calories_data.albumen }} г; </span>
            <span> Ж - {{ productData.calories_data.fats }} г; </span>
            <span> У - {{ productData.calories_data.carbohydrates }} г; </span>
          </p>
          <div>
            <span class="dialog__modifiers__btn-wrap-title"
              >Добавить ингредиенты</span
            >
            <div class="dialog__modifiers__btn-wrap">
              <ModifierButton
                v-for="modifier in productData.modifiers"
                :key="modifier.id"
                :modifierData="modifier"
                @modifierLastPrice="setModifierLastPricesArray"
              />
            </div>
          </div>
        </div>
      </div>
      <button @click="setNewProduct" class="dialog__btn-success btn btn_bg">
        <span>В корзину</span>
        <span v-if="productData.priceData.prevPrice">
          <span class="dotted"></span>
          <span class="text--muted">940</span>
        </span>
        <span class="dotted"></span>
        <span
          >{{
            setNewProductTotalPrice()
              ? setNewProductTotalPrice()
              : productData.priceData.currentPrice
          }}
          P</span
        >
      </button>
    </div>
  </div>
</template>
<script>
import toggleMixin from "@/mixins/toggleMixin";

import ModifierButton from "./ModifierButton.vue";

export default {
  name: "ProductDialog",
  components: {
    ModifierButton,
  },
  props: {
    productData: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      selectedSizeTrasnform: {
        translateX: -6,
        scaleX: 0.61,
      },
      selectedDoughTranslateX: -105,
      modifierLastPricesArray: [],
      modifiersTotalPrice: null,
      newProductTotalPrice: null,
    };
  },
  mixins: [toggleMixin],
  methods: {
    setModifierLastPricesArray(value) {
      if (this.modifierLastPricesArray.some(({ id }) => id === value.id)) {
        let index = this.modifierLastPricesArray.findIndex(
          ({ id }) => id === value.id
        );
        this.modifierLastPricesArray.splice(index, 1);
      }
      this.modifierLastPricesArray.push(value);
    },
    setNewProductTotalPrice() {
      this.newProductTotalPrice =
        this.productData.priceData.currentPrice + this.setModifiersTotalPrice;
      return this.newProductTotalPrice;
    },
    setNewProduct() {
      this.$emit("setNewProduct", {
        id: this.productData.id,
        newProductTotalPrice: this.setNewProductTotalPrice()
          ? this.setNewProductTotalPrice()
          : this.productData.priceData.currentPrice,
      });
      this.hideDialog();
    },
    goLeftProductSize() {
      this.selectedSizeTrasnform.translateX = -142;
      this.selectedSizeTrasnform.scaleX = 0.65;
    },
    goMiddleProductSize() {
      this.selectedSizeTrasnform.translateX = -6;
      this.selectedSizeTrasnform.scaleX = 0.61;
    },
    goRightProductSize() {
      this.selectedSizeTrasnform.translateX = 135;
      this.selectedSizeTrasnform.scaleX = 0.72;
    },
    goLeftDoughSize() {
      this.selectedDoughTranslateX = -105;
    },
    goRightDoughSize() {
      this.selectedDoughTranslateX = 105;
    },
  },
  computed: {
    setModifiersTotalPrice() {
      this.modifiersTotalPrice = this.modifierLastPricesArray.reduce(
        (a, b) => a + b.modifierLastPrice,
        0
      );
      return this.modifiersTotalPrice;
    },
  },
};
</script>
<style></style>
