import { createRouter, createWebHashHistory } from "vue-router";

import PageBasket from "@/components/basicApp/pages/PageBasket.vue";
import VUEXPageBasket from "@/components/vuexApp/pages/vuex PageBasket.vue";

import { BASIC_APP, VUEX_APP } from "./utils.js";

const routes = [
  {
    path: BASIC_APP,
    component: PageBasket,
  },
  {
    path: VUEX_APP,
    component: VUEXPageBasket,
  },
];

export const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
});
