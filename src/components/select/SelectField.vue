<template>
    <div class="select-container">
        <div class="select-field" @click="onFieldClick">
            {{label}}
        </div>
        <ul v-show="optionShow" class="select-options">
            <li v-for="(option, index) in options" :key="index" class="select-option"
                :class="{active: option.selected}" @click="onOptionSelect(index)">
                {{option.label}}
            </li>
        </ul>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {mapMutations} from 'vuex';

    export default {
        props: {
            options: {
                type: Array,
                default: [{label: '', selected: false}]
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                optionShow: false,
                label: this.options[0].label,
                optionMap: {
                    map: {
                        label: '思维导图'
                    },
                    keyword: {
                        label: '关键词'
                    }
                }
            }
        },
        created() {
            this.label = this.optionMap[this.$store.state.searchType].label;
        },
        methods: {
            ...mapMutations([
                'setSearchType'
            ]),
            onFieldClick() {
                this.optionShow = true;
            },
            onOptionSelect(index) {
                const that = this;
                const selectedOption = this.options[index];

                _.forEach(that.options, function(option) {
                    option.selected = false;
                });
                this.options[index].selected = true;
                this.optionShow = false;
                this.setSearchType(selectedOption.type);
                this.label = this.optionMap[this.$store.state.searchType].label;
            }
        }
    }
</script>

<style>
    .select-container {
        display: inline-block;
        position: relative;
        margin-right: 20px;
    }

    .select-container::after {
        content: '';
        border: 5px solid transparent;
        border-top: 5px solid #49505b;
        width: 0;
        height: 0;
        position: absolute;
        top: 50%;
        left: 105%;
    }

    .select-field {
        cursor: pointer;
        text-align: left;
    }

    .select-options {
        width: 75px;
        padding: 16px;
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
    }

    .select-option {
        cursor: pointer;
    }

    .select-option.active {
        color: #3399FF;
    }

    .search-input {
        width: 500px;
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