import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

// ================
// Lodash
// ----------------
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// name is optional
Vue.use(VueLodash, { name: 'custom', lodash: lodash })

import VueStash from 'vue-stash'
import store from './store'
Vue.use(VueStash)

Vue.config.productionTip = false

var vm = new Vue({
  vuetify,
  data: { store },
  render: h => h(App)
}).$mount('#app')

export default vm;
