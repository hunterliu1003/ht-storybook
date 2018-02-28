import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import MySteps from './Steps.vue';
import ImageReader from './ImageReader.vue';

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


storiesOf('ImageReader', module)
  .add('ImageReader', () => ({
    components: { ImageReader },
    template: `
      <image-reader
        v-model="imageUploadUrl"
        :image-width-height-pair="[
          {
            width: 300,
            height: 60
          }
        ]"
        :isvalid.sync="isValidUploadImage"
      >
      </image-reader>
    `,
    data () {
      return {
        imageUploadUrl: '',
        isValidUploadImage: false
      }
    }
  }))

storiesOf('Icons', module)
  .add('Icon', () => ({
    template: `
      <div>
        <icon name="beer"></icon>

        <icon name="refresh" scale="2" spin></icon>
        <icon name="comment" flip="horizontal"></icon>
        <icon name="code-fork" label="Forked Repository"></icon>

        <icon label="No Photos">
          <icon name="camera"></icon>
          <icon name="ban" scale="2" class="alert"></icon>
        </icon>
      </div>
    `
  }))




