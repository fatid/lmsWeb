<template>
    	
				<div class="row"  :class="reverseClass">
					<div class="col-xl-9 col-lg-8">
						
						<div class="mt-50">
							<h4 class="item_title">{{l('Start search')}}</h4>
							 
							<div class="la5lo1 search_keyword">
								<i class="search_icon fa fa-search"></i>
								<input type="text" v-model="search"  class="" :placeholder="l('Search','g')" />
							</div>
						</div>
					</div>	 	 
					<div class="col-xl-3 col-lg-4">
						<div class="right_side">
							 
							<div class="fcrse_3">
								<div class="cater_ttle">
									<h4>{{l('Become a member','g')}}</h4>
								</div>
								<div class="live_text">
									<div class="live_icon"><i class="uil uil-kayak"></i></div>
									<div class="live-content">
										<p>Set up your account and start to learn Arabic.</p>
										<button class="live_link" @click="goPath('/form/login')">Get Started</button>
										<span class="livinfo">Info : This feature only for 'Instructors'.</span>
									</div>
								</div>
							</div>
							<div class="get1452">
								<h4>Get personalized recommendations</h4>
								<p>Answer a few questions for your top picks</p>
								<button class="Get_btn" onclick="window.location.href = '#';">Get Started</button>
							</div>
							<div class="fcrse_3">
								<div class="cater_ttle">
									<h4>Top Categories</h4>
								</div>
								<ul class="allcate15">
									<li><a href="#" class="ct_item"><i class="uil uil-arrow"></i>Development</a></li>
									<li><a href="#" class="ct_item"><i class="uil uil-graph-bar"></i>Business</a></li>
									<li><a href="#" class="ct_item"><i class="uil uil-monitor"></i>IT and Software</a></li>
									<li><a href="#" class="ct_item"><i class="uil uil-ruler"></i>Design</a></li>
									<li><a href="#" class="ct_item"><i class="uil uil-chart-line"></i>Marketing</a></li>
									<li><a href="#" class="ct_item"><i class="uil uil-book-open"></i>Personal Development</a></li>
									<li><a href="#" class="ct_item"><i class="uil uil-camera"></i>Photography</a></li>
									<li><a href="#" class="ct_item"><i class="uil uil-music"></i>Music</a></li>
								</ul>
							</div>
							<div class="strttech120">
								<h4>Become an Instructor</h4>
								<p>Top instructors from around the world teach millions of students on Cursus. We provide the tools and skills to teach what you love.</p>
								<button class="Get_btn" onclick="window.location.href = '#';">Start Teaching</button>
							</div>
						</div>
					</div>
				 
				<input type="checkbox" class="ui checkbox" />
			</div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";

export default {
  mixins: [general],
layout: 'default',
  data: () => ({
    data: []
  }),
  computed: {
    courseOrders() {
      return this.$store.state.course.orders;
    },
    LOCALE() {
      return this.$store.state.locale;
    },
    auth() {
      return this.$store.state.user.auth;
    },
	reverseClass(){
	 return this.LOCALE=='ar' ? ' flex-row-reverse' : ''
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
      group: "co_labels",
      fields: "id,cou_label_name"
    });
    this.$store.dispatch("course/getCourseOrders", {});
    this.data = this.$store.state.likes;
  },
  methods: {}
};
</script>
<style lang="scss">
.image-inside {
  width: 40px;
  height: auto;
  margin-right: 10px;
}
.box-inside {
  background: #efefef;
  border-radius: 0.35rem;
  height: 40px;
  margin-right: 10px;
  width: 40px;
}
.toolbar-cart {
  position: absolute;
  top: 20px;
  right: 20px;
}
.my_crse_1{
	margin-bottom: 15px
}

.search_keyword{
position: relative;
	input{
		padding: 20px 20px 20px 50px;
		border-radius: 30px;
		border: 1px solid #f9f9f9;
		width: 100%;
		
	}
	i.search_icon{
		position: absolute;
		left: 20px;
		top: 20px;
		font-size: 20px;
		color:#aaa;
	}
}
.search-header{
  display:inline-flex;
  width:100%;
  padding: 10px 0px;
  justify-content: space-between;
  border-bottom: 1px solid #d0d0d0;
  margin-bottom: 10px;
  .title-field{

    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
  }
  .search-field{
    .input-std{
      border: 1px solid #d0d0d0;
      border-radius: 10px;
      padding: 7px 10px;
    }
  } 
}
</style>
