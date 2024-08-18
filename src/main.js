import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

// 设置 Axios 的全局默认配置
axios.defaults.baseURL = 'https://api.polypeye.cn'; // API 基础地址
axios.defaults.withCredentials = true; // 允许跨域请求发送接收 cookies

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
