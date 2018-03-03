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
          v-layout.mb-2(row)
            v-flex(xs12 sm6 offset-sm3)
              h4 Choose a Date & Time
          v-layout(row)
            v-flex(xs12 sm6 offset-sm3)
              v-date-picker(v-model="date")
              p {{ date }}
          v-layout(row)
            v-flex(xs12 sm6 offset-sm3)
              v-time-picker(v-model="time" format="24hr")
              p {{ time }}
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              v-btn.primary(:disabled="!formIsValid" type="submit") Create Meetup
              p {{ submittableDateTime }}
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: null,
      time: new Date()
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      
      console.log(date)
      return date
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
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>
