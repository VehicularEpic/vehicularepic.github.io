import 'vue'
import 'cannon'

import { WebGame } from '@/modules/web-game'

declare module 'vue/types/vue' {

    interface Vue {

        readonly $game: WebGame;

    }

}


declare module 'cannon' {

    interface RaycastVehicle {

        updateWheelTransform(wheelIndex: integer);

    }

    interface IWheelInfoOptions {

        worldTransform?: Transform;

    }

}