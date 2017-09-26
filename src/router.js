import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let routes = [{}];
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

export default router;