import Vue from "vue";
import VueRouter from "vue-router";
import { routing } from "@/router/routing";

Vue.use(VueRouter);

const routes = routing;

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
