module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://github.com/airbnb/babel-plugin-dynamic-import-n
      'plugins': ['dynamic-import-node']
    },
    'test': {
      // A Babel plugin that transforms webpack-specific require.context() into dummy function calls so that
      // the code can run safely outside of the webpack environment, e.g. in Node. It doesn't perform any file
      // lookup or dynamic require, but should not break the code otherwise.
      // https://github.com/asapach/babel-plugin-transform-require-context
      'plugins': ['transform-require-context']
    }
  }
}
