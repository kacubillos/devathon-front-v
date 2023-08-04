<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center"
  >
    <section
      class="text-center col-12 col-md-10 col-lg-6 px-5 py-4 my-4 mb-4 card w-100"
    >
      <h1>Crea una nueva contraseña</h1>
      <form class="my-3" @submit.prevent="recoveryPassword">
        <input
          id="inputPassword"
          type="password"
          class="form-control mb-4"
          placeholder="Nueva contraseña"
          required
        />
        <input
          id="inputRepeatPassword"
          type="password"
          class="form-control mb-4"
          placeholder="Repetir nueva contraseña"
          required
        />
        <button type="submit" class="btn btn-primary w-100">
          Crear contraseña
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const recoveryPassword = () => {
  router.push({ name: "login" });
};
</script>
