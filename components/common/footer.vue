<template>
  <footer id="footer1" class="border-0 mt-0">
   <p class="text-center text-3 mb-0">
              © {{ new Date().getFullYear() }}
              {{ l("All Rights Reserved", "g") }}.
            </p>
     <cookie-law theme="dark-lime" :buttonText="l('Onaylıyorum','g')">
           <div slot="message">
              {{l('Çerezlerin kullanılmasını kabul ediyor ve onaylıyorum.')}}  
              <a @click="goPath('page/cerez_politikasi')">{{l('Çerez Politikası detayları için tıklayınız.','g')}}</a>
            </div> 
     </cookie-law>
  </footer>
</template>
<script>
import general from "@/mixins/general";
import errorReport from "@/components/common/errorReport";
import validate from "@/mixins/validate";
 
export default {
  mixins: [general, validate],
  data() {
    return {
      form: {
        mbank_mail: ""
      },
      validation: [
        {
          name: "mbank_mail",
          label: () => this.l("E-mail", "g"),
          check: ["required", "email"]
        }
      ]
    };
  },
  components: {
    errorReport,
    CookieLaw: ()=> import('vue-cookie-law')
  },
  mounted() {
    //  if (process.client) {
    //    (adsbygoogle = window.adsbygoogle || []).push({});
    //  }
  },
  methods: {
    submit() {
      if (this.checkForm()) {
        this.form.mbank_lang = this.LOCALE;
        this.form.mbank_group = "TWFpbEdyb3VwczE1MDY1MjEwNzQq";
        this.$store.dispatch("form/postData", {
          form: this.form,
          model: "Mail_Bank",
          pageData: this.pageInfo
        });
        this.form = {
          message: "",
          mail: "",
          name: "",
          department: ""
        };
      }
    }
  }
};
</script>
<style>
.whatsapp-icon {
  position: fixed;
  bottom: 5px;
  right: 10px;
}
.whatsapp-icon a {
  font-size: 18px;
  color: #128c7e;
}
.whatsapp-icon i {
  font-size: 27px;
}

@media (max-width: 991px) {
  #header .header-logo img {
    margin-bottom: 10px;
  }

  .footerLogo {
  
    bottom: 80px;
    left: 50%;
    margin-left: -90px;
  }
}

@media (min-width: 991px) {
  #header .header-logo img {
	margin-bottom: 60px;
	  bottom: 0px;
  right: auto;
  left: auto;
  }
}

#footer1 {

  position: relative;
  color: #f9f9f9;
}
.footerLogo {
  position: absolute;
  padding: 20px 2px 20px 7px;
  background: #fff;
  cursor: pointer;
}
.footerLogo:hover {
  cursor: pointer;
  filter: rgb(12, 23, 168); /* IE5+ */
  background: #adadad;
  -webkit-filter: invert(100%);
  -webkit-transition: all 0.4s ease-in-out;
}
.footer-copyright {
  margin-top: 50px;
  display: block;
}

.list-footer  li a {
  font-size: 14px;
  line-height: 1.6;
  transition: 1s all;
}
.list-footer li:hover a,
.list-footer li a:hover {
  transition: 1s all;
  color: #aaa;
  padding-left: 5px;
}
</style>
