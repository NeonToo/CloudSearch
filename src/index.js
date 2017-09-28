import Vue from 'vue';
import Icon from 'vue-svg-icon/Icon.vue';
import router from './router';
import store from './store';
import './style/style.css';

Vue.component('icon', Icon);

axios.defaults.baseURL = 'http://118.190.201.165:8081/searchpp';
axios.defaults.withCredentials = true;

const app = new Vue({
    el: '#app',
    store,
    router
});