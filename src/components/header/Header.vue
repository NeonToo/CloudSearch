<template>
    <header id="header">
        <!--<div>-->
            <!--<a href="">Logo</a>-->
        <!--</div>-->
        <div></div>
        <nav>
            <ul>
                <li class="nav-item">
                    <x-button type="primary">登录</x-button>
                </li>
                <li class="nav-item">
                    <x-button>注册</x-button>
                </li>
            </ul>
        </nav>
    </header>
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
    #header {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1000;
    }

    header ul {
        display: flex;
    }

    .nav-item:not(:first-child) {
        margin-left: 20px;
    }
</style>