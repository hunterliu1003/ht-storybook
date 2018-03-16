import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Steps from './';

Vue.component('Steps', Steps);

storiesOf('Steps', module)
  .addDecorator(centered)
  .add('Steps', () => ({
    methods: {
      log() {
        action('Steps')();
      },
    },
    template:`
      <div>
        <Steps />
      </div>
    `
  }));
