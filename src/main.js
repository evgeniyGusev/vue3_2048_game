import { createApp } from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import App from './App.vue';
import './assets/scss/global.scss';

createApp(App).use(VueReCaptcha, {
  siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
  loaderOptions: {
    autoHideBadge: true,
  },
}).mount('#app');
