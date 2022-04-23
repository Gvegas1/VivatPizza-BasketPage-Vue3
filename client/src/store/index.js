import { createStore } from "vuex";

import { productsModule } from "./modules/productsModule";

export const store = createStore({
  modules: {
    products: productsModule,
  },
});
