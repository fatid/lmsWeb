<template>
  <div>
    <header class="header clearfix">
      <button type="button" id="toggleMenu" class="toggle_menu">
        <i class="uil uil-bars"></i>
      </button>
      <button id="collapse_menu" class="collapse_menu">
        <i class="uil uil-bars collapse_menu--icon "></i>
        <span class="collapse_menu--label"></span>
      </button>
      <div class="main_logo" id="logo">
        <a @click="goPath('home')"
          ><img :src="l('siteInfo.G_Logo', 'g')" alt="logo"
        /></a>
        <a @click="goPath('home')"
          ><img class="logo-inverse" :src="l('siteInfo.G_Logo', 'g')" alt="logo"
        /></a>
      </div>
      <div class="top-category">
        <div class="ui compact menu cate-dpdwn">
          <div class="ui simple dropdown item">
            <a href="#" class="option_links p-0" title="categories"
              ><i class="uil uil-apps"></i
            ></a>
            <div class="menu dropdown_category5">
              <div class="item channel_item" v-for="cat in categories">
                <a @click="goPath('courses/' + cat.cou_label_link)">
                  {{ cat.cou_label_name }}
                </a>
              </div>
            </div>
          </div>
        </div>
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
      <div class="header_right">
        <ul>
          <li>
            <a
              @click="goPath('course/my')"
              class="upload_btn"
              title="Create New Course"
              >{{ l("My Courses", "g") }}</a
            >
          </li>
          <!-- <li>
					<a href="shopping_cart.html" class="option_links" title="cart"><i class='uil uil-shopping-cart-alt'></i><span class="noti_count">2</span></a>
				</li> -->
          <li class="ui dropdown" v-if="auth.token">
            <a href="#" class="option_links" title="Messages"
              ><i class="uil uil-envelope-alt"></i
              ><span class="noti_count">0</span></a
            >
            <!-- <div class="menu dropdown_ms">
              <a href="#" class="channel_my item">
                <div class="profile_link">
                  <img src="/images/left-imgs/img-6.jpg" alt="" />
                  <div class="pd_content">
                    <h6>Zoena Singh</h6>
                    <p>
                      Hi! Sir, How are you. I ask you one thing please explain
                      it this video price.
                    </p>
                    <span class="nm_time">2 min ago</span>
                  </div>
                </div>
              </a>
              <a href="#" class="channel_my item">
                <div class="profile_link">
                  <img src="/images/left-imgs/img-5.jpg" alt="" />
                  <div class="pd_content">
                    <h6>Joy Dua</h6>
                    <p>
                      Hello, I paid you video tutorial but did not play error
                      404.
                    </p>
                    <span class="nm_time">10 min ago</span>
                  </div>
                </div>
              </a>
              <a href="#" class="channel_my item">
                <div class="profile_link">
                  <img src="/images/left-imgs/img-8.jpg" alt="" />
                  <div class="pd_content">
                    <h6>Jass</h6>
                    <p>Thanks Sir, Such a nice video.</p>
                    <span class="nm_time">25 min ago</span>
                  </div>
                </div>
              </a>
              <a class="vbm_btn" href="instructor_messages.html"
                >View All <i class="uil uil-arrow-right"></i
              ></a>
            </div> -->
          </li>
          <li class="ui dropdown" v-if="auth.token">
            <a href="#" class="option_links" title="Notifications"
              ><i class="uil uil-bell"></i><span class="noti_count">0</span></a
            >
            <!-- <div class="menu dropdown_mn">
              <a href="#" class="channel_my item">
                <div class="profile_link">
                  <img src="/images/left-imgs/img-1.jpg" alt="" />
                  <div class="pd_content">
                    <h6>Rock William</h6>
                    <p>
                      Like Your Comment On Video
                      <strong>How to create sidebar menu</strong>.
                    </p>
                    <span class="nm_time">2 min ago</span>
                  </div>
                </div>
              </a>
              <a href="#" class="channel_my item">
                <div class="profile_link">
                  <img src="/images/left-imgs/img-2.jpg" alt="" />
                  <div class="pd_content">
                    <h6>Jassica Smith</h6>
                    <p>
                      Added New Review In Video
                      <strong>Full Stack PHP Developer</strong>.
                    </p>
                    <span class="nm_time">12 min ago</span>
                  </div>
                </div>
              </a>
              <a href="#" class="channel_my item">
                <div class="profile_link">
                  <img src="/images/left-imgs/img-9.jpg" alt="" />
                  <div class="pd_content">
                    <p>
                      Your Membership Approved <strong>Upload Video</strong>.
                    </p>
                    <span class="nm_time">20 min ago</span>
                  </div>
                </div>
              </a>
              <a class="vbm_btn" href="instructor_notifications.html"
                >View All <i class="uil uil-arrow-right"></i
              ></a>
            </div> -->
          </li>
          <li v-if="!auth.token" class="list-inline-item g-mx-4">
            <a
              class="g-color-black g-color-primary--hover g-text-underline--none--hover"
              @click="goPath('form/login')"
              >{{ l("LOGIN", "g") }}</a
            >
          </li>
          <li class="ui dropdown" v-else-if="auth.token">
            <a
              @click="goPath('account/dashboard')"
              class="opts_account"
              title="Account"
            >
              <img src="/images/hd_dp.jpg" alt="" />
            </a>
            <div class="menu dropdown_account">
              <div class="channel_my">
                <div class="profile_link">
                  <img src="/images/hd_dp.jpg" alt="" />
                  <div class="pd_content">
                    <div class="rhte85">
                      <h6>{{ auth.fullName }}</h6>
                      <div class="mef78" title="Verify">
                        <i class="uil uil-check-circle"></i>
                      </div>
                    </div>
                    <span>gambol943@gmail.com</span>
                  </div>
                </div>
                <a href="my_instructor_profile_view.html" class="dp_link_12"
                  >View Instructor Profile</a
                >
              </div>
              <div class="night_mode_switch__btn">
                <a href="#" id="night-mode" class="btn-night-mode">
                  <i class="uil uil-moon"></i> Night mode
                  <span class="btn-night-mode-switch">
                    <span class="uk-switch-button"></span>
                  </span>
                </a>
              </div>
              <a href="instructor_dashboard.html" class="item channel_item"
                >Cursus dashboard</a
              >
              <a href="membership.html" class="item channel_item"
                >Paid Memberships</a
              >
              <a href="setting.html" class="item channel_item">Setting</a>
              <a href="help.html" class="item channel_item">Help</a>
              <a href="feedback.html" class="item channel_item"
                >Send Feedback</a
              >
              <a href="sign_in.html" class="item channel_item">Sign Out</a>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <!-- Header End -->
    <!-- Left Sidebar Start -->
    <nav class="vertical_nav">
      <div class="left_section menu_left" id="js-menu">
        <div class="left_section">
          <ul>
            <li class="menu--item">
              <a
                @click="goPath('home')"
                class="menu--link active"
                :title="l('Home', 'g')"
              >
                <i class="uil uil-home-alt menu--icon"></i>
                <span class="menu--label">{{ l("Home", "g") }}</span>
              </a>
            </li>

            <li class="menu--item">
              <a
                @click="goPath('courses/all_courses')"
                class="menu--link"
                :title="l('Courses', 'g')"
              >
                <i class="uil uil-search menu--icon"></i>
                <span class="menu--label">{{ l("Courses", "g") }}</span>
              </a>
            </li>
            <li class="menu--item">
              <a
                @click="goPath('words/all_words')"
                class="menu--link"
                :title="l('Words', 'g')"
              >
                <i class="uil uil-search menu--icon"></i>
                <span class="menu--label">{{ l("Words", "g") }}</span>
              </a>
            </li>
            <li class="menu--item  menu--item__has_sub_menu">
              <label class="menu--link" title="Tests">
                <i class="uil uil-clipboard-alt menu--icon"></i>
                <span class="menu--label">{{ l("Tests", "g") }}</span>
              </label>
              <ul class="sub_menu">
                <li class="sub_menu--item">
                  <a
                    @click="goPath('tests/all_tests')"
                    class="sub_menu--link"
                    >{{ l("Tests") }}</a
                  >
                </li>
                <li class="sub_menu--item">
                  <a href="#" class="sub_menu--link">Test Results</a>
                </li>
                <li>
                  <a href="#" class="sub_menu--item">My Certification</a>
                </li>
              </ul>
            </li>
            <li class="menu--item">
              <a
                @click="goPath('my/favorite-courses')"
                class="menu--link"
                title="Saved Courses"
              >
                <i class="uil uil-heart-alt menu--icon"></i>
                <span class="menu--label">{{ l("Saved Courses", "g") }}</span>
              </a>
            </li>
            <li class="menu--item">
              <a
                @click="goPath('my/favorite-words')"
                class="menu--link"
                title="Saved Courses"
              >
                <i class="uil uil-heart-alt menu--icon"></i>
                <span class="menu--label">{{ l("Saved Words", "g") }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="left_section pt-2">
          <ul>
            <li class="menu--item">
              <a
                @click="goPath('my/settings')"
                class="menu--link"
                title="Setting"
              >
                <i class="uil uil-cog menu--icon"></i>
                <span class="menu--label">Setting</span>
              </a>
            </li>
            <li class="menu--item">
              <a @click="goPath('page/help')" class="menu--link" title="Help">
                <i class="uil uil-question-circle menu--icon"></i>
                <span class="menu--label">Help</span>
              </a>
            </li>
            <li class="menu--item">
              <a
                @click="goPath('reports/all')"
                class="menu--link"
                title="Report History"
              >
                <i class="uil uil-windsock menu--icon"></i>
                <span class="menu--label">Report History</span>
              </a>
            </li>
            <li class="menu--item">
              <a href="feedback.html" class="menu--link" title="Send Feedback">
                <i class="uil uil-comment-alt-exclamation menu--icon"></i>
                <span class="menu--label">Send Feedback</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="left_footer">
          <ul>
            <li>
              <a @click="goPath('page/about')">{{ l("About", "g") }}</a>
            </li>
            <li>
              <a @click="goPath('page/contact')">{{ l("Contact Us", "g") }}</a>
            </li>
            <li>
              <a @click="goPath('page/copyright')"
                >{{ l("Copyright", "g") }}
              </a>
            </li>
            <li>
              <a @click="goPath('page/privacy_policy')"
                >{{ l("Privacy Policy", "g") }}
              </a>
            </li>
            <li>
              <a @click="goPath('page/terms_of_use')"
                >{{ l("Terms of Use", "g") }}
              </a>
            </li>
          </ul>
          <div class="left_footer_content">
            <p>
              © {{ year }} <strong>{{ l("Daleel", "g") }}</strong
              >. {{ l("All Rights Reserved.", "g") }}
            </p>
          </div>
        </div>
      </div>
    </nav>
    <div class="wrapper">
      <div class="sa4d25">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <nuxt v-if="LANG_PACK.main" :key="$route.fullPath" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import basicMixin from "~/mixins/basic.js";
import canoicalMixin from "~/mixins/canoical.js";
export default {
  mixins: [basicMixin, canoicalMixin, general],
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
      // this.$store.dispatch("getLikes");
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
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.modal-body-wide::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
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
</style>
