<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center"
  >
    <section
      class="text-center col-12 col-md-10 col-lg-6 px-5 py-4 my-4 mb-4 card w-100"
    >
      <h1>¿Has olvidado la contraseña?</h1>
      <form class="my-3">
        <input
          id="inputEmail"
          type="email"
          class="form-control mb-4"
          placeholder="Correo electrónico"
          required
        />
        <button type="submit" class="btn btn-primary w-100">
          Iniciar sesión
        </button>
        <hr class="my-4" />
        <p class="mb-2">¿No tienes una cuenta? <a href="#">Registrate</a></p>
        <p><a href="#">Regresar a inicio de sesión</a></p>
      </form>
    </section>
  </div>
</template>

<script setup></script>
