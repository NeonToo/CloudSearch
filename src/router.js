import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import MainContainer from './views/MainContainer.vue';
import SearchResults from './views/SearchResults.vue';
import MindMap from './views/MindMap.vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {title: 'Cloud Search'}
    },
    {
        path: '/',
        name: 'container',
        component: MainContainer,
        children: [
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
        ]
    }
];
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

export default router;