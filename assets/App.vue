<template lang='pug'>
  v-app
    v-navigation-drawer(temporary v-model='sideNav' app)
      v-list
        v-list-tile(
          v-for='item in menuItems'
          :key='item.title'
          :to='item.link'
        )
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            | {{ item.title }}
        v-list-tile(
          v-if="userIsAuthenticated"
          @click="onLogout"
        )
          v-list-tile-action
            v-icon exit_to_app
          v-list-tile-content Logout

    v-toolbar.primary(dark app)
      v-toolbar-side-icon(
        @click.stop='sideNav = !sideNav'
        class='hidden-sm-and-up'
      )
      v-toolbar-title
        router-link(
          to="/" 
          tag="span" 
          style="cursor: pointer"
        ) DevMeetup
      v-spacer
      v-toolbar-items.hidden-xs-only
        v-btn(
          flat 
          v-for='item in menuItems' 
          :key='item.title'
          :to='item.link'
        )
          v-icon(left) {{ item.icon }}
          | {{ item.title }}
        v-btn(
          flat 
          v-if="userIsAuthenticated" 
          @click="onLogout"
        )
          v-icon(left) exit_to_app
          | Logout
    v-content
      v-container(fluid)
        router-view

    v-footer.grey.darken-3(height='auto')
      v-layout(row wrap justify-center)
        v-btn(color='white' flat v-for='link in links' :key='link')
          | {{ link }}
        v-flex(xs12 py-3 text-xs-center white--text)
          | ©2018 —
          strong  Vuetify


</template>

<script>
  import Meta from 'mixins/meta'

  export default {
    mixins: [Meta],

    data () {
      return {
        sideNav: false,
        links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'supervisor_account', title: 'View MeetUps', link: '/meetups' },
            { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
            { icon: 'person', title: 'Profile', link: '/profile' },
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        // console.log('user')
        // console.log(this.$store.getters.user)
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    },
    mounted () {
      console.log(this.$store.getters)
      console.log(this.$store.getters['user'])
    }
  }
</script>
