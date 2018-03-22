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
        <Steps :active="step">
          <span slot="step">選擇商品</span>
          <span slot="step">設定素材</span>
          <span slot="step">預覽廣告</span>
        </Steps>
      </div>
    `
  }));
