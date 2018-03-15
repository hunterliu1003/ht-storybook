import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
// import { WithNotes } from '@storybook/addon-notes';

import MyButton from './Button.vue';
storiesOf('MyButton', module)
  .add('story as a template', () => ({
    template: `
      <div>
        <my-button @click.native="clickHandler"></my-button>
        <my-button @click.native="clickHandler"></my-button>
      </div>
    `,
    methods: {
      clickHandler () {
        action('MyButton')('click')
      },
      haha () {
        console.log('asdffdas')
      }
    }
  }))
  .add('story as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>',
  }));