<template>
  <div class="slider-card">
    <div v-if="productData.newProduct" class="new-product">NEW</div>
    <div
      :style="`background: url(${require('../../../../static/img/BasketCardImages/' +
        productData.img +
        '.jpg')}) 0 15% / cover no-repeat;`"
      class="slider-card__img"
    />
    <div class="slider-card__content-wrap">
      <span class="slider-card__title">{{ productData.name }}</span>
      <p class="slider-card__description">{{ productData.description }}</p>
      <button @click="setProductID" class="slider-card__btn btn">
        от {{ productData.priceData.currentPrice }} ₽
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SliderCard",
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setShowForProductDialog() {
      this.$emit("dialogVisible", true);
    },
    setProductID() {
      this.setShowForProductDialog();
      this.$emit("selectedProductID", this.productData.id);
    },
  },
};
</script>
<style></style>
