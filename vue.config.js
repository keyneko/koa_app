const path = require('path')
// const apiMocker = require('mocker-api')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'TAROMED'
const port = process.env.port || process.env.npm_config_port || 3001

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    // before(app) {
    //   apiMocker(app, path.resolve('./mock'))
    // },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:3000`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
  },
  configureWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name = name

    Object.assign(config.resolve, {
      alias: {
        '@': resolve('src'),
      },
    })
  },
  css: {
    loaderOptions: {
      // vant theme style customization
      // see https://vant-contrib.gitee.io/vant/v2/#/en-US/theme
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "src/styles/vant-custom.less";`,
          },
        },
      },
    },
  },
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    // Enable pug loader
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()

    // Exclude SVG from default SVG rule
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end()

    // Enable svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

  },
}
