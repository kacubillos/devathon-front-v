<template>
  <div
    class="row align-items-start align-items-md-center justify-content-center"
  >
    <section class="text-center col-12 col-md-11 col-lg-7 px-5 py-4 my-5 form">
      <!-- Dinamic component contain the two forms -->
      <component
        :is="currentComponent"
        v-if="!isFinished"
        @next-step="checkInfo"
      />
      <!-- Component with the message if it is successful or not -->
      <SuccessModal v-else :is-created="isCreated" />
    </section>
  </div>
</template>

<script setup>
import { ref, shallowRef, defineAsyncComponent } from "vue";
import useAuthStore from "@/store/auth";

/* Load components */
const UserForm = defineAsyncComponent(() =>
  import("@/components/RegisterUserForm.vue"),
);
const OptionalForm = defineAsyncComponent(() =>
  import("@/components/RegisterOptionalForm.vue"),
);
const SuccessModal = defineAsyncComponent(() =>
  import("@/components/RegisterSuccess.vue"),
);

const currentComponent = shallowRef(UserForm);
let userFormSelected = true;
const handleComponent = (cmp) => {
  currentComponent.value = cmp;
};

let userInfo = {};
let isCreated = ref(false);
let isFinished = ref(false);
/**
 * Function sent to components to get the validated user information
 * @param {Object} data User information of the forms
 */
const checkInfo = async (data) => {
  const auth = useAuthStore();

  if (userFormSelected) {
    userInfo = { ...userInfo, ...data };
    handleComponent(OptionalForm);
    userFormSelected = false;
  } else {
    userInfo = { ...userInfo, ...data };
    const isRegistered = await auth.register(userInfo);

    // Change flag to load the successful or error message
    if (isRegistered) {
      isCreated.value = true;
      isFinished.value = true;
    } else {
      isFinished.value = true;
    }
  }
};
</script>
