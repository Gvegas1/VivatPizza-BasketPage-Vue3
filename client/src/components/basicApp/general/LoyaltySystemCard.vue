<template>
  <div class="loyalty-system-card">
    <div class="loyalty-system-card__description-wrap">
      <div class="loyalty-system-card__title">
        +{{ loyalitySystemPoints }} баллов
      </div>
      <p class="loyalty-system-card__description">
        Баллы начисляются в течении двух дней и доступны для использования при
        заказе от 500 руб. Только для зарегистрированных пользователей.
        <span> Зарегистрируйтесь или войдите. </span>
      </p>
    </div>
    <form @submit.prevent class="promocode-form">
      <label for="promocode-input">Промокод</label>
      <input
        v-model="promocodeInputValue"
        name="promocode-input"
        type="text"
        placeholder="Промокод"
      />
      <button @click="setPromocodeInputSuccessItem" class="btn">
        Применить
      </button>
    </form>
    <NextPageBlock :totalPrices="totalPrices" />
  </div>
</template>
<script>
import NextPageBlock from "./NextPageBlock.vue";

export default {
  name: "LoyaltySystemCard",
  components: {
    NextPageBlock,
  },
  props: {
    totalPrices: {
      type: Object,
      default: () => {},
    },
    promocodeArray: {
      type: Array,
      default: () => [],
    },
    loyalitySystemPoints: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      promocodeInputValue: "",
      promocodeInputSuccessItem: null,
    };
  },
  computed: {
    setPromocodeInputSuccessItem() {
      this.promocodeInputSuccessItem = this.promocodeArray.map(
        ({ id, promocode }) => {
          if (this.promocodeInputValue === promocode) {
            return id;
          }
        }
      );
      this.promocodeInputSuccessItem = this.promocodeInputSuccessItem.filter(
        (item) => item !== undefined
      );

      this.$emit("promocodeSuccessItem", this.promocodeInputSuccessItem[0]);
    },
  },
};
</script>
<style></style>
