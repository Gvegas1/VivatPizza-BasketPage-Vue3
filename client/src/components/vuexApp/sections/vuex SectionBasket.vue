<template>
  <section class="section-basket">
    <div v-if="basketDataArray.length" class="basket-card-list">
      <BasketCard
        v-for="productsData in basketDataArray"
        :key="productsData.id"
        :basketCardData="productsData"
        @deleteCard="deleteCard"
      />
    </div>
    <span v-else>Корзина пуста :(</span>
  </section>
</template>
<script>
import { mapState, mapMutations } from "vuex";

import BasketCard from "@/components/vuexApp/general/vuex BasketCard.vue";
export default {
  components: {
    BasketCard,
  },
  methods: {
    ...mapMutations({
      deleteCard: "products/deleteCard",
    }),
  },
  computed: {
    ...mapState({
      basketDataArray: (state) => state.products.basketDataArray,
    }),
  },
};
</script>
<style></style>
