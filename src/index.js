import Vue from 'vue';
import router from './router';
import store from './store';
import './style/style.css';

const app = new Vue({
    el: '#app',
    store,
    router
});