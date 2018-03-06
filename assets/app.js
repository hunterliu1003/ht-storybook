import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.css'
import '../stylus/main.styl'
import App from './App.vue'
import firebase from 'firebase'
import Components from 'components/_index'
import DateFilter from '../filters/date'

import { store } from 'store/index'
import { createRouter } from 'router/index'
import { sync } from 'vuex-router-sync'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBrMrSeFfaeRfPXVXlPhR11J2b1zZxhhPc',
    authDomain: 'ht-storybook.firebaseapp.com',
    databaseURL: 'https://ht-storybook.firebaseio.com',
    projectId: 'ht-storybook',
    storageBucket: 'gs://ht-storybook.appspot.com'
  });
}

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2
  },
  options: {
    // minifyTheme: function () {
    //   return process.env.NODE_ENV === 'production'
    //     ? val.replace(/[\s|\r\n|\r|\n]/g, '')
    //     : null
    // },
    // themeVariations: ['primary', 'secondary', 'success']
  }
})

Vue.filter('date', DateFilter)

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (ssrContext) {
  // create store and router instances
  // const store = createStore()
  const router = createRouter()
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h(App),
    beforeCreate () {
      // if (!firebase.apps.length) {
      //   firebase.initializeApp({
      //     apiKey: 'AIzaSyBrMrSeFfaeRfPXVXlPhR11J2b1zZxhhPc',
      //     authDomain: 'ht-storybook.firebaseapp.com',
      //     databaseURL: 'https://ht-storybook.firebaseio.com',
      //     projectId: 'ht-storybook',
      //     storageBucket: 'gs://ht-storybook.appspot.com'
      //   });
      // }
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      })
      this.$store.dispatch('loadMeetups')
    }
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
