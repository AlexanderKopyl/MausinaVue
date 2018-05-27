import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCerifAI0MN75XQsSGedpPBjM-GcqMhieE',
      authDomain: 'itc-ads-99088.firebaseapp.com',
      databaseURL: 'https://itc-ads-99088.firebaseio.com',
      projectId: 'itc-ads-99088',
      storageBucket: 'itc-ads-99088.appspot.com',
      messagingSenderId: '180801842786'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
})
