<template>
  <div class="slider">
    <div @click="goLeft" class="slider-btn left">
      <div class="slider-arrow"></div>
    </div>
    <div
      ref="slider_wrap"
      class="slider-wrap"
      :style="`transform: translateX(${translateX}px);  min-width: ${sliderWindowWidth}px;`"
    >
      <SliderCard
        v-for="productData in productsDataArray"
        :key="productData"
        :productData="productData"
        @dialogVisible="(boolean) => $emit('dialogVisible', boolean)"
        @selectedProductID="(id) => $emit('selectedProductID', id)"
        :style="`margin-right: ${marginRight}px; min-width: ${sliderItemWidth}px;
      max-width: ${sliderItemWidth}px`"
      />
    </div>
    <div @click="goRight" class="slider-btn right">
      <div class="slider-arrow"></div>
    </div>
  </div>
</template>
<script>
import SliderCard from "./vuex SliderCard.vue";

export default {
  components: {
    SliderCard,
  },
  props: {
    productsDataArray: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      translateX: 30,
      step: 300,
      sliderItemWidth: 330,
      sliderWindowWidth: null,
      sliderTotalWidth: null,
      marginRight: 16,
      rightBorder: null,
      leftBorder: null,
    };
  },
  methods: {
    goLeft() {
      if (this.translateX >= this.leftBorder) {
        this.translateX = this.leftBorder;
        return;
      }
      this.translateX += this.step;
    },
    goRight() {
      if (this.translateX <= this.rightBorder) {
        this.translateX = this.rightBorder - this.marginRight * 3;
        return;
      }
      this.translateX -= this.step;
    },
  },
  mounted() {
    this.sliderWindowWidth = 4 * (this.sliderItemWidth + this.marginRight);
    this.leftBorder = this.sliderItemWidth - this.step;
  },
  updated() {
    this.sliderTotalWidth =
      this.productsDataArray.length * (this.sliderItemWidth + this.marginRight);
    this.rightBorder = this.sliderWindowWidth - this.sliderTotalWidth;
  },
};
</script>
<style></style>
