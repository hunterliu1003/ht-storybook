const updateWebpackConfig = require('storybook-readme/env/vue/updateWebpackConfig');

module.exports = storybookBaseConfig => {
  return updateWebpackConfig(storybookBaseConfig);
};