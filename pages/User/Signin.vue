<template lang="pug">
  v-container
    v-layout(row)
      v-flex(xs12 sm6 offset-sm3)
        v-card
          v-card-text
            v-container
              form(@submit.prevent="onSignin")
                v-layout(row)
                  v-flex(xs12)
                    v-text-field(
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    )
                v-layout(row)
                  v-flex(xs12)
                    v-text-field(
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    )
                v-layout(row)
                  v-flex(xs12)
                    v-btn(type="submit") Sign in
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user (value) {
        if (value !== null && value!== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>