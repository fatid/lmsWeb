<template>
  <div class="row">
    <div class="col-lg-6 col-md-8">

            <div class="sign_form">
						<h2>{{l('Welcome to Daleel','g')}}</h2>
						<p>{{l('Sign Up and Start Learning!','g')}}</p>
						<form>
							<div class="ui search focus">
								<div class="ui left icon input swdh11 swdh19">
									<input class="prompt srch_explore" type="text" name="fullname" 
                                    value="" id="id_fullname" required="" maxlength="64" 
                                    :placeholder="l('Full Name','g')"
                                    >															
								</div>
							</div>
							<div class="ui search focus mt-15">
								<div class="ui left icon input swdh11 swdh19">
									<input class="prompt srch_explore" type="email" name="emailaddress" value="" id="id_email" required="" maxlength="64" placeholder="Email Address">															
								</div>
							</div>
							<div class="ui search focus mt-15">
								<div class="ui left icon input swdh11 swdh19">
									<input class="prompt srch_explore" type="password" name="password" value="" id="id_password" required="" maxlength="64" placeholder="Password">															
								</div>
							</div>
							<div class="ui form mt-30 checkbox_sign">
								<div class="inline field">
									<div class="ui checkbox mncheck">
										<input type="checkbox" tabindex="0" class="hidden">
										<label> {{l('Im in for emails with exciting discounts and personalized recommendations','g')}}  </label>
									</div>
								</div>
							</div>
							<button class="login-btn" type="submit">{{l('Next')}}</button>
						</form>
						<p class="sgntrm145">{{l('By signing up, you agree to our','g')}}   <a @click="goPath('page/terms_of_use')">{{l('Terms of Use','g')}}</a> {{l('and','g')}} <a @click="goPath('page/privacy_policy')">{{l('Privacy Policy','g')}}</a>.</p>
						<!-- <p class="mb-0 mt-30">Already have an account? <a @click="goPath('page/terms_of_use')">Log In</a></p> -->
					</div>

    </div>
    <div class="col-lg-6 col-md-8">
      <div class="sign_form">
        <h2>{{l('Login','g')}}</h2>
        <p>{{l('Log In to Your Account!','g')}}</p>
        <button class="social_lnk_btn color_btn_fb">
          <i class="uil uil-facebook-f"></i>Continue with Facebook
        </button>
        <button class="social_lnk_btn mt-15 color_btn_tw">
          <i class="uil uil-twitter"></i>Continue with Twitter
        </button>
        <button class="social_lnk_btn mt-15 color_btn_go">
          <i class="uil uil-google"></i>Continue with Google
        </button>
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
          <button class="login-btn" type="submit" @click="submit()">{{l('Sign In','g')}}</button>
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
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import basicMixin from "~/mixins/basic.js";
import validate from "@/mixins/validate";

export default {
  mixins: [basicMixin, validate, general],
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
      ]
    };
  },
  methods: {
    submit() {
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