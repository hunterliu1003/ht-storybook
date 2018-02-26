module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
  loaders: {
    scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass">
    less: 'vue-style-loader!css-loader!less-loader'
  }
}