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
          images2: []
        }
      },
      watch: {
        images () {
          console.log('images')
          console.log(this.images)
        }
      },
      methods: {
        log() {
          action('ImageReaderMultiple')();
        },
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
          <div>
            imageReaderB
          </div>
          <ImageReaderMultiple
            id="imageReaderB"
            width="500px"
            min-height="500px"
            multiple
            v-model="images2"
          >
          </ImageReaderMultiple>
        </div>
      `
    })));