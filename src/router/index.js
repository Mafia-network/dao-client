import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Owner from "../views/Owner.vue";
import AppContainer from "../layouts/AppContainer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: AppContainer,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "/owner",
        name: "Owner",
        component: Owner
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
