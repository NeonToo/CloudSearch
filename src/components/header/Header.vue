<template>
    <header id="header">
        <slot name="left">
            <div></div>
        </slot>
        <slot name="right">
            <nav>
                <ul class="nav-items">
                    <li class="nav-item">
                        <i-button type="primary">登录</i-button>
                    </li>
                    <li class="nav-item">
                        <i-button type="ghost">注册</i-button>
                    </li>
                </ul>
            </nav>
        </slot>
    </header>
</template>

<script>

    export default {
    }
</script>

<style>
    #header {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
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