<template>
    <div>
        <x-header>
            <search-bar slot="left"></search-bar>
        </x-header>
        <main>
            <div id="result-filter">
                <ul>
                    <li>推荐</li>
                    <li>全部</li>
                </ul>
            </div>
            <div>找到约{{result.data.length}}条结果</div>
            <div id="content-container">
                <div id="items-container">
                    <article class="item-container" v-for="item in result.data" :key="item.doc_id">
                        <header>
                            <h3 class="item-title"><a :href="item.url">{{item.title}}</a></h3>
                            <span>收藏</span>
                        </header>
                        <p class="item-detail" v-html="item.detail"></p>
                        <footer class="item-footer">{{item.url}}</footer>
                    </article>
                </div>
                <!--<aside>-->
                    <!--<h4>推荐网站</h4>-->
                    <!--<ul>-->
                        <!--<li>Google</li>-->
                        <!--<li>百度</li>-->
                        <!--<li>区块链</li>-->
                    <!--</ul>-->
                <!--</aside>-->
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios';
    import Header from './../components/header/Header.vue';
    import SearchBar from './../components/search/SearchBar.vue';

    export default {
        components: {
            'x-header': Header,
            SearchBar
        },
        data() {
            return {
                key: '',
                result: {code: 0, data: []}
            };
        },
        created() {
            this.getResults();
        },
        methods: {
            getResults() {
                const that = this;
                const query = this.$route.query;

                if (query && query.key) {
                    this.key = query.key;
                    axios.get('/searchpp/search', {
                        params: {
                            key: that.key
                        }
                    })
                        .then(function (oRes) {
                            if(oRes) {
                                const data = oRes.data;
                                if(data.code !== 0 && data.data.length > 0) {
                                    that.result = oRes.data;
                                }
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            }
        }
    }
</script>

<style>
    main {
        margin: 100px 10% 0 10%;
    }

    #result-filter, #result-filter > ul {
        display: flex;
    }

    #content-container {
        display: flex;
        justify-content: space-between;
    }

    #items-container {
        width: 70%;
    }

    .item-container {
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #e1e4e8;
    }

    .item-title {
        max-width: 75%;
        color: #3399FF;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; /* IE/Safari */
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis; /* Opera */
    }

    .item-detail {
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis; !* IE/Safari *!*/
        /*-ms-text-overflow: ellipsis;*/
        /*-o-text-overflow: ellipsis; !* Opera *!*/
    }

    .item-footer {
        max-width: 100%;
        font-size: 0.5em;
        color: green;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; /* IE/Safari */
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis; /* Opera */
    }
</style>