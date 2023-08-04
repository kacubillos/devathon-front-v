import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import ForgotPwdView from "@/views/ForgotPwdView.vue";
import ResetPwdView from "@/views/ResetPwdView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/login/forgot",
    name: "forgotPwd",
    component: ForgotPwdView,
  },
  {
    path: "/login/reset",
    name: "resetPwd",
    component: ResetPwdView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
