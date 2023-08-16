<template>
  <h1>Información adicional</h1>
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
      />
    </div>
    <div class="mb-2">
      <label for="inputPhone" class="form-label text-start w-100"
        >Numero de celular</label
      >
      <input
        id="inputPhone"
        v-model="phone"
        type="number"
        class="form-input mb-2"
        placeholder="Escribe tu número de celular"
        required
      />
    </div>
    <button type="submit" class="btn-purple w-100 mt-3">Guardar</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["nextStep"]);

const phone = ref("");

const saveInfo = () => {
  emit("nextStep", { photo: "", phone: String(phone.value) });
};
</script>

<style scoped>
.form-input {
  padding: var(--padding-button-2);
}

.btn-purple {
  padding: var(--padding-button-3);
}
</style>
