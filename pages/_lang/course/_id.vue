<template>
  <div class="container">
    <div class="_215b01">
			<div class="container-fluid">			
				<div class="row">
					<div class="col-lg-12">
						<div class="section3125">							
							<div class="row justify-content-center">						
								<div class="col-xl-4 col-lg-5 col-md-6">						
									<div class="preview_video">						
										<a href="#" class="fcrse_img" data-toggle="modal" data-target="#videoModal">
											<img :src="show_image(data.cou_image,'150','150','c','')" alt="" />
											<div class="course-overlay">
												<div class="badge_seller">{{getOptName(data.cou_level,'co_level','cou_level_name')}}</div>
												<span class="play_btn1"><i class="uil uil-play"></i></span>
												<span class="_215b02">{{l('Preview this course','g')}}</span>
											</div>
										</a>
									</div>
									<div class="_215b10">										
										<a href="#" class="_215b11" @click="setLikes(data)" v-if="!isLiked(data.id)">										
											<span>
                          <i class="uil uil-heart red" ></i> 
                          </span>{{l('Save','g')}}
										</a>
										<a href="#" class="_215b11" @click="removeLikes(data.id)" v-else>										
											<span>
                          <i class="uil uil-heart red" ></i> 
                          </span>{{l('Remove Save','g')}}
										</a>
										<a href="#" class="_215b12">										
											<span><i class="uil uil-windsock"></i></span> {{l('Report abuse','g')}} 
										</a>
									</div>
								</div>
								<div class="col-xl-8 col-lg-7 col-md-6">
									<div class="_215b03">
										<h2>{{data.cou_name}}</h2>
										<span class="_215b04">{{data.cou_short}} </span>
									</div>
									<div class="_215b05">
										<div class="crse_reviews mr-2">
											<i class="uil uil-star"></i>4.5
										</div>
										(N/A ratings)
									</div>
									<div class="_215b05">										
										0 students enrolled
									</div>
									 
									<div class="_215b05">										
										{{l('Last updated','g')}} 04/2021
									</div>
									<!-- <ul class="_215b31">										
										<li><button class="btn_adcart">Add to Cart</button></li>
										<li><button class="btn_buy">Buy Now</button></li>
									</ul> -->
									<div class="_215fgt1">										
										{{data.cou_campaign_text}}
									</div>
								</div>							
							</div>							
						</div>							
					</div>															
				</div>
			</div>
		</div>
		<div class="_215b15 _byt1458">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
 
						<!-- <div class="user_dt5">
							<div class="user_dt_left">
								<div class="live_user_dt">
									<div class="user_img5">
										<a href="#"><img src="images/left-imgs/img-1.jpg" alt=""></a>												
									</div>
									<div class="user_cntnt">
										<a href="#" class="_df7852">Johnson Smith</a>
										<button class="subscribe-btn">Subscribe</button>
									</div>
								</div>
							</div>
							<div class="user_dt_right">
								<ul>
									<li>
										<a href="#" class="lkcm152"><i class="uil uil-eye"></i><span>1452</span></a>
									</li>
									<li>
										<a href="#" class="lkcm152"><i class="uil uil-thumbs-up"></i><span>100</span></a>
									</li>
									<li>
										<a href="#" class="lkcm152"><i class="uil uil-thumbs-down"></i><span>20</span></a>
									</li>
									<li>
										<a href="#" class="lkcm152"><i class="uil uil-share-alt"></i><span>9</span></a>
									</li>
								</ul>
							</div>
						</div> -->
						<div class="course_tabs">
							<nav>
								<div class="nav nav-tabs tab_crse justify-content-center" id="nav-tab" role="tablist">
									<a class="nav-item nav-link active" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-selected="true">{{l('About','g')}}</a>
									<a class="nav-item nav-link" id="nav-courses-tab" data-toggle="tab" href="#nav-courses" role="tab" aria-selected="false">{{l('Courses Content','g')}}</a>
									<a class="nav-item nav-link" id="nav-reviews-tab" data-toggle="tab" href="#nav-reviews" role="tab" aria-selected="false">{{l('Reviews','g')}}</a>
								</div>
							</nav>						
						</div>
					</div>
				</div>
			</div>
		</div>
   <div class="_215b17">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="course_tab_content">
							<div class="tab-content" id="nav-tabContent">
								<div class="tab-pane fade show active" id="nav-about" role="tabpanel"> 	
                    <div  v-html="HtmlEncode(data.cou_description)" class="tab-height"></div> 
                </div>
								<div class="tab-pane fade" id="nav-courses" role="tabpanel">
									<div class="crse_content">
										<h3>{{l('Course content','g')}}</h3>
										<div class="_112456">
											<ul class="accordion-expand-holder">
												<li><span class="accordion-expand-all _d1452">Expand all</span></li>
												<li><span class="_fgr123"></span></li>
												<li><span class="_fgr123"></span></li>
											</ul>
										</div>
										<div id="accordion" class="ui-accordion ui-widget ui-helper-reset">
											<div v-for="unit in units">
                      							<a href="javascript:void(0)" @click="unit.accordion=!unit.accordion" class="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all">												
														<div class="section-header-left">
															<span class="section-title-wrapper"> 
																<img :src="show_image(unit.unit_image,'80','80','c','')" />   
																<span class="section-title-text">{{unit.unit_name}}</span>
															</span>
														</div>
														<div class="section-header-right">
															<span class="num-items-in-section">{{l('Not Started','g')}}</span>
															<span class="section-header-length">%0</span>
														</div>
												</a>
											<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
											 
												<div class="lecture-container" v-for="(les,num) in getCourses(unit.id)"
													@click="goPath('course/'+unit.id+'/'+les.id)" :class=" unit.accordion ? 'lecture-hidden' :''" >
														<div class="left-content-number">
																{{num}}
														</div>				
													<div class="left-content"> 
														<div class="top">
															<div class="title">{{les.lesson_name}}</div>
														</div>
													</div>
													<div class="details">
														<span class="content-summary">{{les.lesson_type}}</span>
													</div>
													<div class="end-detail">
														<i :class='getCourseIcon(les)' class="icon_142"></i>
														<div class="title">{{les.lesson_total_time | minuteDuration}}</div>
													</div>
												</div> 
											</div>
											</div> 
											</div> 
											</div> 
								</div>
								<div class="tab-pane fade" id="nav-reviews" role="tabpanel">
									<div class="student_reviews">
										<div class="row">
											<div class="col-lg-5">
												<div class="reviews_left">
													<h3>Student Feedback</h3>
													<div class="total_rating">
														<div class="_rate001">4.6</div>														
														<div class="rating-box">
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star half-star"></span>
														</div>
														<div class="_rate002">Course Rating</div>	
													</div>
													<div class="_rate003">
														<div class="_rate004">
															<div class="progress progress1">
																<div class="progress-bar w-70" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
															<div class="rating-box">
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
															</div>
															<div class="_rate002">70%</div>
														</div>
														<div class="_rate004">
															<div class="progress progress1">
																<div class="progress-bar w-30" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
															<div class="rating-box">
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star empty-star"></span>
															</div>
															<div class="_rate002">40%</div>
														</div>
														<div class="_rate004">
															<div class="progress progress1">
																<div class="progress-bar w-5" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
															<div class="rating-box">
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star empty-star"></span>
																<span class="rating-star empty-star"></span>
															</div>
															<div class="_rate002">5%</div>
														</div>
														<div class="_rate004">
															<div class="progress progress1">
																<div class="progress-bar w-2" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
															<div class="rating-box">
																<span class="rating-star full-star"></span>
																<span class="rating-star full-star"></span>
																<span class="rating-star empty-star"></span>
																<span class="rating-star empty-star"></span>
																<span class="rating-star empty-star"></span>
															</div>
															<div class="_rate002">1%</div>
														</div>
														<div class="_rate004">
															<div class="progress progress1">
																<div class="progress-bar w-1" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
															<div class="rating-box">
																<span class="rating-star full-star"></span>
																<span class="rating-star empty-star"></span>
																<span class="rating-star empty-star"></span>
																<span class="rating-star empty-star"></span>
																<span class="rating-star empty-star"></span>
															</div>
															<div class="_rate002">1%</div>
														</div>
													</div>
												</div>												
											</div>
											<div class="col-lg-7">
												<div class="review_right">
													<div class="review_right_heading">
														<h3>Reviews</h3>
														<div class="review_search">
															<input class="rv_srch" type="text" placeholder="Search reviews...">
															<button class="rvsrch_btn"><i class='uil uil-search'></i></button>
														</div>
													</div>
												</div>
												<div class="review_all120">
													<div class="review_item">
														<div class="review_usr_dt">
															<img src="images/left-imgs/img-1.jpg" alt="">
															<div class="rv1458">
																<h4 class="tutor_name1">John Doe</h4>
																<span class="time_145">2 hour ago</span>
															</div>
														</div>
														<div class="rating-box mt-20">
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star half-star"></span>
														</div>
														<p class="rvds10">Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.</p>
														<div class="rpt100">
															<span>Was this review helpful?</span>
															<div class="radio--group-inline-container">
																<div class="radio-item">
																	<input id="radio-1" name="radio" type="radio">
																	<label for="radio-1" class="radio-label">Yes</label>
																</div>
																<div class="radio-item">
																	<input id="radio-2" name="radio" type="radio">
																	<label  for="radio-2" class="radio-label">No</label>
																</div>
															</div>
															<a href="#" class="report145">Report</a>
														</div>
													</div>
												 
													 
													<div class="review_item">
														<a href="#" class="more_reviews">See More Reviews</a>
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
    data: [],
    units:[],
    lessons:[],
  }),
  async created() {
   
    await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
            group: 'co_level',
            fields:"id,cou_level_name"
    });
    await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
            group: 'co_labels',
            fields:'id,cou_label_name'
    });
    
     this.getCourse(); 
  },
  methods: {

	  getCourseIcon(les){
		if(les.lesson_type=="Course" && les.lesson_video ){
				return 'uil uil-play-circle'
		}else if(les.lesson_type=="Course" && les.lesson_photo ){
				return 'far fa-file-image'
		}else if(les.lesson_type=="Course" && les.lesson_description ){
				return 'fal fa-file-alt' 
		}else if(les.lesson_type=="Exam"){
				return 'far fa-check-square'  
		}else if(les.lesson_type=="Content"){
				return 'far fa-file-alt'  
		}else if(les.lesson_type=="Document"){
				return 'fas fa-file-download'   
		}
	  },
      async getUnits(prev) { 
      let fields = `unit_name,unit_image,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1], prev_id:["=",prev] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "unite",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
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
			  d.map(element => {
				return {...element,accordion:false}
			  });
              this.units = d;
            } else {
              this.units = {};
            }
          })
          .catch(e => {
            this.questions = {};
            console.log(e);
          });
      });
     
  },
  getCourses(prev){

	  return this.lessons.filter(k=> k.lesson_unite == prev)
  },
	async getLesson(prev) { 
      let fields = `lesson_photo,lesson_unite,lesson_type,lesson_total_time,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video`;

      let filters = { status: ["=", 1], prev_id:["=",prev] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "lesson",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
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
              this.lessons = d;
            } else {
              this.lessons = {};
            }
          })
          .catch(e => {
            this.lessons = {};
            console.log(e);
          });
      });
     
  },
    async getCourse() { 
      console.log("this.pageInfo",this.pageInfo)
      if(this.pageInfo && this.pageInfo.wa_content_id){
      let fields = `cou_name,cou_level,cou_campaign_text,cou_short,cou_category,cou_tags,cou_total_time,cou_image,cou_description,cou_total_view,id,status,created_on,created_by,id,status`;
      // console.log("pageData",this.pageInfo)
      let filters = { status: ["=", 1] , id:["=",this.pageInfo.wa_content_id] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "courses",
          method: "get",
          params: {
            limit: 1,
            offset: 0,
            fields,
            lang: this.$store.state.locale,
            sort: ["pdb_date,DESC"],
            filter: filters
          }
        })
          .then(response => {
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {


              let d = response.data.formattedData[0];
              let x= unescape(d.cou_description);
               
              this.getUnits(d.id);
              this.getLesson(d.id);
              this.data = d;
            } else {
              this.data = {};
            }
          })
          .catch(e => {
            this.data = {};
            console.log(e);
          });
      });
    
    }
    }
  }
};
</script>
<style lang="scss">
.image-inside {
  width: 40px;
  height: auto;
  margin-right: 10px;
}
.left-content-number{
	position: relative;
	height: 25px;
	width: 25px;
	border-radius: 50%;
	background: gray;
	padding: 5px 0px;
	text-align: center;
	color: #fff;
	&.completed{
			background: rgb(14, 151, 66);
	}
}
.box-inside {
  background: #efefef;
  border-radius: 0.35rem;
  height: 40px;
  margin-right: 10px;
  width: 40px;
  font-family: Cairo;
}
.toolbar-cart{
	position: absolute;
	top: 20px;
	right: 20px;
}
.lecture-hidden{
	display: hidden;
}

.end-detail{
	margin-left:20px;
	width:90px;
	text-align:right;
}
.tab-height{
	min-height: 500px;
}
.download_btn{
    color: #fff!important;
}
</style>
