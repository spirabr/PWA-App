module.exports = {
  transpileDependencies: [
    'vuetify',
    'rxjs-interop'
  ],
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
        /manifest\.json$/
      ],
    },
    themeColor: '#1da025'
  }
};
