<template>
    <div class="container">
        <div class="aside">
            <MenuButton text="< Back" color="blue" />
        </div>
        <div>
            <p v-text="$game.vehicle.name"></p>
            <MenuButton @click="done" text="Continue" color="green" />
        </div>
        <div class="aside">
            <MenuButton text="Next >" color="blue" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import MenuButton from '@/components/MenuButton.vue'
import { State } from '@/modules/web-game'

@Component({ components: { MenuButton } })
export default class Cars extends Vue {

    private mounted(): void {
        this.$game.player.pos(0.0, -1.0, 10.0);
    }

    private done(): void {
        this.$game.state = State.STAGES;
    }

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
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;

    > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: inherit;
    }

    div.aside {
        flex: 0.1;
        justify-content: center;
    }

    p {
        text-align: center;
    }
}
</style>