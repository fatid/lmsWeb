<template>

<footer class="footer mt-30">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f1">
							<a href="javascript:;" @click="goPath('page/about-us')">About</a>
							<a href="javascript:;" @click="goPath('page/help')">F.A.Q</a>
						 
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f1">
							<a href="javascript:;" @click="goPath('filter')">Filter</a> 
							<a href="javascript:;" @click="goPath('courses/all_courses')">Courses</a>
							<a href="javascript:;" @click="goPath('words/all_words')">Words</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f1">
							<a href="javascript:;" >Copyright Policy</a>
							<a href="javascript:;" >Terms</a>
							<a href="javascript:;" >Privacy Policy</a>
							<a href="javascript:;" >Sitemap</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f3">
							<a href="#" class="btn1542">Courses</a>
							<div class="lng_btn">
								 
							</div>
						</div>
					</div>
					<div class="col-lg-12">
						<div class="footer_bottm">
							<div class="row">
								<div class="col-md-6">
									<ul class="fotb_left">
										<li>
											<a @click="goPath('home')">
												<div class="footer_logo">
												 <img :src="'http://lms.fatihd.com/yonetim/images/resimler/normal/logo.png'" alt="logo"   />
												</div>
											</a>
										</li>
										<li>
											<p>© {{ new Date().getFullYear() }}  {{ l("All Rights Reserved", "g") }}. </p>
										</li>
									</ul>
								</div>
								<div class="col-md-6">
									<div class="edu_social_links">

                      <a :href="item.path" :title="item.name"   target="_blank" v-for="(item,i) in l('socialIcons','g')" :key="i">
                  
                            <i :style="{color:item.color}" class="fab" :class="item.icon"></i>
                       </a> 

										<!-- <a href="#"><i class="fab fa-facebook-f"></i></a>
										<a href="#"><i class="fab fa-twitter"></i></a>
										<a href="#"><i class="fab fa-google-plus-g"></i></a>
										<a href="#"><i class="fab fa-linkedin-in"></i></a>
										<a href="#"><i class="fab fa-instagram"></i></a>
										<a href="#"><i class="fab fa-youtube"></i></a>
										<a href="#"><i class="fab fa-pinterest-p"></i></a> -->
									</div>
								</div>		
							</div>
						</div>
					</div>
				</div>
			</div>
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
.item_f1 {
    padding-top: 50px;
}
.item_f1 a {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    display: block;
    padding-bottom: 10px;
    color: #fff;
}
.item_f1 a:hover { 
    color: rgb(235, 225, 147)!important;
}
.footer_bottm {
    margin-top: 50px;
    padding: 20px 0;
    border-top: 1px solid #454545;
}
.edu_social_links {
    text-align: right;
}
.edu_social_links a {
    padding-top: 10px;
    padding-left: 15px;
    font-size: 16px;
    display: inline-block;
    color: #f7f7f7;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
.footer_logo{
  display: inline-flex;
}
 .footer_logo img{height: 45px; width: auto!important;}

 .item_f3 {
    padding-top: 50px;
}

.btn1542 {
    height: 40px;
    padding: 10px 15px;
    border: 0;
    border-radius: 20px;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    background: #ed2a26;
    font-size: 14px;
    font-weight: 500;
    display: inline-block;
}
.lng_btn {
    margin-top: 20px;
}
/* 
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
  filter: rgb(12, 23, 168);  
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
} */
</style>
