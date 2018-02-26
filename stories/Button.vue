<template>
  <p>{{rounded}}</p>
</template>

<script>
  export default {
    props: {
      rounded: {
      type: Boolean,
        default () {
          return false
        }
      }
    }
  }
</script>