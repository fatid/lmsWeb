<template>
 
  <div class="row">
 <div class="overlayout" v-if="isPopup" @click="$emit('close',false)"></div>
 
    <div  :class="
		!isPopup  ? 'col-lg-6 col-offset-3 offset-lg-3 col-sm-12':'col-lg-12  col-sm-12 z-index-99'" 
	v-show="isSignUp=='signup'">

            <div class="sign_form z-index-99"  v-if="!signupSuccess">
						<h2 v-if="!isPopup">{{l('Welcome to Daleel','g')}}</h2>
						<p v-if="!isPopup">{{l('Sign Up and Start Learning!','g')}}</p>
					 
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
							<div class="ui search focus mt-15 mt-0mobile">
								 <div class="ui left icon input swdh11 swdh19">
									<input class="prompt srch_explore" type="email" v-model="form2.U_mail" name="emailaddress"   id="id_email" required="" maxlength="64" placeholder="Email Address">															
								</div>
							</div>
							<div class="ui   focus mt-15 mt-0mobile">
							<div class="inline flex field"> <div  class="mr-15" style="display: inline-flex;"> {{l('User Role','g')}} </div>
								 <div class="ui checkbox mr-15"  v-for="u in userOpt"
								   @click="form2.U_role = u.value!=form2.U_role ? u.value : '' "
								 >	 
					 
									<input type="checkbox"  
										:value="u.value"	
										:checked="u.value==form2.U_role"   /><label>	   {{u.label}} 	</label>				  				
								</div>
								</div>
							</div>
							<div class="ui search focus mt-15 mt-0mobile">
								<div class="ui left icon input swdh11 swdh19">
									<input class="prompt srch_explore" type="password" name="password"  v-model="form2.U_Password" id="id_password" required="" maxlength="64" :placeholder="l('Password','g')">															
									<input class="prompt srch_explore" type="password" name="password2" v-model="form2.U_Password_re" id="id_password" required="" maxlength="64" :placeholder="l('Retype Password','g')">															
								</div>
							</div>
							<div class="ui form mt-30 checkbox_sign">
								<div class="inline field">
									<div class="ui checkbox " :class="{checked: form2.accept}" @click="form2.accept=!form2.accept">
										<input type="checkbox" tabindex="0"  v-model="form2.accept" />
										<label> {{l('Im in for emails with exciting discounts and personalized recommendations','g')}}  </label>
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
							
				 <a href="#" @click="signOut()" v-if="googleAuth.profile && googleAuth.token">Cancel login with Google {{googleAuth.profile.lv}} </a><br /> 
						<p :class="!isPopup  ? 'sgntrm145':''">{{l('By signing up, you agree to our','g')}}   <a @click="terms_of_use=true">{{l('Terms of Use','g')}}</a> {{l('and','g')}} <a @click="privacy_policy=true">{{l('Privacy Policy','g')}}</a>.</p>
					  <p class=""
					  :class="!isPopup  ? 'mb-0 mt-30':'mb-0 mt-15'"
					  >Already have an account? <a @click="isSignUp='signin'">Log In</a></p>  
					  
					  <div class="width-100 login-with-container">
		<h3>{{l('Sign Up with','g')}}</h3>
		 <div class="login-with">
				
				<div class="login-with-google " ref="signinBtn2"    >
					<img src="/img/google.png"  />
				</div>
				<div class="login-with-facebook " @click="signUpFacebook()" >
					<img src="/img/facebook.png"  />
				</div>
				<div class="login-with-signup "   @click="isSignUp='signin'">
					{{l('Log In','g')}}
				</div>
		  </div>
		  </div>
		  
					</div>
          <div v-else class="sign_form z-index-99">
<div class="verification_content text-center">
							<img src="/images/verified-account.svg" style="height:80px;" alt="">
							<h4>{{l('You are signed up :)','g')}} </h4>
							<p>Please <a @click="isSignUp='signin';signupSuccess=false;">login</a> and start learn.</p>
					 
						</div>

          </div>
			
			<b-modal  :title="l('Terms of Use','g')"  v-model="terms_of_use"   > 
					<p>Terms of use</p>
			</b-modal>
			<b-modal  :title="l('Privacy Policy','g')"  v-model="privacy_policy"   > 
					<p>Privacy Policy</p>
			</b-modal>
    </div>
	
    <div 

:class=" !isPopup  ? 'col-lg-6 col-offset-3 offset-lg-3 col-sm-12':'col-lg-12  col-sm-12 z-index-99'" 
	v-show="isSignUp=='signin'">
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
          <div class="ui search focus mt-15 mt-0mobile">
            <div class="ui left icon input swdh95">
              <input
                class="prompt srch_explore"
                type="email" placeholder="yourname@gmail.com"
                        @blur="checkBefore()"
                            v-model="form.email"
                maxlength="64" 
              />
              <i class="uil uil-envelope icon icon2"></i>
            </div>

          </div>
          <div class="ui search focus mt-15 mt-0mobile">
            <div class="ui left icon input swdh95">
              <input
                class="prompt srch_explore"
                type="password"
                name="password"
                 :placeholder="l('Password','g')" 
                         @blur="checkBefore()"
                        v-model="form.password"
                
                maxlength="64" 
              />
              <i class="uil uil-key-skeleton-alt icon icon2"></i>
            </div>
          </div>
		 
          <div class="ui form mt-30 checkbox_sign">
            <div class="inline field">
              <div class="ui checkbox" 
                    :class="{checked: form.keepmein}" @click="form.keepmein=!form.keepmein">
										<input type="checkbox" tabindex="0"  v-model="form.keepmein" />
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
		<div class="width-100 login-with-container">
		
		<!-- <div class="g-signin2" data-onsuccess="onSignIn">S3gnIn</div> -->
		
		<h3>{{l('Login with','g')}}</h3>
		 <div class="login-with">
				
				 
				<!-- <div class="my-signin2  "  id="my-signin2"    >  </div> -->
				<div class="login-with-google " ref="signinBtn"    >
					<img src="/img/google.png"  />
				</div><div class="login-with-facebook " @click="signInFacebook()" >
					<img src="/img/facebook.png"  />
				</div>
				
		  </div>
		  
				<div class="login-with-signup "   @click="isSignUp='signup'">
					SIGN UP
				</div>
		  </div>
        <p class="sgntrm145">
        <a    @click="isSignUp='signup'">{{l('Sign Up','g')}}</a>   {{l('or','g')}} <a @click.prevent="goPath('form/forget_password')">{{l('Forgot Password','g')}}</a>.
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
 
 /*function init() {
  gapi.load('auth2', function() {
    
	gapi.auth2.init({
		  client_id: '889947283690-puv0dhqq6taumpd5k455lt8lh4hkg625.apps.googleusercontent.com',
		  scope: 'email profile openid',
		  response_type: 'id_token permission'
		}).then(function (authInstance) {
        // now auth2 is fully initialized
		
		console.log("authInstance",authInstance);
		});
	 
  });
}*/

export default {
    mixins: [basicMixin, validate, general],
   
	props:{
	  isPopup:Boolean
	},
    layout: 'basic',
    computed:{
        signupSuccess:{ 
		get(){
			return this.$store.state.user.signupSuccess
		  },
		  set(val){
				this.$store.state.user.signupSuccess = val
		  }
        },
        logoutQ(){
          return this.$route.query.logout
        }
    },
    watch:{
      logoutQ(val){
        this.$store.dispatch("user/logout",{});
		this.signOut();
      },
	  isSignUp(val){
				 
				this.attachClicker(val)
				 
		}
    },
    created(){
      if(this.logoutQ){
         this.$store.dispatch("user/logout",{});
      } 
    },
 data() {
    return {
      form: {
        email: "",
        password: "",
        keepmein:0, 
      },
	  errorMessage:{},
	  photo_url:'',
	  terms_of_use:false,
	  privacy_policy:false,
	  isSignUp: 'signin',
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
        accept:false,
		google_token:null,
		U_GoogleId:null,
		U_Photo: '',
		status:1,
      }, 
	  googleAuth:{
		token:null,
		profile:null
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
  
  mounted(){
   let clientId = "889947283690-puv0dhqq6taumpd5k455lt8lh4hkg625.apps.googleusercontent.com";
		if (!window.gapi) {
      throw new Error(
        '"https://apis.google.com/js/api:client.js" needs to be included as a <script>.'
      );
    }

    if (!clientId) {
      throw new Error("Client Id must be specified.");
    }

    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({ client_id: clientId });
		this.attachClicker();
    });
  },
  methods: {
  attachClicker(){
  var auth2 = gapi.auth2.getAuthInstance();
				auth2.attachClickHandler(
						this.$refs.signinBtn2,
						{},
						googleUser => {
						  this.onSuccess(googleUser);
						},
						error => {
						  
						  this.onFailure(error);
						}
				);
				auth2.attachClickHandler(
						this.$refs.signinBtn,
						{},
						googleUser => {
						  this.onSuccess(googleUser);
						},
						error => {
						  
						  this.onFailure(error);
						}
				);
  
  },
	clearForm(){
		 this.form2 = { 
				U_rname: "",
				U_surname: "",
				U_mail: "",
				U_role: "",
				U_Password: "",
				U_Password_re: "",
				U_GoogleId:null,
				accept:false,
				google_token:null,
				U_Photo: '',
				status:1,
		};
		 this.googleAuth={
		token:null,
		profile:null
	 };
	},
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(()=> {
      console.log('User signed out.');
	this.clearForm();
	 
    });
	this.isSignUp='signin';
  },
   
	checkBefore(){
	
			this.errors=[];
			this.checkForm()
  
	},
	basicProfile(){
	
				  var auth2 = gapi.auth2.getAuthInstance();
			  var profile = auth2.currentUser.get().getBasicProfile();
			  let photo=this.getBase64Image(profile.getImageUrl());
			  console.log('ID: ' + profile.getId());
			  console.log('Full Name: ' + profile.getName());
			  console.log('Given Name: ' + profile.getGivenName());
			  console.log('Family Name: ' + profile.getFamilyName());
			  console.log('Image URL: ' + profile.getImageUrl());
			  console.log('Email: ' + profile.getEmail());
			  console.log('photo: ' + photo);
			 
	},
	signInGoogle() {
	
		var auth2 = gapi.auth2.getAuthInstance();
		var profile = auth2.currentUser.get().getBasicProfile();
		console.log('ID: ' + profile.getId());
		/*    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
		});*/ 
		 //gapi.load('auth2', function() { });
		 /*
GoogleAuth.signIn({
		  client_id: '889947283690-puv0dhqq6taumpd5k455lt8lh4hkg625.apps.googleusercontent.com',
		  scope: 'email profile openid',
		  response_type: 'id_token permission'
		});*/
		 /*
		  gapi.load('auth2', function() {
    
		gapi.auth2.init({
		  client_id: '889947283690-puv0dhqq6taumpd5k455lt8lh4hkg625.apps.googleusercontent.com',
		  scope: 'email profile openid',
		  response_type: 'id_token permission'
		}).then(function (authInstance) {
        // now auth2 is fully initialized
		
		console.log("authInstance",authInstance);
					let profile = authInstance.getBasicProfile();
				 
				
		});
	 
	});*/

	 /*	 gapi.signIn({
		  client_id: '889947283690-puv0dhqq6taumpd5k455lt8lh4hkg625.apps.googleusercontent.com',
		  scope: 'email profile openid',
		  response_type: 'id_token permission'
		}, function(response) {
		  if (response.error) {
			// An error happened!
			return;
		  }
		  // The user authorized the application for the scopes requested.
		  var accessToken = response.access_token;
		  var idToken = response.id_token;
		  // You can also now use gapi.client to perform authenticated requests.
		}); */
	},
	 async getBase64Image(url) {
		 
			  const img = new Image();
			  img.setAttribute('crossOrigin', 'anonymous');
			  img.onload = async  () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				const dataURL = canvas.toDataURL("image/png");
				this.photo_url = dataURL
				this.form2.U_Photo = dataURL
			  }
			  img.src = url
			 
 
    },
	
	async onSuccess(googleUser) {
	
			console.log("onSuccess",googleUser);
			if(googleUser){		
				let profile = googleUser.getBasicProfile();
				 let photo=this.getBase64Image(profile.getImageUrl());
			 
				var id_token = googleUser.getAuthResponse().id_token;
				this.googleAuth = {
					token:id_token,
					profile
				}
				const email  = profile.getEmail();
				
				await axios({
                url: process.env.baseURL+"uye",
                method: "get",
                params: {
                  limit: 1,
                  lang: 'NONE',
                  filter: { U_mail: ["=",email]},
                  fields: "U_mail,U_rname,U_surname", 
                } 
              }).then(async response => {  
                     if( response.data && response.data.formattedData[0]){
						
						let a = response.data.formattedData[0]; 
								 if(a && a.U_mail){ 
									 this.errorMessage.text=this.l('You are already member','g');
									 console.log("You are already member","You are already member");
									 this.loginWithGoogle(a,profile,id_token)
								 } 
						}else{  
						 
							    let photo= await this.getBase64Image(profile.getImageUrl());
							     console.log('photo: ' + photo);
							  console.log('profile: ' + profile.getImageUrl());
						 
							   this.form2 = {
								  U_rname: profile.getName(),
								  U_surname: profile.getFamilyName(),
								  U_mail: profile.getEmail(),
								  U_role: "RoleStudent",
								  U_Password: "",
								  U_Password_re: "",
								  accept:false,
								  U_GoogleId:profile.getId(),
								  google_token:id_token,
								  U_Photo: this.photo_url,
								  status:1,
								  token:id_token
							  };
							  console.log('form2: ' + this.form2);
							  this.isSignUp='signup'
					 
					 }
				 
					 
			    }); 
				if(profile.getId()){  }
		}
    },
      onFailure(error) {
      console.log(error);
    },
	loginWithGoogle(a,profile,token){
	
		
		console.log("loginWithGoogle",a);
	 
			this.$store.dispatch("user/login", {
				form: {
					email: profile.getEmail(),
					U_GoogleId: profile.getId(),
					google_token:token
				},
				pageData: this.pageInfo
			  });
			  this.form = {
				password: "",
				email: "", 
				keepmein: ""
			  };
		  
	},
     submitSignUp() {
       this.errors2 = [];
      if(this.checkForm(this.form2,this.validation2,this.errors2)){
 
          this.$store.dispatch("user/formSignUp", {
            form: this.form2,
            pageData: this.pageInfo
          });
          this.form = {
              U_rname: "",
              U_surname: "",
              U_mail: "",
              U_role: "RoleStudent",
              U_Password: "",
              U_Password_re: "",
			  U_Photo:'',
			  google_token:null,
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

<style lang="scss">


@media only screen and (max-width: 700px) {
.sign_form{
    padding: 20xp 10px!important;
}
.login-with-container .login-with {
    width: 100%;
    display: block;
    padding: 10px 0px;
    justify-content: space-between;
}
}

.sign_form{
    margin-top: 30px;
}
.sign_form p{
	margin-bottom: 10px!important;
}
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
@media (max-width: 991px) {
.swdh19{
  display: inline-block!important;
  width: 100%!important;
}
.swdh19 .srch_explore{
  width: 100%!important;
  margin-bottom: 5px!important;
}
.mt-0mobile{
  margin-top: 0px!important;
}
}

.login-with-container{
width: 100%;
padding: 10px;
	h3{
		font-size: 14px;
		margin: 30px 0px 0px 0px !important;
	 
		font-family: Cairo;
	}
.login-with{
	
	width: 100%;
	display: flex;
	padding: 10px 0px;
	justify-content: space-between;
	.login-with-google{
			padding: 15px 5px;
			border: 1px solid #efefef;
			border-radius:5px;
			img{  height: 20px; }
			width: 140px;
			cursor: pointer;
			&:hover{
				border: 1px solid #aaa;
				background: #f9f9f9;
			}
	}
	.login-with-facebook{
			padding: 15px 5px;
			text-align:center;
			border: 1px solid #efefef;
			border-radius:5px;
			cursor: pointer;
			img{ height: 15px;}
			width: 140px;
			&:hover{
				border: 1px solid #aaa;
				background: #f9f9f9;
			}
	}
	.login-with-signup{
			padding: 15px 5px;
			text-align:center;
			border: 1px solid #efefef;
			border-radius:5px;
			cursor: pointer;
			img{ height: 15px;}
			width: 90px;
			&:hover{
				border: 1px solid #aaa;
				background: #f9f9f9;
			}
	}

}
}
.mr-15{
margin-right: 15px;
}
.z-index-99{
z-index:99;
}
</style>