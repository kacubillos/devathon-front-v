<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center vh-100"
  >
    <section class="text-center col-12 col-md-10 col-lg-6 px-5 py-4 my-4 form">
      <h1>¡Te damos la bienvenida de nuevo!</h1>
      <form class="my-3">
        <input
          id="inputEmail"
          v-model="email"
          type="email"
          class="form-input mb-2"
          placeholder="Correo electrónico"
        />
        <div class="form-group">
          <input
            id="inputPassword"
            v-model="password"
            :type="isHide ? 'password' : 'text'"
            class="form-input"
            placeholder="Contraseña"
          />
          <span class="password-icon link" @click="changeVisibility">
            Mostrar
          </span>
        </div>
        <p class="d-block text-center text-md-end my-3">
          <a href="#" class="link">Recuperar contraseña</a>
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

const isHide = ref(true);

const changeVisibility = () => {
  isHide.value = !isHide.value;
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
