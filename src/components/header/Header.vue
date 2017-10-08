<template>
    <header id="header">
        <slot name="left">
            <div></div>
        </slot>
        <slot name="right">
            <nav>
                <ul v-if="username">
                    <li>
                        <dropdown @on-click="onItemSelect">
                            <i-button type="primary">
                                {{username}}
                                <Icon type="arrow-down-b"></Icon>
                            </i-button>
                            <dropdown-menu slot="list">
                                <dropdown-item>个人中心</dropdown-item>
                                <dropdown-item>我的收藏</dropdown-item>
                                <dropdown-item name="logout" divided>退出</dropdown-item>
                            </dropdown-menu>
                        </dropdown>
                    </li>
                </ul>
                <ul v-else class="nav-items">
                    <li class="nav-item">
                        <i-button type="primary" @click="login">登录</i-button>
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
    import {mapMutations} from 'vuex';

    export default {
        computed: {
            username: {
                get: function () {
                    return this.$store.state.username;
                },
                set: function (newValue) {
                    this.$store.state.username = newValue;
                }
            }
        },
        methods: {
            ...mapMutations([
                'setUser'
            ]),
            login() {
                this.setUser('username');
            },
            onItemSelect(name) {
                switch (name) {
                    case 'logout':
                        this.logout();
                        break;
                }
            },
            logout() {
                this.setUser('');
            }
        }
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