<template>
    <div>
        <form @submit.prevent="search">
            <select-field :options="options"></select-field>
            <input type="text" class="search-input" v-model="keyword" placeholder="搜索" autocomplete="off"
                   :style="{width: inputWidth + 'px'}">
            <x-button type="submit" class="search-btn" css="primary">搜索</x-button>
        </form>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import SelectField from './../select/SelectField.vue';
    import Button from './../button/Button.vue';

    export default {
        props: {
            inputWidth: {
                type: Number,
                default: 500
            },
            onSearch: {
                type: Function,
                default: function () {
                }
            }
        },
        components: {
            SelectField,
            'x-button': Button
        },
        data() {
            return {
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
                keyword: ''
            }
        },
        methods: {
            ...mapMutations([
                'submitSearchForm'
            ]),
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