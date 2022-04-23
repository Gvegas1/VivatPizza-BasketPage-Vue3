<template>
  <section class="section-gifts">
    <h2 class="section-gifts__title">Подарки</h2>
    <div v-if="productsDataArray.length" class="gifts-list">
      <BasketCard
        :isSectionGifts="true"
        v-for="productsData in productsDataArray"
        :key="productsData.id"
        :basketCardData="productsData"
      />
    </div>
    <span v-else>При покупке от {{ minConditionPrice }} будет подарок...</span>
  </section>
</template>
<script>
import BasketCard from "@/components/basicApp/general/BasketCard.vue";

export default {
  components: {
    BasketCard,
  },
  props: {
    productsDataArray: {
      type: Array,
      default: () => [],
    },
    minConditionPrice: [String, Number],
  },
};
</script>
