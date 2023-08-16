<template>
  <section
    class="position-absolute top-50 start-50 translate-middle text-center"
  >
    <img src="@/assets/server_down.svg" class="w-50 mb-3" />
    <h1 class="mb-2">Error 404</h1>
    <p class="mb-4 pb-3">No encontramos lo que buscabas.</p>
    <router-link to="/login" class="btn-purple">Regresar al inicio</router-link>
  </section>
</template>

<script setup></script>
