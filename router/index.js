import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

// The meta data for your routes
const meta = require('./meta.json')

// Function to create routes
// Is default lazy but can be changed
function route (path, view, obj) {
  return {
    path: path,
    meta: meta[path],
    component: resolve => import(`pages/${view}.vue`).then(resolve),
    ...obj
  }
}

Vue.use(Router)

export const router = (function () {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      route('/', 'Home'),
      route('/meetups', 'Meetup/Meetups'),
      route('/meetup/new', 'Meetup/CreateMeetup', { beforeEnter: AuthGuard }),
      route('/meetups/:id', 'Meetup/Meetup', { props: true }),
      route('/profile', 'User/Profile', { beforeEnter: AuthGuard }),
      route('/signin', 'User/Signin'),
      route('/signup', 'User/Signup'),
      // Global redirect for 404
      { path: '*', redirect: '/' }
    ]
  })

  // Send a pageview to Google Analytics
  router.beforeEach((to, from, next) => {
      if (typeof ga !== 'undefined') {
          ga('set', 'page', to.path)
          ga('send', 'pageview')
      }
      next()
  })

  return router
})()