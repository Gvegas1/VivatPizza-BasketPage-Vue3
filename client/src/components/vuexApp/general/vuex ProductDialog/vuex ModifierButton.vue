<template>
  <button class="dialog__modifiers__btn" @click="selectedModifier">
    <div :class="selectedModifierSVG ? 'svg-checked' : 'svg-plus'"></div>
    <p class="dialog__modifiers-name">
      {{ modifierData.name }}
    </p>
    <div class="dialog__modifiers-counter-wrap">
      <div class="dialog__modifiers-counter-wrap__block">
        <div v-if="modifierCount" class="dialog__modifiers-quantity">
          {{ modifierCount }}x
        </div>
        <div>{{ modifierData.price }}P</div>
      </div>
      <div
        :style="`background:
      url(${require('../../../../static/img/ProductDialogModifiersImages/' +
        modifierData.img +
        '.png')}) 0 0 / contain no-repeat;`"
        class="dialog__modifiers-img"
      ></div>
      <div class="dialog__modifiers-counter-wrap__block">
        <span>{{ modifierLastPrice }}P</span>
      </div>
    </div>
  </button>
</template>
<script>
export default {
  name: "ModifierButton",
  props: {
    modifierData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modifierCount: 0,
      modifierLastPrice: 0,
      selectedModifierSVG: false,
    };
  },
  methods: {
    selectedModifier() {
      this.selectedModifierSVG = true;
      this.modifierCount += 1;
      this.modifierLastPrice = this.modifierData.price * this.modifierCount;
      this.$emit("modifierLastPrice", {
        id: this.modifierData.id,
        modifierLastPrice: this.modifierLastPrice,
      });
    },
  },
};
</script>
<style></style>
