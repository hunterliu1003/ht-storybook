<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12 sm6 offset-sm3)
        h4.primary--text.headline Create a new Meetup
    v-layout(row)
      v-flex(xs12)
        form(@submit.prevent="onCreateMeetup")
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              v-text-field(
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              )
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              v-text-field(
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              )
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              img(:src="imageUrl" height="200")
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              v-text-field(
                name="imageUrl"
                label="Imgae URL"
                id="imageUrl"
                v-model="imageUrl"
                required
              )
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              v-text-field(
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multi-line
                required
              )
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              v-btn.primary(:disabled="!formIsValid" type="submit") Create Meetup
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: ''
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date()
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>
