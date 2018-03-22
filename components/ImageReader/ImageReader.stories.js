import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import ImageReader from './';

Vue.component('ImageReader', ImageReader);

storiesOf('ImageReader', module)
  .addDecorator(centered)
  .add('ImageReader', () => ({
    methods: {
      log() {
        action('ImageReader')();
      },
    },
    template:`
      <div>
        <ImageReader />
      </div>
    `
  }));
