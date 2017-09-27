<template>
    <header id="header">
        <slot name="left">
            <div></div>
        </slot>
        <slot name="right">
            <nav>
                <ul class="nav-items">
                    <li class="nav-item">
                        <x-button css="primary">登录</x-button>
                    </li>
                    <li class="nav-item">
                        <x-button>注册</x-button>
                    </li>
                </ul>
            </nav>
        </slot>
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
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
    }

    .nav-items {
        display: flex;
    }

    .nav-item:not(:first-child) {
        margin-left: 20px;
    }
</style>