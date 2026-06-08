import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import './assets/css/main.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

AOS.init({
  once: true,
  duration: 600,
});
