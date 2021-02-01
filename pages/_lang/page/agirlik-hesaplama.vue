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
          <div class="textArea" v-html="decodeHtml(pageInfo.SA_Yazilar)"></div>

         
          <!-- Sources & Tags -->
          <form class="contact-form custom-form-style-2" action="#">
            <!-- <pages :pageId="pageInfo.wa_sayfa_Id"></pages> -->
            <div class="form-row pb-2 mb-4">
              <div class="form-group col-md-3 mb-0">
                <span class="mgd"><b>Malzeme</b></span>
                 <select   v-model="metal"  class="form-control" 
                  ><option v-for="item in products" :key="item.label"
                :value="item.value" :title="item.label" 
              >{{item.label}}</option
            > </select> </div>
              <div class="form-group col-6 col-md-3 mb-0">
                <span class="mgd"><b>Türü</b></span>
                 <select   v-model="selected_type"  class="form-control"   
                 @change="hesapla();ozgul=selected_type.value;type=selected_type.label;"
            ><option v-for="item in product[metal].arr" :key="item.label"
                :value="item" :title="item.label" 
              >{{item.label}}</option
            > </select> </div>
            <div class="form-group col-6  col-md-3 mb-0"> <span class="mgd"><b>Özgül Ağırlık:</b></span>  
                  <input
                  class="form-control focusAll"
                  v-model="ozgul"
                  type="number"
                  @change="hesapla()"
                />
                  
              </div>
              </div>
            </form>
            <form class="contact-form custom-form-style-2" action="#">
            <!-- <pages :pageId="pageInfo.wa_sayfa_Id"></pages> -->
            <div class="form-row">
              <div class="col">
                <h2 class="text-color-dark font-weight-bold text-3-4 mb-3">
                  Levha Malzeme Ağırlık Hesaplama
                </h2>
              </div>
            </div>
            <div class="form-row pb-2 mb-4">
               <div class="form-group d-none d-md-block d-lg-block col-6 col-md-2 mb-0 ">
                <img src="/img/levha.png" style="width: 100%;" /> 
              </div>
             
              <div class="form-group col-6 col-md-2 mb-0">
                <span class="mgd"><b>Kalınlık (mm) (t)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="levha.kalinlik"
                  type="number"
                  @change="levha_hesapla()"
                />
              </div>

              <div class="form-group col-6 col-md-2 mb-0">
                <span class="mgd"><b>Boy (mm) (L)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="levha.boy"
                  @change="levha_hesapla()"
                  type="number"
                />
              </div>
              <div class="form-group col-6 col-md-2 mb-0">
                <span class="mgd"><b>En (mm) (W) </b></span>
                <input
                  class="form-control focusAll"
                  v-model="levha.en"
                  @change="levha_hesapla()"
                  type="number"
                />
              </div>
              <div class="form-group col-6 col-md-2 mb-0">
                <span class="mgd"><b>Adet </b></span>
                <input
                  class="form-control focusAll"
                  v-model="levha.adet"
                  @change="levha_hesapla()"
                  type="number"
                />
              </div>
               <div class="form-group d-lg-none d-xl-none col-6 col-md-2 mb-0 ">
                <img src="/img/levha.png" style="width: 100%;" /> 
              </div>
              <div class="form-group 	col-6 col-md-2 mb-0 pt-0 text-2">
                <template v-show="levha.birim && levha.birim>0">
                    <span class="mgd inside-title"><b>Takribi Ağırlık </b></span>
                    Birim:{{ levha.birim }} kg <br />
                    Toplam: {{ levha.total }} kg
                </template>
              </div>
            </div>
          </form>
           <form class="contact-form custom-form-style-2" action="#">
            <div class="form-row">
              <div class="col">
                <h2 class="text-color-dark font-weight-bold text-3-4  mb-3">
                  Boru Şekilli Malzeme Ağırlık Hesaplama
                </h2>
              </div>
            </div>
            <div class="form-row pb-2 mb-4">
               <div class="form-group d-none d-md-block d-lg-block col-6 col-md-2 mb-0">
                <img src="/img/boru.png" style="width: 100%;" /> 
              </div>
           
              <div class="form-group col-6 col-md-2 mb-0">
                <span class="mgd"><b>Dış Çap (mm)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="boru.dis"
                  type="number"
                  @change="boru_hesapla()"
                />
              </div>
              <div class="form-group col-6 col-md-2 mb-0">
                <span class="mgd"><b>İç Çap (mm)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="boru.ic"
                  type="number"
                  @change="boru_hesapla()"
                />
              </div>
              <div class="form-group col-6  col-md-2 mb-0">
                <span class="mgd"><b>Boyu (mm)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="boru.boy"
                  type="number"
                  @change="boru_hesapla()"
                />
              </div>
              <div class="form-group col-6  col-md-2 mb-0">
                <span class="mgd"><b>Adet (mm)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="boru.adet"
                  type="number"
                  @change="boru_hesapla()"
                />
              </div>
                 <div class="form-group d-lg-none d-xl-none col-6 col-md-2 mb-0 ">
                <img src="/img/boru.png" style="width: 100%;" /> 
              </div>
              <div class="form-group col-6  col-md-2 mb-0 pt-0 text-2">
                <span class="mgd inside-title"><b>Takribi Ağırlık </b></span>
                Birim: {{ boru.birim }} kg <br />
                Toplam: {{ boru.total }} kg
              </div>
            </div>
          </form>
          <form class="contact-form custom-form-style-2" action="#">
            <!-- <pages :pageId="pageInfo.wa_sayfa_Id"></pages> -->
            <div class="form-row">
              <div class="col">
                <h2 class="text-color-dark font-weight-bold text-3-4  mb-3">
                  Yuvarlak Şekilli Malzeme Ağırlık Hesaplama
                </h2>
              </div>
            </div>
            <div class="form-row pb-2 mb-4">
               <div class="form-group d-none d-md-block d-lg-block col-6 col-md-2 mb-0">
                <img src="/img/yuvarlak.png" style="width: 100%;" /> 
              </div>
              <div class="form-group col-4  col-md-2 mb-0">
                <span class="mgd"><b>Çap (mm)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="yuvarlak.dis"
                  type="number"
                  @change="yuvarlak_hesapla()"
                />
              </div>

              <div class="form-group col-4 col-md-2 mb-0">
                <span class="mgd"><b>Boyu (mm)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="yuvarlak.boy"
                  @change="yuvarlak_hesapla()"
                  type="number"
                />
              </div>
              <div class="form-group col-4 col-md-2 mb-0">
                <span class="mgd"><b>Adet (mm)</b></span>
                <input
                  class="form-control focusAll"
                  v-model="yuvarlak.adet"
                  @change="yuvarlak_hesapla()"
                  type="number"
                />
              </div>
                   <div class="form-group d-lg-none d-xl-none col-6 col-md-2 mb-0 ">
                <img src="/img/yuvarlak.png" style="width: 100%;" /> 
              </div>
               <div class="form-group col-6  col-md-2 mb-0 pt-0 text-2">
               <template v-show="yuvarlak.birim && yuvarlak.birim>0">
                    <span class="mgd inside-title"><b>Takribi Ağırlık </b></span>
                    Birim: {{ yuvarlak.birim }} kg <br />
                    Toplam: {{ yuvarlak.total }} kg
                </template>
               </div>
            </div>
          </form>
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
  mounted(){
    if (process.client) {
        $(document).ready(()=>{ 
            $(document).ready(function() {
                $("input.focusAll").focus(function() { $(this).select(); } 
            );
            })
        })
    } 
  },
  data() {
    return {
      relatedPages: [],
      topPage: {},
      value: 0,
      metal: "celik",
      type: "201",
      ozgul: 7.8,
      selected_type: {label: '201', value: 7.8},
      boru: {
        dis: 0,
        ic: 0,
        boy: 0,
        adet: 0,
        birim: 0,
        total: 0
      },
      yuvarlak: {
        dis: 0,
        boy: 0,
        adet: 0,
        birim: 0,
        total: 0
      },
      levha: {
        kalinlik: 0,
        en: 0,
        boy: 0,
        adet: 0,
        birim: 0,
        total: 0
      },
      products:[
          {label: 'Paslanmaz Çelik', value: 'celik'}, 
      ],
    product:{
      'celik':{
        label: "Paslanmaz Çelik",
        arr:[
          {label: '201', value: 7.8}, 
          {label: '202', value: 7.8}, 
          {label: '301', value: 7.9}, 
          {label: '302', value: 8.1}, 
          {label: '303', value: 7.9}, 
          {label: '304', value: 7.9}, 
          {label: '304L', value: 7.9}, 
          {label: '309S', value: 7.9}, 
          {label: '310S', value: 7.9}, 
          {label: '316', value: 8.0}, 
          {label: '316L', value: 8.0}, 
          {label: '316TI', value: 8.0}, 
          {label: '317L', value: 8.0}, 
          {label: '321', value: 7.9}, 
          {label: '321H', value: 7.9}, 
          {label: '330', value: 8.1}, 
          {label: '347', value: 7.9}, 
          {label: '410S', value: 7.7}, 
          {label: '420', value: 7.8}, 
          {label: '430', value: 7.7}, 
          {label: '430F', value: 7.7}, 
          {label: '431', value: 7.8}, 
          {label: '904L', value: 8.0}, 
        ]
      }
    }
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
  methods: {
    hesapla(){
      this.boru_hesapla();
      this.yuvarlak_hesapla();
      this.levha_hesapla();
    },
    boru_hesapla() {
      let dis = this.boru.dis;
      let ic = this.boru.ic;
      let boy = this.boru.boy;
      let adet = this.boru.adet;
      let metal = this.metal;

      this.boru.birim = 1;
      this.boru.total = this.boru.birim * adet;
    },
    yuvarlak_hesapla() {

       let dis = this.yuvarlak.dis;
      let boy = this.yuvarlak.boy;
      let adet = this.yuvarlak.adet; 
      let ozgul = this.ozgul; 
      let birim = Math.round(  Math.sqrt(dis/2) * boy * ozgul / 1000000  * 10000 ) / 10000
      this.yuvarlak.birim = birim ;
      this.yuvarlak.total = Math.round( birim * adet * 10000 ) / 10000;
    },

    levha_hesapla() {

      let kalinlik = this.levha.kalinlik;
      let en = this.levha.en;
      let boy = this.levha.boy;
      let adet = this.levha.adet; 
      let ozgul = this.ozgul; 
      let birim = kalinlik * en * boy * ozgul / 1000000
      this.levha.birim = birim;
      this.levha.total = birim * adet;

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
.textArea:lang(ar) {
  min-height: 250px;
  text-align: right;
  direction: rtl;
}
.mgd {
  margin-left: 5px;
  font-weight: 600;
  padding: 10px 0px;
  font-size: 13px;
  font-weight: 400;
  line-height: 2;
  display: block;
}
 .inside-title.mgd {  margin-left: 0px!important; } 
@media (max-width: 991px) {
 .mgd { padding: 0px;  }
 .inside-title{
   margin-top: 15px;
 }
 .inside-title.mgd { padding: 0px;  } 
}

</style>
