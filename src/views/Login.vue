<template>
    <div id="wrapper">
        <div>
            <card style="width: 400px">
                <h3 slot="title">登录</h3>
                <i-form ref="loginForm" label-position="top" @submit.prevent="login">
                    <form-item label="用户名" label-for="username">
                        <i-input id="username" type="text" v-model="username" placeholder="请输入用户名"
                                 size="large"></i-input>
                    </form-item>
                    <form-item label="密码" label-for="password">
                        <i-input id="password" type="password" v-model="password" placeholder="请输入密码"
                                 size="large"></i-input>
                    </form-item>
                    <form-item>
                        <i-button type="primary" html-type="submit" long @click="login">登录</i-button>
                    </form-item>
                </i-form>
                <p>没有账户？
                    <router-link to="/signup">注册一个</router-link>
                </p>
            </card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            login() {
                axios.post('/searchpp/login_check', {
                    username: this.username,
                    password: this.password
                }).then(function (oRes) {
                    debugger;
                    console.log(oRes.data);
                }).catch(function (error) {
                    debugger;
                    console.log(error);
                });
            }
        }
    }
</script>

<style>
    #wrapper {
        display: flex;
        justify-content: center;
        height: 100vh;
        padding-top: 10%;
        background-color: #eee;
    }
</style>