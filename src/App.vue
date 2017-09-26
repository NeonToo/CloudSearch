<template>
    <div>
        <x-header></x-header>
        <main id="home-main-container">
            <img src="./images/logo.png">
            <search-bar></search-bar>
        </main>
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
        data() {
            return {
                text: 'App Container'
            };
        }
    }
</script>

<style>
    #home-main-container {
        margin-top: 100px;
        text-align: center;
    }
</style>