import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VeeValidatePlugin from "@/includes/validation";
import { initializeApp } from "firebase/app";

import "bootstrap/dist/css/bootstrap.css";
import "normalize.css";

/* Define base url for all requests */
axios.defaults.baseURL = "http://localhost:8080/api/v1/";

const app = createApp(App);

app.use(router);
app.use(VeeValidatePlugin);

// Firebase to opload iamges
// TODO change firebase config to env vars
const firebaseConfig = {
  apiKey: "AIzaSyB9iczHYZJMPj4jh_LayDJQnyZjb4sDPRs",
  authDomain: "pethub-image-uploader.firebaseapp.com",
  projectId: "pethub-image-uploader",
  storageBucket: "pethub-image-uploader.appspot.com",
  messagingSenderId: "877480413714",
  appId: "1:877480413714:web:da5b2e16d1bf666d33a6cb",
  measurementId: "G-SCL62Q1Z1B",
};
// Initialize Firebase
initializeApp(firebaseConfig);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
