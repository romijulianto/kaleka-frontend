import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";

const routes = [
  {
    path: "/kaleka",
    name: "Home",
    component: Home,
  },
  {
    path: "/kaleka/user",
    name: "User",
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
