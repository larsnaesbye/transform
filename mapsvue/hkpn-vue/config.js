Deprecated as of 10.7.0. highlight(lang, code, ...args) has been deprecated.
Deprecated as of 10.7.0. Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277
{
  mode: 'development',
  context: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\dist',
    filename: '[name][hash].js',
    publicPath: '/',
    chunkFilename: '[name][hash].js',
    crossOriginLoading: 'anonymous',
    jsonpScriptType: 'module',
    hotUpdateChunkFilename: '[name][hash].js',
    futureEmitAssets: true
  },
  resolve: {
    alias: {
      '@': 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\src',
      vue$: 'vue/dist/vue.esm-bundler.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules',
      'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules',
      'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '03545046'
            }
          },
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\vue-loader-v16\\dist\\index.js',
            options: {
              cacheDirectory: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '03545046',
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'img/[name].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\file-loader\\dist\\cjs.js',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'media/[name].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'fonts/[name].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'raw-loader'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: ''
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '4a9d93e9'
            }
          },
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\babel-loader\\lib\\index.js'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\@vue\\cli-service\\lib'
        ],
        use: [
          {
            loader: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\eslint-loader\\index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: '38156a14',
              emitWarning: false,
              emitError: false,
              eslintPath: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\node_modules\\eslint',
              formatter: undefined
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      },
      minSize: 50000,
      maxSize: 512000,
      chunks: 'async'
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: true,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ],
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
    concatenateModules: true
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('feature-flags') */
    new DefinePlugin(
      {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_SHOW_UNPUBLISHED: '"true"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: '[name].css',
        chunkFilename: '[name].css'
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'hkpn-vue',
        templateParameters: function () { /* omitted long function */ },
        template: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\public\\index.html'
      }
    ),
    /* config.plugin('pwa') */
    new HtmlPwaPlugin(
      {
        name: 'Historiske Kort på Nettet',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          swSrc: 'src/ServiceWorker.js'
        },
        themeColor: '#0097A7',
        msTileColor: '',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestOptions: {}
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('cors') */
    new CorsPlugin(
      {
        crossorigin: 'anonymous',
        integrity: true,
        publicPath: '/'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\public',
          to: 'D:\\Dev\\Projects\\HKPN\\hkpn-vue\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    )
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  }
}
