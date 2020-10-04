import "./global";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/app.scss";
import mixin from "./mixin";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.mixin(mixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
