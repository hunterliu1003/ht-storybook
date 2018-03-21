<template>
  <div
    :id="id"
    :style="{ width, height }"
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
    
    <div v-for="image in images">
      <p>{{ image }}</p>
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
      images: [1, 2, 3, 4],
      isShow: false,
      inputId: this.id + 'Input'
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('multiple', this.multiple)
    input.setAttribute('id', this.inputId)
    input.setAttribute('style', `
      visibility: hidden; 
      position: absolute; 
      top: 0px; 
      left: 0px; 
      height: 0px; 
      width: 0px;
    `)
    document.getElementsByTagName('body')[0].appendChild(input);

    let drop = this.$refs[this.id]
    function cancel(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
    // Tells the browser that we *can* drop on this target
    drop.addEventListener('dragover', cancel, false);
    drop.addEventListener('dragenter', cancel, false);

    drop.addEventListener('drop', function(e) {
      e = e || window.event; // get window.event if e argument missing (in IE)   
      if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

      let files = e.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let reader = new FileReader();
        //attach event handlers here...
        reader.readAsDataURL(file);
        reader.addEventListener('loadend', function(e, file) {
          let bin = this.result;
          let img = document.createElement("img");
          img.file = file;
          img.src = bin;
          drop.appendChild(img);
        }, false);
      }
    }, false);

    // let drop;
    // drop = this.$refs[this.id]
    // drop.addEventListener('drop', function(event) {
    //   event.preventDefault();
    //   let files = event.dataTransfer.files;
    //   for (let i = 0; i < files.length; i++) {
    //     let file = files[i];
    //     let reader = new FileReader();
    //     console.log(file)
    //     reader.readAsDataURL(file);
    //     reader.addEventListener('loadend', function(e) {
    //       console.log(this)
    //       console.log(e)
    //     }, false);
    //   }
    // }, false);
  },
  methods: {
    onInput (event) {
      // console.log('onInput!')
      // console.log(event)
      document.getElementById(this.inputId).click()
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
  /*.image-reader-input {
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
  }*/
  #drop {
    min-height: 150px;
    width: 250px;
    border: 1px solid blue;
    margin: 10px;
    padding: 10px;
  }
</style>