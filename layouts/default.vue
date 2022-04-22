<template>
  <div>
    <header class="header clearfix main-header"  >
      <div :class="isMobile ? 'container-full '+reverseClass :'container '+reverseClass ">
	  
	       
		  <a   v-if="isMobile" 
              @click="isVisible = !isVisible;"
              style="width: 40px; color: rgb(118 117 117);"
			  class="mobile-bars"
              ><i class="fas fa-bars fa-2x" v-if="!isVisible"></i>
              <i class="fas fa-times fa-2x" v-else></i>
            </a>
		 
     
  
      <div class="main_logo" id="logo">
        <a @click="goPath('home')"  @click.middle="goPathBlank('home')" 
          ><img :src="'http://lms.fatihd.com/yonetim/images/resimler/normal/logo.png'" alt="logo"
        /></a>
        <a @click="goPath('home')"  @click.middle="goPathBlank('home')" 
          ><img class="logo-inverse" :src="'http://lms.fatihd.com/yonetim/images/resimler/normal/logo.png'" alt="logo"
        /></a>
      </div>  
      <div class="search120">
        <div class="ui search">
          <div class="ui left icon input swdh10 menu-search">
            <input
              class=""
              type="text"
              v-model="searchText"
              @keydown.enter="goPath('search', { keyword: searchText })"
              :placeholder="l('Search for  Courses, Tests and more..', 'g')"
            />
            <i class="uil   icon far fa-search"></i>
          </div>
        </div>
          
      </div>  
       <!-- <div class="menu-select" v-if="!isMobile"  :class="LOCALE=='ar' ? 'd-flex flex-row-reverse' : ''" > -->
            
				<!-- <div   -->
					<!-- class="menu-select-item" @click.middle="goPathBlank('courses/all_courses')"    @click="goPath('courses/all_courses')"   -->
					<!-- :class="pagePath=='Course' ? 'danger':'outline-danger'"  >{{ l("Courses", "g") }} -->
				<!-- </div> -->
				<!-- <div   -->
					<!-- class="menu-select-item" @click.middle="goPathBlank('filter/Word')"            @click="goPath('filter/Word')" -->
					<!-- :class="pagePath=='Word' ? 'danger':'outline-danger'"  >{{ l("Words", "g") }} -->
				<!-- </div> -->
           <!-- <div   -->
					<!-- class="menu-select-item" @click.middle="goPathBlank('filter/Exam')"           @click="goPath('filter/Exam')" -->
					<!-- :class="pagePath=='Exam' ? 'danger':'outline-danger'"  >{{ l("Questions", "g") }} -->
				<!-- </div> -->
             <!-- <div   -->
					<!-- class="menu-select-item" @click.middle="goPathBlank('filter/Games')"           @click="goPath('filter/Game')" -->
					<!-- :class="pagePath=='Game' ? 'danger':'outline-danger'"  >{{ l("Games", "g") }} -->
				<!-- </div> -->
         
 
      <!-- </div>   -->
	 <div :lang="LOCALE"  class="header_right" v-if="isMobile">
		<div class="menu-select-mobile">
		
				<div  
					class="menu-select-item" 
					@click.middle="goPath('form/login')"           
					@click="loginPopupVisible=true" 
				><i class="far fa-user"></i>
				</div>
				<div  
					class="menu-select-item" 
					@click="localeShow=!localeShow;"  
				> {{$store.state.locale}}
				</div>
		</div>
		<div class="choose-lang" v-show="localeShow" 
		v-click-outside="hide"  
		>
					<ul> 
						<li><a  @click="changeLanguage('ar')" > <img   src="/img/ar.svg" style="width:20px" title="Arabic"  />  Arabic </a></li> 
						<li><a  @click="changeLanguage('en')" >  <img   src="/img/en.svg" style="width:20px"  title="English" /> English</a></li>  
					</ul>
		
		</div>
	   </div>  
      <div :lang="LOCALE" class="header_right" v-else-if="!isMobile">
       
        <ul>
          <!-- <li v-show="!auth || !auth.token"  ><a>Test</a></li> -->
          <!-- <li>
					<a href="shopping_cart.html" class="option_links" title="cart"><i class='uil uil-shopping-cart-alt'></i><span class="noti_count">2</span></a>
				</li> -->
          <li class="ui dropdown" v-show="!isMobile &&  auth && auth!=null && auth.token">
            <a href="#" class="option_links" title="Messages">
              <i class="far fa-envelope"></i>
              <span class="noti_count">0</span>  
              </a> 
          </li>
          <li class="ui dropdown" v-show="!isMobile &&  auth && auth!=null && auth.token">
              <a href="#" class="option_links" title="Notifications">
                <i class="far fa-bell"></i>
                 <span class="noti_count">0</span>  
              </a> 
          </li>
         
            <li v-show="!auth || !auth.token" class="list-inline-item g-mx-4 ">
            <a
              class="g-color-black g-color-primary--hover g-text-underline--none--hover"
              @click="loginPopupVisible=true"
			  @click.middle="goPath('form/login')"   
              ><i class="far fa-user"></i> {{ l("LOGIN", "g") }}</a
            >
          </li> 
         
        
    <li class="ui dropdown">

              <b-dropdown variant="link" toggle-class="text-decoration-none" >
               <template #button-content>
                          <a
                          
                            class="opts_account"
                            title="Account"
                          > 
                          <div class="image-lang" :class="$store.state.locale=='ar' ? 'selected':''"  :style="{ backgroundImage: 'url(\'/img/'+$store.state.locale+'.svg\')' }" title="Arabic"  ></div> 
                          <!-- <img :src="'/img/'+$store.state.locale+'.svg'" title="Arabic"  />  -->
                            
                          </a>
                  </template>
                    <b-dropdown-item> <a  @click="changeLanguage('ar')" > <img   src="/img/ar.svg" style="width:20px" title="Arabic"  />  Arabic </a></b-dropdown-item> 
                    <b-dropdown-item><a  @click="changeLanguage('en')" >  <img   src="/img/en.svg" style="width:20px"  title="English" /> English</a></b-dropdown-item> 
               
                </b-dropdown>  

            </li>
        </ul>
            <li class="ui dropdown" v-if="auth && auth.token">  

  <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
               <template #button-content>
                          <a
                          
                            class="opts_account"
                            title="Account"
                          >
                            <img :src="auth && auth.U_Photo ? auth.U_Photo : '/images/hd_dp.jpg'" alt="" />
                          </a>
                  </template>
                  <b-dropdown-item  @click.middle="goPathBlank('my/profile')"          @click="goPath('my/profile')"           >  {{l('Profile','g')}}</b-dropdown-item>
                  <b-dropdown-item  @click.middle="goPathBlank('my/courses')"         @click="goPath('my/courses')" >             {{l('My Courses','g')}}</b-dropdown-item>
                  <b-dropdown-item  @click.middle="goPathBlank('my/list')"             @click="goPath('my/list')"             >   {{l('My List','g')}}</b-dropdown-item>
				    <b-dropdown-item v-if="auth.U_Role=='Teacher'" @click.middle="goPathBlank('my/students')"         @click="goPath('my/students')" >             {{l('My Students','g')}}</b-dropdown-item>
					   <b-dropdown-item v-if="auth.U_Role=='Student' || auth.U_Role==''" @click.middle="goPathBlank('my/teachers')"         @click="goPath('my/teachers')" >             {{l('My Teachers','g')}}</b-dropdown-item>
                  <b-dropdown-item  @click.middle="goPathBlank('my/quiz')"             @click="goPath('my/quiz')"             >   {{l('My Exams','g')}}</b-dropdown-item>
                  <!-- <b-dropdown-text    >  
                    
                              <a  @click="changeLanguage('ar')" ><img class="image-lang" :src="'/img/ar.png'" title="Arabic"   /> </a>
                              <a  @click="changeLanguage('en')" ><img class="image-lang" :src="'/img/en.png'" title="English"  /> </a>

                  </b-dropdown-text>  -->
                  <b-dropdown-item  @click="goPath('form/login?logout=true')" > {{l('Sign Out','g')}}</b-dropdown-item> 
                </b-dropdown>  
           </li> 
        
      </div>
      </div>
    </header>
 
 
    <div class="wrapper wrapper__minify">
	
	
	    <div class="menu-select" v-if="!isMobile && (pagePath=='Course' || pagePath=='Word' || pagePath=='Exam' || pagePath=='Game' || pagePath=='Quiz' )">
		<div class="container"> 
				<a  @click="drawer=!drawer" class="mobile-bars">
						<i class="fas fa-bars fa-lg" v-if="!drawer"></i>
						<i class="fas fa-times fa-lg" v-else></i>
				</a> 
				<div  
					class="menu-select-item" @click.middle="goPathBlank('courses/all_courses')"    @click="goPath('courses/all_courses')"  
					:class="pagePath=='Course' ? 'selected':''"  >{{ l("Courses", "g") }}
				</div>
				<div  
					class="menu-select-item" @click.middle="goPathBlank('filter/Word')"            @click="goPath('filter/Word')"
					:class="pagePath=='Word' ? 'selected':''"  >{{ l("Words", "g") }}
				</div>
           <div  
					class="menu-select-item" @click.middle="goPathBlank('filter/Exam')"           @click="goPath('filter/Exam')"
					:class="pagePath=='Exam' ? 'selected':''"  >{{ l("Questions", "g") }}
				</div>
				<div  
					class="menu-select-item" @click.middle="goPathBlank('filter/Quiz')"           @click="goPath('filter/Quiz')"
					:class="pagePath=='Quiz' ? 'selected':''"  >{{ l("Quiz", "g") }}
				</div>
             <div  
					class="menu-select-item" @click.middle="goPathBlank('filter/Games')"           @click="goPath('filter/Game')"
					:class="pagePath=='Game' ? 'selected':''"  >{{ l("Games", "g") }}
				</div> 
				</div> 
      </div> 
	  <div class="container">
	  <div  class="main-content" >
	  <div class="side-bar" 
			v-show="drawer"
            :class="[customClass.textDir + ' ' + customClass.dir, openDetails ? 'openDetails':'']"
            :lang="$store.state.locale"
	  >
			<div class="a-std-search">
              <a @click="goPath('home')"><i class="fas fa-th-large"></i>Dashboard</a>
            </div>	
			<div class="a-std-search" :class="pagePath=='Course' || pagePath=='Word' || pagePath=='Exam' || pagePath=='Game' ? 'a-std-active' : '' ">
              <a @click="goPath('filter/Word')"><i class="fa fa-search "></i> {{l('Explore','g')}} </a>
            </div>
			<div class="a-std-search">
              <a @click="goPath('my/list')"><i class="fas fa-book"></i> {{l('My Library','g')}}</a>
            </div>
			<div class="a-std-search">
              <a @click="goPath()"><i class="fas fa-chart-bar"></i> Reports</a>
            </div>
			<div class="a-std-search">
              <a @click="goPath('my/profile?do=comments')"><i class="fa fa-comments"></i> Messages</a>
            </div>
			<div class="a-std-search">
              <a @click="goPath()"><i class="fas fa-bell"></i> Notification</a>
            </div>
			<div class="a-std-search">
              <a @click="goPath('my/profile?do=comments')"><i class="fas fa-comment"></i> Reviews</a>
            </div>
			<div class="a-std-search">
              <a @click="goPath('my/profile')"><i class="fas fa-cog"></i> Settings</a>
            </div>
			<div class="a-std-search">
              <a @click="goPath('page/help')"><i class="fas fa-question-circle"></i> Help</a>
            </div>
			<div class="a-std-search">
			<a @click="goPath()"><i class="fas fa-history"></i> Report History</a>
            </div>
			</div>
		 <div class="side-content"  >
      <div class="sa4d25"  :lang="LOCALE">
     
              <nuxt :key="$route.fullPath" />
             
      </div>
      </div>
      </div>
      </div>

     
   

 <div
      v-if="isMobile"
      class="bottomField"
      :class="isVisible ? 'visible-menu' : ''"
    >
      <div class="container pa-10 g-mt-50">
        <div class="row pa-10">
          <a
            class="exit-button"
            @click="
              isVisible = !isVisible; 
            "
          >
            <i class="fas fa-times fa-2x"></i>
          </a>
          <div class="col-6 col-sm-6 col-lg g-mb-30 g-mb-0--lg">
            <h2
              class="h6 g-color-black text-uppercase font_4 g-font-weight-600 g-mb-20"
            >
              Daleel
            </h2>
            <ul class="shortcuts-links">
           
              <li>
                <a @click="$router.push('/')">
                  {{l('Home','g')}}
                </a>
              </li>
              
            </ul>
          </div>
          <div class="col-6 col-sm-6 col-lg g-mb-30 g-mb-0--lg">
            <h2
              class="h6 g-color-black text-uppercase font_4 g-font-weight-600 g-mb-20"
            >
              {{ l("Courses", "g") }}
            </h2>
            <ul class="shortcuts-links">
             	<li  
					  @click.middle="goPathBlank('courses/all_courses')"    @click="goPath('courses/all_courses')"  
					:class="pagePath=='Course' ? 'danger':'outline-danger'"  >{{ l("Courses", "g") }}
				</li>
				<li  
					  @click.middle="goPathBlank('filter/Word')"            @click="goPath('filter/Word')"
					:class="pagePath=='Word' ? 'danger':'outline-danger'"  >{{ l("Words", "g") }}
				</li>
           <li  
					  @click.middle="goPathBlank('filter/Exam')"           @click="goPath('filter/Exam')"
					:class="pagePath=='Exam' ? 'danger':'outline-danger'"  >{{ l("Questions", "g") }}
				</li>       <li  
					  @click.middle="goPathBlank('filter/Quiz')"           @click="goPath('filter/Quiz')"
					:class="pagePath=='Exam' ? 'danger':'outline-danger'"  >{{ l("Quiz", "g") }}
				</li>
             <li  
					  @click.middle="goPathBlank('filter/Games')"           @click="goPath('filter/Game')"
					:class="pagePath=='Game' ? 'danger':'outline-danger'"  >{{ l("Games", "g") }}
				</li>
            
            </ul>
          </div>
          <div class="col-6 col-sm-6 col-lg g-mb-30 g-mb-0--lg">
            <h2
              class="h6 g-color-black text-uppercase font_4 g-font-weight-600 g-mb-20"
            >
              {{ l("Contact", "g") }}
            </h2>
            <ul class="shortcuts-links">
              
              <li>
                      <a href="javascript:;" @click="goPath('form/login')">
                 {{ l("Sign Up", "g") }}
                </a>
              </li>
              <li>
                <a href="javascript:;" @click="goPath('form/login')">
                  {{ l("Sign In", "g") }}
                </a>
              </li>
            </ul>
          </div>

          <div class="col-6 col-sm-6 col-lg g-mb-30 g-mb-0--lg">
           
          </div>
        </div>
      </div>
    </div>
 
	        <errorReport></errorReport>
        <likeModal></likeModal>
        <wordModal></wordModal>
          <suggestWord></suggestWord>
         <listEdit></listEdit>
        <commentModal></commentModal>  
	<div class="login-popup" :lang="LOCALE"

	v-if="loginPopupVisible">	<login :isPopup="true" 	@close="loginPopupVisible=$event"></login>
			</div> 
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import basicMixin from "~/mixins/basic.js";
import canoicalMixin from "~/mixins/canoical.js";
import Multiselect from 'vue-multiselect';
var Vue = require('vue');
var VueScrollTo = require('vue-scrollto');
import errorReport from "@/components/common/errorReport";
import wordModal from "@/components/modal/word";
import likeModal from "@/components/common/like";
import suggestWord from "@/components/common/suggestWord";
import listEdit from "@/components/common/listEdit";
import commentModal from "@/components/common/comment";
import ClickOutside from 'vue-click-outside'
import login from "@/components/common/login"; 
export default {
  mixins: [basicMixin, canoicalMixin, general],
  components:{
    errorReport,
    likeModal,
    wordModal,
    suggestWord,
    commentModal,
	listEdit,
	login
  },
  directives: {
    ClickOutside
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
	  this.isVisible=false;
	  
		
      await this.$store.dispatch("pages/getPageInfo", {});
     
       if(this.$store.state.pages.pageData.wa_content_id &&  this.$store.state.pages.pageData.id){
          await this.$store.dispatch("pages/setNewVisit", {
            contentId: this.$store.state.pages.pageData.wa_content_id,
            pageId: this.$store.state.pages.pageData.id,
            url: this.$route.path,
            lang: this.$store.state.locale
          });
       }
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
    drawer: true,
    searchText: "",
    keyMenu: "keyMenu",
    topBar: {},
    topIsVisible: false,
	localeShow:false,
	isVisible:false,
    // link: this.$route.query.link,
    rootKey: "rootKey",
	loginPopupVisible:false
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
    },
    pagePath(){
      return this.$route.params ? this.$route.params.id : '';
    },
    isErrorReportVisible: {
      get(){
        return this.$store.state.isErrorReportVisible;

      },set(val){
          this.$store.state.isErrorReportVisible = val;
      }
    },
	reverseClass(){
	 return this.LOCALE=='ar' ? 'd-flex flex-row-reverse' : ''
	}
  },
  async beforeMount(){
       this.$store.dispatch('user/findAuth',{headers:null}) 
  },
  created() {
    this.getLikes();
    this.$store.dispatch("course/getCourseCategories");
     this.$store.dispatch("core/getBanners", {});
	 	
  },
  methods: {
		
	hide () {
      this.localeShow = false
    }
  
  },

  async mounted() {
  	let language = this.$route.params.lang;
	let set_lang = language=='ar' ? 'ar' : 'en';
    document.body.classList.add("family_"+set_lang);

  await this.lf(["main", "g"]);
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      let language = this.$route.params.lang;
      this.$store.commit("setLocale", language);
      this.$store.commit("setCustomClass", language);
      this.$store.dispatch("getLikes");
      this.$nuxt.$loading.finish();
    });

 

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

:lang(ar) .row {
  flex-direction: row-reverse!important;
}
@media only screen and (max-width: 700px) {
  .rowMobile.login-popup{
	width: 600px;
	top: 40px;
	position: absolute; 
	background:#fff;
	padding: 10px;
	z-index:99;
	right: 100px;
	border-radius: 10px;
} {
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
body.family_ar{
	div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, 
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video { 
		font-family: 'Scheherazade New', serif; 
	}
}

body.family_en{
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u,  
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video { 
		font-family: 'Cairo', serif; 
	}
}
.btn-primary, .btn-primary:hover,.btn-danger, .btn-danger:hover,.btn-success, .btn-success:hover  {
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
::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px!important;
    height: 10px!important;
}
.modal-body-wide::-webkit-scrollbar-track,
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0);
  border-radius: 10px;
}

.modal-body-wide::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
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
     margin-top: 6px;
}
.header_right:lang(ar) {
	float: left!important; 
    width: 100%; 
}
.language-select{
    display: block;
    margin-right: 20px;
}

a.selected-language{
  color: #a0a0a0!important;
}
div.image-lang{
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: 4px solid #fafafa;
background-size: 60px auto;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    background-position: center;
    &.selected{
         border: 4px solid #d2ed8a;
    }
}
.no-border{
  border: 0;
  padding: 0;
}
header.modal-header{
    position: relative;
        height: auto;
}
.search120{
  margin-top: 0px; 
}

.mobile-bars{
    float: left;
    padding: 15px 10px;
    display: block;
    margin-right: 30px;
    height: 45px;
}
.menu-select {
background: #fff9f9;
    border-bottom: 1px solid #fcf5f5;
	width: 100%;
}
.menu-select, .menu-select-mobile{
    display: inline-block;
    margin-right: 0px;
    margin-top: -5px;
    margin-left: 0px;
}
.menu-select-item{

    border-left: 1px solid #f2f2f2;
     height: 45px;
    padding: 15px 15px;
    cursor: pointer;
    display: inline-flex; 
	cursor: pointer;
	&.selected{
	
			font-weight: 600;
	
	}
}
.menu-select-item:hover{ 
	    background: #fbf8f8; 
}

.menu-search input{

	border:0!important; 
	height: 60px;
    padding: 20px 15px;
}
@media only screen and (min-width: 700px) {

.main_logo img {
    height: 50px;
}

}
@media only screen and (max-width: 700px) {
.menu-select{ display: none; }
.menu-select-mobile{ display:  inline-block;}
.header_right{padding-right: 0;}
.main_logo img {
    height: auto;
}
.main_logo { 
    margin-top: 17px;
}
.choose-lang{

	position: absolute;
	top: 60px;
	right:0px;
	background: #fff;
	padding: 10px;
	height: 120px;
	width: 100px;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
}
.container-full{
	width: 100%;
    padding-right: 0px;
    padding-left: 0px;
    margin-right: auto;
    margin-left: auto;
}


.bottomField {
  height: calc(100vh - 55px);
  width: 100%;
  position: fixed;
  left: -1800px;
  z-index: 9999999999999999999999;
  background: #ffffffeb;
  top: inherit;
  margin-top: 0px;
  transition: 0.4s all;
  .container {
    margin-top: 20px;
  }
  .exit-button {
    position: absolute;
    bottom: 15px;
    right: 10px;
  }
  .card {
    box-shadow: 0px 0px 0px #00000029;
  }
  &.visible-menu {
    top: inherit;
    left: 0;
    transition: 0.4s all;
    position: fixed;
    top: 61px;
  }

  .pa-10 {
    padding: 10px;
  }
  .shortcuts-links {
    list-style: none;
    padding: 0;
    margin-top: 0.6875rem;
  }
  .shortcuts-links li a {
    font-family: Rubik;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 8px 0px;
    color: rgb(51, 51, 51);
  }
  .shortcuts-links li a:active,
  .shortcuts-links li a:focus,
  .shortcuts-links li a:hover {
    color: #e8ba60;
  }
  .shortcuts-links li a:active .fas,
  .shortcuts-links li a:focus .fas,
  .shortcuts-links li a:hover .fas {
    color: #e8ba60;
  }
  .shortcuts-links li a:active svg path,
  .shortcuts-links li a:focus svg path,
  .shortcuts-links li a:hover svg path {
    fill: #e8ba60;
  }
}


.modal-dialog {
    left: auto!important;
    right: auto!important;
    position: absolute!important; 
    width: 100%!important;
    margin-right: 0!important;
    max-width: 100%!important;
	margin-right: 0px!important;
}
.login-popup{
	width: 600px;
	top: 40px;
	position: absolute; 
	background:#fff;
	padding: 10px;
	z-index:99;
	right: 100px;
	border-radius: 10px;
}
.login-popup:lang(ar){
 
	right: auto; 
	left: 100px;
}
.overlayout{
	background: #252222a3;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
}
.opts_account img{
	    max-height: 36px;
}

@media only screen and (max-width: 700px) {
	.login-popup{
		width: 90%;
		top: 40px;
		position: absolute; 
		background:#fff;
		padding: 10px;
		z-index:99;
		right: 5%;
		border-radius: 10px;
	}
}
</style>
<style lang="scss">
.main-content{

	display:inline-flex; 
	width: 100%;

}
.side-bar{  min-width: 190px;
		background: #fff;
		border-radius: 10px;
		box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px;
		max-height: calc(100vh - 150px);
		padding: 10px 0px;

  }
.side-content{  width: 100%;  }
		
.side-bar{
margin-top:10px;
	.a-std-search{
		    height: 40px;
    width: 100%;
    font-size: 15px;
    line-height: 1.2;
    border-bottom: 1px solid #f2f2f2;
    padding: 10px;
	cursor:pointer;
			&:hover{
				color: #1db6f1;
				background: #f9f9f9;
			}
			&.a-std-active{
				color: #1db6f1;
				background: #f9f9f9;
			}
	i{
		margin-right:5px;
		margin-left:0px;
	}
	}
}			  
</style>
