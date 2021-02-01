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
          <!-- {{ pageInfo.SA_Baslik }} -->

          <div class="g-font-size-16 g-line-height-1_8 g-mb-30">
            <!-- <div class="u-shadow-v25 g-mb-30" v-if="pageInfo.SA_Fotograf">
                <img
                  :lang="LOCALE"
                  class="imgFloat"
                  :src="pageInfo.SA_Fotograf + '?width=960'"
                  :alt="pageInfo.SA_Baslik"
                />
              </div> -->
          </div>
          <div class="textArea" v-html="decodeHtml(pageInfo.SA_Yazilar)"></div>

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
        </div>
        <div
          class="col-lg-3 order-lg-1 appear-animation"
          data-appear-animation="fadeInUpShorter"
          data-appear-animation-delay="250"
        >
          <div class="card   mb-5">
            <div v-if="stokFile.sp_File" class="card-body pa-3 z-index-1 text-center">
              <a target="blank" :href="stokFile.sp_File">
                <h2 class="text-color-dark font-weight-bold text-4 mb-4">
                   Güncel Stok Listesini İndir  
                </h2>
                <i class="fas fa-download text-6"></i>
              </a>
            </div>
          </div>
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
import axios from "axios";

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
      stokFile: {}
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
  mounted(){
    this.getStokFile()
  },
  methods: {
    async getStokFile() {
      await axios({
        url: process.env.baseURL+'sProducts',
        method: "get",
        params: {
          limit: 1,
          lang: this.$store.state.locale,
          filter: { sp_Link: ["LIKE",'stok'] },
          fields: "sp_productName,sp_Text,sp_File",
          sort: ["sort,DESC", "created_on,ASC"]
        }
      })
        .then(response => {
          this.stokFile = response.data.formattedData ? response.data.formattedData[0] : {};
        })
        .catch(e => {
          console.log("ERR", e);
        });
    }
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
.textArea:lang(en) {
  min-height: 250px;
  text-align: left;
  direction: ltr;
}
.textArea {
  min-height: 250px;
  text-align: left;
  direction: ltr;
  /* font-family: "Poppins", sans-serif;
   */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: #777;
  font-size: 17px;
}
.textArea h5,
.textArea h2,
.textArea h3,
.textArea h4,
.textArea h6,
.textArea h1 {
  color: #777;
  text-transform: none !important;
}
strong {
  text-transform: none;
}
.textArea ul {
  /* list-style: none; */
  padding: 0;
  margin: 0;
}

.textArea:lang(ar) {
  min-height: 250px;
  text-align: right;
  direction: rtl;
}
</style>
