<template>
    <button :class="'btn' + ' btn-' + css">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            css: {
                type: String,
                default: 'default' // default, primary, success, warning, danger
            },
            disabled: {
                type:Boolean,
                default: false
            }
        }
    }
</script>

<style>
    .btn {
        padding: 6px 12px;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 5px;
    }

    .btn-default {
        color: #3399FF;
        background-color: #fff;
        border-color: #3399FF;
    }

    .btn-primary {
        color: #fff;
        background-color: #3399FF;
    }
</style>