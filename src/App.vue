<template>
    <div>
        <x-header>
            <search-bar v-if="this.$route.path!=='/' && this.$route.path!=='/home'" slot="left"></search-bar>
        </x-header>
        <router-view>
            <main id="home-main-container">
                <img src="./images/logo.png">
                <search-bar></search-bar>
            </main>
        </router-view>
    </div>
</template>

<script>
    import Header from './components/header/Header.vue';
    import SearchBar from './components/search/SearchBar.vue';

    export default {
        components: {
            'x-header': Header,
            SearchBar
        },
        created() {
            this.goToHomePage();
        },
        methods: {
            goToHomePage() {
                if(this.$route.path === '/') {
                    this.$router.push('/home');
                }
            }
        }
    }
</script>

<style>
    #home-main-container {
        margin-top: 100px;
        text-align: center;
    }
</style>