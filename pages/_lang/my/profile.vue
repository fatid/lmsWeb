<template>
  <div class="sa4d25">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <h2 class="st_title">
            <i class="uil uil-cog"></i> {{ l("Settings", "general") }}
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
                  id="pills-privacy-tab"
                  @click="show = 'privacy'"
                  :class="show == 'privacy' ? 'active' : ''"
                  >{{ l("Privacy", "general") }}
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-bllingpayment-tab"
                  @click="show = 'bllingpayment'"
                  :class="show == 'bllingpayment' ? 'active' : ''"
                  >{{ l("Billing and Payouts", "general") }}
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
                    <h4>Basic Profile</h4>
                    <p>Add information about yourself</p>
                  </div>
                  <div class="basic_form">
                    <div class="row">
                      <div class="col-lg-8">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
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
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="text" 
                                  v-model="myProfile.U_Mobil"
                                  :placeholder="l('Mobile','g')"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="text" 
                                  v-model="myProfile.U_mail"
                                  :placeholder="l('Email','g')"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19">
                                <input
                                  class="prompt srch_explore"
                                  type="text"
                                  name="headline"
                                  v-model="myProfile.U_aboutme"
                                  id="id_headline"
                                  required=""
                                  maxlength="60"
                                  :placeholder="l('About Me','g')"
                                />
                              </div>
                         
                            </div>
                          </div>
                          <div class="col-lg-6">
                             <div class="ui search focus mt-30">
                              <div class="ui left icon input swdh11 swdh19" v-if="levels && levels[0]">
                                	<select class="prompt srch_explore pa-10 w-100"   v-model="myProfile.U_degree"   >	 
                                        <option v-for="u in levels" :key="u.id" :value="u.id">{{u.cou_level_name}}</option>
                                    </select>	
                              </div>
                            </div>
                          </div>
                            <div class="col-lg-6">
                             <div class="ui search focus mt-30">
                                 
                              <div class="ui left icon input swdh11 swdh19" >
                                  
                                	<select class="prompt srch_explore pa-10 w-100"   v-model="myProfile.U_Gender"   >	 
                                        <option v-for="(u) in genders" :key="u.value" :value="u.value">{{u.name}}</option>
                                    </select>	
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="divider-1"></div>
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
            <div
              class="tab-pane fade"
              :class="show == 'notification' ? 'show active' : ''"
            >
              <div class="account_setting">
                <h4>Notifications - Choose when and how to be notified</h4>
                <p>Select push and email notifications you'd like to receive</p>
                <div class="basic_profile">
                  <div class="basic_form">
                    <div class="nstting_content">
                      <div class="basic_ptitle">
                        <h4>Choose when and how to be notified</h4>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss1"
                          checked=""
                          tabindex="0"
                          class="hidden"
                        />
                        <label>Subscriptions</label>
                        <p class="ml5">
                          Notify me about activity from the profiles I'm
                          subscribed to
                        </p>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss2"
                          tabindex="0"
                          class="hidden"
                        />
                        <label>Recommended Courses</label>
                        <p class="ml5">
                          Notify me of courses I might like based on what I
                          watch
                        </p>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss3"
                          tabindex="0"
                          class="hidden"
                        />
                        <label>Activity on my comments</label>
                        <p class="ml5">
                          Notify me about activity on my comments on others’
                          courses
                        </p>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss4"
                          checked=""
                          tabindex="0"
                          class="hidden"
                        />
                        <label>Replies to my comments</label>
                        <p class="ml5">
                          Notify me about replies to my comments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
                          announcements, legal notifications, and privacy
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
              :class="show == 'privacy' ? 'show active' : ''"
            >
              <div class="account_setting">
                <h4>Privacy</h4>
                <p>Modify your privacy settings here.</p>
                <div class="basic_profile">
                  <div class="basic_form">
                    <div class="nstting_content">
                      <div class="basic_ptitle">
                        <h4>Profile page settings</h4>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss8"
                          checked=""
                          tabindex="0"
                          class="hidden"
                        />
                        <label>Show your profile on search engines</label>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss9"
                          tabindex="0"
                          class="hidden"
                        />
                        <label
                          >Show courses you're taking on your profile
                          page</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <button class="save_btn" type="submit">Save Changes</button>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-bllingpayment"
              role="tabpanel"
              aria-labelledby="pills-bllingpayment-tab"
            >
              <div class="account_setting">
                <h4>Billing and Payouts</h4>
                <p>
                  Want to charge for a course? Provide your payment info and opt
                  in for our promotional programs
                </p>
                <div class="basic_form">
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="basic_ptitle mt-30">
                        <h4>Billing Address</h4>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="name"
                                value="Joginder"
                                id="id[name1]"
                                required=""
                                maxlength="64"
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="surname"
                                value="Singh"
                                id="id[surname1]"
                                required=""
                                maxlength="64"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="academyname"
                                value="Gambolthemes"
                                id="id_academy"
                                required=""
                                maxlength="64"
                                placeholder="Academy Name"
                              />
                            </div>
                            <div class="help-block">
                              If you want your invoices addressed to a academy.
                              Leave blank to use your full name.
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="addressname"
                                value="#1234, Sks Nagar, Near MBD Mall, 141001 Ludhiana, Punjab, India"
                                id="id_address1"
                                required=""
                                maxlength="64"
                                placeholder="Address Line 1"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="addressname2"
                                id="id_address2"
                                required=""
                                maxlength="64"
                                placeholder="Address Line 2"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="city"
                                value="Ludhiana"
                                id="id_city"
                                required=""
                                maxlength="64"
                                placeholder="City"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="state"
                                value="Punjab"
                                id="id_state"
                                required=""
                                maxlength="64"
                                placeholder="State / Province / Region"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="zip"
                                value="141001"
                                id="id_zip"
                                required=""
                                maxlength="64"
                                placeholder="Zip / Postal Code"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="ui search focus mt-30">
                            <div class="ui left icon input swdh11 swdh19">
                              <input
                                class="prompt srch_explore"
                                type="text"
                                name="phone"
                                value="+911234567890"
                                id="id_phone"
                                required=""
                                maxlength="12"
                                placeholder="Phone Number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divider-1 mb-50"></div>
                <div class="basic_form">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="basic_ptitle">
                        <h4>Exclusive Sales</h4>
                        <p>
                          Sell more of your exclusive products of this type
                          (equal to the amount on the left) to get % cut from
                          further exclusive sales.
                        </p>
                      </div>
                      <div class="billing-percentages">
                        <div class="billing-percentages-progress-bar">
                          <ul class="billing-percentages-progress-bar__labels">
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label billing-percentages-progress-bar__label_zero-level"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency ">$0</strong>
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >50%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$2,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >53%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$8,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >55%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$18,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >58%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$40,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >62%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$75,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >70%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$100,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >80%</span
                                >
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="basic_form mt-50">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="basic_ptitle">
                        <h4>Non-Exclusive Sales</h4>
                        <p>
                          Sell more of your non-exclusive products of this type
                          (equal to the amount on the left) to get 70% cut from
                          every non-exclusive sales.
                        </p>
                      </div>
                      <div class="billing-percentages">
                        <div class="billing-percentages-progress-bar">
                          <ul class="billing-percentages-progress-bar__labels">
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label billing-percentages-progress-bar__label_zero-level"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency ">$0</strong>
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >30%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$2,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >30%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$8,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >30%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$18,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >30%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$40,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >30%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$75,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >30%</span
                                >
                              </div>
                            </li>
                            <li>
                              <div
                                class="billing-percentages-progress-bar__label"
                              >
                                <span
                                  class="billing-percentages-progress-bar__profit t5"
                                >
                                  <strong class="format-currency "
                                    >$100,000</strong
                                  >
                                </span>
                                <span
                                  class="billing-percentages-progress-bar__percent t5"
                                  >30%</span
                                >
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divider-1 mb-50"></div>

                <button class="save_btn" type="submit">Save Changes</button>
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
    genders: [
        {name: 'Male' ,value:'MG_Male'},
        {name: 'Female' ,value:'MG_Female'}
    ],
    saveStatus: { show: false, stataus: "success" }
  }),
  computed: {
    auth() {
      return this.$store.state.user.auth;
    },
    levels(){ 
        return this.$store.state.core.options['co_level']  
    }   
  },
  async created() {

         await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_level',
			fields:'id,cou_level_name'
		}); 
        
        // this.genders = this.l("cat.Membership.list.M_Gender.list",'g');
        this.getMyProfile();
 
  },
  methods: {
    async saveProfile() {
      let mp = this.myProfile;
      await axios({
        url: process.env.baseURL + "uye/" + this.auth.id,
        method: "put",
        data: {
          U_rname: mp.U_rname,
          U_surname: mp.U_surname,
          U_mail: mp.U_mail,
          U_aboutme: mp.U_aboutme,
          U_degree: mp.U_degree,
          U_Gender: mp.U_Gender,
        }
      }).then(response => {
        this.saveStatus = { show: true, stataus: "success" };
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
            fields: "U_mail,U_rname,U_surname,id,U_Status,U_likedPages,U_degree,U_BirthDate,U_Mtype,U_Photo,U_Gender,U_Mobil,U_aboutme",
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
    }
  }
};
</script>
<style>
.pa-10{
    padding:10px!important;
}
</style>