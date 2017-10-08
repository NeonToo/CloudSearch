<template>
    <div id="wrapper">
        <div>
            <card style="width: 400px">
                <h3 slot="title">注册</h3>
                <i-form ref="loginForm" label-position="top" @submit.prevent="signup">
                    <form-item label="用户名" label-for="username">
                        <i-input id="username" type="text" v-model="username" placeholder="请输入用户名"
                                 size="large"></i-input>
                    </form-item>
                    <form-item label="密码" label-for="password">
                        <i-input id="password" type="password" v-model="password" placeholder="请输入密码"
                                 size="large"></i-input>
                    </form-item>
                    <form-item label="重复密码" label-for="password2">
                        <i-input id="password2" type="password2" v-model="password2" placeholder="请重复输入密码"
                                 size="large"></i-input>
                    </form-item>
                    <form-item>
                        <i-button type="primary" html-type="submit" long @click="signup">注册</i-button>
                    </form-item>
                </i-form>
                <p>已有账户？
                    <router-link to="/login">去登录</router-link>
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
                password: '',
                password2: ''
            };
        },
        methods: {
            signup() {
                const password1 = this.password;
                const password2 = this.password2;

                if(password1 === password2) {
                    axios.post('/searchpp/register_check', {
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