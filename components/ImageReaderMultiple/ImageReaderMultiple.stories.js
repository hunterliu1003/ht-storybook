import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withReadme }  from 'storybook-readme';
import README from './README.md';

import ImageReaderMultiple from './';
Vue.component('ImageReaderMultiple', ImageReaderMultiple);

storiesOf('ImageReaderMultiple', module)
  // .addDecorator(centered)
  .add('ImageReaderMultiple', withReadme(README, () => ({
      data () {
        return {
          images: [],
          images2: [],
          list: ['Foo', 'Bar', 'Baz']
        }
      },
      watch: {
        images () {
          console.log('images')
          console.log(this.images)
        }
      },
      created () {
        console.log(Sortable)
      },
      methods: {
        log() {
          action('ImageReaderMultiple')();
        },
        onUpdate: function (event) {
          console.log('onUpdate')
          this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0])
       }
      },
      template:`
        <div>
          <div>
            imageReaderA
          </div>
          <ImageReaderMultiple
            id="imageReaderA"
            multiple
            v-model="images"
          >
          </ImageReaderMultiple>

        </div>
      `
    })));