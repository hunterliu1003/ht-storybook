<template lang="pug">
  v-alert(error dismissible @input="onClose" :value="true")
    | {{ text }}
</template>

<script>
export default {
  props: ['text'],
  methods: {
      onClose () {
          this.$emit('dismissed')
      }
  }
}
</script>
