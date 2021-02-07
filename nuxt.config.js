require('dotenv').config()
const pkg = require('./package.json')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const purgecss = require('@fullhuman/postcss-purgecss')
const getAppRoutes = require('./utils/getRoutes.js'); 
export default {
  mode: 'universal',
  env: {
    API_KEY: process.env.API_KEY,
    mLang: "tr",
    pageError: "404",
    company: 'ıstanbulmetal.com.tr',
    baseURL: "https://api3.fatihd.com/api/",
    baseURLFile: "https://api3.fatihd.com/",
    basePathFile: "http://lms.fatihd.com/yonetim/images/",
    basePathFileVisual: "http://lms.fatihd.com/visual2",
    baseDomain: "https://istanbulmetal.com.tr"
  },
  head: {
    title: pkg.title,
    htmlAttrs: {
      lang: 'tr'
    },
    meta: [
      { charset: 'utf-8' },
      { content: "text/html;charset=UTF-8" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      { src: '/vendor/modernizr/modernizr.min.js' },
      { src: '/vendor/jquery/jquery.min.js' },
      { src: '/vendor/jquery.appear/jquery.appear.min.js' },
      { src: '/vendor/jquery.easing/jquery.easing.min.js' },
      { src: '/vendor/jquery.cookie/jquery.cookie.min.js' },
      { src: '/vendor/popper/umd/popper.min.js' },
      { src: '/vendor/bootstrap/js/bootstrap.min.js' },
      { src: '/vendor/common/common.min.js' },
      { src: '/vendor/jquery.validation/jquery.validate.min.js' },
      
      { src: '/vendor/jquery.gmap/jquery.gmap.min.js' },
      { src: '/vendor/jquery.lazyload/jquery.lazyload.min.js' },
      { src: '/vendor/isotope/jquery.isotope.min.js' },
      { src: '/vendor/owl.carousel/owl.carousel.min.js' },
      { src: '/vendor/magnific-popup/jquery.magnific-popup.min.js' },
      { src: '/vendor/vide/jquery.vide.min.js' },
      { src: '/vendor/theme.js' },
      { src: '/main.js' },
      // {
        //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        //   'data-ad-client': "ca-pub-6837578339758805",
      //   async: true
      // }
    ], 
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
 css: [ 
  '~/static/css/main.css', 
  '~/static/vendor/bootstrap/css/bootstrap.min.css', 
  // '~/static/vendor/owl.carousel/assets/owl.carousel.min.css', 
  // '~/static/vendor/owl.carousel/assets/owl.theme.default.min.css', 
  // '~/static/vendor/magnific-popup/magnific-popup.min.css', 
  '~/static/vendor/animate/animate.compat.css', 
  '@fortawesome/fontawesome-free/css/all.css',
  // '~/static/vendor/simple-line-icons/css/simple-line-icons.min.css'
],
plugins: [
  { src: '~/plugins/pageInfo' },
  {  src:  "~/filters/index.js"  },
  { src: '~plugins/ga.js', ssr: false }
  // { src: '~/plugins/vue-lazyload', ssr: false },
  // { src: '~plugins/ga.js', ssr: false }
],

optimizedImages: {
  optimizeImages: true
},
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    'bootstrap-vue/nuxt', 
 
    '@nuxtjs/sitemap'

  ],
  router: {
    middleware: ['auth'], 
  },
  
  buildModules: [
   
    'nuxt-compress'
  ], 

  "nuxt-compress": {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  
 sitemap: {
  path: '/sitemap.xml',
  async routes() {
    return getAppRoutes();
  }
},

  /*
  ** Build configuration
  */
 
 serverMiddleware: [
  '~/middleware/routing.js'
],
 build: { 
  collapseBooleanAttributes: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  trimCustomFragments: true,
  useShortDoctype: true,
  postcss: {
    plugins: [
      purgecss({
        content: ['./pages/**/*.vue',  './layouts/**/*.vue', './components/**/*.vue','~/static/vendor/bootstrap/css/bootstrap.min.css',],
        css: ['**/*.css','**/*.scss'], 
        whitelist: ['html', 'body','table', 'table-striped','fa-whatsapp','fa-whatsapp-square','fa-youtube','flex-row','flex-row-reverse','fa-twiter','fa-instagram','fa_youtube','fa-youtube','owl-stage-outer','owl-stage','owl-theme','owl-carousel','owl-stage-outer','owl-stage','owl-theme','stage-margin','nav-style-1','owl-loaded','owl-dot','owl-prev','owl-next','owl-nav', 'owl-dot active','owl-dots','owl-drag','owl-carousel-init'],
      })
    ]
  }, 
  extractCSS: true,
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true // set to true if you want JS source maps
      // }),
      new OptimizeCssAssetsPlugin({})
    ],
     
    }
  }
}


