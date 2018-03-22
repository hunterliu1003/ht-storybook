import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import Vue from 'vue'
import Vuex from 'vuex'
// import Sortable from 'vue-sortable'

Vue.use(Vuex);
Vue.directive('sortable', {
  inserted: function (el, binding) {
    new Sortable(el, binding.value || {})
  }
})

require('!!style-loader!css-loader!stylus-loader!../stylus/main.styl');

setOptions({
  name: 'ht-storybook',
  url: 'https://github.com/hunterliu1003/ht-storybook',
  addonPanelInRight: true
})

const req = require.context('../components', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);