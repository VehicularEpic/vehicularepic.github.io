<template>
    <button
        @click="$emit('click')"
        :style="{ '--button-color': color }"
        v-text="text"
    ></button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class MenuButton extends Vue {

    @Prop({ required: true })
    private readonly text!: string;

    @Prop({ required: true })
    private readonly color!: string;

}
</script>

<style lang="scss" scoped>
button {
    padding: 0;
    margin: 4px 0;
    height: 20px;
    border: none;
    background-color: transparent;
}

button:hover {
    background-color: var(--button-color);
    animation: breathe 1s linear infinite;
}

button:focus {
    outline: none;
}

@keyframes breathe {
    50% {
        background-color: rgba(var(--button-color), 0);
    }
}
</style>