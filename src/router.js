import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './views/Home.vue';
import SearchResults from './views/SearchResults.vue';
import MindMap from './views/MindMap.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home
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
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    }
];
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

export default router;