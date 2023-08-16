<template>
  <h2>
    {{
      props.isCreated
        ? "Cuenta creada correctamente"
        : "Se produjo un error, vuelve a intentarlo"
    }}
  </h2>
  <img
    :src="props.isCreated ? '/src/assets/done.svg' : '/src/assets/error.svg'"
    class="w-50 mt-2 mb-4"
    alt="Done icon from unDraw"
  />
  <p>
    <router-link :to="{ name: 'login' }" class="link"
      >Regresar a inicio de sesión</router-link
    >
  </p>
</template>

<script setup>
const props = defineProps(["isCreated"]);
</script>
