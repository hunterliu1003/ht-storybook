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
              v-btn.primary(
                raised
                @click="onPickFile"
              ) Upload Image
              input(
                type="file" 
                style="display: none" 
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              )
          v-layout
            v-flex(xs12 sm6 offset-sm3)
              img(
                :src="imageUrl" 
                height="200"
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
          v-layout(row)
            v-flex(xs12 sm6 offset-sm3)
              v-time-picker(v-model="time" format="24hr")
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
      description: '',
      date: null,
      time: new Date(),
      image: null
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
      if (!this.formIsValid) { return }
      if (!this.image) { return }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
