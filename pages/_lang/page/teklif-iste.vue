<template>
  <div :lang="LOCALE" class="w-100">
    <breadcrumb></breadcrumb>
    <div class="container">
      <div
        class="row"
      >  
          <div
            class="col-lg-10 order-lg-2 mb-5 mb-lg-0 appear-animation"
            data-appear-animation="fadeInUpShorter"
            data-appear-animation-delay="500"
          > 

          <form class="contact-form custom-form-style-2">
         
                                <div class="contact-form-success alert alert-success   mt-4"  v-if="resultForm.status==true && resultForm.show==true">
                                    <strong>{{l('Success','g')}}</strong> {{l('Your message has been sent to us','g')}} 
                                </div>

                                <div class="contact-form-error alert alert-danger   mt-4" v-if="resultForm.status==false && resultForm.show==true">
                                    <strong>{{l('Error','g')}}</strong>  
                                    {{l('There was an error sending your message.','g')}} 
                                    <span class="mail-error-message text-1 d-block"></span>
                                </div>
                                <div class="form-group col-12 ">
                                                  <p v-if="errors.length" class="errors">
                                                  <b>{{l('Please correct the following error(s):','g')}}</b>
                                                  <ul>
                                                    <li v-for="error in errors">{{ error }}</li>
                                                  </ul>
                                                </p>
                                  </div>
                                <div class="form-row row-gutter-sm">
                                    <div class="form-group col mb-3">
                                        <input type="text"   v-model="form.name" class="form-control" data-validation="required" :placeholder="l('Your Name','g')"  @blur="checkForm()" />
                                    </div>
                                </div>
                                <div class="form-row row-gutter-sm">
                                    <div class="form-group col mb-3">
                                        <input type="email"   v-model="form.mail" class="form-control"  data-validation="email"  @blur="checkForm()" required :placeholder="l('Your Email','g')" />
                                    </div>
                                </div>
                                <div class="form-row row-gutter-sm">
                                    <div class="form-group col mb-3">
                                        <input type="tel" v-model="form.phone" class="form-control" :placeholder="l('Phone','g')">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col mb-3">
                                        <textarea maxlength="5000" v-model="form.message" class="form-control"  @blur="checkForm()" :placeholder="l('Message','g')"></textarea>
                                    </div>
                                </div>
                                <div class="form-row appear-animation" data-appear-animation="fadeInUpShorterPlus" data-appear-animation-delay="1500">
                                    <div class="form-group col mb-0">
                                        <button type="submit" @click.prevent="submit()" class="btn btn-primary btn-modern font-weight-bold custom-btn-border-radius custom-btn-arrow-effect-1 text-3 px-5 py-3" data-loading-text="Loading...">
                                        	{{l('Submit','g')}}
                                        	<svg class="ml-2" version="1.1" viewBox="0 0 15.698 8.706" width="17" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
												<polygon stroke="#FFF" stroke-width="0.1" fill="#FFF" points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 "/>
											</svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
            <div
              class="textArea"
              v-html="decodeHtml(pageInfo.SA_Yazilar)"
            ></div> 
            
          </div>
          <div
            class="col-lg-2 order-lg-1 appear-animation"
            data-appear-animation="fadeInUpShorter"
            data-appear-animation-delay="250"
          >
                 <div class="card   mb-5">
                    <div v-if="l('siteInfo.whatsappIzni', 'g')=='on'" class="card-body pa-3 z-index-1 text-center">
                    <a target="blank" :href="'https://wa.me/'+l('siteInfo.whatsappNo', 'g')+'/?text=Merhaba, bilgi almak istiyorum.'">
                        <h2 class="text-color-dark font-weight-bold text-4 mb-4">
                            Whatsapp'tan Teklif İste  
                        </h2>
                        <i style="color:#128C7E;" class="fab fa-whatsapp text-10 fa-3x"></i>
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
import validate from "@/mixins/validate";

export default { 
  mixins: [general,validate],
 

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
      form: {
        message: "",
        mail: "",
        name: "",
        phone: "",
        department: ""
      }, 
      formSend:'',
      validation:[
        {name:'name',label: ()=> this.l('Name','g'),check:['required']},
        {name:'message',label: ()=>this.l('Message','g'),check:['required']},
        {name:'mail',label: ()=> this.l('Email','g'),check:['required','email']},
        {name:'phone',label: ()=> this.l('Phone','g'),check:['required']},
      ]
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
      submit() {
      if(this.checkForm()){
          this.$store.dispatch("form/formSubmit", {
            form: this.form,
            pageData: this.pageInfo
          });
          this.formSend = 'success'
          this.form = {
            message: "",
            mail: "",
            name: "",
            department: ""
          };
      }
    },
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
</style>
