<template>
  <div
    ref="modalTarget"
    class="py-5 text-center px-6 w-[300px] min-h-[250px] max-h-[400px] max-w-[350px] flex flex-wrap flex-col justify-around items-center"
  >
    <div v-if="success === true" class="mt-4">
      <div class="wrapper-conf">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
      <div class="block my-4">
        <span class="font-bold text-[1.2rem]">¡Listo!</span>
      </div>
    </div>
    <div v-else class="mt-4">
      <div class="container-circle-error">
        <div class="circle-border"></div>
        <div class="circle">
          <div class="circle-error"></div>
        </div>
      </div>

      <div class="block my-4">
        <span class="font-bold text-[1.2rem]">¡Error!</span>
      </div>
    </div>
    <div class="block text-[1.1rem]">
      <span>{{ responseMessage }}</span>
    </div>
    <button
      v-if="closeConfirmationButton"
      type="button"
      class="btn-submit m-0 py-[5px] text-[1.1rem]"
      @click="closeConfiModal"
    >
      Cerrar
    </button>
  </div>
</template>

<script>
import { mapActions, mapStores } from "pinia";
import useModalsStore from "@/stores/modalsStore";

import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "ConfirmationModal",
  props: {
    responseMessage: String,
    success: Boolean,
    closeConfirmationButton: Boolean,
  },
  emits: ["bgCloseConfirmationModal", "closing-modal-timeOut", "close-confirmation-modal-button"],
  data() {
    return {};
  },
  methods: {
    ...mapActions(useModalsStore, {
      closeConfirmationModal: "closeConfirmationModal",
    }),
    closeConfiModal() {
      this.$emit("close-confirmation-modal-button");
    },
  },
  computed: {
    ...mapStores(useModalsStore),
    closeButtonActive() {
      return this.closeButton;
    },
  },
  mounted() {
    const modalTarget = ref(this.$refs.modalTarget);
    onClickOutside(modalTarget, () => {
      this.closeConfirmationModal();
      this.$emit("bgCloseConfirmationModal");
      this.$emit("close-confirmation-modal-button");
      this.$emit("closing-modal-timeOut");
    });
  },
};
</script>

<style lang="scss" scoped>
:root {
  --color-red: #f86;
  --circle-size: 60px;
}

.wrapper-conf {
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation:
    fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}
.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}

.container-circle-error {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px 10px rgba(#000, 0.05);
}

.circle,
.circle-border {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 10% auto;
}

.circle {
  z-index: 1;
  position: relative;
  background: white;
  transform: scale(1);
  animation: success-anim 700ms ease;
}

.circle-border {
  z-index: 0;
  position: absolute;
  transform: scale(1.1);
  animation: circle-anim 400ms ease;
  background: red;
}

@keyframes success-anim {
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes circle-anim {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1.1);
  }
}

.circle-error::before,
.circle-error::after {
  content: "";
  display: block;
  height: 4px;
  background: red;
  position: absolute;
}

.circle-error::before {
  width: 40px;
  top: 48%;
  left: 16%;
  transform: rotateZ(50deg);
}

.circle-error::after {
  width: 40px;
  top: 48%;
  left: 16%;
  transform: rotateZ(-50deg);
}
</style>
