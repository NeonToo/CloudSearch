<template>
    <div>
        <x-header>
            <!--<search-bar slot="left"></search-bar>-->
            <form slot="left" @submit.prevent="search">
                <select-field :options="options"></select-field>
                <input type="text" class="search-input" v-model="keyword" placeholder="搜索" autocomplete="off">
                <!--<button class="btn btn-primary search-btn" @click="search">搜索</button>-->
                <button type="submit" class="btn btn-primary search-btn">搜索</button>
            </form>
        </x-header>
        <div id="result-filter">
            <ul id="filter">
                <li class="filter-item" :class="{'active': filter === 'r'}" @click="onFilter('r')">推荐</li>
                <li class="filter-item" :class="{'active': filter === 'a'}" @click="onFilter('a')">全部</li>
            </ul>
        </div>
        <main>
            <div>找到约{{dataset.length}}条结果</div>
            <div id="content-container">
                <div id="items-container">
                    <article class="item-container" v-for="(item, index) in dataset" :key="item.doc_id">
                        <header>
                            <h3 class="item-title">
                                <a :href="item.url" target="_blank">{{item.title}}</a>
                            </h3>
                            <img :src="item.stared ? '/static/CloudSearch/src/images/favorite.png' : '/static/CloudSearch/src/images/unfavorite.png'"
                                 class="item-favorite"
                                 @click="onFavorite(index)">
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
    import _ from 'lodash';
    import {mapMutations} from 'vuex';
    import Header from './../components/header/Header.vue';
    import SearchBar from './../components/search/SearchBar.vue';
    import SelectField from './../components/select/SelectField.vue';
    import Button from './../components/button/Button.vue';

    export default {
        components: {
            'x-header': Header,
            SelectField,
            'x-button': Button,
        },
        data() {
            return {
                filter: 'r',
                result: {code: 0, data: []},
                dataset: [],
                options: [
                    {
                        label: '思维导图',
                        selected: true,
                        type: 'map'
                    },
                    {
                        label: '关键词',
                        selected: false,
                        type: 'keyword'
                    }
                ],
                keyword: this.$store.state.key
            };
        },
        created() {
            console.log(this.$store.state.key);
            this.getResults();
        },
        methods: {
            ...mapMutations([
                'setSearchType', 'setKey', 'submitSearchForm'
            ]),
            onFilter(filterIndex) {
                const that = this;

                if (filterIndex) {
                    that.filter = filterIndex;
                }

                if (that.filter === 'r') { // recommendation data
                    that.dataset = _.filter(that.result.data, function (item) {
                        return !item["from_baidu"];
                    });
                } else {
                    that.dataset = that.result.data;
                }

                return this.dataset;
            },
            search() {
                if (this.keyword) {
                    const searchType = this.$store.state.searchType;

                    this.submitSearchForm({
                        searchType: searchType,
                        key: this.keyword
                    });
                    if (searchType === 'map') { // mind-map search
                        this.$router.push({
                            path: '/map'
                        });
                    } else { // keyword search
                        this.getResults(this.keyword);
//                        this.$router.push({
//                            path: '/results',
//                            query: {
//                                key: this.keyword
//                            }
//                        });
                    }
                }
            },
            getResults(keyword) {
                const that = this;

                if (keyword) { // search in current page
                    this.key = keyword;
                } else {
                    const query = this.$route.query;

                    if (query && query.key) {
                        this.key = query.key;
                    }
                }

                axios.get('/searchpp/search', {
                    params: {
                        key: that.key
                    }
                })
                    .then(function (oRes) {
                        if (oRes) {
                            const data = oRes.data;
                            if (data.code !== 0 && data.data.length > 0) {
                                that.result = oRes.data;
                                that.dataset = that.onFilter();
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                    });

            },
            onFavorite(index) {
                const selectedItem = this.result.data[index];
                const isStared = selectedItem.stared;

                this.result.data[index].stared = !isStared;
            }
        }
    }
</script>

<style>
    #result-filter, #result-filter > ul {
        display: flex;
    }

    #result-filter {
        margin-top: 87px;
        background-color: #f8f8f8;
        padding: 0 108px;
    }

    .filter-item {
        cursor: pointer;
        padding: 10px;
        border-bottom: 2px solid transparent;
    }

    .filter-item.active {
        border-bottom: 2px solid #3399FF;
    }

    main {
        margin: 10px 108px 0 108px;
    }

    .filter-item:not(:first-child) {
        margin-left: 20px;
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

    .item-favorite {
        cursor: pointer;
        position: relative;
        top: 1px;
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