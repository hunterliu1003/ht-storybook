<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.text-xs-center.text-sm-right(xs12 sm6)
        v-btn.info(large to='/meetups') Explore Meetups
      v-flex.text-xs-center.text-sm-left(xs12 sm6)
        v-btn.info(large to='/meetup/new') Organize Meetup

    v-layout
      v-flex.text-xs-center(xs12)
        v-progress-circular.primary--text(
          indeterminate
          :width="7"
          :size="70"
          v-if="loading"
        )

    v-layout.mt-2(row wrap v-if="!loading")
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
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
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
