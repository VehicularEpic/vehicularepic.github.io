import Vue from 'vue'
import App from './App.vue'

import WebGame from '@/modules/web-game'
const game = Vue.observable(WebGame);

Vue.config.productionTip = false;

Vue.mixin({
    computed: {
        $game: {
            get: () => game
        }
    }
});

new Vue({ render: h => h(App) })
    .$mount('#app');
