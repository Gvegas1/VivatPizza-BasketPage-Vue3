<template>
  <div class="next-page-block">
    <div class="next-page-block__text">
      Сумма заказа:
      <span class="text--muted">{{ totalPrices.totalPrevPrice }}</span>
      {{ totalPrices.totalCurrentPrice }} ₽
    </div>
    <button class="btn btn_bg next-page-block__btn">Далее</button>
  </div>
</template>
<script>
export default {
  name: "NextPageBlock",
  props: {
    totalPrices: {
      type: Object,
      required: true,
    },
  },
};
</script>
