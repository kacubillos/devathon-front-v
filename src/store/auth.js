import { defineStore } from "pinia";
import axios from "axios";

const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      /**
       * JWT to access the platform
       * @type {String}
       */
      token: null,
      /**
       * Login error message
       * @type {String}
       */
      error: "",
    };
  },
  actions: {
    /**
     * Method to get a JWT from the backend and save in the LocalStorage
     * @param {String} email Registered user email
     * @param {String} password Registered user password
     * @returns {Boolean} Return a boolean value, represents if the login is successful
     */
    async login(email, password) {
      try {
        const res = await axios({
          method: "post",
          url: "/login",
          data: {
            email: email,
            password: password,
          },
        });

        /* Verify success response */
        if (res.status !== 200) {
          this.error = "Tus datos son incorrectos. Vuelve a intentarlo.";
          return false;
        }

        /* Set default token for next requests */
        this.token = res.data.accessToken;
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
        return true;
      } catch (error) {
        this.error = "Tus datos son incorrectos. Vuelve a intentarlo.";
        return false;
      }
    },
    /**
     * Method to reset the JWT value
     */
    logout() {
      this.token = null;
    },
  },
  persist: {
    /**
     * Method to get the JWT value stored for next requests
     * @param {PiniaPluginContext} ctx
     */
    afterRestore: (ctx) => {
      if (ctx.store.token !== null)
        axios.defaults.headers.common["Authorization"] = "Bearer " + ctx.store.token;
    },
  },
});

export default useAuthStore;
