<template>
  <section class="section-basket">
    <div v-if="productsDataArray.length" class="basket-card-list">
      <BasketCard
        v-for="productsData in productsDataArray"
        :key="productsData.id"
        :basketCardData="productsData"
        @totalPrices="(totalPrices) => $emit('totalPrices', totalPrices)"
        @deleteCard="(id) => $emit('deleteCard', id)"
      />
    </div>
    <span v-else>Корзина пуста :(</span>
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
  },
};
</script>
<style></style>
