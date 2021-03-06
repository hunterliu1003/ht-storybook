import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withReadme, withDocs }  from 'storybook-readme';
import README from './README.md';

import MyButton from './MyButton.vue';
storiesOf('MyButton', module)
  .addDecorator(centered)
  .add('story as a template', withDocs(README, () => ({
    components: { MyButton },
    template: `
      <div>
        <my-button @click.native="clickHandler"></my-button>
      </div>
    `,
    methods: {
      clickHandler () {
        action('MyButton')('click')
      }
    }
  })))
  .add('story as a component', withReadme(README, () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>',
  })));