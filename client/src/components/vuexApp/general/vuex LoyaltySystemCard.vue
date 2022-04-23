<template>
  <div class="loyalty-system-card">
    <div class="loyalty-system-card__description-wrap">
      <div class="loyalty-system-card__title">
        +{{ getLoyalitySystemPoints }} баллов
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
      <button @click="setPromocodeInputSuccessItemID" class="btn">
        Применить
      </button>
    </form>
    <NextPageBlock />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

import NextPageBlock from "./vuex NextPageBlock.vue";

export default {
  name: "LoyaltySystemCard",
  components: {
    NextPageBlock,
  },
  data() {
    return {
      promocodeInputValue: "",
      promocodeInputSuccessItemID: null,
    };
  },
  methods: {
    ...mapMutations({
      setPromocodeSuccessItemID: "products/setPromocodeSuccessItemID",
    }),
    setPromocodeInputSuccessItemID() {
      this.promocodeInputSuccessItemID = this.getPromocodeArray.map(
        ({ id, promocode }) => {
          if (this.promocodeInputValue === promocode) {
            return id;
          }
        }
      );
      this.promocodeInputSuccessItemID =
        this.promocodeInputSuccessItemID.filter((item) => item !== undefined);

      this.setPromocodeSuccessItemID(this.promocodeInputSuccessItemID[0]);
    },
  },
  computed: {
    ...mapGetters({
      getLoyalitySystemPoints: "products/getLoyalitySystemPoints",
      getPromocodeArray: "products/getPromocodeArray",
    }),
  },
};
</script>
<style></style>
