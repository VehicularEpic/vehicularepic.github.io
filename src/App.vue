<template>
    <div>
        <div class="title">The Vehicular Epic</div>
        <div class="menu">
            <menu-button text="New Game" color="red" />
            <menu-button text="Options" color="green" />
            <menu-button text="Credits" color="blue" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import MenuButton from '@/components/MenuButton.vue'

@Component({ components: { MenuButton } })
export default class App extends Vue {

}
</script>

<style lang="scss" scoped>
* {
    width: 100vw;
    color: white;
    text-transform: uppercase;
}

div {
    .title {
        font-size: 96px;
        text-align: center;
    }

    .menu {
        bottom: 200px;
        position: absolute;
    }
}
</style>
