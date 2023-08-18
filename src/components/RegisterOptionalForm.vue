<template>
  <h1 class="text-4xl mb-8 mt-4">Información opcional</h1>
  <form class="my-3" @submit.prevent="saveInfo">
    <div class="mb-3">
      <label for="inputPhoto" class="block text-start mb-2"
        >Imagen de perfil</label
      >
      <input
        id="inputPhoto"
        accept="image/png, image/jpg, image/jpeg"
        class="form-input"
        type="file"
      />
    </div>
    <div class="mb-2">
      <label for="inputPhone" class="block text-start mb-2"
        >Numero de celular</label
      >
      <input
        id="inputPhone"
        v-model="phone"
        type="number"
        class="form-input mb-2"
        placeholder="Escribe tu número de celular"
      />
    </div>
    <button type="submit" class="btn-purple w-full mt-3">Continuar</button>
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
