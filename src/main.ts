import Vue from 'vue'
import App from './App.vue'

import WebGame from '@/modules/web-game'

Vue.config.productionTip = false;
Vue.prototype.$game = WebGame;

new Vue({ render: h => h(App) })
    .$mount('#app');
