<template lang="pug">
  v-app
    v-toolbar(dark class="primary")
      v-toolbar-side-icon(
        @click.native="sideNav = !sideNav"
        class="hidden-sm-and-up"
      )
      v-toolbar-title
        | DevMeetup
      v-spacer
      v-toolbar-items(class="hidden-xs-only")
        v-btn(flat)
          v-icon(left) supervisor_account
          | View MeetUps

    v-navigation-drawer(v-model="sideNav")
      v-list
        v-list-tile
          v-list-tile-action
            v-icon supervisor_account
          v-list-tile-content
            | View MeetUps

    main
      div(class="red--text body-2")
        | 123

</template>

<script>
  import Meta from 'mixins/meta'

  export default {
    mixins: [Meta],

    data () {
      return {
        sideNav: false,
      }
    }
  }
</script>
