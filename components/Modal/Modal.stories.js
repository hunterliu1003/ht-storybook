import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Modal from './';

Vue.component('Modal', Modal);

storiesOf('Modal', module)
  .addDecorator(centered)
  .add('Modal', () => ({
    methods: {
      log() {
        action('Modal')();
      },
    },
    template:`
      <div>
        <Modal />
      </div>
    `
  }));
