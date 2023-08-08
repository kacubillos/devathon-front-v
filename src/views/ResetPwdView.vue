<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center vh-100"
  >
    <section
      class="text-center col-12 col-md-10 col-lg-6 px-5 py-4 my-4 mb-4 form"
    >
      <!-- Error alert -->
      <div v-if="error !== ''" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <!-- Reset password form -->
      <h1>Crea una nueva contraseña</h1>
      <form class="my-3" @submit.prevent="recoveryPassword">
        <div class="form-group mb-2">
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
        <input
          id="inputRepeatPassword"
          v-model="repeatPassword"
          :type="isHide ? 'password' : 'text'"
          class="form-input mb-4"
          placeholder="Repetir nueva contraseña"
          required
        />
        <button type="submit" class="btn-purple w-100">Crear contraseña</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

/* Show or hide the password */
const isHide = ref(true);
const changeVisibility = () => {
  isHide.value = !isHide.value;
};

const router = useRouter();
const route = useRoute();

const password = ref("");
const repeatPassword = ref("");
const error = ref("");

/**
 * Function to validate data before changing the password
 */
const recoveryPassword = () => {
  if (!route.query.token) {
    error.value =
      "El enlace es inválido, por favor haz un nuevo cambio de contraseña.";
  } else if (password.value !== repeatPassword.value) {
    error.value = "Las contraseñas no coinciden.";
  } else {
    router.push({ name: "login" });
  }
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
