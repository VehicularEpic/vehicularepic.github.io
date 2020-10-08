<template>
    <div>
        <div class="title">The Vehicular Epic</div>
        <div class="menu">
            <MenuButton @click="state(1)" text="New Game" color="red" />
            <MenuButton text="Options" color="green" />
            <MenuButton text="Credits" color="blue" />
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { State } from '@/modules/web-game'
import MenuButton from '@/components/MenuButton.vue'

@Component({ components: { MenuButton } })
export default class Menu extends Vue {

    private state(state: State): void {
        this.$game.state = state;
    }

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
        font-size: 8vw;
        text-align: center;
        font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    }

    .menu {
        bottom: 20vh;
        position: absolute;
    }
}
</style>