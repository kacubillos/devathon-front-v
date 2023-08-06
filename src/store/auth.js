import { defineStore } from "pinia";
import axios from "axios";

const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: null,
      error: "",
    };
  },
  actions: {
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
          this.error = "Tus datos son incorrectos.";
          return false;
        }

        /* Set default token for next requests */
        this.token = res.data.accessToken;
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
        return true;
      } catch (error) {
        this.error = "Tus datos son incorrectos.";
        return false;
      }
    },
    logout() {
      this.token = null;
    },
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.token !== null)
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + ctx.store.token;
    },
  },
});

export default useAuthStore;
