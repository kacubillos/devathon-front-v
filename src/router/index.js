import { createRouter, createWebHistory } from "vue-router";
import useAuthStore from "@/store/auth";

import PageNotFoundView from "@/views/PageNotFoundView.vue";
import LoginView from "@/views/LoginView.vue";
import ForgotPwdView from "@/views/ForgotPwdView.vue";
import ResetPwdView from "@/views/ResetPwdView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requireAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requireAuth: false },
  },
  {
    path: "/login/forgot",
    name: "forgotPwd",
    component: ForgotPwdView,
    meta: { requireAuth: false },
  },
  {
    path: "/login/reset",
    name: "resetPwd",
    component: ResetPwdView,
    meta: { requireAuth: false },
  },
  {
    /* if this path is not the last item, 404 error is displayed */
    path: "/:pathMatch(.*)*",
    component: PageNotFoundView,
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

/**
 * Function to check permissions before accessing a route
 */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuth = auth.token;

  if (to.meta.requireAuth) {
    if (isAuth === null)
      return next({ name: "login", query: { returnUrl: to.path } });

    return next();
  } else {
    if (isAuth !== null) return next({ name: "home" });

    return next();
  }
});

export default router;
