import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import ImageReaderMultiple from './';

Vue.component('ImageReaderMultiple', ImageReaderMultiple);

storiesOf('ImageReaderMultiple', module)
  // .addDecorator(centered)
  .add('ImageReaderMultiple', () => ({
    methods: {
      log() {
        action('ImageReaderMultiple')();
      },
    },
    template:`
      <div>
        <ImageReaderMultiple
          id="imageReaderA"
          multiple
        >
        </ImageReaderMultiple>
      </div>
    `
  }));