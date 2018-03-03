<template lang="pug">
  v-container
    v-layout(row)
      v-flex(xs12 sm6 offset-sm3)
        v-card
          v-card-text
            v-container
              form
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
                    v-btn(type="submit") Sign up
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
      }
    },
    methods: {
      onSignup () {
        // Vuex
        console.log({
          email: this.email,
          password: this.password,
          confirmpassword: this.confirmpassword
        })
      }
    }
  }
</script>