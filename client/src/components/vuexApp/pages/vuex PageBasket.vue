<template>
  <div class="page-basket">
    <div class="container">
      <div class="page-basket__path-router-wrap path-router-wrap">
        <span class="path-router__text active">Корзина</span>
        <span class="path-router__rectangle"></span>
        <span class="path-router__text">Оформление заказа</span>
        <span class="path-router__rectangle"></span>
        <span class="path-router__text">Готово</span>
      </div>
      <div class="page-basket__main-content">
        <div>
          <SectionBasket />
          <SectionGifts />
        </div>
        <aside>
          <LoyaltySystemCard />
        </aside>
      </div>
    </div>
    <div class="page-basket__content-bottom">
      <SectionRecommendations />
      <div class="container">
        <NextPageBlock />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

import SectionBasket from "@/components/vuexApp/sections/vuex SectionBasket";
import SectionGifts from "@/components/vuexApp/sections/vuex SectionGifts";
import SectionRecommendations from "@/components/vuexApp/sections/vuex SectionRecommendations.vue";

import LoyaltySystemCard from "@/components/vuexApp/general/vuex LoyaltySystemCard";
import NextPageBlock from "@/components/vuexApp/general/vuex NextPageBlock.vue";

export default {
  components: {
    SectionBasket,
    SectionGifts,
    LoyaltySystemCard,
    SectionRecommendations,
    NextPageBlock,
  },
  methods: {
    ...mapActions({
      fetchBasketData: "products/fetchBasketData",
      fetchGiftsData: "products/fetchGiftsData",
    }),
  },
  mounted() {
    this.fetchBasketData();
    this.fetchGiftsData();
  },
};
</script>
