<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center vh-100"
  >
    <section class="text-center col-12 col-md-10 col-lg-6 px-5 py-4 my-4 form">
      <!-- Alert error -->
      <div v-if="error !== ''" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      <!-- Login form -->
      <h1>¡Te damos la bienvenida de nuevo!</h1>
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
        <p class="d-block text-center text-md-end my-3">
          <router-link :to="{ name: 'forgotPwd' }" class="link"
            >Recuperar contraseña</router-link
          >
        </p>
        <button type="submit" class="btn-purple w-100">Iniciar sesión</button>
        <hr class="my-4" />
        <p>¿No tienes una cuenta? <a href="#" class="link">Registrate</a></p>
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
.form-input {
  padding: var(--padding-button-2);
}

.password-icon {
  float: right;
  position: relative;
  margin: -2.25em 1.5rem 0 0;
  cursor: pointer;
}

.btn-purple {
  padding: var(--padding-button-3);
}
</style>
