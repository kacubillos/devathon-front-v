<template>
  <h1>Crea tu cuenta</h1>
  <form class="my-3" @submit.prevent="saveInfo">
    <div class="mb-3">
      <label for="inputPhoto" class="form-label text-start w-100"
        >Imagen de perfil</label
      >
      <input
        id="inputPhoto"
        accept="image/png, image/jpg, image/jpeg"
        class="form-control"
        type="file"
        required
      />
    </div>
    <div class="mb-2">
      <label for="inputPhone" class="form-label text-start w-100"
        >Numero de celular</label
      >
      <input
        id="inputPhone"
        type="number"
        class="form-input mb-2"
        placeholder="Escribe tu número de celular"
        required
      />
    </div>
    <button type="submit" class="btn-purple w-100 mt-3">Guardar</button>
    <button
      type="submit"
      class="btn-black w-100 mt-3"
      @click.prevent="skipInfo"
    >
      Saltar
    </button>
  </form>
</template>

<script setup>
const emit = defineEmits(["nextStep"]);

const saveInfo = () => {
  emit("nextStep", { photo: "", phone: "" });
};
const skipInfo = () => {
  emit("nextStep", { photo: "", phone: "" });
};
</script>
