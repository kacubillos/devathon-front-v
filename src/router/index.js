import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";

const routes = [
  {
    path: "/login",
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
  if (to.meta.requireAuth) {
    return next({ path: "/login", query: { returnUrl: to.path } });
  } else {
    return next();
  }
});

export default router;
