import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";
import HomeView from "@/views/HomeView.vue";
import useAuthStore from "../store/auth";

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
    /* if this path is not the last item, 404 error is displayed */
    path: "/:pathMatch(.*)*",
    component: PageNotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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
