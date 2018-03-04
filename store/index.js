import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      loadedMeetups: [
        { 
          imageUrl: 'https://media.timeout.com/images/103444978/630/472/image.jpg',
          id: '1asdfads', 
          title: 'Meetup in New York',
          date: new Date(),
          location: 'New York',
          description: 'It is New York'
        },
        { 
          imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/eiffel-tower-paris-p.jpg?imwidth=1160',
          id: 'adfa213d213213sdfads', 
          title: 'Meetup in Paris',
          date: new Date(),
          location: 'Paris',
          description: 'It is Paris'
        },
        { 
          imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/2018/February/Akihabara-overview.jpg?imwidth=1240', 
          id: 'adfads3dfads', 
          title: 'Meetup in Tokyo',
          date: new Date(),
          location: 'Tokyo',
          description: 'It is Tokyo'
        },
      ],
      user: null,
      loading: false,
      error: null
    },
    mutations: {
      createMeetup (state, payload) {
        state.loadedMeetups.push(payload)
      },
      setUser (state, payload) {
        state.user = payload
      },
      setLoading (state, payload) {
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      }
    },
    actions: {
      createMeetup ({commit}, payload) {
        const meetup = {
          title: payload.title,
          location: payload.loaction,
          imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date,
          id: 'sdafsadf'
        }
        commit('createMeetup', meetup)
      },
      signUserUp ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          })
          .catch(error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }

          )
      },
      signUserIn ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          })
          .catch(error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
      },
      clearError ({commit}) {
        commit('clearError')
      }
    },
    getters: {
      loadedMeetups (state) {
        return state.loadedMeetups.sort((meetupA, meetupB) => {
          return meetupA.date > meetupB.date
        })
      },
      featuredMeetups (state, getters) {
        return getters.loadedMeetups.slice(0, 5)
      },
      loadedMeetup (state) {
        return (meetupId) => {
          return state.loadedMeetups.find(meetup => {
            return meetup.id === meetupId
          })
        }
      },
      user (state) {
        return state.user
      },
      loading (state) {
        return state.loading
      },
      error (state) {
        return state.error
      }
    }
  })
}