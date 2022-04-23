<template>
  <div class="basket-card">
    <div v-if="basketCardData.newProduct === true" class="new-product">NEW</div>
    <div
      :style="`background: url(${require('../../../static/img/BasketCardImages/' +
        basketCardData.img +
        '.jpg')}) 0 0 / cover no-repeat;`"
      class="basket-card__img"
    />
    <div class="basket-card__content-wrap">
      <button v-if="!isSectionGifts" @click="deleteCard" class="close-svg" />
      <div class="basket-card__text-wrap">
        <span class="basket-card__title">{{ basketCardData.name }}</span>
        <p class="basket-card__description">
          {{ basketCardData.description }}
        </p>
      </div>
      <div v-if="!isSectionGifts" class="basket-card__btns-price-wrap">
        <div class="basket-card__price">
          <div
            v-show="basketCardData.priceData.prevPrice !== null"
            class="text--muted"
          >
            {{ basketCardData.priceData.prevPrice }}
          </div>
          <div>{{ basketCardData.priceData.currentPrice }} ₽</div>
        </div>
        <div class="basket-card__price__btn-wrap">
          <button @click="decrement" class="btn left">-</button>
          <div class="basket-card__product-count">{{ count }}</div>
          <button @click="increment" class="btn right">+</button>
        </div>
        <div class="basket-card__price">
          <div
            v-show="basketCardData.priceData.prevPrice !== null"
            class="text--muted"
          >
            {{
              counterIsActive
                ? lastPrevPrice
                : basketCardData.priceData.prevPrice
            }}
          </div>
          <div>
            {{
              counterIsActive
                ? lastCurrentPrice
                : basketCardData.priceData.currentPrice
            }}
            ₽
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BasketCard",
  props: {
    basketCardData: {
      type: Object,
      default: () => {},
    },
    isSectionGifts: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lastPrevPrice: null,
      lastCurrentPrice: null,
      count: 1,
      counterIsActive: false,
    };
  },
  methods: {
    deleteCard() {
      this.$emit("totalPrices", {
        id: this.basketCardData.id,
        lastPrevPrice: 0,
        lastCurrentPrice: 0,
      });
      this.$emit("deleteCard", this.basketCardData.id);
    },
    increment() {
      this.counterIsActive = true;
      this.count += 1;
      this.lastPrevPrice = this.basketCardData.priceData.prevPrice * this.count;
      this.lastCurrentPrice =
        this.basketCardData.priceData.currentPrice * this.count;
    },
    decrement() {
      if (this.count <= 1) {
        this.deleteCard();
        return;
      }
      this.count -= 1;
      this.lastPrevPrice -= this.basketCardData.priceData.prevPrice;
      this.lastCurrentPrice -= this.basketCardData.priceData.currentPrice;
    },
  },
  mounted() {
    if (!this.isSectionGifts) {
      this.$emit("totalPrices", {
        id: this.basketCardData.id,
        lastPrevPrice: this.basketCardData.priceData.prevPrice,
        lastCurrentPrice: this.basketCardData.priceData.currentPrice,
      });
    }
  },
  updated() {
    if (!this.isSectionGifts) {
      this.$emit("totalPrices", {
        id: this.basketCardData.id,
        lastPrevPrice: this.lastPrevPrice,
        lastCurrentPrice: this.lastCurrentPrice,
      });
    }
  },
};
</script>
<style></style>
