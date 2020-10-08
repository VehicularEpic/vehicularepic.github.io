<template>
    <div>
        <Menu v-if="$game.state === 0" />
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