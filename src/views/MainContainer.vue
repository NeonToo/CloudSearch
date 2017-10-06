<template>
    <div>
        <x-header>
            <search-bar slot="left"></search-bar>
        </x-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './../components/header/Header.vue';
    import SearchBar from './../components/search/SearchBar.vue';

    export default {
        components: {
            'x-header': Header,
            SearchBar
        }
    }
</script>