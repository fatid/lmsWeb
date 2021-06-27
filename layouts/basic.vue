<template>
  <div>
    <header class="header clearfix main-header">
     
      <div class="main_logo" id="logo">
        <a @click="goPath('home')"
          ><img :src="'http://lms.fatihd.com/yonetim/images/resimler/normal/logo.png'" alt="logo"
        /></a>
        <a @click="goPath('home')"
          ><img class="logo-inverse" :src="'http://lms.fatihd.com/yonetim/images/resimler/normal/logo.png'" alt="logo"
        /></a>
      </div>
    
      <div class="search120">
        <div class="ui search">
          <div class="ui left icon input swdh10">
            <input
              class="prompt srch10"
              type="text"
              v-model="searchText"
              @keydown.enter="goPath('search', { keyword: searchText })"
              :placeholder="l('Search for  Courses, Tests and more..', 'g')"
            />
            <i class="uil uil-search-alt icon icon1"></i>
          </div>
        </div>
      </div>
      <div class="language-select">       <a
              @click="changeLanguage('home')" 
              title="Arabic"
              :class="LOCALE=='en' ? 'selected-language' : '' "
              >{{l('Home','g')}}</a>  
               <a
              @click="goPath('words/all_words')" 
              title="Words" 
              >{{l('Words','g')}}</a>
               <a
              @click="goPath('page/help')" 
              title="FAQ" 
              >{{l('FAQ','g')}}</a>
              </div>
      <div class="header_right">
       
        <ul>
          <li>

               <b-dropdown :text="LOCALE" variant="outline-danger" class="m-2" :key="'locale'+LOCALE">
                  <template #button-content>
                      <img class="image-lang" :src="'/img/'+LOCALE+'.png'"   />
                  </template>
                  <b-dropdown-item  @click="changeLanguage('ar')" ><img class="image-lang" :src="'/img/ar.png'"   /> Arabic</b-dropdown-item>
                  <b-dropdown-item  @click="changeLanguage('en')" ><img class="image-lang" :src="'/img/en.png'" /> English</b-dropdown-item> 
                </b-dropdown>

          </li>
          <li>
            <a
              @click="goPath('courses/all_courses')"
              class="upload_btn"
              title="Create New Course"
              >{{ l("My Courses", "g") }}</a
            >
          </li>
          <!-- <li>
					<a href="shopping_cart.html" class="option_links" title="cart"><i class='uil uil-shopping-cart-alt'></i><span class="noti_count">2</span></a>
				</li> -->
          <li class="ui dropdown" v-if="auth && auth.token">
            <a href="#" class="option_links" title="Messages"
              ><i class="uil uil-envelope-alt"></i
              ><span class="noti_count">0</span></a
            > 
          </li>
            
          <li v-if="!auth || !auth.token" class="list-inline-item g-mx-4">
            <a
              class="g-color-black g-color-primary--hover g-text-underline--none--hover"
              @click="goPath('form/login')"
              >{{ l("LOGIN", "g") }}</a
            >
          </li> 
        </ul>
      </div>
    </header>
 
    <div class="wrapper wrapper__minify">
      <div class="sa4d25">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nuxt v-if="LANG_PACK.main" :key="$route.fullPath" />
            </div>
          </div>
        </div>
      </div>
    </div>

        <errorReport></errorReport>

  </div>
 
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import basicMixin from "~/mixins/basic.js";
import canoicalMixin from "~/mixins/canoical.js";
import errorReport from "@/components/common/errorReport";

export default {
  mixins: [basicMixin, canoicalMixin, general],
  components:{
    errorReport
  },
  watch: {
    async $route(to, from) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }, 500);
      await this.$store.dispatch("pages/getPageInfo", {});
      await this.$store.dispatch("pages/setNewVisit", {
        contentId: this.$store.state.pages.pageData.wa_content_id,
        pageId: this.$store.state.pages.pageData.id,
        url: this.$route.path,
        lang: this.$store.state.locale
      });
      this.keyMenu = "k" + Math.random(100, 9999999);
      this.rootKey = to.path;
    }
  },

  transition: "page",
  head() {
    return {
      title: this.pageInfo.SA_Title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.pageInfo.SA_Description
            ? this.pageInfo.SA_Description
            : ""
        },
        {
          hid: "title",
          name: "title",
          content: this.pageInfo.SA_Title ? this.pageInfo.SA_Title : ""
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.pageInfo.SA_Description
            ? this.pageInfo.SA_Description
            : ""
        },
        // { hid: 'fb:app_id', name: 'fb:app_id', content: '12873892173892' },
        { hid: "og:title", name: "og:title", content: this.pageInfo.SA_Title },
        // { hid: 'og:image', name: 'og:image', content: 'http://lms.org/logo.png' },
        { hid: "og:type", name: "og:type", content: "article" },
        // {  name: 'article:publisher', content: 'https://www.facebook.com/Buhuth' },
        { name: "article:published_time", content: this.pageInfo.created_on },
        { name: "article:modified_time", content: this.pageInfo.updated_on }
        // {
        //   hid: "keywords",
        //   name: "keywords",
        //   content: this.pageInfo.SA_Keywords
        // }
      ]
    };
  },

  data: () => ({
    languages: [
      { value: "tr", name: "Turkish" },
      { value: "en", name: "English" }
    ],
    year: new Date().getFullYear(),
    collapse: false,
    searchText: "",
    keyMenu: "keyMenu",
    topBar: {},
    topIsVisible: false,
    // link: this.$route.query.link,
    rootKey: "rootKey"
  }),
  computed: {
    LOCALE() {
      return this.$store.state.locale;
    },
    auth() {
      return this.$store.state.user.auth;
    },
    isMobile() {
      return this.$device.isMobile;
    },
    categories() {
      return this.$store.state.course.categories;
    },
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    LANG_PACK() {
      return this.$store.state.langFile;
    }
  },
  created() {
    this.getLikes();
    this.$store.dispatch("course/getCourseCategories");
  },
  methods: {},

  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      let language = this.$route.params.lang;
      this.$store.commit("setLocale", language);
      this.$store.commit("setCustomClass", language);
      this.$store.dispatch("getLikes");
      this.$nuxt.$loading.finish();
    });

    await this.lf(["main", "g"]);

    var tid = setInterval(function() {
      if (document.readyState !== "complete") return;
      clearInterval(tid);

      var querySelector = document.querySelector.bind(document);

      var nav = document.querySelector(".vertical_nav");
      var wrapper = document.querySelector(".wrapper");

      var menu = document.getElementById("js-menu");
      if(menu){
             var subnavs = menu.querySelectorAll(".menu--item__has_sub_menu");
     

            // Toggle menu click
            querySelector(".toggle_menu").onclick = function() {
              nav.classList.toggle("vertical_nav__opened");

              wrapper.classList.toggle("toggle-content");
            };

            // Minify menu on menu_minifier click
            querySelector(".collapse_menu").onclick = function() {
              nav.classList.toggle("vertical_nav__minify");

              wrapper.classList.toggle("wrapper__minify");

              for (var j = 0; j < subnavs.length; j++) {
                subnavs[j].classList.remove("menu--subitens__opened");
              }
            };

            // Open Sub Menu

            for (var i = 0; i < subnavs.length; i++) {
              if (subnavs[i].classList.contains("menu--item__has_sub_menu")) {
                subnavs[i].querySelector(".menu--link").addEventListener(
                  "click",
                  function(e) {
                    for (var j = 0; j < subnavs.length; j++) {
                      if (e.target.offsetParent != subnavs[j])
                        subnavs[j].classList.remove("menu--subitens__opened");
                    }

                    e.target.offsetParent.classList.toggle("menu--subitens__opened");
                  },
                  false
                );
              }
            }
       }
    }, 100);
  }
};
</script>

<style>
a {
  cursor: pointer;
  color: #4e4e4e;
}
:lang(ar) li,
:lang(ar) input,
:lang(ar) select,
:lang(ar) textarea {
  direction: rtl;
}

@media only screen and (max-width: 700px) {
  .rowMobile {
    margin-left: 0px;
    margin-right: 0px;
  }
  .sideBarField {
    order: 1;
  }
}

:lang(ar) .pull-left {
  float: right !important;
}
:lang(en) .pull-left {
  float: left !important;
}
:lang(ar) .pull-right {
  float: left !important;
}
:lang(en) .pull-right {
  float: right !important;
}
:lang(ar) .text-left {
  text-align: right !important;
}
:lang(en) .text-left {
  text-align: left;
}
:lang(ar) .text-right {
  text-align: left !important;
}
:lang(en) .text-right {
  text-align: right !important;
}
.dirRight {
  direction: rtl !important;
}
.dirLeft {
  direction: ltr !important;
}

.vs__selected {
  display: inline-flex;
}
.vs__dropdown-toggle {
  height: 37px;
  font-size: 15px;
}
.vs__search,
.vs__search:focus {
  margin: 2px 0 0;
}

.vs__selected {
  margin: 2px 2px 0;
}
.style-chooser:lang(ar) .vs__dropdown-menu {
  text-align: right;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  padding: 5px;
  text-transform: lowercase;
  border-bottom: 1px solid #efefef;
  font-variant: small-caps;
}

.style-chooser .vs__dropdown-menu li {
  font-size: 15px !important;
}

/* .style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
} */
.vs__deselect {
  background: none !important;
  border: 0 !important;
}

.vs__search,
.vs__search:focus {
  width: 110px !important;
}

.vs__actions {
  clear: right !important;
}

.vs__dropdown-toggle {
  padding: 4px !important;
  justify-content: space-between !important;
}

.v-select,
.v-select * {
  display: inherit;
}

.errors {
  font-size: 15px;
  color: red;
}
</style>
<style lang="scss">
.btn-primary {
  color: #fff !important;
}
.modal-header {
  padding: 8px 16px 4px 16px;
  color: #000;
  border-bottom: 0.1em solid #efefef;
  &h4 {
    font-size: 14px;
  }
}

.modal-wide {
  padding-top: 35px;
}
.modal-body {
  padding: 10px 16px;
  height: 250px;
  overflow: auto;
}
.modal-body-wide {
  padding: 10px 16px;
  height: calc(100vh - 150px) !important;
  overflow-y: auto;
  overflow-x: hidden;
}
.modal-content-wide {
  width: 90% !important;
}

.modal-footer {
  padding: 7px 16px;
  color: #000;
  text-align: center;
}

.modal-body-wide::-webkit-scrollbar {
  width: 12px;
}

.modal-body-wide::-webkit-scrollbar-track,
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0);
  border-radius: 10px;
}

.modal-body-wide::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  margin-right: 5px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  padding-top: 50px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  z-index: 999;
  &.visible {
    display: block;
  }
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

.channel_item {
  a {
    margin-left: 10px;
    color: #888;
    font-size: 12px; 
    &:hover {
      color: rgb(145, 60, 11) !important;
    }
  }
}
.upload_btn {
  color: #fff!important;
}

.header_right{
  display: inline-flex;
}
.language-select{
    display: block;
    margin-right: 20px;
}
.language-select a{
  padding: 8px;
  margin: 2px 4px;
  font-size: 12px;
}
a.selected-language{
  color: #a0a0a0!important;

}
</style>
