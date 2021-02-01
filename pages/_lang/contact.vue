<template>
   <div :lang="LOCALE" class="w-100">
    <breadcrumb></breadcrumb>
     <div class="container py-3 my-3">
					<div class="row align-items-center">
						<div class="col-lg-5 col-xl-4 offset-xl-1 mb-5 mb-lg-0">
							<div class="overflow-hidden">
								<h2 class="text-color-dark  line-height-3 text-4-5 mb-3 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="250">
                  <strong>Merkez:</strong> {{l('siteInfo.Address','g')}}
                </h2>
							</div>
							<div class="overflow-hidden">
								<h2 class="text-color-dark   line-height-3 text-3-4 mb-3 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="250">
                  <strong>Depo:</strong> İkitelli O.S.B. Tümsan San. Sit. 1. Kısım 9. Blok No: 1 Başakşehir-İstanbul
                </h2>
							</div>
							<div class="overflow-hidden">
								<a 
                			  	target="blank"
                href="https://www.google.com/maps/place/%C4%B0stanbul+Metal/@41.0832742,28.8062494,15z/data=!4m2!3m1!1s0x0:0x973dbf42ed3e5c24?sa=X&ved=2ahUKEwjkjYP64uztAhWKzqQKHT83CqQQ_BIwE3oECBoQAw"

                data-hash data-hash-offset="100" class="d-inline-block custom-text-underline-1 font-weight-bold border-color-primary text-decoration-none text-3-4 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="500">{{l('GET DIRECTIONS','g')}}</a>
							</div>
							<ul class="list list-unstyled text-color-dark font-weight-bold text-3 py-2 my-4">
								<li class="d-flex align-items-center mb-3">
									<i class="icons icon-envelope text-color-dark mr-2"></i>
									{{l('Email','g')}}: <a :href="'mailto:'+l('siteInfo.Mail','g')" class="text-color-dark text-color-hover-primary text-decoration-none ml-1">{{l('siteInfo.Mail','g')}}</a>
								</li>
								<li class="d-flex align-items-center mb-3">
									<i class="icons icon-phone text-color-dark mr-2"></i>
										{{l('Phone','g')}}: <a :href="'tel:'+l('siteInfo.Telefon2','g')" 
                    class="text-color-dark text-color-hover-primary text-decoration-none ml-1">{{showPhone(l('siteInfo.Telefon2','g'))}} (+4 Hat)</a>
								</li>
								<li class="d-flex align-items-center mb-3">
									<i class="icons fas fa-fax text-color-dark mr-2"></i>
										{{l('Fax','g')}}: <a href="#" 
                    class="text-color-dark text-color-hover-primary text-decoration-none ml-1">{{l('siteInfo.Fax','g')}} </a>
								</li>
								<li class="d-flex align-items-center mb-3">
									<i class="icons fab fa-whatsapp text-color-dark mr-2"></i>
									  Whatsapp: <a target="blank" :href="'https://wa.me/'+l('siteInfo.whatsappNo', 'g')+'/?text=Merhaba, bilgi almak istiyorum.'"  class="text-color-dark text-color-hover-primary text-decoration-none ml-1">
                  	{{showPhone(l('siteInfo.whatsappNo','g'))}}</a>
								</li>
							</ul>
							<p class="mb-0 appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="1000">
                {{pageInfo.SA_Yazilar}}
              </p>
						</div>
						<div class="col-lg-6 col-xl-5 offset-lg-1 appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="1250">
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
						</div>
					</div>
					</div> 
				<div class="position-relative" >
             <div id="map" class="h-300  g-pa-0 g-ma-0 w-100"></div>
				</div>
  </div>
</template>

<script> 

import Breadcrumb from "~/components/common/breadcrumb.vue";
import general from "@/mixins/general";
import validate from "@/mixins/validate";

export default { 
  mixins: [general,validate],

  components: {  
    Breadcrumb
  },
   data() {
    return {
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
  layout(context) {
    return "default";
  },
    head: {
    
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCn25W5eErZ4L-IRYm9cCub7-iAE0Y9Bms' },
    ]
  },
  
    mounted(){
      let info = this.l('siteInfo.Map','g');
      console.log("inf",info)
      console.log("info",typeof info)
      // console.log("info",typeof info)
      info = info ? JSON.parse(info) : {}
    if (process.client) {
        $(document).ready(()=>{ 
            
          setTimeout(()=>{
              var myLatLng = {
                lat: info && info.latitude ?  info.latitude*1 : 41.099814284543505, 
                lng: info && info.latitude  ?  info.longitude*1  : 28.794122590926015
                    // lat: 40.99525545176121,
                    // lng: 29.024861678704156
              }; 
              var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: myLatLng
              });

              var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
              }); 
            }, 2000);
        }); 
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
  },
};
</script>
<style scoped>
.h-300 {
  height: 300px;
  width: 100%;
}
</style>