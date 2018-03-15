import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';


import Vue from 'vue';
import Vuex from 'vuex';

import Mybutton from '../stories/Button.vue';

Vue.use(Vuex);

setOptions({
    name: 'ht-storybook',
    url: 'https://github.com/hunterliu1003/ht-storybook',
  });

Vue.component('my-button', Mybutton);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);