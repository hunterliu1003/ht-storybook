import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Pagination from './';

Vue.component('Pagination', Pagination);

storiesOf('Pagination', module)
  .addDecorator(centered)
  .add('Pagination', () => ({
    methods: {
      log() {
        action('Pagination')();
      },
    },
    template:`
      <div>
        <Pagination :page="1" :perPage="3" :total="100" :isLock="false"/>
      </div>
    `
  }));
