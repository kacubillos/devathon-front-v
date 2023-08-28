<template>
  <div class="flex items-center justify-center h-screen">
    <section class="text-center px-4 md:px-12 lg:w-1/2 py-8 mx-2 form">
      <!-- Alert error -->
      <div
        v-if="error !== ''"
        class="bg-red-100 text-red-700 p-4 mb-4 w-full"
        role="alert"
      >
        {{ error }}
      </div>
      <!-- Login form -->
      <h1 class="text-4xl mb-8 mt-4">¡Te damos la bienvenida de nuevo!</h1>
      <form class="my-3" @submit.prevent="login">
        <input
          id="inputEmail"
          v-model="email"
          type="email"
          class="form-input mb-2"
          placeholder="Correo electrónico"
          required
        />
        <div class="form-group">
          <input
            id="inputPassword"
            v-model="password"
            :type="isHide ? 'password' : 'text'"
            class="form-input"
            placeholder="Contraseña"
            required
          />
          <span class="password-icon link" @click="changeVisibility">
            {{ isHide ? "Mostrar" : "Ocultar" }}
          </span>
        </div>
        <p class="d-block text-center md:text-end my-4">
          <a href="#" class="link">Recuperar contraseña</a>
        </p>
        <button type="submit" class="btn-purple w-full">Iniciar sesión</button>
        <hr class="my-4" />
        <p>
          ¿No tienes una cuenta?
          <router-link :to="{ name: 'register' }" class="link"
            >Registrate</router-link
          >
        </p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useAuthStore from "@/store/auth";

/* Show or hide the password */
const isHide = ref(true);
const changeVisibility = () => {
  isHide.value = !isHide.value;
};

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const error = ref("");

/**
 * Function to start a new session, this redirect to home or show the message error
 */
const login = async () => {
  const auth = useAuthStore();
  const isSuccess = await auth.login(email.value, password.value);

  if (isSuccess) {
    if (route.query.returnUrl) router.push({ path: route.query.returnUrl });
    else router.push({ name: "home" });
  } else error.value = auth.error;
};
</script>

<style scoped>
.password-icon {
  float: right;
  position: relative;
  margin: -2.5em 1.5rem 0 0;
  cursor: pointer;
}
</style>
