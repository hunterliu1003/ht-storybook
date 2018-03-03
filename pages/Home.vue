<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.text-xs-center.text-sm-right(xs12 sm6)
        v-btn.info(large to='/meetups') Explore Meetups
      v-flex.text-xs-center.text-sm-left(xs12 sm6)
        v-btn.info(large to='/meetups/new') Organize Meetup

    v-layout.mt-2(row wrap)
      v-flex(xs12)
        v-carousel(style="cursor: pointer;")
          v-carousel-item(
            v-for='(meetup, i) in meetups'
            :src='meetup.imageUrl'
            :key='meetup.id'
            @click.native='onLoadMeetup(meetup.id)'
          )
            div.title {{ meetup.title }}

    v-layout.mt-2(row wrap)
      v-flex.text-xs-center(xs12)
        p Join our awesome meetups!

</template>

<script>
export default {
  data () {
    return {
      meetups: [
        { imageUrl: 'https://media.timeout.com/images/103444978/630/472/image.jpg', id: '1', title: 'Meetup in New York'},
        { imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/eiffel-tower-paris-p.jpg?imwidth=1160', id: 'adfa213d213213sdfads', title: 'Meetup in Paris'},
        { imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/2018/February/Akihabara-overview.jpg?imwidth=1240', id: 'adfadsf23123dfads', title: 'Meetup in Tokyo'},
      ]
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
      console.log('asdf')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .title
    position absolute
    bottom: 60px
    background-color: rgba(0, 0, 0, .5)
    color: white
    font-size: 2em
    padding: 10px
    left: 50%;
    transform: translate(-50%, 0);
</style>
