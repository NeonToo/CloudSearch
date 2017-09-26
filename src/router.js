import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import SearchResults from './views/SearchResults.vue';
import MindMap from './views/MindMap.vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        meta: {title: 'Cloud Search'}
    },
    {
        path: '/results',
        name: 'results',
        component: SearchResults
    },
    {
        path: '/map',
        name: 'map',
        component: MindMap
    }
];
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

export default router;