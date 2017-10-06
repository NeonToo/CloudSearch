import Vue from 'vue';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import './style/style.css';

// axios.defaults.baseURL = 'http://118.190.201.165:8081/searchpp';
// axios.defaults.withCredentials = true;

Vue.use(iView);

const app = new Vue({
    el: '#app',
    store,
    router
});