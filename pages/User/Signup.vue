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
              form(@submit.prevent="onSignup")
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
                    v-text-field(
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmpassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    )
                v-layout(row)
                  v-flex(xs12)
                    v-btn(type="submit" :disabled="loading" :loading="loading") Sign up
                      span.custom-loader(slot="loader")
                        v-icon(light) cached
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
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
      onSignup () {
        this.$store.dispatch('signUserUp', {
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