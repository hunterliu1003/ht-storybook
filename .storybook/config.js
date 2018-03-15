import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

setOptions({
    name: 'ht-storybook',
    url: 'https://github.com/hunterliu1003/ht-storybook',
    addonPanelInRight: true
  });

const req = require.context('../components', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => {
    console.log(req)
    return req(filename)
  });
}

configure(loadStories, module);