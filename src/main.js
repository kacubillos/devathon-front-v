import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'normalize.css'

/* Define base url for all requests */
axios.defaults.baseURL = 'http://localhost:8080/api/v1/';

const app = createApp(App);
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'