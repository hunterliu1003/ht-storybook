<template lang="pug">
  v-container
    v-layout(row v-if="error")
      v-flex(xs12 sm6 offset-sm3)
        app-alert(@dismissed="onDismissed" :text="error.message")
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
                    v-btn(type="submit" :disabled="loading" :loading="loading") Sign in
                      span.custom-loader(slot="loader")
                        v-icon(light) cached
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
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
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
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>