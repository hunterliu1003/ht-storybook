import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      loadedMeetups: [
        { 
          imageUrl: 'https://media.timeout.com/images/103444978/630/472/image.jpg',
          id: '1asdfads', 
          title: 'Meetup in New York',
          date: '2017-07-17'
        },
        { 
          imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/eiffel-tower-paris-p.jpg?imwidth=1160',
          id: 'adfa213d213213sdfads', 
          title: 'Meetup in Paris',
          date: '2017-07-27'
        },
        { 
          imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/2018/February/Akihabara-overview.jpg?imwidth=1240', 
          id: 'adfads3dfads', 
          title: 'Meetup in Tokyo',
          date: '2017-08-17'
        },
      ],
      user: {
        id: 'asdflkj',
        registeredMeetups: ['1asdfadsdsaf'],
      }
    },

    actions: {},

    mutations: {},

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
      }
    }
  })
}