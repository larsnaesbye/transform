module.exports = {
  chainWebpack: config => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: '[name].css',
        chunkFilename: '[name].css'
      }])
    }
    config.output.chunkFilename('[name].js')
    config.output.filename('[name].js')
    // config.output.chunkFilename('js/[name].[id].[chunkhash:8].js')
    // config.output.globalObject('this')
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },

  publicPath: '/',
  outputDir: 'dist',
  indexPath: 'index.html',
  filenameHashing: false,

  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: '[name].css'
    },
    requireModuleExtension: true,
    sourceMap: true
  },

  runtimeCompiler: true,
  crossorigin: 'anonymous',
  integrity: true,
  productionSourceMap: true,

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/ServiceWorker.js'
    },
    name: 'Historiske Kort på Nettet',
    themeColor: '#0097A7',
    msTileColor: '',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    manifestOptions: {
    },
    iconPaths: {
      favicon16: 'img/icons/favicon-16x16.png',
      favicon24: 'img/icons/favicon-24x24.png',
      favicon32: 'img/icons/favicon-32x32.png',
      favicon48: 'img/icons/favicon-48x48.png',
      favicon57: 'img/icons/favicon-57x57.png',
      favicon60: 'img/icons/favicon-60x60.png',
      favicon64: 'img/icons/favicon-64x64.png',
      favicon70: 'img/icons/favicon-70x70.png',
      favicon72: 'img/icons/favicon-72x72.png',
      favicon76: 'img/icons/favicon-76x76.png',
      favicon96: 'img/icons/favicon-96x96.png',
      favicon114: 'img/icons/favicon-114x114.png',
      favicon120: 'img/icons/favicon-120x120.png',
      favicon128: 'img/icons/favicon-128x128.png',
      favicon144: 'img/icons/favicon-144x144.png',
      favicon150: 'img/icons/favicon-150x150.png',
      favicon152: 'img/icons/favicon-152x152.png',
      favicon167: 'img/icons/favicon-167x167.png',
      favicon180: 'img/icons/favicon-180x180.png',
      favicon192: 'img/icons/favicon-192x192.png',
      favicon195: 'img/icons/favicon-195x195.png',
      favicon196: 'img/icons/favicon-196x196.png',
      favicon228: 'img/icons/favicon-228x228.png',
      favicon256: 'img/icons/favicon-256x256.png',
      favicon270: 'img/icons/favicon-270x270.png',
      favicon310: 'img/icons/favicon-310x310.png',
      favicon512: 'img/icons/favicon-512x512.png',
      favicon558: 'img/icons/favicon-558x558.png',
      favicon1024: 'img/icons/favicon-1024x1024.png',
      appleTouchIcon: 'img/icons/favicon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/favicon-144x144.png',
      favicon: 'img/icons/favicon.ico'
    }
  },

  devServer: {
    historyApiFallback: true,
    proxy: {
      '^/es': {
        // target: 'http://kmsload154.kmsext.dk:9200',
        target: 'https://test8.dataforsyningen.dk/es/',
        pathRewrite: {
          '^/es/': '/'
        },
        secure: false,
        ws: true,
        changeOrigin: true,
        followRedirects: true,
        selfHandleResponse: false
      },
      '^/asset': {
        // target: 'http://load201.kmsext.dk:8081',
        target: 'https://test8.dataforsyningen.dk/asset/',
        pathRewrite: {
          '^/asset/': '/'
        },
        secure: false,
        ws: true,
        changeOrigin: true,
        followRedirects: true,
        selfHandleResponse: false
      }
    }
  },

  configureWebpack: {
    optimization: {
      minimize: true,
      namedModules: true,
      namedChunks: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      flagIncludedChunks: true,
      occurrenceOrder: true,
      providedExports: true,
      usedExports: true,
      concatenateModules: true,
      splitChunks: {
        minSize: 50000,
        maxSize: 512000,
        chunks: 'async'
      }
    },
    output: {
      // TODO : remove [hash] in prod
      crossOriginLoading: 'anonymous',
      jsonpScriptType: 'module',
      filename: '[name][hash].js',
      chunkFilename: '[name][hash].js',
      hotUpdateChunkFilename: '[name][hash].js',
      futureEmitAssets: true
    }
  }
}

/* function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/fonts.styl')
      ]
    })
} */
