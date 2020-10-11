<template>
    <div class="container">
        <div class="center">
            <MenuButton text="< Back" color="blue" />
        </div>
        <div>
            <p v-text="$game.vehicle.name"></p>
        </div>
        <div class="center">
            <MenuButton text="Next >" color="blue" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import MenuButton from '@/components/MenuButton.vue'

@Component({ components: { MenuButton } })
export default class Cars extends Vue {

}
</script>

<style lang="scss" scoped>
* {
    color: white;
}

button {
    text-transform: uppercase;
}

div.container {
    padding: 16px;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    > div {
        display: flex;
    }

    div.center {
        align-items: center;
    }
}
</style>