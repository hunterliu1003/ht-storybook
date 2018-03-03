<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12)
        v-card
          v-card-title
            h4.primary--text.headline {{ meetup.title }}
          v-card-media(
            :src="meetup.imageUrl"
            height="400px"
          )
          v-card-text
            div.info--text {{ meetup.date | date }} - {{ meetup.location }}
            div {{ meetup.description }}
          v-card-actions
            v-spacer
            v-btn.primary Register
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
