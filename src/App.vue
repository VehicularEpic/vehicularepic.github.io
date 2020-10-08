<template>
    <div>
        <Menu v-if="$game.state === 0" />
        <canvas ref="canvas" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Menu from '@/views/Menu.vue'

@Component({ components: { Menu } })
export default class App extends Vue {

}
</script>

<style lang="scss" scoped>
canvas {
    top: 0px;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    position: absolute;
}
</style>