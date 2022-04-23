<template>
  <Header />
  <main>
    <router-view></router-view>
  </main>
  <Footer />
</template>
<script>
import Header from "@/components/basicApp/sections/Header.vue";
import Footer from "@/components/basicApp/sections/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="scss">
@import "@/static/scss/index.scss";
</style>
