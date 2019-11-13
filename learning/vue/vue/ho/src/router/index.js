import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home";
import Detail from "../pages/detail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail
  }
];

const router = new VueRouter({
  routes
});

export default router;
