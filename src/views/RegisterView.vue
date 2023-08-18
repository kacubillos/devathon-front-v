<template>
  <div class="flex items-center justify-center h-screen">
    <section class="text-center px-4 md:px-12 py-8 my-4 mx-2 lg:w-1/2 form">
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
