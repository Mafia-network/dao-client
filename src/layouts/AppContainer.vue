<template>
  <div class="app">
    <h1 class="text-center">DAO</h1>
    <balance v-if="isInjectedMetaMask" />
    <div class="app-content container">
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from "../components/Footer";
import Balance from "../components/Balance";

export default {
  name: "AppContainer",
  components: { Balance, AppFooter },
  computed: {
    isInjectedMetaMask() {
      return this.$store.state.web3.isInjected;
    }
  },
  data() {
    return {
      contractTimer: null
    };
  },
  beforeCreate() {
    this.$store.dispatch("web3/register");
  },
  beforeDestroy() {
    this.$store.dispatch("web3/clearPolling");
    this.$store.dispatch("web3/reset");
  }
};
</script>

<style scoped></style>
