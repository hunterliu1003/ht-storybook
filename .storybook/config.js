import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';

import Vue from 'vue';
import Vuex from 'vuex';

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'

Vue.use(Vuex);

setOptions({
  name: 'Hunter storybook',
  url: 'https://github.com/hunterliu1003/ht-storybook',
  addonPanelInRight: false,
});

Vue.component('icon', Icon);

const req = require.context('../stories', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}


configure(loadStories, module);