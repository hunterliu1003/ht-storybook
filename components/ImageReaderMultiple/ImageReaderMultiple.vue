<template>
  <!-- <div> -->

    <div
      :id="id"
      :style="{ width, height }"
      class="image-reader"
      @input="onInput"
      :ref="id"
    >
      <slot
        name="default"
        v-if="isShow"
        class="image-reader-default"
      >
        Drop files here to upload
      </slot>
      <input
        type="file"
        class="image-reader-input"
        ref="imageReaderInput"
        accept="image/*"
        @change="onInput"
        :multiple="multiple"
      >
      <div v-for="image in images">
        <p>{{ image }}</p>
      </div>


    </div>
 <!--    <div>
      <h1 align=center>A File Preview Demo</h1>
      <div id="status">Drag the files from a folder to a selected area ...</div>
      <div id="drop">Drop files here.</div>
      <div id="list"></div>
    </div> -->

  <!-- </div> -->
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
    }
  },
  computed: {
  },
  created () {
    // let input = document.createElement('input')
    // input.setAttribute('id', this.id + 'Input')
    // input.setAttribute('type', 'file')
    // input.setAttribute('accept', 'image/*')
    // input.setAttribute('multiple', this.multiple)
    // input.setAttribute('style', `
    //   visibility: hidden;
    //   position: absolute;
    //   top: 0px;
    //   left: 0px;
    //   height: 0px;
    //   width: 0px;
    // `)
    // console.log(input)
  },
  mounted () {
    if (window.FileReader) {
      let drop;
      addEventHandler(window, 'load', () => {
        // let status = document.getElementById('status');
        drop = this.$refs[this.id]

        function cancel(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          return false;
        }

        // Tells the browser that we *can* drop on this target
        addEventHandler(drop, 'dragover', cancel);
        addEventHandler(drop, 'dragenter', cancel);

        addEventHandler(drop, 'drop', function(e) {
          e = e || window.event; // get window.event if e argument missing (in IE)
          if (e.preventDefault) {
            e.preventDefault();
          } // stops the browser from redirecting off to the image.

          let dt = e.dataTransfer;
          let files = dt.files;
          for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let reader = new FileReader();

            //attach event handlers here...

            reader.readAsDataURL(file);
            addEventHandler(reader, 'loadend', function(e, file) {
              let bin = this.result;
              // let newFile = document.createElement('div');
              // newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B';
              // drop.appendChild(newFile);
              // let fileNumber = drop.getElementsByTagName('div').length;
              // status.innerHTML = fileNumber < files.length ?
                // 'Loaded 100% of file ' + fileNumber + ' of ' + files.length + '...' :
                // 'Done loading. processed ' + fileNumber + ' files.';

              let img = document.createElement("img");
              img.file = file;
              img.src = bin;
              drop.appendChild(img);
            }.bindToEventHandler(file));
          }
          return false;
        });
        Function.prototype.bindToEventHandler = function bindToEventHandler() {
          let handler = this;
          let boundParameters = Array.prototype.slice.call(arguments);
          // console.log(boundParameters);
          //create closure
          return function(e) {
            e = e || window.event; // get window.event if e argument missing (in IE)
            boundParameters.unshift(e);
            handler.apply(this, boundParameters);
          }
        };
      });
    }
    // else {
      // document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';
    // }

    function addEventHandler(obj, evt, handler) {
      if (obj.addEventListener) {
        // W3C method
        obj.addEventListener(evt, handler, false);
      } else if (obj.attachEvent) {
        // IE method.
        obj.attachEvent('on' + evt, handler);
      } else {
        // Old school method.
        obj['on' + evt] = handler;
      }
    }
  },
  methods: {
    onInput (event) {
      console.log('onInput!')
      console.log(event)
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
    /*cursor: pointer;*/
  }
  .image-reader-default {

  }
  .image-reader-input {
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
  #drop {
  min-height: 150px;
  width: 250px;
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
}
</style>