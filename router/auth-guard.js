import { createStore } from '../store'

const store = createStore()

export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signin')
  }
}