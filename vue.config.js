module.exports = {
  transpileDependencies: [
    'vuetify',
    'rxjs-interop'
  ],
  devServer: {
    proxy: {
      '/inference-api': {
        target: process.env.VUE_APP_INFERENCE_BACKEND_URL,
        pathRewrite: {'^/inference-api' : ''},
        secure: false
      },
      '/api': {
        target: process.env.VUE_APP_BACKEND_URL,
        pathRewrite: {'^/api' : ''},
        secure: false
      }
    }
  },
  pwa: {
    name: 'Spira',
    manifestOptions: {
      start_url: '/',
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/,
        /_redirects/
      ],
    },
    themeColor: '#1da025'
  }
};
