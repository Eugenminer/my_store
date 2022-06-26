import { createApp } from 'vue';
import App from './App.vue';
import { data, text2 } from './var';
import aalleerrtt from './func';

createApp(App).mount('#app');

aalleerrtt(data.text1);
aalleerrtt(text2);
