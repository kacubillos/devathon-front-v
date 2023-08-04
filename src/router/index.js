import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import ForgotPwdView from "@/views/ForgotPwdView.vue";

const routes = [
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/login/forgot",
    component: ForgotPwdView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
