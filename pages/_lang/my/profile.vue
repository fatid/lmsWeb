<template>
  <div class="sa4d25">
    <div class="container mt-10">

      <div class="div-container">
      <div class="row">
        <div class="col-lg-12">
          <h2 class="st_title">
            <i class="uil uil-cog"></i> {{ l("My Profile", "general") }}
          </h2>
          <div class="setting_tabs">
            <ul class="nav nav-pills mb-4" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link "
                  @click="show = 'main'"
                  :class="show == 'main' ? 'active' : ''"
                  >{{ l("Account", "general") }}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  @click="show = 'notification'"
                  :class="show == 'notification' ? 'active' : ''"
                  >{{ l("Notification", "general") }}
                </a>
              </li>
            
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-password-tab"
                  @click="show = 'password'"
                  :class="show == 'password' ? 'active' : ''"
                  >{{ l("Change Password", "general") }}
                </a>
              </li>
              
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-bllingpayment-tab"
                  @click="show = 'bllingpayment'"
                  :class="show == 'bllingpayment' ? 'active' : ''"
                  >{{ l("Plan and Billing", "general") }}
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade "
              :class="show == 'main' ? 'show active' : ''"
            >
              <b-alert
                :show="saveStatus.show"
                dismissible
                :variant="saveStatus.status"
              >
                {{ l("Saved", "g") }}
              </b-alert>

              <div class="account_setting">
                <div class="basic_profile">
                  <div class="basic_ptitle">
                    <h4>Profile Details</h4> 
                  </div>
                  <div class="basic_form">
                    <div class="row">
                      <div class="col-lg-8">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                 <p>{{l('Name','g')}}</p> 
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="text"
                                  name="name"
                                  v-model="myProfile.U_rname"
                                  placeholder="First Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                 <p>{{l('Surname','g')}}</p> 
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="text"
                                  name="surname"
                                  v-model="myProfile.U_surname"
                                  placeholder="Last Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                 <p>{{l('Mobile','g')}}</p> 
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="text"
                                  v-model="myProfile.U_Mobil"
                                  :placeholder="l('Mobile', 'g')"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                    <p>{{l('Email','g')}}</p> 
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="text"
                                  v-model="myProfile.U_mail"
                                  :placeholder="l('Email', 'g')"
                                />
                              </div>
                            </div>
                          </div>
                         
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                               <p>{{l('Degree','g')}}</p> 
                              <div
                                class="ui left icon input swdh11 swdh19"
                                v-if="levels && levels[0]"
                              >
                                <select
                                  class="prompt srch_explore pa-10 w-100"
                                  v-model="myProfile.U_degree"
                                >
                                  <option
                                    v-for="u in levels"
                                    :key="u.id"
                                    :value="u.id"
                                    >{{ u.cou_level_name }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                         <p>{{l('Gender','g')}}</p> 
                              <div class="ui left icon input swdh11 swdh19">
                                <select
                                  class="prompt srch_explore pa-10 w-100"
                                  v-model="myProfile.U_Gender"
                                >
                                  <option
                                    v-for="u in genders"
                                    :key="u.value"
                                    :value="u.value"
                                    >{{ u.name }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div> 
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                     <p>{{l('BirthDate','g')}}</p> 
                              <div class="ui left icon input swdh11 swdh19">
                                  <input
                                  class="prompt srch_explore"
                                  type="date"
                                  v-model="myProfile.U_BirthDate"
                                  :placeholder="l('BirthDate', 'g')"
                                />
                              </div>
                            </div>
                          </div> 
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                  <p>{{l('Country','g')}}</p>  
                              <div class="ui left icon input swdh11 swdh19"> 
                                <select
                                  class="prompt srch_explore pa-10 w-100"
                                  v-model="myProfile.U_Country"
                                >
                                  <option
                                    v-for="u in countries"
                                    :key="u.id"
                                    :value="u.id"
                                    >{{ u.countryName }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div> 
                          <div class="col-lg-12">
                            <div class="ui search focus mt-30">
                              <p>{{l('Timezone','g')}}</p>
                              <div class="ui left icon input swdh11 swdh19">
                                <select
                                  class="prompt srch_explore pa-10 w-100"
                                  v-model="myProfile.U_Timezone"
                                >
                                  <option
                                    v-for="u in timezones"
                                    :key="u.value"
                                    :value="u.value"
                                    >{{ u.text }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div> 
                          <div class="col-lg-12 mt-5 ">
                            <p>{{ l("Your Languages", "g") }}</p>
                          </div>  
                          <div class="w-100 ml-10" v-for="(lg, i) in uye_languages">
                          
                            <div class="row w-100" v-if="typeof lg.status=='undefined' || lg.status!=2">
                              <div class="col-lg-1 mt-20" style="text-align:center;"><strong>{{ (i+1) }}</strong></div>
                              <div class="col-lg-5">
                                <div class="ui search focus mt-10">
                                  <div class="ui left icon input swdh11 swdh19">
                                    <select
                                      class="prompt srch_explore pa-10 w-100"
                                      v-model="lg.uye_language"
                                    >
                                      <option
                                        v-for="u in languages"
                                        :key="u.value"
                                        :value="u.value"
                                        >{{ u.name }} ( {{u.special}} )</option
                                      >
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-5">  
                                <div class="ui search focus mt-10">
                                  <div class="ui left icon input swdh11 swdh19">
                                   
                                    <select
                                      class="prompt srch_explore pa-10 w-100"
                                      v-model="lg.uye_language_degree"
                                    >
                                      <option
                                        v-for="(u,key) in languageDegree"
                                        :key="key"
                                        :value="key"
                                        >{{ u.name }} </option
                                      >
                                    </select>
                                  </div>
                                </div>
                              </div>
                             <div class="col-lg-1 mt-20"><a @click="removeLanguageItem(i)">x</a></div>
                            </div>
                          </div>
                          <div class="col-lg-12 mt-2 text-center align-center">
                            <b-button
                              variant="success"
                              @click="addNewLanguage()"
                              >+ {{ l("Add New Language", "g") }}</b-button
                            >
                          </div>
                          <div class="col-lg-12 mt-5 ">
                            <p>{{ l("About Me", "g") }}</p>
                          </div> 
                           <div class="col-lg-12">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                <textarea
                                  class="pa-5 w-100" 
                                  name="headline"
                                  v-model="myProfile.U_aboutme"
                                  id="id_headline"
                                  required="" 
                                  :placeholder="l('About Me', 'g')"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12 mt-5 ">
                            <p>{{ l("Why do you learn Arabic ?", "g") }}</p>
                          </div> 
                           <div class="col-lg-12">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                <textarea
                                  class="pa-5 w-100" 
                                  name="headline"
                                  v-model="myProfile.U_why_you_learn"
                                  id="id_headline"
                                  required="" 
                                  :placeholder="l('Why do you learn Arabic ?', 'g')"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="divider-1"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-12">
                          <div class="col-lg-12">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                 <div v-if="!myProfile.U_Photo">
                                   <p><a>{{l('Upload avatar','g')}}</a></p>
                                  <input type="file" name="changeFile" @change="onFileChange"/>
                                 </div>
                                 <div v-else>
                                  <img :src="myProfile.U_Photo" class="g-width-200 imageUpload"/>
                                  <p class="margin-top-10 mt-10 g-mt-10"><a @click="removeImage"><i class="fa fa-times"></i> {{l('Remove image','g')}}</a></p>
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>
                  </div>
                </div>

                <button class="save_btn" type="submit" @click="saveProfile()">
                  {{ l("Save Changes", "general") }}
                </button>
              </div>
            </div>
             <!-- <div
              class="tab-pane fade"
              :class="show == 'lists' ? 'show active' : ''"
            >
              <div class="account_setting">
                <h4>{{l('Lists','g')}}</h4>

          
                        <b-list-group>
                                <b-list-group-item 
                                        v-for="(list,i) in my_lists" :key="'l'+i" 
                                        class="d-flex justify-content-between align-items-center">
 
                                   <span v-show="list.view == 'read'"> {{list.uye_list_name}} - {{list.uye_list_cat}} </span>
                                   <span v-show="list.view  && list.view == 'edit'">
                                      <div  class="d-flex j align-items-center">
                                            <input type="text" name="listname"
                                      class="prompt srch_explore pa-10 mr-5 w-100"
                                      v-model="list.uye_list_name"
                                    />  
                                      <select type="text" name="listname"
                                      class="prompt srch_explore pa-10 mr-5  w-100"
                                      v-model="list.uye_list_cat"
                                    >
                                        <option
                                            v-for="opt in listOptions"
                                            :value="opt.value"
                                        >{{opt.name}}</option>
                                    </select>
                                    <b-button  variant="success"    @click="saveUyeList(list)" >
                                        <i class="fa fa-save"></i> Save</b-button>
                                      </div>
                                    </span>
                                    <span>
                                     
                                    <b-button variant="primary"  v-if="list.id"   @click="removeList(list.id)" pill><i class="fa fa-trash"></i> Delete</b-button>
                                    <b-button   v-if="list.view == 'read'" variant="danger" @click="list.view = 'edit'" pill>Edit</b-button>
                                    <b-button   v-if="list.view == 'edit'" variant="danger" @click="list.view = 'read'" pill>Close Edit</b-button>
                                    <b-badge variant="success"  v-if="list.id"   pill>14</b-badge>
                                    </span>
                                </b-list-group-item>
                        </b-list-group>

                         


<div class="w-100" v-for="(lg, i) in my_lists">
                            <div class="row w-100">
                              <div class="col-lg-1 mt-20"><strong>{{ (i+1) }}</strong></div>
                              <div class="col-lg-7">
                                <div class="ui search focus mt-10">
                                  <div class="ui left icon input swdh11 swdh19">
                                    <input type="text"
                                      class="prompt srch_explore pa-10 w-100"
                                      v-model="lg.uye_list_name"
                                    />
                                  </div>
                                </div>
                              </div>

                            </div>
                            </div>
                        <div class="col-lg-12 mt-2 text-center align-center">
                            <b-button
                              variant="success"
                              @click="addNewList()"
                              >+ {{ l("Add New List", "g") }}</b-button
                            >
                          </div>
              </div> -->
             </div>
            <div
              class="tab-pane fade"
              :class="show == 'notification' ? 'show active' : ''"
            >
              <div class="account_setting">
                <h4>Notifications - Choose when and how to be notified</h4>
                <p>Select push and email notifications you'd like to receive</p>
               
                <div class="divider-1 mb-50"></div>
                <div class="basic_profile">
                  <div class="basic_form">
                    <div class="nstting_content">
                      <div class="basic_ptitle">
                        <h4>Email notifications</h4>
                        <p>
                          Your emails are sent to gambol943@gmail.com. To
                          unsubscribe from an email, click the "Unsubscribe"
                          link at the bottom of it.
                          <a href="#">Learn more</a> about emails from Edututs+.
                        </p>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss5"
                          checked=""
                          tabindex="0"
                          class="hidden"
                        />
                        <label
                          >Send me emails about my Cursus activity and updates I
                          requested</label
                        >
                        <p class="ml5">
                          If this setting is turned off, Cursus may still send
                          you messages regarding your account, required service
                          announcements, legal notifications, and password
                          matters
                        </p>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss6"
                          tabindex="0"
                          class="hidden"
                        />
                        <label
                          >Promotions, course recommendations, and helpful
                          resources from Cursus.</label
                        >
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss7"
                          tabindex="0"
                          class="hidden"
                        />
                        <label
                          >Announcements from instructors whose course(s) I’m
                          enrolled in.</label
                        >
                        <p class="ml5">
                          To adjust this preference by course, leave this box
                          checked and go to the course dashboard and click on
                          "Options" to opt in or out of specific announcements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="save_btn" type="submit">Save Changes</button>
              </div>
            </div>
            <div
              class="tab-pane fade"
              :class="show == 'password' ? 'show active' : ''"
            >
              <div class="account_setting">
                <h4>Change Password</h4> 
                <div class="basic_profile">
                  <div class="basic_form">
                    <div class="nstting_content">
                       <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="password"
                                  name="name"
                                  v-model="changePassword.password"
                                  :placeholder="l('Old Password','g')"
                                />
                              </div>
                            </div>
                    </div>   <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="password"
                                  name="name"
                                  v-model="changePassword.password_confirm"
                                    :placeholder="l('Password Confirm','g')"
                                />
                              </div>
                            </div>
                            </div>
                            <div class="col-lg-12">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="password"
                                  name="name"
                                  v-model="changePassword.new_password"
                                    :placeholder="l('New Password','g')"
                                />
                              </div>
                            </div>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
                <button class="save_btn" type="submit" @click="changePasswordAction">{{l('Change Password','g')}}</button>
              </div>
            </div>
    
             <div
              class="tab-pane fade"
              :class="show == 'bllingpayment' ? 'show active' : ''"
            >
              <div class="account_setting">
                <h4>Billing and Payouts</h4>
                <p>
                  You are currently in Standart Plan <a>Change Plan</a>
                </p>
                
                <div class="divider-1 mb-50"></div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
 
export default {
  mixins: [general],

  data: () => ({
    show: "main",
    myProfile: {},
    changePassword: {     password:'',
                password_confirm:'',
                new_password:'',},
    boxTwo:'',
    uye_languages: [],
    my_lists: [],
    uyeListItem:{
        id:null,
        uye_list_name:''
    },
    layout: 'basic',
    listOptions: [
      { name: "Course", value: "Course" },
      { name: "Exam", value: "Exam" },
      { name: "Word", value: "Word" }
    ],
    genders: [
      { name: "Male", value: "MG_Male" },
      { name: "Female", value: "MG_Female" }
    ],
    files:[],
    saveStatus: { show: false, stataus: "success" },
    timezones:[
          {
              "value": -12,
              "text": "(GMT -12:00) Eniwetok, Kwajalein"
          },
          {
              "value": -11,
              "text": "(GMT -11:00) Midway Island, Samoa"
          },
          {
              "value": -10,
              "text": "(GMT -10:00) Hawaii"
          },
          {
              "value": -9,
              "text": "(GMT -9:00) Alaska"
          },
          {
              "value": -8,
              "text": "(GMT -8:00) Pacific Time (US & Canada)"
          },
          {
              "value": -7,
              "text": "(GMT -7:00) Mountain Time (US & Canada)"
          },
          {
              "value": -6,
              "text": "(GMT -6:00) Central Time (US & Canada), Mexico City"
          },
          {
              "value": -5,
              "text": "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"
          },
          {
              "value": -4,
              "text": "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"
          },
          {
              "value": -3.5,
              "text": "(GMT -3:30) Newfoundland"
          },
          {
              "value": -3,
              "text": "(GMT -3:00) Brazil, Buenos Aires, Georgetown"
          },
          {
              "value": -2,
              "text": "(GMT -2:00) Mid-Atlantic"
          },
          {
              "value": -1,
              "text": "(GMT -1:00) Azores, Cape Verde Islands"
          },
          {
              "value": 0,
              "text": "(GMT) Western Europe Time, London, Lisbon, Casablanca"
          },
          {
              "value": 1,
              "text": "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"
          },
          {
              "value": 2,
              "text": "(GMT +2:00) Kaliningrad, South Africa"
          },
          {
              "value": 3,
              "text": "(GMT +3:00) Istanbul, Baghdad, Riyadh, Moscow, St. Petersburg"
          },
          {
              "value": 3.5,
              "text": "(GMT +3:30) Tehran"
          },
          {
              "value": 4,
              "text": "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"
          },
          {
              "value": 4.5,
              "text": "(GMT +4:30) Kabul"
          },
          {
              "value": 5,
              "text": "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"
          },
          {
              "value": 5.5,
              "text": "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"
          },
          {
              "value": 5.75,
              "text": "(GMT +5:45) Kathmandu"
          },
          {
              "value": 6,
              "text": "(GMT +6:00) Almaty, Dhaka, Colombo"
          },
          {
              "value": 7,
              "text": "(GMT +7:00) Bangkok, Hanoi, Jakarta"
          },
          {
              "value": 8,
              "text": "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"
          },
          {
              "value": 9,
              "text": "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
          },
          {
              "value": 9.5,
              "text": "(GMT +9:30) Adelaide, Darwin"
          },
          {
              "value": 10,
              "text": "(GMT +10:00) Eastern Australia, Guam, Vladivostok"
          },
          {
              "value": 11,
              "text": "(GMT +11:00) Magadan, Solomon Islands, New Caledonia"
          },
          {
              "value": 12,
              "text": "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"
          }
        ]
  }),
  computed: {
    auth() {
      return this.$store.state.user.auth;
    },
    levels() {
      return this.$store.state.core.options["co_level"];
    },
    countries() {
      return this.$store.state.core.options["LocalCountries"];
    },
    languageDegree() {
      return this.l("cat.LangugeDegree", "g").list;
    },
    languages() {
      let objs = this.l("cat.Languages", "g").list;
      const sortable = Object.entries(objs);
      let country = []; 
      for (const [key, value] of sortable) { 
        country.push({...value, value:key });
      }
      country.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      return country;
    }
  },
  async created() {
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "co_level",
      fields: "id,cou_level_name"
    }); 
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "LocalCountries",
      fields: "id,countryName"
    });
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "U_Lang",
      prev_id: this.myProfile.id,
      fields: "id,uye_language,uye_language_degree,status"
    });

    // this.genders = this.l("cat.Membership.list.M_Gender.list",'g');
    this.getUyeLanguages(); 
    this.getUyeLists();
    this.getMyProfile();
  },
  methods: {

     onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        this.myProfile.U_Photo = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.myProfile.U_Photo = '';
    },
    async removeLanguageItem(index){
     
         this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this language.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
                if(value){
                    // this.uye_languages = this.uye_languages.filter((k,i)=> i!=index);
                    this.uye_languages = this.uye_languages.map((k,i)=> {
                        if(i==index){
                            k.status = 2;
                        }
                        return k; 
                    });
                     
                }
          })
          .catch(err => {
            // An error occurred
          })
 
    },
    addNewLanguage() {
      this.uye_languages.push({
        id: null,
        uye_language: "",
        uye_language_degree: "",
        status:1
      });
    },
    addNewList() {
      this.my_lists.push({
        id: null,
        uye_list_name: ""
      });
    },
    changePasswordAction() {
        this.changePassword={
                password:'',
                password_confirm:'',
                new_password:'',
        }
    },
    async saveUyeList(mp) { 
      let url = process.env.baseURL + "uye_Lists";
      let method = "post"
      if(mp.id){
          method='put';
          url = process.env.baseURL + "uye_Lists/"+ mp.id

      }

     
      await axios({
        url,
        method,
        data: {
          id: mp.id,
          uye_list_name: mp.uye_list_name,
          uye_list_cat: mp.uye_list_cat,
          status: 1, 
          prev_id: this.auth.id
        }
      }).then(response => {
        this.saveStatus = { show: true, stataus: "success" };
              this.getUyeLists();
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }, 500);
      });
    },
    async saveProfile() {
      let mp = this.myProfile;
      await axios({
        url: process.env.baseURL + "uye/" + this.auth.id,
        method: "put",
        data: {
          U_rname: mp.U_rname,
          U_surname: mp.U_surname,
          U_Mobil: mp.U_Mobil,
          U_aboutme: mp.U_aboutme,
          U_why_you_learn: mp.U_why_you_learn,
          U_degree: mp.U_degree,
          U_Gender: mp.U_Gender,
          U_Country: mp.U_Country,
          U_Timezone: mp.U_Timezone,
          U_BirthDate: mp.U_BirthDate,
          U_Photo: mp.U_Photo,
        }
      }).then(response => {
        this.saveStatus = { show: true, stataus: "success" };

   //// save Languages
   console.log("this.uye_languages",this.uye_languages)
    this.uye_languages = this.uye_languages.filter((k,i)=>  k.uye_language!='' )
   this.uye_languages.filter(async k=>{ 
      
      if(k.id){ 
          await axios({
            url: process.env.baseURL + "U_Lang/" + k.id,
            method: "put",
            data: {
              id: k.id,
              uye_language: k.uye_language	,
              status: k.status,
               prevId: this.auth.id,
                  prev_id: this.auth.id,
                  prev: this.auth.id,
              uye_language_degree: k.uye_language_degree
            }}
            ).then(response => {
            this.saveStatus = { show: true, stataus: "success" };
          });
      }else{ 
          
          await axios({
                url: process.env.baseURL + "U_Lang",
                method: "post",
                data: {
                  id: k.id,
                  uye_language: k.uye_language,
                  prevId: this.auth.id,
                  prev_id: this.auth.id,
                  prev: this.auth.id,
                  status:1,
                  uye_language_degree: k.uye_language_degree
                }
          }).then(response => {
            this.saveStatus = { show: true, stataus: "success" };
          });
      }   
   })
      


        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }, 500);
      });
    },
    getMyProfile() {
      let filters = { id: ["=", this.auth.id] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "uye",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields:
              "U_mail,U_rname,U_surname,id,U_Status,U_likedPages,U_degree,U_Timezone,U_BirthDate,U_Mtype,U_Photo,U_Gender,U_Mobil,U_aboutme,U_why_you_learn",
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
            filter: filters
          }
        }).then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.myProfile = response.data.formattedData[0];
          }
        });
      });
    },
    getUyeLanguages() {
      let filters = { prev_id: ["=", this.auth.id] };
      // uye_languages
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "U_Lang",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields: "uye_language,uye_language_degree,id,status",
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
            filter: filters
          }
        }).then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.uye_languages = response.data.formattedData;
          }
        });
      });
    },
    getUyeLists() {
        let filters = { prev_id: ["=", this.auth.id] };
      // uye_languages
      return new Promise((resolve, reject) => {
          axios({
          url: process.env.baseURL + "uye_Lists",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields: "uye_list_name,id,uye_list_cat",
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
            filter: filters
          }
        }).then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
              this.my_lists = response.data.formattedData.map(k=> {return {...k,view:'read'}});
          }
        });
      });
    }
  
            },
};
</script>
<style>
.imageUpload{
  width: 150px;
  max-height: 150px;
  border-radius: 10px;
}
.pa-10 {
  padding: 10px !important;
}
.modal{
    z-index:99999;
}
header.modal-header{
    position: relative;
        height: auto;
}

.modal-body{
    height: auto;
}
.list-group-item{
    margin-bottom: 15px;
}
.swdh19 textarea{ 
  padding: 5px;
    height: 100px;
  
}
.account_setting p {
  margin-bottom: 5px;
	line-height: 20px;
  padding-left: 10px;
}
.div-container{
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.ml-10{
  margin-left: 10px;
}
</style>
