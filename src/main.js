import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
const app = createApp(App)

app.use(store)

app.mount('#app')