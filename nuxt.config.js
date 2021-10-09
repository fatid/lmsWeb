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
    company: 'daleel-ar.com',
    baseURL: "https://api3.fatihd.com/api/",
    baseURLFile: "https://api3.fatihd.com/",
    basePathFile: "http://lms.fatihd.com/yonetim/images/",
    basePathFileVisual: "http://lms.fatihd.com/visual2",
    baseDomain: "https://daleel-ar.com/"
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
      { src: '/js/jquery-3.3.1.min.js' },
      { src: '/vendor/bootstrap/js/bootstrap.bundle.min.js' },
  
      { src: '/vendor/OwlCarousel/owl.carousel.js' },
      { src: '/vendor/semantic/semantic.min.js' },
      { src: '/js/custom.js' },
      { src: '/js/night-mode.js' },
  
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
   '~/static/vendor/unicons-2.0.1/css/unicons.css', 
   '~/static/css/vertical-responsive-menu.min.css', 
   '~/static/css/style.css', 
   '~/static/css/responsive.css', 
   '~/static/css/night-mode.css', 
    'vue-good-table/dist/vue-good-table.css',
   '@fortawesome/fontawesome-free/css/all.css',
   '~/static/vendor/OwlCarousel/assets/owl.carousel.css', 
   '~/static/vendor/OwlCarousel/assets/owl.theme.default.min.css', 
   '~/static/vendor/bootstrap/css/bootstrap.min.css', 
   '~/static/vendor/semantic/semantic.min.css', 
  '~/static/vendor/simple-line-icons/css/simple-line-icons.min.css'
],
plugins: [
  { src: '~/plugins/pageInfo' },
  {  src:  "~/filters/index.js"  },
  { src: '~plugins/ga.js', ssr: false }, 
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
    // '@nuxtjs/sitemap',
      ['vue-scrollto/nuxt', { duration: 300 }],
      'vue-social-sharing/nuxt'

  ],
  // router: {
  //   // middleware: ['auth'], 
  // },
  
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
  
//  sitemap: {
//   path: '/sitemap.xml',
//   async routes() {
//     return getAppRoutes();
//   }
// },

  /*
  ** Build configuration
  */
 
 serverMiddleware: [
  '~/middleware/routing.js'
],
 build: { 
  // collapseBooleanAttributes: true,
  // decodeEntities: true,
  // minifyCSS: true,
  // minifyJS: true,
  // processConditionalComments: true,
  // removeEmptyAttributes: true,
  // removeRedundantAttributes: true,
  // trimCustomFragments: true,
  // useShortDoctype: true,
  postcss: {
    plugins: [
      purgecss({
        content: ['./pages/**/*.vue',  './layouts/**/*.vue', './components/**/*.vue',  './components/**/*.scss', '~/static/vendor/bootstrap/css/bootstrap.min.css','~/static/vendor/semantic/semantic.min.css', '@/vue-good-table/dist/vue-good-table.css', '@/vue2-datepicker/index.css'],
        css: ['**/*.css','**/*.scss'], 
        whitelist: ['mx-table','mx-table-date','','mx-datepicker-main','mx-datepicker-popup','mx-datepicker',' mx-datepicker-range','mx-input-wrapper','mx-icon-calendar','fa-pen','share-network-email','fah','fa-envelope','fa-search','fa-link','fa-evernote','fa-facebook','fa-linkedin','fa-pinterest','fa-quora','fa-reddit','fa-comment','fa-telegram','fa-tumblr','fa-twitter','fa-whatsapp','fa-list-alt',
          'html','uil','fa-language','fa-headphones-alt','fa-book-reader','fa-comments','fa-keyboard','fa-heart','srch10','uil-envelope-alt','uil','uil-search-alt','icon','icon1','uil-bell', 'btn','btn-danger','btn-outline-danger','btn-outline-danger','btn-outline-primary','rounded-pill','body','table', 'dropdown','b-dropdown', 'ui','dropdown','pagination', 'b-pagination','page-item',  'b-dropdown','btn-group','dropdown-menu','page-link','dropdown-item','table-striped','fa-whatsapp','fa-whatsapp-square','fa-youtube','flex-row','flex-row-reverse','fa-twiter','fa-instagram','fa_youtube','fa-youtube','owl-stage-outer','owl-stage','owl-theme','owl-carousel','owl-stage-outer','owl-stage','owl-theme','stage-margin','nav-style-1','owl-loaded','owl-dot','owl-prev','owl-next','owl-nav', 'owl-dot active','owl-dots','owl-drag','owl-carousel-init'],
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


