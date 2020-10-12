<template></template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { State } from '@/modules/web-game'

@Component
export default class Stages extends Vue {

    private mounted(): void {
        window.addEventListener('keydown', this.keydown);
    }

    private destroyed(): void {
        window.removeEventListener('keydown', this.keydown);
    }

    private keydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowRight':
                this.$game.stage = Math.min(
                    this.$game.stage + 1,
                    this.$game.stages
                );
                break;
            case 'ArrowLeft':
                this.$game.stage = Math.max(
                    this.$game.stage - 1,
                    1
                );
                break;
            case 'Enter':
                this.$game.initGame();
                this.$game.state = State.GAME;
                break;
        }
    }

}
</script>