import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import LostPetForm from "@/views/LostPetFormView.vue";

const routes = [
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/registrar-mascota-perdida",
    name: "lostPetForm",
    component: LostPetForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
