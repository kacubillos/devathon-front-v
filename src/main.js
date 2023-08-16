import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VeeValidatePlugin from "@/includes/validation";
import { initializeApp } from "firebase/app";
import { createPinia } from "pinia";

import "bootstrap/dist/css/bootstrap.css";
import "normalize.css";

/* Define base url for all requests */
axios.defaults.baseURL = "http://localhost:8080/api/v1/";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(VeeValidatePlugin);
app.use(pinia);

// Firebase to upload iamges
// TODO change firebase apikey to env vars
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_API_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_API_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_API_APP_ID,
  measurementId: import.meta.env.FIREBASE_API_MEASUREMENT_ID,
};
// Initialize Firebase
initializeApp(firebaseConfig);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
