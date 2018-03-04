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
      setLoadedMeetups (state, payload) {
        state.loadedMeetups = payload
      },
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
      loadMeetups ({commit}) {
        commit('setLoading', true)
        firebase.database().ref('meetups').once('value')
          .then(data => {
            const meetups = []
            const obj = data.val()
            for (let key in obj) {
              meetups.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                date: obj[key].date
              })
            }
            commit('setLoadedMeetups', meetups)
            commit('setLoading', false)
          })
          .catch(error => {
            console.log(error)
            commit('setLoading', true)
          })
      },
      createMeetup ({commit}, payload) {
        const meetup = {
          title: payload.title,
          location: payload.location,
          imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date.toISOString()
        }
        firebase.database().ref('meetups').push(meetup)
          .then(data => {
            const key = data.key
            commit('createMeetup', { 
              ...meetup,
              id: key
            })
          })
          .catch(error => {
            console.log(error)
          })
        
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