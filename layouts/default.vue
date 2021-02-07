<template>
  <div  :lang="LOCALE"> 
    <headBar v-if="LANG_PACK.main"></headBar>
 
    <nuxt v-if="LANG_PACK.main" :key="$route.fullPath" /> 
    <footerBar v-if="LANG_PACK.main"></footerBar>
    <!-- {{pageInfo}}  -- {{LANG_PACK}} -->
  </div>
</template>

<script>
import headBar from "~/components/common/headBar.vue";
import footerBar from "~/components/common/footer.vue";
import basicMixin from "~/mixins/basic.js";
import canoicalMixin from "~/mixins/canoical.js";

export default {
  components: {
    headBar,
    footerBar
  },
  mixins: [basicMixin,canoicalMixin],
  data() {
    return {
      link: this.$route.query.link,
      rootKey: 'rootKey',
    };
  },
  // async created() { 
    
  // },
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
          content: this.pageInfo.SA_Title
            ? this.pageInfo.SA_Title
            : ""
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.pageInfo.SA_Description
            ? this.pageInfo.SA_Description
            : ""
        },
        // { hid: 'fb:app_id', name: 'fb:app_id', content: '12873892173892' },
    { hid: 'og:title', name: 'og:title', content: this.pageInfo.SA_Title },
    // { hid: 'og:image', name: 'og:image', content: 'http://lms.org/logo.png' },
    { hid: 'og:type', name: 'og:type', content: 'article' }, 
    // {  name: 'article:publisher', content: 'https://www.facebook.com/Buhuth' },
    {  name: 'article:published_time', content: this.pageInfo.created_on },
    {  name: 'article:modified_time', content: this.pageInfo.updated_on },
        // {
        //   hid: "keywords",
        //   name: "keywords",
        //   content: this.pageInfo.SA_Keywords
        // }
      ]
    };
  },
  computed: {
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    LOCALE() {
      return this.$store.state.locale;
    },
    LANG_PACK() {
      return this.$store.state.langFile;
    }
  },
  watch: {
    // '$route.path'(val) {
    //   console.log("onchnage",val)
    //     this.rootKey = this.$route.path;
    // },
    async $route(to, from) {
      
       
      setTimeout(() => {         
          window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        
      }, 500);
      await this.$store.dispatch("pages/getPageInfo", {});
      await this.$store.dispatch("pages/setNewVisit",{contentId: this.$store.state.pages.pageData.wa_content_id,pageId: this.$store.state.pages.pageData.id, url:this.$route.path,lang:this.$store.state.locale})

      this.rootKey = to.path; 

    

    
    }
  }
};
</script>

<style>
:lang(ar) li,
:lang(ar) input,
:lang(ar) select,
:lang(ar) textarea {
  direction: rtl;
}

@media only screen and (max-width: 700px) {
  .rowMobile{
    margin-left: 0px;
    margin-right: 0px;
  }
  .sideBarField{
    order:1;
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
.vs__search, .vs__search:focus { 
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
 font-size: 15px!important;
   
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

.v-select, .v-select * { 
    display: inherit;
}

.errors{
  font-size: 15px;
  color: red;
}
</style>
<style lang="scss">
.btn-primary{
  color: #fff!important;
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
  height: calc(100vh - 150px)!important;
  overflow-y: auto;
  overflow-x: hidden;
}
.modal-content-wide{
  width: 90%!important;
}

.modal-footer {
  padding: 7px 16px;
  color: #000;
  text-align: center;
}
 
.modal-body-wide::-webkit-scrollbar {
    width: 12px;
}

.modal-body-wide::-webkit-scrollbar-track, ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 7px rgba(0,0,0,0.3); 
    border-radius: 10px;
}

.modal-body-wide::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.5); 
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



</style>