<template>
  <header>
    <div class="container">
      <div class="header-wrap">
        <router-link :to="BASIC_APP" class="logo" />
        <div class="contact-card-list">
          <div
            class="contact-card"
            v-for="contactCard in contactCardsData"
            :key="contactCard.id"
          >
            <span class="contact-card__geo">
              <span class="geo-svg svg"></span>
              <p class="contact-card__geo-text">
                <span class="text--brown">{{ contactCard.geo }}</span
                >{{ " " }}
                <span class="contact-card__working_hours">{{
                  contactCard.working_hours
                }}</span>
              </p>
            </span>
            <a :href="'tel:' + contactCard.telHref" class="contact-card__phone">
              {{ contactCard.tel }}
            </a>
          </div>
        </div>
      </div>
      <div class="link-list">
        <router-link class="btn" :to="BASIC_APP">Basic App</router-link>
        <router-link class="btn" :to="VUEX_APP">Vuex App</router-link>
      </div>
    </div>
  </header>
</template>
<script>
import { VUEX_APP, BASIC_APP } from "@/router/utils.js";

export default {
  data() {
    return {
      VUEX_APP,
      BASIC_APP,
      contactCardsData: [
        {
          id: 1,
          geo: "Ховрино",
          working_hours: "Круглосуточно",
          tel: "+7 (495) 980-66-22",
        },
        {
          id: 2,
          geo: "Измайлово",
          working_hours: "Круглосуточно",
          tel: "+7 (495) 730-55-66",
        },
        {
          id: 3,
          geo: "Мытищи",
          working_hours: "Круглосуточно",
          tel: "+7 (495) 500-40-40",
        },
        {
          id: 4,
          geo: "Хор.-Мневники",
          working_hours: "Круглосуточно",
          tel: "+7 (495) 980-66-22",
        },
      ],
    };
  },
  mounted() {
    this.contactCardsData.forEach(
      (itemData) =>
        (itemData.telHref = itemData.tel.replace(/\+|\ |\(|\)|\-/g, ""))
    );
  },
};
</script>
