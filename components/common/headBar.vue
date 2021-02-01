<template>
<header>
   <div
                  class="header-nav header-nav-links justify-content-end pr-lg-4 mr-lg-3"
                >
                  <div
                    class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1"
                  >
                    <nav class="collapse" :class="collapse? 'show':''">
                      <ul class="nav nav-pills" id="mainNav">
                        <template v-for="(item, k) in getMenu('MainMenu')">
                          <li
                          v-if="item.title"
                            :key="'menu' + k"
                            :class="{
                              dropdown:
                                item.type == 'DropdownMenu' ||
                                item.type == 'AutoSubMenu'
                            }"
                          >
                            <a
                              class="nav-link "
                              :class="{
                                'dropdown-toggle':
                                  item.type == 'DropdownMenu' ||
                                  item.type == 'AutoSubMenu'
                              }"
                              @click.prevent="collapse=false;
                                item.path && item.path != '#'
                                  ? goPath(item.path)
                                  : ''
                              "
                            >
                              <!-- active -->

                              {{ item.title }}
                            </a>
                            <ul
                              v-if="
                                item.type == 'DropdownMenu' ||
                                  item.type == 'AutoSubMenu'
                              "
                              class="dropdown-menu"
                            >
                              <li
                                v-for="(subitem, y) in item.list"
                                :key="'sub' + y"
                              >
                                <a
                                  @click="goPath(subitem.path)"
                                  class="dropdown-item"
                                  >{{ subitem.title }}</a
                                >
                              </li>
                            </ul>
                          </li>
                        </template>
                      </ul>
                    </nav>
                  </div>
                </div>
    </header>
 
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";

export default {
  mixins: [general],
  watch: {
    "$route.path"(to, from) {
      this.keyMenu = "k" + Math.random(100, 9999999);

      if (process.client) {
        // $(document).ready(function() {
        //   setTimeout(() => {
        //     $(".hamburger").removeClass("is-active");
        //   }, 200);
        // });
      }
    }
  },
  data: () => ({
    languages: [
      { value: "tr", name: "Turkish" },
      { value: "en", name: "English" }
    ],
    collapse:false,
    searchText:'',
    keyMenu: "keyMenu",
    topBar:{},
    topIsVisible:false
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
    }
  },
  created() {
    this.getLikes();
    this.getHeaderData();
  },
  methods:{
    async getHeaderData() { 
       let fields = `topBar_title1,topBar_title2,topBar_titleLink,topBar_url,created_on,created_by,id,status`
         
                let filters= { status:['=',1]}
                return new Promise((resolve, reject) => {
                axios({
                    url: process.env.baseURL+"topBar",
                    method: 'get',
                    params: {
                        limit:1,
                        offset:0,
                        fields,
                        lang:this.$store.state.locale,
                        sort:['created_on,DESC'],
                        filter:filters
                    }  
                }).then(response => {
                  this.topBar = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData[0]:  [];
                        this.topIsVisible = true;
       
                }).catch(e => {
                    console.log(e)
                    })
                });
    }
  },

  mounted() {
   
   
   
// Animate
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginAnimate'])) {

		$(function() {
			$('[data-appear-animation]').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginAnimate(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Animated Letters
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginAnimatedLetters'])) {

		$(function() {
			$('[data-plugin-animated-letters]:not(.manual), .animated-letters').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginAnimatedLetters(opts);
			});
		});

	}

}).apply(this, [jQuery]);


// Sticky
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginSticky'])) {

		$(function() {
			$('[data-plugin-sticky]:not(.manual)').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginSticky(opts);
			});
		});

	}

}).apply(this, [jQuery]);
    }
  
};
</script>
<style>
.width-100 {
  width: 100%;
}
.g-mt-45{
  margin-top:45px;
}

.cursor-pointer{
  cursor: pointer;
}
.nav-item:hover  span{
  color: #FF0000!important;
  font-size: 13px;
  transition: 1s all;
}


@media (max-width: 991px){

 #header .header-logo img { 
    top: 5px!important; 
    width: 75px;
    height: 75px;
  }
  .header-extra-info{
    width: 150px;
  }

}

@media (min-width: 992px){
  #header .header-nav-main nav > ul > li > a {
    font-size: 14px!important;
  } 
  #header .header-logo img{
    background: #fff;
  }
   #header .header-logo img { 
    top: 0px!important;
    width: 105px;
    height: 105px;
  }
  .header-nav-top{
    padding-left: 140px;
  }
  #header .header-nav-main nav > ul > li.dropdown .dropdown-menu li a { 
    font-size: 0.9em!important;
  }
}
.line-height-1_7{
  line-height: 1.7!important;
}

#header .header-container {
    height: 70px!important;
}

.text-whatsapp{ 
	color: #128C7E; 
}

.header-btn-collapse-nav{
  width: 40px;
}
</style>
