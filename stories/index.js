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
    template: `
      <my-steps :active="2">
        <span slot="step">1</span>
        <span slot="step">2</span>
        <span slot="step">3</span>
      </my-steps>
    `,
    data () {
      return {
        stepList: ['1', '2', '3']
      }
    }
  }))