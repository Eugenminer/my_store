import { createApp } from 'vue';
import mitt from 'mitt';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

const app = createApp(App);
const emitter = mitt();

app.config.globalProperties.emitter = emitter;
app.use(router);
app.use(store);

app.mount('#app');
