<template>
  <div class="sa4d25" :lang="LOCALE">
    <div class="container mt-10" :lang="LOCALE">

      <div class="div-container">
      <div class="row" :class="reverseClass">
        <div class="col-lg-12">
          <h2 class="st_title" :class="customClass.textDir + ' ' + customClass.dir">
            <i class="fa fa-user"></i> {{ l("My Profile", "g") }}
          </h2>
          <div class="setting_tabs">
            <ul class="nav nav-pills mb-4" id="pills-tab" role="tablist" :class="customClass.textDir + ' ' + customClass.dir">
              <li class="nav-item">
                <a
                  class="nav-link "
                  @click="show = 'main'"
                  :class="show == 'main' ? 'active' : ''"
                  >{{ l("Account", "g") }}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  @click="show = 'notification'"
                  :class="show == 'notification' ? 'active' : ''"
                  >{{ l("Notification", "g") }}
                </a>
              </li>
               <li class="nav-item">
                <a
                  class="nav-link"
                  @click="show = 'comments'"
                  :class="show == 'comments' ? 'active' : ''"
                  >{{ l("My Comments", "g") }}
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-password-tab"
                  @click="show = 'password'"
                  :class="show == 'password' ? 'active' : ''"
                  >{{ l("Change Password", "g") }}
                </a>
              </li>
              
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-bllingpayment-tab"
                  @click="show = 'bllingpayment'"
                  :class="show == 'bllingpayment' ? 'active' : ''"
                  >{{ l("Plan and Billing", "g") }}
                </a>
              </li>
			   <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-invite-tab"
                  @click="show = 'invite'"
                  :class="show == 'invite' ? 'active' : ''"
                  >{{ l("Invite & Referrals", "g") }}
                </a>
              </li>
			    <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-invite-tab"
                  @click="show = 'referrals'"
                  :class="show == 'referrals' ? 'active' : ''"
                  >{{ l("My Referrals", "g") }}
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
                  <div class="basic_ptitle"  >
                    <h4 :class="customClass.textDir + ' ' + customClass.dir">{{l('Profile Details','g')}}</h4> 
					<h5 :class="customClass.textDir + ' ' + customClass.dir">{{l('Your profile is','g')}}: <strong>{{myProfile.U_Role ?  myProfile.U_Role : l('Student','g')}}</strong></h5>
                  </div>
                  <div class="basic_form" :lang="LOCALE">
                    <div class="row"  :lang="LOCALE">
                      <div class="col-lg-8">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="ui search focus mt-30">
                                 <p>{{l('Name','g')}}</p> 
                              <div class="ui left icon input swdh11 swdh19">
                                <input
								  :lang="LOCALE"
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
								  :lang="LOCALE"
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
								  :lang="LOCALE"
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
								  :lang="LOCALE"
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
                                     <p>{{l('Birth Date','g')}}</p> 
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
                                  <input type="file" name="changeFile" @change="onFileChange($event)"/>
								 
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
                  {{ l("Save Changes", "g") }}
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
                          Your emails are sent to {{auth.U_mail}}. To
                          unsubscribe from an email, click the "Unsubscribe"
                          link at the bottom of it.
                          <a href="#">Learn more</a> about emails from Edututs+.
                        </p>
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss5"
                         
                          tabindex="0"
                          class="hidden"
						  :checked="myProfile.notify_mail"
						  v-model="myProfile.notify_mail"
						  @click="myProfile.notify_mail=!myProfile.notify_mail"
                        />
                        <label
                          >Send me emails about my Daleel activity and updates I
                          requested</label
                        >
                        <p class="ml5">
                          If this setting is turned off, Daleel may still send
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
						  :checked="myProfile.notify_promotion"
						   v-model="myProfile.notify_promotion"
                        />
                        <label
                          >Promotions, course recommendations, and helpful
                          resources from Daleel.</label
                        >
                      </div>
                      <div class="ui toggle checkbox _1457s2">
                        <input
                          type="checkbox"
                          name="stream_ss7"
                          tabindex="0"
                          class="hidden"
						  :checked="myProfile.notify_instractor"
						   v-model="myProfile.notify_instractor"
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
                <button class="save_btn" type="submit" @click="saveProfile()">
                  {{ l("Save Changes", "g") }}</button>
              </div>
            </div>
            <div
              class="tab-pane fade"
              :class="show == 'comments' ? 'show active' : ''"
            >
              <div class="account_setting">
                <h4>{{l('Comments','g')}}</h4>
                <p>{{l('Total','g')}} {{comments_count}} {{l('comments','g')}} .</p>
              
                <div class="basic_profile">
                     <div class="review_all120" v-for="comment in comments">
                  <div class="review_item">
                    
                    <div class="rating-box  star_button">
                      <span   :class="comment.yh_Points>=1 ? 'full-star' : ''" class="rating-star empty-star"></span>
                      <span   :class="comment.yh_Points>=2 ? 'full-star' : ''" class="rating-star empty-star"></span>
                      <span   :class="comment.yh_Points>=3 ? 'full-star' : ''" class="rating-star empty-star"></span>
                      <span   :class="comment.yh_Points>=4 ? 'full-star' : ''" class="rating-star empty-star"></span>
                      <span   :class="comment.yh_Points>=5 ? 'full-star' : ''" class="rating-star empty-star"></span>
                    </div>
                    <div class="rvds10">
                      <p>{{comment.yh_Message}}</p>
					   <!--{ "yh_Message": "test 1", "yh_MainId": null, "yh_Group": "courses", "status": 1, "yh_Points": "3", "yh_UserId": "uye_1619304065854", "yh_Mail": "aa@bb.com", "yh_Surname": "Demir6", "yh_Name": "Fatih", "yh_PageId": "Y291cnNlczE2MTQ2MDMyMzkq", "id": "AllYorumlar_1635877024775", "created_on": "2021-11-02T18:17:04.000Z", "created_by": null, "prev_Id": "0", "created_on__TEXT": "02-11-2021" } !-->
					<a v-if="comment.from_yh_courseId && comment.from_yh_courseId.cou_name" @click="goPath('course/'+comment.from_yh_courseId.cou_link)">  {{comment.from_yh_courseId.cou_name}} -  
					 {{l('View Course','g')}}</a>
                     for {{comment.yh_Group=='courses' ? 'Courses' : ''}} on  {{comment.created_on | dateTime}} <br />
                      <a  class="edit_button"  @click="openCommentModal(comment, comment,'courses')">
                        <i class="fa fa-pen"></i>
                        {{l('Edit','g')}}</a> 
						<a  class="activate_button"  @click="deactivate(comment)" v-if="comment.status==1">
                        <i class="fa fa-dot-circle"></i>
                        {{l('Deactivate','g')}}</a> 
						<a  class="activate_button"  @click="activate(comment)" v-if="comment.status==2">
                        <i class="fa fa-dot-circle"></i>
                        {{l('Activate','g')}}</a> 
                    </div> 
                  </div>
                </div>
              </div>
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
                    <div class="nstting_content" :lang="LOCALE">
					 <div class="row"   >
                       <div class="col-12 col-md-6 col-lg-4">
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
                    </div>   <div class="col-12 col-md-6 col-lg-4">
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
                            </div>
							 <div class="row"   >
                            <div class="col-12 col-md-6 col-lg-4">
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
                </div>
                <button class="save_btn" type="submit" @click="changePasswordAction">{{l('Change Password','g')}}</button>
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
			
			       <div
              class="tab-pane fade"  :lang="LOCALE"
              :class="show == 'invite' ? 'show active' : ''"
            >
              <div class="account_setting" :lang="LOCALE">
                <h2>{{l('Invite','g')}}</h2>
			
                <h4>
                   {{l('Invite your friends or students')}}
                </h4>
                <p>
                   {{l('Your referral code is','g')}}: <strong>{{getRefCode()}}</strong>  
				   <a @click="copyText(getRefCode())" > <i class="far fa-copy"></i> </a>
                </p>
				<p>
                   {{l('Your referral link is','g')}}: <strong>{{'https://lmsw.fatihd.com/en/form/login?ref='+getRefCode()}}</strong>
				    <a @click="copyText('https://lmsw.fatihd.com/en/form/login?ref='+getRefCode())" ><i class="far fa-copy"></i></a>
                </p>
				<div style="width: auto;  display: flex;">
				
						<ShareNetwork
											v-for="network in networks"
											:network="network.network"
											:key="network.network"
											:style="{ backgroundColor: network.color }"
											:url="
											  'https://lmsw.fatihd.com/en/form/login?ref='+getRefCode()
											"
											:title="l('Join','g')"
											:description="l('Join','g')"
											:quote="''"
											:hashtags="''"
										  >
											<i :class="network.icon"></i>
											<!-- <span>{{ network.name }}</span> -->
										  </ShareNetwork>
				
				</div>
                <div class="divider-1 mb-50">
						

				
				</div>  
              </div>
            </div>
			
			       <div
              class="tab-pane fade"  :lang="LOCALE"
              :class="show == 'referrals' ? 'show active' : ''"
            >
              <div class="account_setting" :lang="LOCALE">
                <h2>{{l('My Referalls','g')}}</h2>
			
               
				 
                <div class="divider-1 mb-50" v-if="columns && data">
						
 <vue-good-table
          :columns="columns"
          :rows="data"
          :search-options="{
            enabled: true,
            trigger: 'enter'
          }"
          :sort-options="{
            enabled: true,
            initialSortBy: { field: 'cou_name', type: 'asc' }
          }"
          :rtl="LOCALE == 'ar' ? true : false"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <a class="table-buttons" @click="openModal(props.row)"
                ><i class="fa fa-pen"></i
              ></a>
              <a
                class="table-buttons"
                @click="goPath(`admin/course/${props.row.id}/units`)"
                @click.middle="
                  goPathBlank(`admin/course/${props.row.id}/units`)
                "
                ><i class="fas fa-list-alt"></i
              ></a>
              <a
                class="table-buttons"
                @click="goPath('course/' + props.row.cou_link)"
                @click.middle="goPathBlank('course/' + props.row.cou_link)"
                ><i class="fa fa-eye"></i
              ></a>
            </span>
				</template>
				</vue-good-table>
				</div>
				</div>  
              </div>
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
 import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
export default {
  mixins: [general],
   components: { 
    VueGoodTable 
  },
  watch:{
    show(val){
      if(val=="comments"){
        this.getComments()
      }
    },
	doWhat(val){ 
		this.show = val; 
	}
  },
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
	profile_photo:null,
    comments: [],
    comments_count:0,
    comment_page:1,
    comment_size:10,
    layout: 'basic',
	 networks: [  
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366"
        }
      ],
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
    doWhat() {
      return this.$route.query.do;
    },
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
      fields: "id,cou_level_name,cou_level_color"
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
	if(this.doWhat){ 
		this.show = this.doWhat; 
	}
    // this.genders = this.l("cat.Membership.list.M_Gender.list",'g');
    this.getUyeLanguages(); 
    this.getUyeLists();
    this.getMyProfile();
  },
  methods: {
  
    async deactivate(c){
		let url = process.env.baseURL + "AllYorumlar"+"/"+c.id;
					let method = "put"
					
					await axios({
					url,
					method:'update',
					data: {
					  id: c.id,
					  token: auth.token, 
					  status:1
					}
				  }).then(response => {
					this.saveStatus = { show: true, stataus: "success" }; 
				  });
  },
  
  async deactivate(c){
		let url = process.env.baseURL + "AllYorumlar"+"/"+c.id;
					let method = "put"
					
					await axios({
					url,
					method:'update',
					data: {
					  id: c.id,
					  token: auth.token, 
					  status:2
					}
				  }).then(response => {
					this.saveStatus = { show: true, stataus: "success" }; 
				  });
  },
  
 copyText(text) {
 
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
},
async getComments() {
      let fields = `yh_Message,yh_MainId,yh_Group,status,yh_Points,yh_UserId,yh_Mail,yh_Surname,yh_Name,yh_PageId,id,status,created_on,created_by,prev_Id,yh_courseId.cou_name,yh_courseId.cou_link`;
      let id=this.auth.id
      let filters = { status: ["=", 1], yh_UserId: ["=", id], yh_Group: ["=", 'courses'] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "AllYorumlar",
          method: "get",
          params: {
            limit: this.comment_size,
            offset: (this.comment_page-1)*this.comment_size,
            fields,
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
            filter: filters
          }
        })
          .then(response => {
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              let d = response.data.formattedData;
              this.comments = d;
              this.comments_count = response.data.count;
            } else {
              this.comments = [];
              this.comments_count = 0;
            }
          })
          .catch(e => {
            this.comments = [];
            console.log(e);
          });
      });
    },
	
 
	
     onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files || !files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
 
      const blob = new Blob([file],{type: file.type})
		 
	  //this.profile_photo=blob;
	  
      reader.onload = (e) => {
	    this.profile_photo = e.target.result;
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
    async changePasswordAction() {
	let auth = this.auth
		if(this.changePassword.password_confirm && this.changePassword.password && 
			this.changePassword.password_confirm==this.changePassword.new_password){
					let url = process.env.baseURL + "changePassword"+"/"+auth.id;
					let method = "put"
					
					await axios({
					url,
					method,
					data: {
					  id: auth.id,
					  token: auth.token,
					  password:this.changePassword.password,
					  password_confirm:this.changePassword.password_confirm,
					  new_password:this.changePassword.new_password 
					}
				  }).then(response => {
					this.saveStatus = { show: true, stataus: "success" };
					
						 this.changePassword={
							password:'',
							password_confirm:'',
							new_password:'',
					}
				  });
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
	  
	  var bodyFormData = new FormData();
 
      bodyFormData.append('U_rname',  mp.U_rname);
      bodyFormData.append('U_surname',  mp.U_surname);
      bodyFormData.append('U_Mobil',  mp.U_Mobil);
      bodyFormData.append('U_aboutme',  mp.U_aboutme);
      bodyFormData.append('U_why_you_learn',  mp.U_why_you_learn);
      bodyFormData.append('U_degree',  mp.U_degree);
      bodyFormData.append('U_Gender',  mp.U_Gender);
      bodyFormData.append('U_Country',  mp.U_Country);
      bodyFormData.append('U_Timezone',  mp.U_Timezone);
      bodyFormData.append('U_BirthDate',  mp.U_BirthDate);
      bodyFormData.append('notify_promotion',  mp.notify_promotion);
      bodyFormData.append('notify_instractor',  mp.notify_instractor);
      bodyFormData.append('notify_mail',  mp.notify_mail);
      bodyFormData.append('U_Photo',  this.profile_photo);
 
	  
	  
     /* await axios({
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
          U_Photo: this.profile_photo 
        }
      }).then(response => {  */
	  
	  
	   await axios({
			url: process.env.baseURL + "uye/" + this.auth.id,
			method: "put",
			headers: { "Content-Type": "multipart/form-data" },
			data: bodyFormData
		 
			
      }).then(response => {
	  
			//// save Languages
			//console.log("this.uye_languages",this.uye_languages)
			
			this.$store.dispatch('user/findAuth',{headers:null}) 
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
              "U_mail,U_rname,U_surname,id,U_Status,U_likedPages,U_degree,U_Timezone,U_BirthDate,U_Mtype,U_Photo,U_Gender,U_Mobil,U_aboutme,U_why_you_learn,notify_instractor,notify_mail,notify_promotion,U_role",
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
.basic_profile{
margin-top: 0;
}
.review_item{
	border-radius: 10px;
    border: 1px solid #efefef;
	position: relative;
	margin-bottom: 10px;
	border-bottom: 1px solid #efefef!important;
}
.edit_button{
	position: absolute;
	top: 10px; 
	right: 10px;
}
.activate_button{
	position: absolute;
	top: 30px; 
	right: 10px;
}
.star_button{
	position: absolute;
	bottom: 10px; 
	right: 10px;
}
.account_setting p{
padding-left: 0;
}
.basic_form:lang(ar) p{
direction: rtl !important;
    text-align: right!important;
}
.basic_form:lang(ar) input, .basic_form:lang(ar) select{
direction: rtl !important;
    text-align: right!important;
    padding-left: 2.67142857em!important;
    padding-right: 2.67142857em!important;

}
.sa4d25:lang(ar) h2, .sa4d25:lang(ar) h3, .sa4d25:lang(ar) h4, .sa4d25:lang(ar) h5, .sa4d25:lang(ar) p{
direction: rtl !important;
    text-align: right!important;
}
.sa4d25:lang(ar) .tab-pane {
direction: rtl !important;
    text-align: right!important;
}
</style>
