const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    https: false,
    port: 9999,
    host: 'localhost',
    proxy: {
      [process.env.VUE_APP_SERVE_NAME]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        PathRewrite: {
          ['^' + process.env.VUE_APP_SERVE_NAME]: ''
        }
      }
    }
  }
})
