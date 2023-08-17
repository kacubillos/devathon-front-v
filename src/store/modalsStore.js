import { defineStore } from "pinia";

// (id, object)
// the state object is where we can add the data, any data that you want globally avaialble to other componen should be defined there

export default defineStore("modals", {
  state: () => ({
    AuthModalIsOpen: false,
    ShippingAddressModalIsOpen: false,
    ConfirmationModalIsOpen: false,
  }),
  actions: {
    openAuthModal() {
      this.AuthModalIsOpen = true;
    },
    closeAuthModal() {
      this.AuthModalIsOpen = false;
    },
    openConfirmationModal() {
      this.ConfirmationModalIsOpen = true;
    },
    closeConfirmationModal() {
      this.ConfirmationModalIsOpen = false;
    },
  },
});
