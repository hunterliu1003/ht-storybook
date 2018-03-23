<template lang="pug">
  .image-reader(
    :id="id"
    :ref="id"
    :style="{ width, 'min-height': minHeight }"
    v-sortable="{ onUpdate: onUpdate }"
    @click="onInput"
  )
    slot(
      name="default"
      v-if="isShow"
    )
      span.image-reader-default Drop files here to upload

    .image-reader-image(
      v-for="(image, index) in value"
      :key="image.url"
      @click.stop=""
    )
      img(:src="image.url")
      span(@click.stop="deleteImage(index)") X
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    },
    minHeight: {
      type: String,
      default () {
        return '200px'
      }
    },
    multiple: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      inputId: this.id + 'Input'
    }
  },
  computed: {
    isShow () {
      return !(this.value.length > 0)
    }
  },
  mounted () {
    this.setElementInput()
    this.eventListenerDrop()
  },
  methods: {
    onUpdate (event) {
      this.value.splice(event.newIndex, 0, this.value.splice(event.oldIndex, 1)[0])
    },
    onInput (event) {
      document.getElementById(this.inputId).click()
    },
    cancel (event) {
      if (event.preventDefault) {
        event.preventDefault()
      }
    },
    setElementInput () {
      let $body = document.getElementsByTagName('body')[0]
      let $input = document.createElement('input')
      $input.setAttribute('type', 'file')
      $input.setAttribute('accept', 'image/*')
      this.multiple && $input.setAttribute('multiple', true)
      $input.setAttribute('id', this.inputId)
      $input.setAttribute('style', `
        visibility: hidden;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 0px;
        width: 0px;
      `)
      $body.appendChild($input);
      $input.addEventListener('change', event => {
        this.pushFilesToImages(event.target.files)
        this.resetElementInput()
      }, false)
    },
    resetElementInput () {
      let $body = document.getElementsByTagName('body')[0]
      if (document.getElementById(this.inputId)) {
        $body.removeChild(document.getElementById(this.inputId))
      }
      this.setElementInput()
    },
    eventListenerDrop () {
      let drop = this.$refs[this.id]
      drop.addEventListener('dragover', this.cancel, false)
      drop.addEventListener('dragenter', this.cancel, false)
      drop.addEventListener('drop', e => {
        e = e || window.event; // get window.event if e argument missing (in IE)
        this.cancel(e)
        this.pushFilesToImages(e.dataTransfer.files)
      }, false)
    },
    pushFilesToImages (files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        this.value.push({
          file: file,
          url: URL.createObjectURL(file)
        })
      }
    },
    deleteImage (index) {
      this.resetElementInput()
      URL.revokeObjectURL(this.value[index].url)
      this.value.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.image-reader
  position: relative
  border: 2px dashed #CBCBCB
  display: flex
  align-items: flex-start
  cursor: pointer
  flex-wrap: wrap
.image-reader-default
  margin: auto
.image-reader-image
  border: 3px solid #000
  margin: 15px
  position: relative
  display: flex
  align-items: center
  justify-content: center
  img
    display: block
    max-height: 200px
    min-width: 100px
    object-fit: cover
  span
    position: absolute
    top: -15px
    right: -15px
    background-color: gray
    border-radius: 50%
    width: 30px
    height: 30px
    text-align: center
    line-height: 30px
</style>