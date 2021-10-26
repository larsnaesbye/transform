// const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  indexPath: 'index.html',
  transpileDependencies: [
    '@vanillaes/csv',
    'axios'
  ],

  chainWebpack: config => {
    // config.output.globalObject('this')
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },

  css: {
    sourceMap: false,
    extract: true
  },

  runtimeCompiler: true,
  productionSourceMap: false,
  crossorigin: 'anonymous',
  integrity: true,

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/ServiceWorker.js'
    },
    name: 'Forsyningsdata',
    themeColor: '',
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

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    }
  },

  devServer: {
    historyApiFallback: true,
    proxy: {
      '^/rest': {
        target: 'https://api.dataforsyningen.dk/rest/',
        pathRewrite: {
          '^/es/': 'forsyningsdata/v1.0/'
        },
        secure: false,
        ws: true,
        changeOrigin: true,
        followRedirects: true,
        selfHandleResponse: false
      },
      '^/es': {
        target: 'https://dataforsyningen.dk/es/',
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
        target: 'https://dataforsyningen.dk/asset/',
        pathRewrite: {
          '^/asset/': '/'
        },
        secure: false,
        ws: true,
        changeOrigin: true,
        followRedirects: true,
        selfHandleResponse: false
      },
      '^/fonts': {
        target: 'https://dataforsyningen.dk/fonts/',
        pathRewrite: {
          '^/fonts/': '/'
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
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    resolve: {
      alias: {
        'txml/txml': 'txml/dist/txml'
      }
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
