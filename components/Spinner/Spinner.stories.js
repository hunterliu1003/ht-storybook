import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Spinner from './';

Vue.component('Spinner', Spinner);

storiesOf('Spinner', module)
  .addDecorator(centered)
  .add('Spinner', () => ({
    methods: {
      log() {
        action('Spinner')();
      },
    },
    template:`
      <div>
        <Spinner />
      </div>
    `
  }));
