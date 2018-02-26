import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex'; // Vue plugins

// Import your custom components.
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'

// Install Vue plugins.
Vue.use(Vuex);

// Register custom components.
Vue.component('icon', Icon);

function loadStories() {
  // You can require as many stories as you need.
  require('../stories');
}

configure(loadStories, module);