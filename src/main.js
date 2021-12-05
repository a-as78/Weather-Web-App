import Vue from 'vue'
import App from './App.vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
// import VueRouter from 'vue-router'
import router from './router.js'

Vue.use(VueMoment, {
    moment,
})
// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')