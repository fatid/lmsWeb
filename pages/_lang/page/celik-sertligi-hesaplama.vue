<template>
  <div :lang="LOCALE" class="w-100">
    <breadcrumb></breadcrumb>
    <div class="container">
      <div class="row">
        <div
          class="col-lg-9 order-lg-2 mb-5 mb-lg-0 appear-animation"
          data-appear-animation="fadeInUpShorter"
          data-appear-animation-delay="500"
        >
        
          <!-- Sources & Tags -->
<form class="contact-form custom-form-style-2" action="#" method="POST">
                            
          <!-- <pages :pageId="pageInfo.wa_sayfa_Id"></pages> -->
          <div class="form-row">
            <div class="col">
              <h2 class="text-color-dark font-weight-bold text-4-5 mb-3">
                Çelik Sertliği Hesaplama
              </h2>
            </div>
          </div>
          <div class="form-row pb-2 mb-4">
            <div class="form-group col-md-4 mb-md-0">
        
                 <span class="mgd"><b>{{list[0].hb}}</b></span>
                <select
                  class="form-control colorized" 
                  v-model="value" 
                >
                  <option  :key="'hb'+l.val" :value="l.val" v-for="l in list">{{l.hb}}</option>
                </select>
             
            </div>
            <div class="form-group col-md-4 mb-md-0">
            <span class="mgd"><b>{{list[0].hrc}}</b></span>
              <select
                  class="form-control colorized" 
                  v-model="value" 
                  :key="'a'+value"
                >
                  <option :key="'hrc'+l.val" :value="l.val" v-for="l in list">{{l.hrc}}</option>
                </select>
            </div>
            <div class="form-group col-md-4 mb-md-0">
            <span class="mgd"><b>{{list[0].hv}}</b></span>

               <select
                  class="form-control colorized" 
                  v-model="value" 
                  :key="'b'+value"
                >
                  <option :key="'hv'+l.val" :value="l.val" v-for="l in list">{{l.hv}}</option>
                </select>
            </div>
          </div>
        </form>

          <div class="textArea" v-html="decodeHtml(pageInfo.SA_Yazilar)"></div>

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
      topPage: {},
      value:0,
      list:[
{ val: 0, hb: 'Brinell',	hrc:'Rockwell',	hv:'Vickers'},
{ val: 1, hb: '226 HB',	hrc:'20 HRC',	hv:'242 HV'},
{ val: 2, hb: '232 HB',	hrc:'21 HRC',	hv:'248 HV'},
{ val: 3, hb: '239 HB',	hrc:'22 HRC',	hv:'254 HV'},
{ val: 4, hb: '241 HB',	hrc:'23 HRC',	hv:'257 HV'},
{ val: 5, hb: '248 HB',	hrc:'24 HRC',	hv:'264 HV'},
{ val: 6, hb: '253 HB',	hrc:'25 HRC',	hv:'269 HV'},
{ val: 7, hb: '260 HB',	hrc:'26 HRC',	hv:'276 HV'},
{ val: 8, hb: '266 HB',	hrc:'27 HRC',	hv:'282 HV'},
{ val: 9, hb: '272 HB',	hrc:'28 HRC',	hv:'289 HV'},
{ val: 10, hb: '278 HB',	hrc:'29 HRC',	hv:'295 HV'},
{ val: 11, hb: '285 HB',	hrc:'30 HRC',	hv:'302 HV'},
{ val: 12, hb: '292 HB',	hrc:'31 HRC',	hv:'308 HV'},
{ val: 13, hb: '300 HB',	hrc:'32 HRC',	hv:'317 HV'},
{ val: 14, hb: '309 HB',	hrc:'33 HRC',	hv:'327 HV'},
{ val: 15, hb: '317 HB',	hrc:'34 HRC',	hv:'334 HV'},
{ val: 16, hb: '325 HB',	hrc:'35 HRC',	hv:'342 HV'},
{ val: 17, hb: '337 HB',	hrc:'36 HRC',	hv:'354 HV'},
{ val: 18, hb: '345 HB',	hrc:'37 HRC',	hv:'363 HV'},
{ val: 19, hb: '356 HB',	hrc:'38 HRC',	hv:'374 HV'},
{ val: 20, hb: '366 HB',	hrc:'39 HRC',	hv:'384 HV'},
{ val: 21, hb: '375 HB',	hrc:'40 HRC',	hv:'394 HV'},
{ val: 22, hb: '388 HB',	hrc:'41 HRC',	hv:'407 HV'},
{ val: 23, hb: '398 HB',	hrc:'42 HRC',	hv:'418 HV'},
{ val: 24, hb: '409 HB',	hrc:'43 HRC',	hv:'431 HV'},
{ val: 25, hb: '420 HB',	hrc:'44 HRC',	hv:'443 HV'},
{ val: 26, hb: '432 HB',	hrc:'45 HRC',	hv:'457 HV'},
{ val: 27, hb: '444 HB',	hrc:'46 HRC',	hv:'470 HV'},
{ val: 28, hb: '455 HB',	hrc:'47 HRC',	hv:'484 HV'},
{ val: 29, hb: '456 HB',	hrc:'48 HRC',	hv:'490 HV'},
{ val: 30, hb: '468 HB',	hrc:'49 HRC',	hv:'497 HV'},
{ val: 31, hb: '469 HB',	hrc:'50 HRC',	hv:'505 HV'},
{ val: 32, hb: '486 HB',	hrc:'51 HRC',	hv:'531 HV'},
{ val: 33, hb: '504 HB',	hrc:'52 HRC',	hv:'549 HV'},
{ val: 34, hb: '513 HB',	hrc:'53 HRC',	hv:'567 HV'},
{ val: 35, hb: '534 HB',	hrc:'54 HRC',	hv:'589 HV'},
{ val: 36, hb: '552 HB',	hrc:'55 HRC',	hv:'649 HV'},
{ val: 37, hb: '572 HB',	hrc:'56 HRC',	hv:'694 HV'},
{ val: 38, hb: '592 HB',	hrc:'57 HRC',	hv:'727 HV'},
{ val: 39, hb: '601 HB',	hrc:'58 HRC',	hv:'746 HV'},
{ val: 40, hb: '613 HB',	hrc:'59 HRC',	hv:'-'},
{ val: 41, hb: '627 HB',	hrc:'60 HRC',	hv:'-'},
{ val: 42, hb: '642 HB',	hrc:'61 HRC',	hv:'-'},
{ val: 43, hb: '658 HB',	hrc:'62 HRC',	hv:'-'},
{ val: 44, hb: '681 HB',	hrc:'63 HRC',	hv:'-'},
{ val: 45, hb: '695 HB',	hrc:'64 HRC',	hv:'-'},
{ val: 46, hb: '711 HB',	hrc:'65 HRC',	hv:'-'},
{ val: 47, hb: '735 HB',	hrc:'66 HRC',	hv:'-'},
{ val: 48, hb: '746 HB',	hrc:'67 HRC',	hv:'-'},
{ val: 49, hb: '745 HB',	hrc:'68 HRC',	hv:'-'},
{ val: 50, hb: '752 HB',	hrc:'69 HRC',	hv:'-'},
{ val: 51, hb: '760 HB',	hrc:'70 HRC',	hv:'-'},
{ val: 52, hb: '780 HB',	hrc:'71 HRC',	hv:'-'},
{ val: 53, hb: '800 HB',	hrc:'72 HRC',	hv:'-'}
],
    };
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
  methods: {}
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
.mgd{
    margin-left: 20px;
    font-weight: 600;
    padding: 15px 0px;
    line-height: 2;
    display:block;
}

.colorized{
  transition: 1s all;
  display: block;
}
</style>