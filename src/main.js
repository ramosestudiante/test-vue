import { createApp } from 'vue';
import App from './App.vue';
import 'uikit/dist/css/uikit.min.css'; // Estilos
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import router from './router';
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App);

UIkit.use(Icons);
app.use(pinia);
app.component("vue-apexcharts", VueApexCharts);

app.use(router).mount('#app');
