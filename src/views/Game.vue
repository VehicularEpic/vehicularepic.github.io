<template></template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Game extends Vue {

    private mounted(): void {
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }

    private keydown(event: KeyboardEvent): void {
        this.$game.player.keys[event.code] = true;
    }

    private keyup(event: KeyboardEvent): void {
        this.$game.player.keys[event.code] = false;
        const vehicle = this.$game.player.vehicle;

        vehicle.wheelInfos.forEach((e, i) => {
            vehicle.setBrake(0, i);
        });

        switch (event.code) {
            case 'ArrowUp':
            case 'ArrowDown':
                vehicle.applyEngineForce(0, 2);
                vehicle.applyEngineForce(0, 3);
                break;
            case 'ArrowRight':
            case 'ArrowLeft':
                vehicle.setSteeringValue(0, 0);
                vehicle.setSteeringValue(0, 1);
                break;
        }
    }

}
</script>