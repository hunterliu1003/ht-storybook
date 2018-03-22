<template>
  <div
    :id="id"
    :style="{ width, 'min-height': minHeight }"
    class="image-reader"
    @click="onInput"
    :ref="id"
  >
    <slot
      name="default"
      v-if="isShow"
    >
      Drop files here to upload
    </slot>

    <div
      v-for="(image, index) in value"
      class="imgae-reader-image"
      @click.stop
    >
      <img :src="image.url" alt="">
      <span @click.stop="deleteImage(index)">X</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageReaderMultiple',
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
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('loadend', e => {
          // console.log(e.target.result)
          this.value.push({
            file: file,
            url: e.target.result
          })

        }, false)
      }
    },
    deleteImage (index) {
      this.resetElementInput()
      this.value.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .image-reader {
    position: relative;
    border: 2px dashed #CBCBCB;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    flex-wrap: wrap;
  }
  .imgae-reader-image {
    border: 3px solid #000;
    margin: 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .imgae-reader-image img {
    display: block;
    max-height: 200px;
    min-width: 100px;
    object-fit: cover;
  }
  .imgae-reader-image span {
    position: absolute;
    top: -15px;
    right: -15px;
    background-color: gray;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
</style>