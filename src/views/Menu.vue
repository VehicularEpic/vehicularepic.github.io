<template>
    <div>
        <div class="title">The Vehicular Epic</div>
        <div class="menu">
            <MenuButton text="New Game" color="red" />
            <MenuButton text="Options" color="green" />
            <MenuButton text="Credits" color="blue" />
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import MenuButton from '@/components/MenuButton.vue'

@Component({ components: { MenuButton } })
export default class Menu extends Vue {

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