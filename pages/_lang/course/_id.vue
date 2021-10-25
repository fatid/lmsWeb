<template>
  <div class="width-100">
 <div class="_215b01">
     <div class="section3125">
       <div class="container">
    
              <div class="row justify-content-center">
                <div  style="width:170px;">
                  <div class="preview_video">
                    <a
                      href="#"
                      class="fcrse_img"
                      data-toggle="modal"
                      data-target="#videoModal"
                    >
                      <img
                        :src="show_image(data.cou_image, '150', '150', 'c', '')"
                        alt=""
                      />
                      <div class="course-overlay">
                        <div class="badge_seller">
                          {{
                            getOptName(
                              data.cou_level,
                              "co_level",
                              "cou_level_name"
                            )
                          }}
                        </div>
                       
                    
                      </div>
                    </a>
                  </div>
                  <div class="_215b10"> 
                    <a href="#" @click="$store.state.isErrorReportVisible=true" class="_215b12">
                      <span><i class="far fa-envelope"></i></span>
                      {{ l("Report abuse", "g") }}
                    </a>
                  </div>
                </div>
               
         
                <div class="col-xl-8 col-lg-auto">
                  <div class="_215b03">
                    <h2>{{ data.cou_name }}</h2>
                    <span class="_215b04">{{ data.cou_short }} </span>
                    <div class="width-100 margin-top-10 mt-10 g-mt-10"> 
                          <a v-if="!isCourseSelected" href="#"  @click="joinCourse(data)" class="btn btn-primary">
                          <span><i class="fas fa-sign-in-alt"></i></span>
                          {{ l("Join Course", "g") }}
                        </a>
                          <a v-else href="#"  @click="joinCourse(data)" class="btn btn-primary">
                          <span><i class="fas fa-sign-in-alt"></i></span>
                          {{ l("You've already joined course", "g") }}
                        </a>
                  </div>
                  </div>
                  <!-- <div class="_215b05">
                    <div class="crse_reviews mr-2">
                      <i class="uil uil-star"></i>4.5
                    </div> 
                  </div>
                  <div class="_215b05">
              
                  </div>

                  <div class="_215b05">
                    {{ l("Last updated", "g") }} 
                    
                  </div> -->
                  <!-- <ul class="_215b31">										
										<li><button class="btn_adcart">Add to Cart</button></li>
										<li><button class="btn_buy">Buy Now</button></li>
									</ul> -->
                  <div class="_215fgt1">
                    {{ data.cou_campaign_text }}
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>


  <div class="container">
    

    <div class="_215b15 _byt1458">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12"> 
            <div class="course_tabs">
              <nav>
                <div
                  class="nav nav-tabs tab_crse justify-content-center"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    class="nav-item nav-link active"
                    id="nav-about-tab"
                    v-scroll-to="'#crse_text'"
                    role="tab"
                    aria-selected="true"
                    >{{ l("About", "g") }}</a
                  >
                  <a
                    v-scroll-to="'#crse_content'"
                    class="nav-item nav-link"
                    id="nav-courses-tab"
                    role="tab"
                    aria-selected="false"
                    >{{ l("Courses Content", "g") }}</a
                  >
                  <a
                    v-scroll-to="'#crse_comment'"
                    class="nav-item nav-link"
                    id="nav-reviews-tab"
                    role="tab"
                    aria-selected="false"
                    >{{ l("Reviews", "g") }}</a
                  >
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
          <div
            v-html="HtmlEncode(data.cou_description)"
            id="crse_text"
            class="tab-height"
          ></div>

          <div class="crse_content " id="crse_content">
            <h3>{{ l("Course content", "g") }}</h3>
            <div class="_112456">
              <ul class="accordion-expand-holder">
                <!-- <li>
                  <span class="accordion-expand-all _d1452">Expand all</span>
                </li> -->
                <li><span class="_fgr123"></span></li>
                <li><span class="_fgr123"></span></li>
              </ul>
            </div>
            <div id="accordion" class="ui-accordion ui-widget ui-helper-reset">
              <div v-for="unit in units">
                <a
                  href="javascript:void(0)"
                  @click="unit.accordion = !unit.accordion"
                  class="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all"
                >
                  <div class="section-header-left">
                    <span class="section-title-wrapper">
                      <img
                        :src="show_image(unit.unit_image, '80', '80', 'c', '')"
                      />
                      <span class="section-title-text">{{
                        unit.unit_name
                      }}</span>
                    </span>
                  </div>
                  <div class="section-header-right">
                    <span class="num-items-in-section">
                      <!-- {{
                        unit.stats
                          ? unit.stats.totalCompletedRate == 100
                            ? l("Completed", "g")
                            : unit.stats.totalCompletedRate > 0
                            ? l("Ongoing", "g")
                            : l("Not Started", "g")
                          : l("Not Started", "g")
                      }} -->
                      <!-- <a class="btn btn-primary">Start Course</a> -->
                    </span>
                    <span class="section-header-length">
                      %{{
                        unit.stats ? unit.stats.totalCompletedRate : "0"
                      }}</span
                    >
                  </div>
                </a>

                <div
                  class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
                >
                  <div
                    class="lecture-container"
                    v-for="(les, num) in filterSections(unit.id)"
                    
                    :class="unit.accordion ? 'lecture-hidden' : ''"
                  >
                    <div style="display: inline-flex; min-width: 50%;">
                    <div class="left-content-number">
                      {{ num + 1 }}
                    </div>
                    <div class="left-content" @click="goPath('course/' + les.id + '/' + les.id)"
                      @click.middle="goPathBlank('course/' + les.prev_Id + '/' + les.id)"
                    >
                      <div class="top">
                        <div class="title">{{ les.section_name }}</div>
                      </div>
                    </div>
                    
                    </div>
                <div style="display: inline-flex; min-width: 50%;     justify-content: end;">
                       <a    
                        href="javascript:;"  
                        class="_215b11"
                        v-if="!isLiked(les.id)"
                        @click="openLikeModal(les,unit,'Course')"
                      >  <span class="text-black">
                        <svg id="bold" enable-background="new 0 0 24 24" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.63-3.26-.04.01-.08.01-.13.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54.65-1.01 1.49-1.87 2.48-2.54h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1 0 .05 0 .09-.01.13.93-.38 1.95-.6 3.01-.62v-5.76c0-1.52-1.23-2.75-2.75-2.75zm-6.25 6h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"/><path d="m17.25 10.5c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75-3.028-6.75-6.75-6.75zm2.75 7.75h-1.75v1.75c0 .552-.448 1-1 1s-1-.448-1-1v-1.75h-1.75c-.552 0-1-.448-1-1s.448-1 1-1h1.75v-1.75c0-.552.448-1 1-1s1 .448 1 1v1.75h1.75c.552 0 1 .448 1 1s-.448 1-1 1z"/></svg> </span> 
                      </a>
                      <a    
                        href="javascript:;" 
                        class="_215b11"
                        v-else
                        @click="removeLikeModal(les,unit,'Course')"
                      >  <span class="text-red">    <svg id="bold" enable-background="new 0 0 24 24" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.63-3.26-.04.01-.08.01-.13.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54.65-1.01 1.49-1.87 2.48-2.54h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1 0 .05 0 .09-.01.13.93-.38 1.95-.6 3.01-.62v-5.76c0-1.52-1.23-2.75-2.75-2.75zm-6.25 6h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"/><path d="m17.25 10.5c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75-3.028-6.75-6.75-6.75zm2.75 7.75h-1.75v1.75c0 .552-.448 1-1 1s-1-.448-1-1v-1.75h-1.75c-.552 0-1-.448-1-1s.448-1 1-1h1.75v-1.75c0-.552.448-1 1-1s1 .448 1 1v1.75h1.75c.552 0 1 .448 1 1s-.448 1-1 1z"/></svg> 
                     </span> 
                      </a>
                      <!-- <span class="content-summary">{{ les.lesson_type }}   </span> -->
                  
                   
                  
                    <div class="end-detail"  v-if="!myLessonLoading"> 
                         <a class="btn btn-success" v-if="my_lessons_formatted[les.id] &&  my_lessons_formatted[les.id].cl_is_completed">Finished</a>
                         <a class="btn btn-primary"  @click="goPath('course/' + les.id + '/' + les.id)" v-else-if="my_lessons_formatted[les.id] && my_lessons_formatted[les.id].cl_completed_list">Continue</a>
                         <a class="btn btn-default"  @click="goPath('course/' + les.id + '/' + les.id)" v-else>Start</a> 
                    </div>
                   
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="student_reviews" id="crse_comment"  >
            <div class="row">
              <div class="col-lg-5">
                <div class="reviews_left">
                  <h3>Feedback</h3>
                  <!-- <div class="total_rating">
                    <div class="_rate001">-</div>
                    <div class="rating-box">
                      <span class="rating-star full-star"></span>
                      <span class="rating-star full-star"></span>
                      <span class="rating-star full-star"></span>
                      <span class="rating-star full-star"></span>
                      <span class="rating-star full-star"></span>
                    </div> 
                  </div> -->
                  <!-- <div class="_rate003">
                    <div class="_rate004">
                      <div class="progress progress1">
                        <div
                          class="progress-bar w-70"
                          role="progressbar"
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
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
                        <div
                          class="progress-bar w-30"
                          role="progressbar"
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
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
                        <div
                          class="progress-bar w-5"
                          role="progressbar"
                          aria-valuenow="10"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
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
                        <div
                          class="progress-bar w-2"
                          role="progressbar"
                          aria-valuenow="2"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
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
                        <div
                          class="progress-bar w-1"
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div class="rating-box">
                        <span class="rating-star full-star"></span>
                        <span class="rating-star empty-star"></span>
                        <span class="rating-star empty-star"></span>
                        <span class="rating-star empty-star"></span>
                        <span class="rating-star empty-star"></span>
                      </div>
                      <div class="_rate002">1%</div> -->
                    <!-- </div> -->
                  <!-- </div> -->
                </div>
              </div>
              <div class="col-lg-7">
                <div class="review_right">
                  <div class="review_right_heading">
                    <h3>Reviews</h3>
                    <div class="review_search">
                      <input
                        class="rv_srch"
                        type="text"
                        placeholder="Search reviews..."
                      />
                      <button class="rvsrch_btn">
                        <i class="uil uil-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
				No comment 
   
                <!-- <div class="review_all120">
                  <div class="review_item">
                    <div class="review_usr_dt">
                      <img src="images/left-imgs/img-1.jpg" alt="" />
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
                    <p class="rvds10">
                      Nam gravida elit a velit rutrum, eget dapibus ex
                      elementum. Interdum et malesuada fames ac ante ipsum
                      primis in faucibus. Fusce lacinia, nunc sit amet tincidunt
                      venenatis.
                    </p>
                    <div class="rpt100">
                      <span>Was this review helpful?</span>
                      <div class="radio--group-inline-container">
                        <div class="radio-item">
                          <input id="radio-1" name="radio" type="radio" />
                          <label for="radio-1" class="radio-label">Yes</label>
                        </div>
                        <div class="radio-item">
                          <input id="radio-2" name="radio" type="radio" />
                          <label for="radio-2" class="radio-label">No</label>
                        </div>
                      </div>
                      <a href="#" class="report145">Report</a>
                    </div>
                  </div>

                  <div class="review_item">
                    <a href="#" class="more_reviews">See More Reviews</a>
                  </div>
                </div> -->
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
    data:  {},
    my_lessons_formatted:  {},
    units: [],
    mylessons: [],
    lessons: [], 
    sections: [], 
    inputList: "",
    myLessonLoading:false,
  }),
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
    if(this.auth){
        await this.$store.dispatch("core/getOptions", {
          slang: this.$store.state.locale,
          group: "uye_Lists",
          prev_id: this.auth.id,
          fields: "id,uye_list_name,uye_list_cat"
        });
    }
    this.$store.dispatch("course/getAllCourseProcess", {});
    this.$store.dispatch("course/getCourseOrders", {});
    this.getCourse();
  },
  computed: {
    
    courseProcess() {
      return this.$store.state.course.courseProcess;
    },
    courseOrders() {
      return this.$store.state.course.orders;
    },
    auth() {
      return this.$store.state.user.auth;
    },
    isCourseSelected(){
      if(this.courseOrders){
        let found = this.courseOrders.find(a=> a.corder_course==this.data.id); 
        if(found){
          return found;
        }

      }
      return false
        // return this.courseOrders.find(a=> a.id==this.data.id);
    }
  },
  watch:{
    'data'(val){ 
 
      if(this.isCourseSelected){
        this.getMyLessons();
      }else{
        this.mylessons=[];
      }
    }  
  },
  methods: {
    joinCourse(){
        
        this.$store.dispatch("course/setCourseOrder", {...this.data}); 
    },
    getCourseIcon(les) {
      if (les.lesson_type == "Course" && les.lesson_video) {
        return "uil uil-play-circle";
      } else if (les.lesson_type == "Course" && les.lesson_photo) {
        return "far fa-file-image";
      } else if (les.lesson_type == "Course" && les.lesson_description) {
        return "fal fa-file-alt";
      } else if (les.lesson_type == "Exam") {
        return "far fa-check-square";
      } else if (les.lesson_type == "Content") {
        return "far fa-file-alt";
      } else if (les.lesson_type == "Document") {
        return "fas fa-file-download";
      }
    },
    
    async getUnits(prev) {
      let fields = `unit_name,unit_image,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1], prev_id: ["=", prev] };

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

              this.units = d.map(element => {
                console.log("element.id", element.id);
                let stats =
                  this.courseProcess &&
                  this.courseProcess.data &&
                  this.courseProcess.data[element.id]
                    ? this.courseProcess.data[element.id]
                    : {};
                return { ...element, stats, accordion: false };
              });
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
async getMyLessons(){


 let auth  = this.$store.state.user.auth;
        let id =  this.data ? this.data.id : null; 
        this.myLessonLoading=true;
        await axios({
          url: process.env.baseURL + "my_lesson",
          method: "get",
          params: {
            limit: 500,
            offset: 0,
            fields:'id,status,pdb_user,cl_completed_list,cl_is_completed,cl_last_topic,cl_course,cl_user,cl_status,cl_unite,cl_lesson',
            lang: this.$store.state.locale,
            token: this.$store.state.user && this.$store.state.user.auth ? this.$store.state.user.auth.token : '',
            sort: ["sort,ASC"],
            filter: { cl_course: ["=", id], cl_user:["=", auth.id] }
          }
        })
        .then(response => {
            this.mylessons=response.data.formattedData;
            if(response.data.formattedData){
              response.data.formattedData.forEach(a=>{
                this.my_lessons_formatted[a.cl_lesson]=a;
              })
              
            }
            this.myLessonLoading=false;

        })
        .catch(e => {
             this.mylessons=[];
              this.myLessonLoading=false;
              this.my_lessons_formatted={}

        });
      },
async getCourseOrders(){
        let slang =  "ar";
        let user = this.$store.state.user.auth;
        await axios({
        url: process.env.baseURL+'Course_Order',
        method: "get",
        params: {
          limit: 100,
          lang: slang,
          filter: { corder_course: ["=",1], status: ["=",1],corder_user:["=",user.id]  },
          fields: "id,"+
          "corder_course,corder_course.cou_short,corder_course.cou_name,corder_course.cou_level,corder_course.cou_category,corder_course.cou_image,corder_course.cou_link,"+
          "corder_text,corder_last_unite,corder_last_lesson,corder_last_topic,"+
          "corder_last_lesson.section_name,"+
          "corder_last_unite.unit_name,"+
          "corder_last_topic.lesson_name",
          sort: ["corder_course,DESC"]
        }
      })
        .then(response => {
            this.order=response.data.formattedData;
        })
        .catch(e => {
             this.order="";
        });
      },
    getCourses(prev) {
      return this.lessons ? this.lessons.filter(k => k.prev_Id == prev) : [];
    },
     filterSections(prev) {
      return this.sections.filter ? this.sections.filter(k => k.prev_Id == prev) : [];
    },
     async getSections(prev) {
      let fields = `lesson_course,section_name,id,status,created_on,created_by,prev_Id`;

      let filters = { status: ["=", 1], lesson_course: ["=", prev] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "sections",
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
              this.sections = d;
            } else {
              this.sections = {};
            }
          })
          .catch(e => {
            this.sections = {};
            console.log(e);
          });
      });
    },
    async getLesson(prev) {
      let fields = `lesson_photo,lesson_unite,lesson_type,lesson_total_time,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video`;

      let filters = { status: ["=", 1], prev_id: ["=", prev] };

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
      // console.log("this.pageInfo", this.pageInfo);
      if (this.pageInfo && this.pageInfo.wa_content_id) {
        let fields = `cou_name,cou_level,cou_campaign_text,cou_short,cou_category,cou_tags,cou_total_time,cou_image,cou_description,cou_total_view,id,status,created_on,created_by,id,status`;
        // console.log("pageData",this.pageInfo)
        let filters = {
          status: ["=", 1],
          id: ["=", this.pageInfo.wa_content_id]
        };

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
                let x = unescape(d.cou_description);

                this.getUnits(d.id);
                this.getSections(d.id);
                this.getLesson(d.id);
         
                this.data = d;
                       this.getMyLessons();
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
.left-content {
  padding: 4px 0px;
  cursor: pointer;
  width: fit-content;
}
.left-content-number {
  position: relative;
  height: 25px;
  width: 25px;
  max-width: 25px;
  border-radius: 50%;
  background: gray;
  padding: 4px 0px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  &.completed {
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
.toolbar-cart {
  position: absolute;
  top: 20px;
  right: 20px;
}
.lecture-hidden {
  display: hidden;
}

.end-detail {
  margin-left: 20px;
  width: 90px;
  text-align: right;
}
.tab-height {
  min-height: 50px;
}
.download_btn {
  color: #fff !important;
}
h3.popover-header {
  margin-top: 0;
}

.details{
  width: 200px;
}
.content-summary{
  width: 150px!important;
}
</style>
<style>
.text-black{
  color: #a0a0a0;
  width: 25px;

}
.text-red{
  color: #e71146;
  width: 25px;
}
</style>