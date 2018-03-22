<template>
  <div
    :id="id"
    :style="{ width, 'min-height': height }"
    class="image-reader"
    @click="onInput"
    :ref="id"
  >
    <slot
      name="default"
      v-if="isShow"
      class="image-reader-default"
    >
      Drop files here to upload
    </slot>

    <div v-for="(image, index) in images" @click.stop>
      <!-- <p>{{ image }}</p> -->
      <img :src="image.url" alt="">
      <p @click.stop="deleteImage(index)">delete</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageReaderMultiple',
  components: {
  },
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    },
    height: {
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
      images: [],
      inputId: this.id + 'Input'
    }
  },
  computed: {
    isShow () {
      return !(this.images.length > 0)
    }
  },
  created () {
  },
  mounted () {
    this.setElementInput()
    this.eventListenerDrop()
  },
  methods: {
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
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('loadend', e => {
          console.log(e.target.result)
          this.images.push({
            file: file,
            url: e.target.result
          })

        }, false)
      }
    },
    deleteImage (index) {
      this.resetElementInput()
      console.log(index)
      console.log(this.images)
      this.images.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .image-reader {
    position: relative;
    border: 2px dashed #CBCBCB;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .image-reader-default {

  }
</style>