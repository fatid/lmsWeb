<template>

<div>
	<header class="header clearfix main-header">
		<button type="button" id="toggleMenu" class="toggle_menu">
		  <i class='uil uil-bars'></i>
		</button>
		<button id="collapse_menu" class="collapse_menu">
			<i class="uil uil-bars collapse_menu--icon "></i>
			<span class="collapse_menu--label"></span>
		</button>
		<div class="main_logo" id="logo">
			<a @click="goPath('home')"><img :src="'http://lms.fatihd.com/yonetim/images/resimler/normal/logo.png'"  alt="logo"></a>
			<a @click="goPath('home')"><img class="logo-inverse" :src="'http://lms.fatihd.com/yonetim/images/resimler/normal/logo.png'" alt="logo"></a>
		</div>
		<div class="top-category">
			<div class="ui compact menu cate-dpdwn">
				<div class="ui simple dropdown item">
					<a href="#" class="option_links p-0" title="categories"><i class="uil uil-apps"></i></a>
					<div class="menu dropdown_category5">
						<a href="#" class="item channel_item" v-for="cat in categories" @click="'courses/'+cat.cou_label_link" >{{cat.cou_label_name}}</a> 
					</div>
				</div>
			</div>
		</div>
		<div class="search120">
			<div class="ui search">
			  <div class="ui left icon input swdh10">
				    
				<input class="prompt srch10" type="text" 
         :placeholder="l('Search for Tuts Videos, Tutors, Tests and more..','g')">
				<i class='uil uil-search-alt icon icon1'></i>
			  </div>
			
			</div>
		</div>
		<div class="header_right">
			<ul>
				<li>
					<a href="create_new_course.html" class="upload_btn" title="Create New Course">{{l('My Courses','g')}}</a>
				</li>
				<!-- <li>
					<a href="shopping_cart.html" class="option_links" title="cart"><i class='uil uil-shopping-cart-alt'></i><span class="noti_count">2</span></a>
				</li> -->
				<li class="ui dropdown">
					<a href="#" class="option_links" title="Messages"><i class='uil uil-envelope-alt'></i><span class="noti_count">3</span></a>
					<div class="menu dropdown_ms">
						<a href="#" class="channel_my item">
							<div class="profile_link">
								<img src="/images/left-imgs/img-6.jpg" alt="">
								<div class="pd_content">
									<h6>Zoena Singh</h6>
									<p>Hi! Sir, How are you. I ask you one thing please explain it this video price.</p>
									<span class="nm_time">2 min ago</span>
								</div>							
							</div>							
						</a>
						<a href="#" class="channel_my item">
							<div class="profile_link">
								<img src="/images/left-imgs/img-5.jpg" alt="">
								<div class="pd_content">
									<h6>Joy Dua</h6>
									<p>Hello, I paid you video tutorial but did not play error 404.</p>
									<span class="nm_time">10 min ago</span>
								</div>							
							</div>							
						</a>
						<a href="#" class="channel_my item">
							<div class="profile_link">
								<img src="/images/left-imgs/img-8.jpg" alt="">
								<div class="pd_content">
									<h6>Jass</h6>
									<p>Thanks Sir, Such a nice video.</p>
									<span class="nm_time">25 min ago</span>
								</div>							
							</div>							
						</a>
						<a class="vbm_btn" href="instructor_messages.html">View All <i class='uil uil-arrow-right'></i></a>
					</div>
				</li>
				<li class="ui dropdown">
					<a href="#" class="option_links" title="Notifications"><i class='uil uil-bell'></i><span class="noti_count">3</span></a>
					<div class="menu dropdown_mn">
						<a href="#" class="channel_my item">
							<div class="profile_link">
								<img src="/images/left-imgs/img-1.jpg" alt="">
								<div class="pd_content">
									<h6>Rock William</h6>
									<p>Like Your Comment On Video <strong>How to create sidebar menu</strong>.</p>
									<span class="nm_time">2 min ago</span>
								</div>							
							</div>							
						</a>
						<a href="#" class="channel_my item">
							<div class="profile_link">
								<img src="/images/left-imgs/img-2.jpg" alt="">
								<div class="pd_content">
									<h6>Jassica Smith</h6>
									<p>Added New Review In Video <strong>Full Stack PHP Developer</strong>.</p>
									<span class="nm_time">12 min ago</span>
								</div>							
							</div>							
						</a>
						<a href="#" class="channel_my item">
							<div class="profile_link">
								<img src="/images/left-imgs/img-9.jpg" alt="">
								<div class="pd_content">
									<p> Your Membership Approved <strong>Upload Video</strong>.</p>
									<span class="nm_time">20 min ago</span>
								</div>							
							</div>							
						</a>
						<a class="vbm_btn" href="instructor_notifications.html">View All <i class='uil uil-arrow-right'></i></a>
					</div>
				</li>

			
         <li v-if="!auth || !auth.token" class="list-inline-item g-mx-4"><a class="g-color-black g-color-primary--hover g-text-underline--none--hover" @click="goPath('form/login')">{{l('LOGIN','g')}}</a></li>            
        	<li class="ui dropdown" v-else-if="auth && auth.token">
					<a  @click="goPath('account/dashboard')" class="opts_account" title="Account">
						<img src="/images/hd_dp.jpg" alt="">
					</a>
					<div class="menu dropdown_account">
						<div class="channel_my">
							<div class="profile_link">
								<img src="/images/hd_dp.jpg" alt="">
								<div class="pd_content">
									<div class="rhte85">
										<h6>{{auth.fullName}}</h6>
										<div class="mef78" title="Verify">
											<i class='uil uil-check-circle'></i>
										</div>
									</div>
									<span>gambol943@gmail.com</span>
								</div>							
							</div>
							<a href="my_instructor_profile_view.html" class="dp_link_12">View Instructor Profile</a>						
						</div>
						<div class="night_mode_switch__btn">
							<a href="#" id="night-mode" class="btn-night-mode">
								<i class="uil uil-moon"></i> Night mode
								<span class="btn-night-mode-switch">
									<span class="uk-switch-button"></span>
								</span>
							</a>
						</div>
						<a href="instructor_dashboard.html" class="item channel_item">Cursus dashboard</a>						
						<a href="membership.html" class="item channel_item">Paid Memberships</a>
						<a href="setting.html" class="item channel_item">Setting</a>
						<a href="help.html" class="item channel_item">Help</a>
						<a href="feedback.html" class="item channel_item">Send Feedback</a>
						<a href="sign_in.html" class="item channel_item">Sign Out</a>
					</div>
				</li>
			</ul>
		</div>
	</header>
	<!-- Header End -->
	<!-- Left Sidebar Start -->
	<nav class="vertical_nav">
		<div class="left_section menu_left" id="js-menu" >
			<div class="left_section">
				<ul>
					<li class="menu--item">
						<a href="index.html" class="menu--link active" title="Home">
							<i class='uil uil-home-alt menu--icon'></i>
							<span class="menu--label">Home</span>
						</a>
					</li>
					<li class="menu--item">
						<a href="live_streams.html" class="menu--link" title="Live Streams">
							<i class='uil uil-kayak menu--icon'></i>
							<span class="menu--label">Live Streams</span>
						</a>
					</li>
					<li class="menu--item">
						<a href="explore.html" class="menu--link" title="Explore">
							<i class='uil uil-search menu--icon'></i>
							<span class="menu--label">Explore</span>
						</a>
					</li>
					<li class="menu--item menu--item__has_sub_menu">
						<label class="menu--link" title="Categories">
							<i class='uil uil-layers menu--icon'></i>
							<span class="menu--label">Categories</span>
						</label>
						<ul class="sub_menu">
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Development</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Business</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Finance & Accounting</a>
							</li>
							<li class="sub_menu--item">
								<a href="#.html" class="sub_menu--link">IT & Software</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Office Productivity</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Personal Development</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Design</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Marketing</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Lifestyle</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Photography</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Health & Fitness</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Music</a>
							</li>
							<li class="sub_menu--item">
								<a href="#" class="sub_menu--link">Teaching & Academics</a>
							</li>
						</ul>
					</li>
					<li class="menu--item  menu--item__has_sub_menu">
						<label class="menu--link" title="Tests">
						  <i class='uil uil-clipboard-alt menu--icon'></i>
						  <span class="menu--label">Tests</span>
						</label>
						<ul class="sub_menu">
							<li class="sub_menu--item">
								<a href="certification_center.html" class="sub_menu--link">Certification Center</a>
							</li>
							<li class="sub_menu--item">
								<a href="certification_start_form.html" class="sub_menu--link">Certification Fill Form</a>
							</li>
							<li class="sub_menu--item">
								<a href="certification_test_view.html" class="sub_menu--link">Test View</a>
							</li>
							<li class="sub_menu--item">
								<a href="certification_test__result.html" class="sub_menu--link">Test Result</a>
							</li>
							<!-- <li class="sub_menu--item">
								<a href="http://www.gambolthemes.net/html-items/edututs+/Instructor_Dashboard/my_certificates.html" class="sub_menu--link">My Certification</a>
							</li> -->
						</ul>
					</li>
					<li class="menu--item">
						<a href="saved_courses.html" class="menu--link" title="Saved Courses">
						  <i class="far fa-heart-alt menu--icon"></i>
						  <span class="menu--label">Saved Courses</span>
						</a>
					</li>
					<li class="menu--item  menu--item__has_sub_menu">
						<label class="menu--link" title="Pages">
						  <i class='uil uil-file menu--icon'></i>
						  <span class="menu--label">Pages</span>
						</label>
						<ul class="sub_menu">
							<li class="sub_menu--item">
								<a href="about_us.html" class="sub_menu--link">About</a>
							</li>
							<li class="sub_menu--item">
								<a href="sign_in.html" class="sub_menu--link">Sign In</a>
							</li>
							<li class="sub_menu--item">
								<a href="sign_up.html" class="sub_menu--link">Sign Up</a>
							</li>
							<li class="sub_menu--item">
								<a href="sign_up_steps.html" class="sub_menu--link">Sign Up Steps</a>
							</li>
							<li class="sub_menu--item">
								<a href="membership.html" class="sub_menu--link">Paid Membership</a>
							</li>
							<li class="sub_menu--item">
								<a href="course_detail_view.html" class="sub_menu--link">Course Detail View</a>
							</li>
							<li class="sub_menu--item">
								<a href="checkout_membership.html" class="sub_menu--link">Checkout</a>
							</li>
							<li class="sub_menu--item">
								<a href="invoice.html" class="sub_menu--link">Invoice</a>
							</li>
							<li class="sub_menu--item">
								<a href="career.html" class="sub_menu--link">Career</a>
							</li>
							<li class="sub_menu--item">
								<a href="apply_job.html" class="sub_menu--link">Job Apply</a>
							</li>
							<li class="sub_menu--item">
								<a href="our_blog.html" class="sub_menu--link">Our Blog</a>
							</li>
							<li class="sub_menu--item">
								<a href="blog_single_view.html" class="sub_menu--link">Blog Detail View</a>
							</li>
							<li class="sub_menu--item">
								<a href="company_details.html" class="sub_menu--link">Company Details</a>
							</li>
							<li class="sub_menu--item">
								<a href="press.html" class="sub_menu--link">Press</a>
							</li>
							<li class="sub_menu--item">
								<a href="live_output.html" class="sub_menu--link">Live Stream View</a>
							</li>
							<li class="sub_menu--item">
								<a href="add_streaming.html" class="sub_menu--link">Add live Stream</a>
							</li>
							<li class="sub_menu--item">
								<a href="search_result.html" class="sub_menu--link">Search Result</a>
							</li>
							<li class="sub_menu--item">
								<a href="thank_you.html" class="sub_menu--link">Thank You</a>
							</li>
							<li class="sub_menu--item">
								<a href="coming_soon.html" class="sub_menu--link">Coming Soon</a>
							</li>
							<li class="sub_menu--item">
								<a href="error_404.html" class="sub_menu--link">Error 404</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="left_section">
				<h6 class="left_title">SUBSCRIPTIONS</h6>
				<ul>
					<li class="menu--item">
						<a href="instructor_profile_view.html" class="menu--link user_img">
							<img src="/images/left-imgs/img-1.jpg" alt="">
							Rock Smith
							<div class="alrt_dot"></div>
						</a>
					</li>
					<li class="menu--item">
						<a href="instructor_profile_view.html" class="menu--link user_img">
							<img src="/images/left-imgs/img-2.jpg" alt="">
							Jassica William
						</a>
						<div class="alrt_dot"></div>
					</li>
					<li class="menu--item">
						<a href="all_instructor.html" class="menu--link" title="Browse Instructors">
						  <i class='uil uil-plus-circle menu--icon'></i>
						  <span class="menu--label">Browse Instructors</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="left_section pt-2">
				<ul>
					<li class="menu--item">
						<a href="setting.html" class="menu--link" title="Setting">
							<i class='uil uil-cog menu--icon'></i>
							<span class="menu--label">Setting</span>
						</a>
					</li>
					<li class="menu--item">
						<a href="help.html" class="menu--link" title="Help">
							<i class='uil uil-question-circle menu--icon'></i>
							<span class="menu--label">Help</span>
						</a>
					</li>
					<li class="menu--item">
						<a href="report_history.html" class="menu--link" title="Report History">
							<i class='uil uil-windsock menu--icon'></i>
							<span class="menu--label">Report History</span>
						</a>
					</li>
					<li class="menu--item">
						<a href="feedback.html" class="menu--link" title="Send Feedback">
							<i class='uil uil-comment-alt-exclamation menu--icon'></i>
							<span class="menu--label">Send Feedback</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="left_footer">
				<ul>
					<li><a href="about_us.html">About</a></li>
					<li><a href="press.html">Press</a></li>
					<li><a href="contact_us.html">Contact Us</a></li>
					<li><a href="coming_soon.html">Advertise</a></li>
					<li><a href="coming_soon.html">Developers</a></li>
					<li><a href="terms_of_use.html">Copyright</a></li>
					<li><a href="terms_of_use.html">Privacy Policy</a></li>
					<li><a href="terms_of_use.html">Terms</a></li>
				</ul>
				<div class="left_footer_content">
					<p>© 2020 <strong>Cursus</strong>. All Rights Reserved.</p>
				</div>
			</div>
		</div>
	</nav>
</div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";

export default {
  mixins: [general],
  watch: {
    "$route.path"(to, from) {
      this.keyMenu = "k" + Math.random(100, 9999999);

      if (process.client) {
        // $(document).ready(function() {
        //   setTimeout(() => {
        //     $(".hamburger").removeClass("is-active");
        //   }, 200);
        // });
      }
    }
  },
  data: () => ({
    languages: [
      { value: "tr", name: "Turkish" },
      { value: "en", name: "English" }
    ],
    collapse:false,
    searchText:'',
    keyMenu: "keyMenu",
    topBar:{},
    topIsVisible:false
  }),
  computed: {
    LOCALE() {
      return this.$store.state.locale;
    },
    auth() {
      return this.$store.state.user.auth;
    },
    isMobile() {
      return this.$device.isMobile;
    },
    categories(){
      return this.$store.state.course.categories;
    }
  },
  created() {
    this.getLikes(); 
    this.$store.dispatch("course/getCourseCategories"); 
  },
  methods:{
   
  },

  mounted() {
   

 

var tid = setInterval( function () {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );


  var querySelector = document.querySelector.bind(document);

  var nav = document.querySelector('.vertical_nav');
  var wrapper = document.querySelector('.wrapper');

  var menu = document.getElementById("js-menu");
  var subnavs = menu.querySelectorAll('.menu--item__has_sub_menu');    

  // Toggle menu click
  querySelector('.toggle_menu').onclick = function () {

    nav.classList.toggle('vertical_nav__opened');

    wrapper.classList.toggle('toggle-content');

  };


  // Minify menu on menu_minifier click
  querySelector('.collapse_menu').onclick = function () {

    nav.classList.toggle('vertical_nav__minify');

    wrapper.classList.toggle('wrapper__minify');

    for (var j = 0; j < subnavs.length; j++) {
      subnavs[j].classList.remove('menu--subitens__opened');
    }

  };


  // Open Sub Menu
  
  for (var i = 0; i < subnavs.length; i++) {
    
    if (subnavs[i].classList.contains('menu--item__has_sub_menu') ) {
      
      subnavs[i].querySelector('.menu--link').addEventListener('click', function (e) {

          for (var j = 0; j < subnavs.length; j++) {

            if(e.target.offsetParent != subnavs[j])
              subnavs[j].classList.remove('menu--subitens__opened');          

          }

          e.target.offsetParent.classList.toggle('menu--subitens__opened');

      }, false);

    }
  }


}, 100 );


  }

}
</script>
 