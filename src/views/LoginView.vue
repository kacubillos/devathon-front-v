<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center vh-100"
  >
    <section class="text-center col-12 col-md-10 col-lg-6 px-5 py-4 card">
      <h1>¡Te damos la bienvenida de nuevo!</h1>
      <form class="my-3">
        <input
          id="inputEmail"
          v-model="email"
          type="email"
          class="form-control mb-2"
          placeholder="Correo electrónico"
        />
        <input
          id="inputPassword"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Contraseña"
        />
        <a href="#" class="link d-block text-center text-md-end my-3"
          >Recuperar contraseña</a
        >
        <button type="submit" class="btn btn-primary w-100">
          Iniciar sesión
        </button>
        <hr class="my-4" />
        <p>¿No tienes una cuenta? <a href="#" class="link">Registrate</a></p>
      </form>
    </section>
  </div>
</template>

<script setup></script>
