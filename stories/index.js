import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import MyButton from './Button.vue';
import MySteps from './Steps.vue';

storiesOf('MyButton', module)
  .add('story as a template', () => ({
    template: '<my-button :rounded="true">story as a function template</my-button>'
  }))
  .add('story as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>'
  }));

storiesOf('Steps', module)
  .add('Steps', () => ({
    components: { MySteps },
    template: '<my-steps :active="1"></my-steps>'
  }))