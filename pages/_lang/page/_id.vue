<template>
  <div :lang="LOCALE" class="w-100">
    <breadcrumb></breadcrumb>
    <div class="container">
      <div
        class="row"
      >  
          <div
            class="col-lg-9 order-lg-2 mb-5 mb-lg-0 appear-animation"
            data-appear-animation="fadeInUpShorter"
            data-appear-animation-delay="500"
          >
            <!-- {{ pageInfo.SA_Baslik }} -->

            <div  v-if="pageInfo.SA_Yazilar" class="g-font-size-16 g-line-height-1_8 g-mb-30">
              <div class="u-shadow-v25 g-mb-30" v-if="pageInfo.SA_Fotograf">
                <img
                  :lang="LOCALE"
                  class="imgFloat"
                  :src="pageInfo.SA_Fotograf + '?width=960'"
                  :alt="pageInfo.SA_Baslik"
                />
              </div>
            </div>
            <div v-if="pageInfo.SA_Yazilar"
              class="textArea"
              v-html="decodeHtml(pageInfo.SA_Yazilar)"
            ></div>

            <!-- Sources & Tags -->
            <div class="g-mb-30" v-if="pageInfo.SA_Tag">
              <h6 class="g-color-gray-dark-v1">
                <strong class="g-mr-5">{{ langPack.main.Tags }}:</strong>
                <a
                  v-for="tag in pageInfo.SA_Tag"
                  class="u-tags-v1 g-font-size-12 g-brd-around g-brd-gray-light-v4 g-bg-primary--hover g-brd-primary--hover g-color-black-opacity-0_8 g-color-white--hover rounded g-py-6 g-px-15 g-mr-5"
                  :href="'search?key=' + tag"
                  >{{ tag }}</a
                >
              </h6>
            </div>

                <pages :pageId="pageInfo.wa_sayfa_Id"></pages>

 <div v-if="hasGallery(pageInfo.SA_Galeri)" class="owl-carousel owl-theme stage-margin nav-style-1 owl-loaded owl-drag owl-carousel-init"  style="height: auto;">
 <div class="owl-stage-outer"><div class="owl-stage" style="transform: translate3d(-693px, 0px, 0px); transition: all 0.25s ease 0s; width: 1814px; padding-left: 40px; padding-right: 40px;">
  <div class="owl-item " v-for="image in getImages(pageInfo.SA_Galeri)"  style="width: 163.333px; margin-right: 10px;"><div>
 <img alt="" class="img-fluid rounded" :title="image.t" :src="show_image(image.m,'150','150','c','')"> 
</div></div> </div></div>
</div>
 


         
          </div>
          <div
            class="col-lg-3 order-lg-1 appear-animation"
            data-appear-animation="fadeInUpShorter"
            data-appear-animation-delay="250"
          >
          <sidebar></sidebar>
         
          </div>
         
        </div>
      </div>
      <div class="container">
          <div class="row">
               <div class="col-12 order-4">
               <whoweare></whoweare>
          </div>
          </div>
      </div>
    </div> 
</template>
<script>
import Breadcrumb from "~/components/common/breadcrumb.vue";
import Sidebar from "~/components/common/sidebar.vue";
import Share from "~/components/common/share.vue";
import whoweare from "~/components/common/whoweare.vue";
import pages from "~/components/common/pages.vue";
import general from "@/mixins/general";

export default {
  mixins: [general],
 
layout: 'basic',
  components: {
    Breadcrumb,
    Sidebar,
    Share,
    whoweare,
    pages
  },
  data() {
    return {
      relatedPages: [],
      topPage:{},
    };
  },
  mounted(){
    if (process.client) {
        $(document).ready(()=>{ 
          setTimeout(() => {
             $('.owl-carousel').owlCarousel({
                  loop:true,
                  margin:10,
                  nav:false,
                  responsive:{
                      0:{
                          items:1
                      },
                      600:{
                          items:3
                      },
                      1000:{
                          items:5
                      }
                  }
                  })
          }, 3000);
                 
       })
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    LOCALE() {
      return this.$store.state.locale;
    },
    langPack() {
      return this.$store.state.langFile;
    }
  },
  methods: {
     
  }
};
</script>
<style scoped>
.imgFloat {
  float: left;
  margin: 0px 15px 15px 0px;
  width: 200px;
}
.imgFloat:lang(ar) {
  float: right;
  margin: 0px 0px 15px 15px;
  width: 200px;
}
.textArea {

  width: 100%;
  display: block;
}
.textArea:lang(en) {
  min-height: 250px;
  text-align: left;
  direction: ltr;
}
.textArea:lang(ar) {
  min-height: 250px;
  text-align: right;
  direction: rtl;
}

@media (max-width: 991px) {
.textArea { 
  width: 100%;
  display: block;
  height: auto;
      word-break: break-word;
}
}

</style>
