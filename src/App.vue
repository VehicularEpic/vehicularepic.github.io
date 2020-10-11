<template>
    <div>
        <Menu v-if="$game.state === 0" />
        <Cars v-if="$game.state === 1" />
        <canvas ref="canvas" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Menu from '@/views/Menu.vue'
import Cars from '@/views/Cars.vue'

@Component({ components: { Menu, Cars } })
export default class App extends Vue {

    private mounted(): void {
        const canvas = this.$refs['canvas'] as HTMLCanvasElement;
        this.$game.context = canvas.getContext('webgl2') as WebGL2RenderingContext;
        this.$game.start();
    }

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