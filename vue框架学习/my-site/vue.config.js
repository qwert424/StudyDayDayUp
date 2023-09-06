const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 服务代理
    proxy: {
      '/res': {
        target: 'http://127.0.0.1:7001',
      },
      '/api': {
        target: 'http://127.0.0.1:7001',
      }
    }
  },

  configureWebpack: require('./webpack.config'),
})
