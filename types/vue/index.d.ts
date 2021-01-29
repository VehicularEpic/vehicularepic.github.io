import 'vue'

import { WebGame } from '@/modules/web-game'

declare module 'vue/types/vue' {

    interface Vue {

        readonly $game: WebGame;

    }

}