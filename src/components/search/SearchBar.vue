<template>
    <form @submit.prevent="search">
        <!--<i-input size="large" v-model="keyword" placeholder="搜索" style="width: 500px">-->
        <!--<i-select v-model="searchType" slot="prepend" style="width: 100px">-->
        <!--<i-option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}-->
        <!--</i-option>-->
        <!--</i-select>-->
        <!--<i-button slot="append" html-type="submit" type="primary" class="search-btn" icon="ios-search"></i-button>-->
        <!--</i-input>-->
        <!--<select-field :options="options"></select-field>-->
        <i-select v-model="searchType" size="large" style="width: 100px" @on-change="onOptionChange">
            <i-option v-for="(option, index) in options" :value="option.value" :key="index">
                {{option.label}}
            </i-option>
        </i-select>
        <i-input size="large" type="text" v-model="keyword" placeholder="搜索" autocomplete="off" :autofocus="true"
                 :style="{width: inputWidth + 'px'}" icon="ios-search" @on-click="search"></i-input>
        <!--<i-button html-type="submit" type="primary" class="search-btn" icon="ios-search"></i-button>-->
    </form>
</template>

<script>
    import {mapMutations} from 'vuex';
    import SelectField from './../select/SelectField.vue';
    import ISelect from "../../../node_modules/iview/src/components/select/select.vue";

    export default {
        props: {
            inputWidth: {
                type: Number,
                default: 450
            },
            onSearch: {
                type: Function,
                default: function () {
                }
            }
        },
        components: {
            ISelect,
            SelectField
        },
        data() {
            return {
                options: [
                    {
                        label: '思维导图',
                        value: 'map',
                        selected: true,
                        type: 'map'
                    },
                    {
                        label: '关键词',
                        value: 'keyword',
                        selected: false,
                        type: 'keyword'
                    }
                ]
            }
        },
        computed: {
            searchType: {
                get: function () {
                    return this.$store.state.searchType;
                },
                set: function (newValue) {
                    this.setSearchType(newValue);
                }
            },
            keyword: {
                get: function () {
                    return this.$store.state.keyword;
                },
                set: function (newValue) {
                    this.setKeyword(newValue);
                }
            }
        },
        methods: {
            ...mapMutations([
                'setSearchType', 'setKeyword', 'submitSearchForm'
            ]),
            onOptionChange(selectedValue) {
                this.setSearchType(selectedValue);
            },
            search() {
                if (this.keyword) {
                    const searchType = this.$store.state.searchType;

                    this.submitSearchForm({
                        searchType: searchType,
                        keyword: this.keyword
                    });
                    if (searchType === 'map') { // mind-map search
                        this.$router.push({
                            path: '/map'
                        });
                    } else { // keyword search
                        this.$router.push({
                            path: '/results',
                            query: {
                                key: this.keyword
                            }
                        });
                    }
                }
            }
        }
    }
</script>

<style>
    .search-input {
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