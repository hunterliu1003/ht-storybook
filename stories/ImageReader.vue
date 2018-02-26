<template>
  <div class="rt-image-reader"
    :class="{ 'hovered': isHover, 'has-image': value }"
    @dragenter="toggleHovering()"
    @dragleave="toggleHovering()">
    <div v-if="!value">
      <p class="text-center">選擇圖片</p>
      <p>- 或 - 拖曳檔案至此</p>
    </div>
    <img v-if="value" class="rt-image-reader-media" :src="value" ref="imageInput">
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
      isvalid: {
        type: Boolean,
        default: false
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
      validFile () {
        return this.validFileSize && this.validFileType && this.validFileWidthHeightPair
      },
      validFileType () {
        return this.fileTypes.some(type => this.fileType === type)
      },
      validFileSize () {
        return this.fileSize < 1024 * this.maxSizeKB
      },
      validFileWidthHeightPair () {
        return this.imageWidthHeightPair ? this.imageWidthHeightPair.some(pair => pair.width === this.fileWidth && pair.height === this.fileHeight) : true
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
            self.$emit('update:isvalid', self.validFile)
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
        this.$emit('update:isvalid', this.validFile)
        this.setHovering(false)
      }
    }
  }
</script>

<style lang="scss">
@mixin ui-image-reader($width: "150px", $height: "150px", $namespace: "ht"){

  .#{$namespace}-image-reader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $width;
    height: $height;
    border: 2px dashed #CBCBCB;
    position: relative;
    box-sizing: border-box;

    &.hovered {
      border: 2px dashed #2E94C4 !important;
    }

    &.has-image {
      border: 2px solid #CBCBCB;
    }
  }

  .#{$namespace}-image-reader-media {
    width: 100%;
    height: 100%;
    // object-fit: cover;
  }

  .#{$namespace}-image-reader-input {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }

  .#{$namespace}-image-reader-remove {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    opacity: 0.8;
    z-index: 2;

    &:hover {
      opacity: 1;
    }
  }
}

@include ui-image-reader()
</style>