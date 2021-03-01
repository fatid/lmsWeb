<template>
  <section
    class="page-header page-header-modern bg-color-light-scale-1" :class="'page-header-'+size"
  >
    <div class="container">
      <div class="row" :class="[customClass.flexRow]">
        <div class="col-md-8 order-2 order-md-1 align-self-center p-static">
          <h1 class="text-color-dark font-weight-bold">
            {{
              pageInfo.wa_title
                ? pageInfo.wa_title
                : pageInfo.SA_Baslik
                ? pageInfo.SA_Baslik
                : ""
            }}
          </h1>
        </div>
        <div class="col-md-4 order-1 order-md-2 align-self-center">
          <ul class="breadcrumb d-flex justify-content-md-end text-3-4">
            <li>
              <a
                @click="goPath('home')"
                class="text-color-default text-color-hover-primary text-decoration-none"
                >{{ l("Home", "g") }}  </a
              >
            </li>
            <li > / </li>
            <li v-if="topPage && topPage.SA_Baslik">
              <a
                @click="goPath('page/'+topPage.wa_full_path)"
                class="text-color-default text-color-hover-primary text-decoration-none"
                >{{ topPage.SA_Baslik }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import { KurumsalSayfalar } from "@/transformers/KurumsalSayfalar";

export default {
  mixins: [general],
  computed: {},
  data() {
    return {
      topPage: {}
    };
  },
  props:{
    size:{
      type: String,
      default:"sm" 
    }
  },
  watch: {
    "pageInfo.KurumsalSayfalar.SA_UstSayfa"(val) {
      this.getTopPage(val);
    }
  },
  created() {
    if (
      this.pageInfo.KurumsalSayfalar &&
      this.pageInfo.KurumsalSayfalar.SA_UstSayfa
    ) {
      this.getTopPage(this.pageInfo.KurumsalSayfalar.SA_UstSayfa);
    }
  },
  methods: {
    getTopPage(val) {
      axios({
        url: process.env.baseURL + "all_links",
        method: "get",
        params: {
          limit: "1",
          lang: this.LOCALE,
          filter: { wa_sayfa_Id: ["=", val] },
          fields:
            "wa_full_path,wa_content_id,wa_MainGroup,wa_sayfa_Id,wa_sayfa_Id.SA_Title,wa_sayfa_Id.SA_Description,wa_sayfa_Id.SA_Keywords,wa_sayfa_Id.SA_Baslik,wa_sayfa_Id.SA_UstSayfa,wa_sayfa_Id.SA_Fotograf",
          sort: ["wa_sayfa_Id,ASC"]
        }
      })
        .then(async response => {
          let donen =
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
              ? response.data.formattedData[0]
              : donen;
          donen = await KurumsalSayfalar.fetch(donen);
          this.topPage = donen;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
.breadcrumb{
  background: none!important;
}
</style>
