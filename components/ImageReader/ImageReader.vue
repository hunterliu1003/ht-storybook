<template>
  <div class="rt-image-reader"
    :class="{ 'hovered': isHover, 'has-image': value }"
    @dragenter="toggleHovering()"
    @dragleave="toggleHovering()">
    <div v-if="!value">
      <p class="text-center">選擇圖片<span class="rti rti-2x rti-upload-content"></span></p>
      <p>- 或 - 拖曳檔案至此</p>
    </div>
    <img v-if="value" class="rt-image-reader-media" :src="value" alt="" ref="imageInput">
    <input
      v-if="!value"
      class="rt-image-reader-input"
      type="file"
      accept="image/*"
      @change="onFileChange"
    >
    <span v-if="value"
      class="rt-image-reader-remove rti rti-2x rti-trash-danger"
      @click="removeImage"></span>
  </div>
</template>


<script>
export default {
  name: 'ImageReader',
  props: {
    value: {
      type: String,
      required: true
    },
    fileTypes: {
      type: Array,
      default () {
        return ['image/jpeg', 'image/gif', 'image/png']
      }
    },
    maxSizeKB: {
      type: Number,
      default () {
        return 500
      }
    },
    minWidth: {
      type: [Number, String]
    },
    minHeight: {
      type: [Number, String]
    },
    imageWidthHeightPair: {
      type: Array
      /* Array Object
      [
        {
          width: 300,
          height: 60
        },
        ...
      ]
      */
    },
    aspectRatio: {
      /* 寬高比 ex: 1.9 */
      type: [Number, String]
    },
    tolerance: {
      /* 容許正負百分比 ex: 3 代表 +-0.03 */
      type: [Number, String],
      default () {
        return 0
      }
    },
    isvalid: {
      type: Boolean,
      default: false
    },
    file: {
      type: File
    }
  },
  data () {
    return {
      isHover: false,
      fileSize: 0,
      fileType: '',
      fileWidth: 0,
      fileHeight: 0
    }
  },
  computed: {
    validImage () {
      return (
        this.isValidSize &&
        this.isValidType &&
        this.isValidMinWidth &&
        this.isValidMinHeight &&
        this.isValidWidthHeightPair &&
        this.isValidAspectRatioWithTolerance
      )
    },
    isValidType () {
      return this.fileTypes.some(type => this.fileType === type)
    },
    isValidSize () {
      return this.fileSize < 1024 * this.maxSizeKB
    },
    isValidMinWidth () {
      return this.minWidth ? this.fileWidth >= Number(this.minWidth) : true
    },
    isValidMinHeight () {
      return this.minHeight ? this.fileHeight >= Number(this.minHeight) : true
    },
    isValidWidthHeightPair () {
      return this.imageWidthHeightPair ? this.imageWidthHeightPair.some(pair => pair.width === this.fileWidth && pair.height === this.fileHeight) : true
    },
    isValidAspectRatioWithTolerance () {
      return this.aspectRatio ? (this.toleranceUnder < this.fileAspectRatio && this.fileAspectRatio < this.toleranceUp) : true
    },
    fileAspectRatio () {
      return this.fileWidth / this.fileHeight
    },
    toleranceUp () {
      return Number(this.aspectRatio) * (1 + Number(this.tolerance) / 100)
    },
    toleranceUnder () {
      return Number(this.aspectRatio) * (1 - Number(this.tolerance) / 100)
    }
  },
  methods: {
    toggleHovering () {
      this.isHover = !this.isHover
    },
    setHovering (bool) {
      this.isHover = bool
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
      this.$emit('update:file', files[0])
    },
    createImage (file) {
      this.$emit('input', URL.createObjectURL(file))
      this.$nextTick(() => {
        let self = this
        this.$refs.imageInput.onload = function () {
          self.fileType = file.type
          self.fileSize = file.size
          self.fileWidth = this.naturalWidth
          self.fileHeight = this.naturalHeight
          self.$emit('update:isvalid', self.validImage)
        }
      })
      this.setHovering(false)
    },
    removeImage () {
      this.$emit('input', '')
      this.fileType = ''
      this.fileSize = 0
      this.fileWidth = 0
      this.fileHeight = 0
      this.$emit('update:isvalid', this.validImage)
      this.setHovering(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.rt-image-reader
  display: flex
  justify-content: center
  align-items: center
  width: @width
  height: @height
  border: 2px dashed #CBCBCB
  position: relative
  box-sizing: border-box
  &.hovered
    border: 2px dashed #2E94C4 !important
  &.has-image
    border: 2px solid #CBCBCB

.rt-image-reader-media
  width: 100%
  height: 100%
  object-fit: contain

.rt-image-reader-input
  position: absolute
  cursor: pointer
  top: 0
  right: 0
  bottom: 0
  left: 0
  width: 100%
  height: 100%
  opacity: 0
  z-index: 1

.rt-image-reader-remove
  position: absolute
  cursor: pointer
  top: 0
  right: 0
  opacity: 0.8
  z-index: 2

  &:hover
    opacity: 1
</style>