<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center"
  >
    <section class="text-center col-12 col-md-11 col-lg-7 px-5 py-4 my-5 form">
      <component :is="currentComponent" @next-step="checkInfo" />
    </section>
  </div>
</template>

<script setup>
import { shallowRef, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";

const UserForm = defineAsyncComponent(() =>
  import("@/components/RegisterUserForm.vue"),
);
const OptionalForm = defineAsyncComponent(() =>
  import("@/components/RegisterOptionalForm.vue"),
);

const currentComponent = shallowRef(UserForm);
let userFormSelected = true;
const handleComponent = (cmp) => {
  currentComponent.value = cmp;
};

const router = useRouter();
const checkInfo = (data) => {
  if (userFormSelected) {
    console.log(data);
    handleComponent(OptionalForm);
    userFormSelected = false;
  } else {
    console.log(data);
    router.push("/login");
  }
};
</script>
