<template>
  <section class="section-recommendations">
    <div class="container">
      <h2 class="section-recommendations__title">Рекомендуем</h2>
    </div>
    <ProductDialog
      :productData="productItemForProductDialog"
      v-model:show="dialogVisible"
      @setNewProduct="(newProduct) => $emit('setNewProduct', newProduct)"
    />
    <Slider
      @dialogVisible="setDialogVisible"
      @selectedProductID="(id) => $emit('selectedProductID', id)"
      :productsDataArray="productsDataArray"
    />
  </section>
</template>
<script>
import Slider from "@/components/basicApp/general/Slider/Slider.vue";
import ProductDialog from "@/components/basicApp/general/ProductDialog/ProductDialog.vue";

export default {
  components: {
    Slider,
    ProductDialog,
  },
  props: {
    productsDataArray: {
      type: Array,
      default: () => [],
    },
    productItemForProductDialog: {
      type: Object,
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    setDialogVisible(value) {
      this.dialogVisible = value;
    },
  },
};
</script>
<style></style>
