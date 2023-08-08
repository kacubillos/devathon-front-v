<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center vh-100"
  >
    <section class="text-center col-12 col-md-10 col-lg-6 px-5 py-4 my-4 form">
      <!-- Forgot password form -->
      <template v-if="!recoverySend">
        <h1>¿Has olvidado la contraseña?</h1>
        <form class="my-3">
          <input
            id="inputEmail"
            type="email"
            class="form-input mb-4"
            placeholder="Correo electrónico"
            required
          />
          <button type="submit" class="btn-purple w-100">Enviar enlace</button>
          <hr class="my-4" />
          <p class="mb-2">
            ¿No tienes una cuenta? <a href="#" class="link">Registrate</a>
          </p>
          <p>
            <router-link :to="{ name: 'login' }" class="link"
              >Regresar a inicio de sesión</router-link
            >
          </p>
        </form>
      </template>

      <!-- Confirmation of sending email -->
      <template v-else>
        <h2>Enlace de recuperación enviado</h2>
        <p>Revisa tu correo electronico y sigue las instrucciones.</p>
        <p>
          <router-link :to="{ name: 'login' }"
            >Regresar a inicio de sesión</router-link
          >
        </p>
      </template>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const recoverySend = ref(false);
</script>

<style scoped>
.form-input {
  padding: var(--padding-button-2);
}

.btn-purple {
  padding: var(--padding-button-3);
}
</style>
