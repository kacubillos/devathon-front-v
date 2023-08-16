<template>
  <h1>Crea tu cuenta</h1>
  <form class="my-3" @submit="saveUser">
    <div class="mb-2">
      <label for="inputName" class="form-label text-start w-100"
        >Nombre completo</label
      >
      <input
        id="inputName"
        v-model="fullname"
        type="text"
        class="form-input mb-2"
        placeholder="Escribe tu nombre completo"
        required
      />
    </div>
    <div class="mb-2">
      <label for="inputEmail" class="form-label text-start w-100"
        >Correo electrónico</label
      >
      <input
        id="inputEmail"
        v-model="email"
        type="email"
        class="form-input mb-2"
        :class="{ 'form-error': errors?.email }"
        placeholder="Escribe tu correo electrónico"
        required
      />
      <div
        id="passwordHelpBlock"
        class="text-start text-danger"
        :class="{ 'd-none': !errors?.email }"
      >
        {{ errors?.email }}
      </div>
    </div>
    <div class="row mb-3">
      <div class="form-group col-12 col-md-6">
        <label for="inputPassword" class="form-label text-start w-100"
          >Contraseña</label
        >
        <input
          id="inputPassword"
          v-model="password"
          :type="isHide ? 'password' : 'text'"
          class="form-input"
          :class="{ 'form-error': errors?.password }"
          placeholder="Escribe tu contraseña"
          required
        />
        <span class="password-icon link" @click="() => (isHide = !isHide)">
          {{ isHide ? "Mostrar" : "Ocultar" }}
        </span>
      </div>
      <div class="form-group col-12 col-md-6">
        <label for="inputRepeatPassword" class="form-label text-start w-100"
          >Confirma tu contraseña</label
        >
        <input
          id="inputRepeatPassword"
          v-model="repeatPassword"
          :type="isHide2 ? 'password' : 'text'"
          class="form-input"
          :class="{ 'form-error': errors?.password }"
          placeholder="Confirma tu contraseña"
          required
        />
        <span class="password-icon link" @click="() => (isHide2 = !isHide2)">
          {{ isHide2 ? "Mostrar" : "Ocultar" }}
        </span>
      </div>
      <div
        id="passwordHelpBlock"
        class="text-start text-danger mt-2"
        :class="{ 'd-none': !errors?.password }"
      >
        {{ errors?.password }}
      </div>
    </div>
    <button type="submit" class="btn-purple w-100 mt-3">
      Registrarte ahora
    </button>
    <hr class="my-4" />
    <p>
      ¿Ya tienes una cuenta?
      <router-link :to="{ name: 'login' }" class="link"
        >Inicia sesión</router-link
      >
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";

/* Show or hide the password */
const isHide = ref(true);
const isHide2 = ref(true);

const fullname = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const errors = ref({});

const emit = defineEmits(["nextStep"]);

const saveUser = (e) => {
  e.preventDefault();
  if (email.value === "admin@gmail.com") {
    // TODO: Create function to validate if an user exists
    errors.value.email = "El correo eléctronico ya está registrado";
  } else {
    delete errors.value.email;
  }

  if (password.value !== repeatPassword.value) {
    errors.value.password = "Las contraseñas no coinciden";
  } else {
    delete errors.value.password;
  }

  if (Object.keys(errors.value).length === 0) {
    emit("nextStep", {
      fullname: fullname.value,
      email: email.value,
      password: password.value,
    });
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
  padding-left: 0.5rem;
  cursor: pointer;
  background-color: var(--white-100);
}

.btn-purple {
  padding: var(--padding-button-3);
}
</style>
