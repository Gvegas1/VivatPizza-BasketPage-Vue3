<template>
  <div class="next-page-block">
    <div class="next-page-block__text">
      Сумма заказа:
      <span class="text--muted">{{ getTotalPrevPrice }}</span>
      {{ getTotalCurrentPrice }} ₽
    </div>
    <button class="btn btn_bg next-page-block__btn">Далее</button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "NextPageBlock",
  data() {
    return {
      totalPrevPrice: null,
      totalCurrentPrice: null,
    };
  },
  computed: {
    ...mapGetters({
      getTotalPrevPrice: "products/getTotalPrevPrice",
      getTotalCurrentPrice: "products/getTotalCurrentPrice",
    }),
  },
};
</script>
