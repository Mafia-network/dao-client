<template>
  <b-card class="balance-box">
    <div class="text-center">
      <b-button v-b-toggle.metamask-status variant="success" size="sm">
        MetaMask Status
      </b-button>
    </div>
    <b-collapse id="metamask-status" class="mt-2">
      <div class="d-flex justify-content-between mt-3">
        <div>Injected</div>
        <div>{{ isInjected }}</div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <div>Network</div>
        <div>{{ network }}</div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <div>ETH Balance</div>
        <div>{{ ethBalance }} ETH</div>
      </div>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: "Balance",
  computed: {
    isInjected() {
      return this.$store.state.web3.isInjected ? "Yes" : "No";
    },
    ethBalance() {
      return Number(this.$store.state.web3.balance / Math.pow(10, 18)).toFixed(
        3
      );
    },
    network() {
      switch (this.$store.state.web3.networkId) {
        case 1:
          return "Mainnet";
        case 3:
          return "Ropsten";
        case 4:
          return "Rinkeby";
        case 5:
          return "Goerli";
        case 42:
          return "Kovan";
        default:
          return "Private";
      }
    }
  }
};
</script>
