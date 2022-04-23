<template>
  <section class="section-gifts">
    <h2 @click="logD" class="section-gifts__title">Подарки</h2>
    <div v-if="getConditionsSuccessItemsArray.length" class="gifts-list">
      <BasketCard
        :isSectionGifts="true"
        v-for="productsData in getConditionsSuccessItemsArray"
        :key="productsData.id"
        :basketCardData="productsData"
      />
    </div>
    <span v-else
      >При покупке от {{ getMinConditionPrice }} будет подарок...</span
    >
  </section>
</template>
<script>
import { mapState, mapGetters } from "vuex";

import BasketCard from "@/components/vuexApp/general/vuex BasketCard.vue";

export default {
  components: {
    BasketCard,
  },
  methods: {
    logD() {
      console.log(this.getConditionsSuccessItemsArray);
    },
  },
  computed: {
    ...mapGetters({
      getMinConditionPrice: "products/getMinConditionPrice",
      getConditionsSuccessItemsArray: "products/getConditionsSuccessItemsArray",
    }),
    ...mapState({
      giftsDataArray: (state) => state.products.giftsDataArray,
    }),
  },
};
</script>
