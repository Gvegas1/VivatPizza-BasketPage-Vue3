<template>
  <section class="section-recommendations">
    <div class="container">
      <h2 class="section-recommendations__title">Рекомендуем</h2>
    </div>
    <ProductDialog
      :productData="productDialogItem"
      v-model:show="dialogVisible"
      @setNewProduct="setNewProduct"
    />
    <Slider
      :productsDataArray="basketDataArray"
      @dialogVisible="setDialogVisible"
      @selectedProductID="setProductDialogItem"
    />
  </section>
</template>
<script>
import { mapState, mapMutations } from "vuex";

import Slider from "@/components/vuexApp/general/vuex Slider/vuex Slider.vue";
import ProductDialog from "@/components/vuexApp/general/vuex ProductDialog/vuex ProductDialog.vue";

export default {
  components: {
    Slider,
    ProductDialog,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setProductDialogItem: "products/setProductDialogItem",
      setNewProduct: "products/setNewProduct",
    }),
    setDialogVisible(value) {
      this.dialogVisible = value;
    },
  },
  computed: {
    ...mapState({
      basketDataArray: (state) => state.products.basketDataArray,
      productDialogItem: (state) => state.products.productDialogItem,
    }),
  },
};
</script>
<style></style>
