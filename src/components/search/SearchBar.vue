<template>
    <div>
        <form action="http://118.190.201.165:8080/searchpp/search">
            <input type="text" class="search-input" name="key" placeholder="搜索" autocomplete="off">
            <x-button class="search-btn" type="primary">搜索</x-button>
            <!--<button type="submit">搜索</button>-->
        </form>
    </div>
</template>

<script>
    import Button from './../button/Button.vue';

    export default {
        components: {
            'x-button': Button
        }
    }
</script>

<style>
    .search-input {
        width: 500px;
        padding: 10px 5px;
    }

    .search-btn {
        height: 45px;
        border-radius: 2px;
        position: relative;
        top: -1px;
        left: -6px;
    }
</style>