<template>
<div class="container">
  <div class="row">
    <div class="col-lg-6 col-md-8">

            <div class="sign_form"  v-if="!signupSuccess">
						<h2>{{l('Welcome to Daleel','g')}}</h2>
						<p>{{l('Sign Up and Start Learning!','g')}}</p>
					 
							<div class="ui search focus" v-if="!signupSuccess">
								<div class="ui left icon input swdh11 swdh19">
									      <input class="prompt srch_explore" type="text" name="fullname" 
                             v-model="form2.U_rname"
                               id="id_fullname" required="" maxlength="64" 
                             :placeholder="l('First Name','g')"
                          >				
                         <input class="prompt srch_explore" type="text" name="lastname" 
                            v-model="form2.U_surname"
                            id="id_lastname" required="" maxlength="64" 
                            :placeholder="l('Last Name','g')"
                         >												
								</div>
							</div>
							<div class="ui search focus mt-15">
								 <div class="ui left icon input swdh11 swdh19">
									<input class="prompt srch_explore" type="email" v-model="form2.U_mail" name="emailaddress"   id="id_email" required="" maxlength="64" placeholder="Email Address">															
								 
					 
									<select class="prompt srch_explore"   v-model="form2.U_role"   >	 
                          <option v-for="u in userOpt" :value="u.key">{{u.label}}</option>
                  </select>										  				
								</div>
							</div>
							<div class="ui search focus mt-15">
								<div class="ui left icon input swdh11 swdh19">
									<input class="prompt srch_explore" type="password" name="password"  v-model="form2.U_Password" id="id_password" required="" maxlength="64" :placeholder="l('Password','g')">															
									<input class="prompt srch_explore" type="password" name="password2" v-model="form2.U_Password_re" id="id_password" required="" maxlength="64" :placeholder="l('Retype Password','g')">															
								</div>
							</div>
							<div class="ui form mt-30 checkbox_sign">
								<div class="inline field">
									<div class="ui checkbox " :class="{checked: form2.accept}" @click="form2.accept=!form2.accept">
										<input type="checkbox" tabindex="0"  v-model="form2.accept" />
										<label> {{HtmlEncode(l('Im in for emails with exciting discounts and personalized recommendations','g'))}}  </label>
									</div>
								</div>
							</div>
                <div class="col-12 ">
                  <p v-if="errors2.length" class="errors ">
                    <b>{{l('Please correct the following error(s):','g')}}</b>
                    <ul>
                      <li v-for="error in errors2">{{ error }}</li>
                    </ul>
                  </p>
              </div>
							<a class="login-btn" @click="submitSignUp()" type="submit">{{l('Next')}}</a>
				 
						<p class="sgntrm145">{{l('By signing up, you agree to our','g')}}   <a @click="goPath('page/terms_of_use')">{{l('Terms of Use','g')}}</a> {{l('and','g')}} <a @click="goPath('page/privacy_policy')">{{l('Privacy Policy','g')}}</a>.</p>
						<!-- <p class="mb-0 mt-30">Already have an account? <a @click="goPath('page/terms_of_use')">Log In</a></p> -->
					</div>
          <div v-else>
<div class="verification_content">
							<img src="/images/verified-account.svg" alt="">
							<h4>You are signed up :) </h4>
							<p>Please login and start learn.</p>
					 
						</div>

          </div>

    </div>
    <div class="col-lg-6 col-md-8">
      <div class="sign_form">
        <h2>{{l('Login','g')}}</h2>
        <p>{{l('Log In to Your Account!','g')}}</p>
        <!-- <button class="social_lnk_btn color_btn_fb">
          <i class="uil uil-facebook-f"></i>Continue with Facebook
        </button>
        <button class="social_lnk_btn mt-15 color_btn_tw">
          <i class="uil uil-twitter"></i>Continue with Twitter
        </button>
        <button class="social_lnk_btn mt-15 color_btn_go">
          <i class="uil uil-google"></i>Continue with Google
        </button> -->
        <form>
          <div class="ui search focus mt-15">
            <div class="ui left icon input swdh95">
              <input
                class="prompt srch_explore"
                type="email" placeholder="yourname@gmail.com"
                        @blur="checkForm()"
                            v-model="form.email"
                maxlength="64" 
              />
              <i class="uil uil-envelope icon icon2"></i>
            </div>
          </div>
          <div class="ui search focus mt-15">
            <div class="ui left icon input swdh95">
              <input
                class="prompt srch_explore"
                type="password"
                name="password"
                 :placeholder="l('Password','g')" 
                        @blur="checkForm()"
                        v-model="form.password"
                
                maxlength="64" 
              />
              <i class="uil uil-key-skeleton-alt icon icon2"></i>
            </div>
          </div>
          <div class="ui form mt-30 checkbox_sign">
            <div class="inline field">
              <div class="ui checkbox mncheck">
                <input type="checkbox" tabindex="0" class="hidden"       @blur="checkForm()"
                            v-model="form.keepmein"/>
                <label>{{l('Remember Me','g')}} </label>
              </div>
            </div>
          </div>
          <div class="col-12 ">
                 <p v-if="errors.length" class="errors ">
                <b>{{l('Please correct the following error(s):','g')}}</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </p>
          </div>
          <a class="login-btn"  @click="submit()">{{l('Sign In','g')}}</a>
        </form>
        <p class="sgntrm145">
          {{l('or','g')}} <a @click.prevent="goPath('form/forget_password')">{{l('Forgot Password','g')}}</a>.
        </p>
        <!-- <p class="mb-0 mt-30 hvsng145">
          Don't have an account? <a href="sign_up.html">Sign Up</a>
        </p> -->
      </div>
      
    </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import basicMixin from "~/mixins/basic.js";
import validate from "@/mixins/validate";

export default {
  mixins: [basicMixin, validate, general],
    layout: 'basic',
    computed:{
        signupSuccess(){
          return this.$store.state.user.signupSuccess
        }
    },
 data() {
    return {
      form: {
        email: "",
        password: "",
        keepmein:0, 
      }, 
      validation:[
        {name:'password',label: ()=> this.l('Name','g'),check:['required']}, 
        {name:'email',label: ()=> this.l('E-mail','g'),check:['required','email']},
      ],
      userOpt:[
        {label: 'Student', value:"RoleStudent"}, 
        {label: 'Teacher', value:"RoleTeacher"},  
      ],
      form2: { 
        U_rname: "",
        U_surname: "",
        U_mail: "",
        U_role: "",
        U_Password: "",
        U_Password_re: "",
        accept:false
      }, 
      validation2:[
        {name:'U_rname',label: ()=> this.l('Full Name','g'),check:['required']},
        {name:'U_surname',label: ()=>this.l('Surname','g'),check:['required']},
        {name:'accept',label: ()=>this.l('Terms and Conditions','g'),check:['required']},
        {name:'U_Password',label: ()=>this.l('Password','g'),check:['required']},
        {name:'U_Password_re',label: ()=>this.l('Password Retype','g'),check:['required']},
        {name:'U_mail',label: ()=> this.l('E-mail','g'),check:['required','email']},
      ],
      errors2:[]
    };
  },
  methods: {
     submitSignUp() {
       this.errors2 = [];
      if(this.checkForm(this.form2,this.validation2,this.errors2)){

        console.log("Success")
          this.$store.dispatch("user/formSignUp", {
            form: this.form2,
            pageData: this.pageInfo
          });
          this.form = {
              U_rname: "",
              U_surname: "",
              U_mail: "",
              U_role: "",
              U_Password: "",
              U_Password_re: "",
              accept:false 
          };
      }
    },
    submit() {
      this.errors=[]
      if(this.checkForm()){
          this.$store.dispatch("user/login", {
            form: this.form,
            pageData: this.pageInfo
          });
          this.form = {
            password: "",
            email: "", 
            keepmein: ""
          };
      }
    },
  },
}
</script>
<style>

select.srch_explore{
      padding-left: 2em!important;
    padding-right: 2em!important;
    height: 40px !important;
    font-size: 14px;
    font-weight: 400;
    font-family: 'Cairo', sans-serif;
}
.srch_explore{
  margin-left: 5px;
}
a.login-btn{
  color: #fff!important;
  width: 100%;
  display: block;
  padding: 10px;
}
</style>