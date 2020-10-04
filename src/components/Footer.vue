<template>
  <div class="app-footer container">
    <b-row>
    </b-row>
  </div>
</template>

<script>
import { etherScanURL } from "../constants";

export default {
  name: "Footer",
  data() {
    return {
      etherScanURL
    };
  }
};
</script>
