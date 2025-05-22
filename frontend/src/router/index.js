import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "Plan Your Trip" },
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    meta: { title: "Plan Your Trip" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/planner",
    name: "planner",
    meta: { title: "Plan Your Trip" },
    component: () => import("../views/PlannerView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "Plan Your Trip" },
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Plan Your Trip" },
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/guides",
    name: "guides",
    meta: { title: "Plan Your Trip" },
    component: () => import("../views/TripsView.vue"),
  },
  {
    path: "/stats",
    name: "user-stats",
    meta: { title: "Plan Your Trip" },
    component: () => import("../views/StatisticsView.vue"),
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
