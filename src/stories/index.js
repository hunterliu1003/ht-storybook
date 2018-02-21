import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import MyButton from './Button.vue';

storiesOf('MyButton', module)
  .add('story as a template', () => ({template: '<my-button :rounded="true"></my-button>'}))
  .add('story as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>'
  }));