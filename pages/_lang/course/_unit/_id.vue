<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a @click="goPath('courses')"  @click.middle="goPathBlank('courses')" >{{ l("Course", "g") }}</a>
            </li>

            <li
              class="breadcrumb-item active" v-if="course"
              @click="
                goPath(
                  'course/'+course.cou_link
                )
              "
               @click.middle="goPathBlank('course/'+course.cou_link)"
              aria-current="page"
            >
              {{course.cou_name}}
            </li>
            <li
              class="breadcrumb-item active" v-if="unite"
              @click="
                goPath(
                  'course/'+course.cou_link
                )
              "
                @click.middle="goPathBlank('course/'+course)"
              aria-current="page"
            >
              {{unite.unit_name}}
            </li>
          </ol>

          <a
            class="download_btn2"
            @click="
              goPath('course/'+course.cou_link)
            "
              @click.middle="goPathBlank('course/'+course.cou_link)"
            >{{l('Back to Course','g')}}</a
          >
        </nav>
      </div>
    </div>
    <!-- <div class="card-header"> 
    </div> -->
    <div  class="card" v-if="loading">

          Loading...
    </div>
    <div  class="card" v-else-if="!loading && steps.length==0">
<div class="result_content" >
          <h2>  There isn't any topic in this lesson. </h2>
          <p>
          <a
          class="download_btn"
          download="w3logo"
          @click="
            goPath('course/'+course.cou_link)
          "
          @click.middle="
            goPathBlank('course/'+course.cou_link)
          "
          >Turn Back Course Page</a
        >
</p>
    </div>
    </div>
    <div v-else>
<div class="card-header"  v-if="1==1" >
 
      <div
        v-for="(st, i) in getPages()"
        @click="selectStep(st)"
        class="head-tab"
         :class="isCompleted(st,i)"
      >
        
        {{ st== steps.length ? "Results" : st }}
      </div>
      </div>
    <div class="card-header" v-else>
      <div
        v-for="(st, i) in steps.length"
        @click="selectStep(i + 1)"
        class="head-tab"
        :class="isCompleted(i)"
      >    
        {{ i + 1 == steps.length ? "Results" : i + 1 }}
      </div>
     
      <!-- <vue-step
        :now-step="order"
        :step-list="steps"
        
      ></vue-step> -->
    </div> 
    <!-- {{activeCourse}} -->

    <!-- <div class="card" v-if="data.lesson_question">
      <question
        :question="question"
        :order="data.sort"
        :isAnswered="isAnswered"
        @answered="isAnswered = $event"
      ></question>
    </div> -->
 
    <div class="card" v-if="data.id && data.id != 'finish'"> 
      <div class="row" style="margin-top: 10px;">
         
                   <div class="container">
                <div class="row">
              <div    :class="'col-md-'+lt.size+' col-12 text-right align-right'"   v-for="lt in data.lesson_content">
           
                   <div class="layout-container"   :class="lt.class+' '+lt.alignment"  >  
                     <template v-if="lt.class=='text-T'">
                         {{data.lesson_name}} 
                    </template>
                    <template v-else-if="lt.class=='text-B'">
                      
                            <div    v-if="lt.type=='Exam'"  style="paddingn: 10px;" >
                             
                                  <div v-for="qa in questions" style="border:2px solid #efefef; border-radius:5px; padding: 10px; margin: 10px;">
                                      <question
                                        :question="qa"
                                        :order="data.sort"
                                         :answerable="true"
                                        :isAnswered="isAnswered"
                                        @answered="isAnswered = $event"
                                      ></question>
                                  </div>

                            </div>
                            <div class="modal-form-row" v-else-if="lt.type=='Video'">
                               <iframe width="100%" height="315"  :src="lt.content"></iframe>
                            </div>
                            <div class="modal-form-row" v-else-if="lt.type=='Content'">
                                <p v-html="HtmlEncode(lt.content)"></p>
                            </div>
                              <div class="modal-form-row" v-else-if="lt.type=='Title'">
                                <h3>{{data.lesson_name}}</h3>
                            </div>
                            <div class="modal-form-row" v-else-if="lt.type=='Image'">
                                  <img :style="{'width':lt.width,'height':lt.height}"  
                                  :src="show_image(data.lesson_photo, '750', '750', '', '90')"  />
                                  <p>{{lt.text}}</p>
                            </div>
                    </template>
                  </div>
              </div>
              </div>
              </div>

            <!-- @finish="finished"
                @update="updated" -->
           
        <!-- <div class="col-md-6">
          <div v-if="data.lesson_video">
            <video
              width="100%"
              style="max-width: 640px;"
              height="480"
              controls
              autoplay
            >
              <source :src="getVideoPath(data.lesson_video)" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div v-if="data.lesson_video_url">
            <iframe
              width="560"
              height="315"
              :src="'https://www.youtube.com/embed/' + data.lesson_video_url"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div> -->
      </div>
    </div>
    <div class="card" v-show="data.id == 'finish'">
      <div class="result_content" v-if="isCompletedAll()">
        <h2>Congratulation!</h2>
        <p>You finished this course.</p>
        <p v-if="activeCourse.point">Your total score is: {{ activeCourse.point * 10 }}</p>
        <a
          class="download_btn"
          download="w3logo"
          @click="
            goPath('course/'+course.cou_link)
          "
          @click.middle="
            goPathBlank('course/'+course.cou_link)
          "
          >Turn Back Course Page</a
        >
      </div>
       <div class="result_content" v-else>
        <h2>You've not complete course yet</h2>

      </div>
    </div>
    <div class="arrows " v-if="data.id != 'finish'">
      <a
        class="prev"
        v-if="prev && prev.id"
        @click="goPath('course/' + unit + '/' + prev.id)"
       
          @click.middle="
            goPathBlank('course/' + unit + '/' + prev.id)
          "
        ><i class="fa fa-chevron-left" /> {{ l("Prev", "g") }}</a
      >
      <a
        class="next primary"
        v-if="next && next.id"
        @click="goPath('course/' + unit + '/' + next.id)"
        
          @click.middle="
            goPathBlank('course/' + unit + '/' + next.id)
          "
        ><i class="fa fa-chevron-right" /> {{ l("See Next", "g") }}</a
      >
      <a
        class="next"
        v-if="next && next.id"
        @click="completeThisTopic( unit , next.id)"
         
        ><i class="fa fa-chevron-right" /> {{ l("Next Topic", "g") }}</a
      >
      <b-button
        variant="outline-primary"
        @click="$store.state.isErrorReportVisible = true"
        class="pull-right float-right"
        >Report Error</b-button
      >
    </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
// import vueStep from "vue-step";
import counter from "@/components/utils/counter.vue";
import question from "@/components/utils/question.vue"; 
export default {
  mixins: [general],

  data: () => ({
    data: {
      id: null,
      lesson_question: []
    },
    loading:false,
    totalPoints: [],
    questions: [],
    section:{},
    course:{},
    unite:{},
    activeLesson:{
      id:null,  
      cl_lesson:null,
      cl_course:null,
      cl_status:null,
      cl_last_topic:null,
      cl_completed_list:'',
      cl_completed_list_arr:[],
      cl_unite:null,
      cl_user:null,
      pdb_user:'',
      status:1,
    },
    updated: null,
    isAnswered: true,
    question: {
      q: null,
      a: null
    },
    steps: [],
    total: 0,
    order: 1,
    allLessons: [],
    fields: `lesson_content,lesson_layout,prev.section_name,lesson_subject.section_name,lesson_question,sort,lesson_photo,lesson_counter,lesson_subject,lesson_type,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video`,
    unit: null,
    next: null,
    prev: null
  }),
  async created() {
    this.loading=true;
    this.unit = this.$route.params.unit;
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

    this.getCompletedStatus();
    this.getCourseLast(this.unit);
    this.getLessons();
    this.getSection();
    setTimeout(() => {
      this.loading=false;
    }, 600);
  },                         
  
  methods: {
    
    getPages(){
        let list = [];
        let steps = this.steps;
        let order = this.order;
        let top = steps.length<=7 ? steps.length : null;
         for(let i=1; i<=steps.length; i++){
                list.push(i)
             }
        // if(top==null){
           
        //    list.push(order-3);
        //    list.push(order-2);
        //    list.push(order-1);
        //    list.push(order);
        //    list.push(order+1);
        //    list.push(order+2);
        //    list.push(order+3);
         
        //    list = list.filter((k,i)=>{
        //     return  k<steps.length && k>1
        //    });
        //       list.unshift(1);
        //      list.push(steps.length );
        // }else{
        //     for(let i=1; i<=top; i++){
        //         list.push(i)
        //     }
        // }
// console.log("list",list)
        return list
        // [1,2 ... 5 6 7 ... 10 11]
    },
    getCourseLast(unit) {
      let id = this.$route.params.id;
      this.$store.dispatch("course/getCourseLast", { unit, id });
    },
    getCompletedStatus(force=false){
    let auth  = this.$store.state.user.auth;
        console.log("auth",auth)
      let lesson_section = this.$route.params.unit;

        axios({
        url: process.env.baseURL + "my_lesson",
        method: "get",
        params: {
          limit: 1,
          offset: 0,
          fields:'id,status,pdb_user,cl_completed_list,cl_last_topic,cl_user,cl_status,cl_unite,cl_lesson,cl_course',
          lang: this.$store.state.locale,
          token: this.$store.state.user && this.$store.state.user.auth ? this.$store.state.user.auth.token : '',
          sort: ["sort,ASC"],
          filter: { cl_lesson: ["=", lesson_section], cl_user:["=", auth.id] }
        }
      })
        .then(response => {
      
            let activeLesson = response.data.formattedData[0];
            if(activeLesson){
              activeLesson.cl_completed_list_arr =  activeLesson && activeLesson.cl_completed_list ?  activeLesson.cl_completed_list.split(",") : []
              this.activeLesson=activeLesson;
                let id = this.$route.params.id;
                let unit = this.$route.params.unit;
              if(id==unit){
                this.goPath("course/" + this.unit + "/" + activeLesson.cl_last_topic);
              }
             

              
            }
        });
    },
   async  completeThisTopic(unit,next){
      let method =  "post";
      let url = process.env.baseURL + "my_lesson";
      let data = this.data
      this.activeLesson.cl_completed_list_arr.push(data.id) 
      this.activeLesson.cl_completed_list_arr = [...new Set(this.activeLesson.cl_completed_list_arr)];
      this.activeLesson.cl_course =  this.course.id;
      this.activeLesson.cl_lesson =  this.$route.params.unit;
      this.activeLesson.cl_unite =  this.$route.params.unit;
      this.activeLesson.cl_user =  this.$store.state.user.auth.id;

      this.activeLesson.cl_last_topic = next;
      this.activeLesson.cl_status = 'Active';
      this.activeLesson.cl_completed_list =  this.activeLesson.cl_completed_list_arr.join(",");
      let auth  = this.$store.state.user.auth;

      // cl_status:null,
      // cl_last_topic:null,
      // cl_completed_list:[],
      // cl_unite:null,
      let  activeLesson = {...this.activeLesson}
      if(activeLesson && activeLesson.id){
          url=process.env.baseURL + "my_lesson/"+activeLesson.id;
          method =  "put";
      }
      await axios({
        url,
        method,
        data: {
          token: this.$store.state.user && this.$store.state.user.auth ? this.$store.state.user.auth.token : '',
          id: activeLesson.id, 
          cl_lesson:  activeLesson.cl_lesson,
          cl_course:  activeLesson.cl_course,
          cl_unite:  activeLesson.cl_unite,
          cl_last_topic:  activeLesson.cl_last_topic,
          cl_status:  activeLesson.cl_status,
          cl_completed_list:  activeLesson.cl_completed_list,
          cl_is_completed: this.isCompletedAll(),
          status:  activeLesson.status,
          pdb_user: auth.id,
          cl_user: auth.id
        }
      }).then(response => {
        this.saveStatus = { show: true, stataus: "success" };
        // console.log("response",response.data)
         let activeLesson = response.data;
          activeLesson.cl_completed_list_arr =  activeLesson.cl_completed_list ?  activeLesson.cl_completed_list.split(",") : []
         this.activeLesson = activeLesson;
      });
      this.setCourseLast({
        unitId: this.$route.params.unit,
        lessonId: next,
        unitData: unit
      });
    },
    setCourseLast() {
      let unitId = this.$route.params.unit;
      let lessonId = this.$route.params.id;
      let activeCourse = this.activeCourse;
      activeCourse.totalLesson = this.total;
      if (activeCourse.lessons) {
        let obj = Object.keys(activeCourse.lessons).map(key => [
          Number(key),
          activeCourse.lessons[key]
        ]);
        let total_completed = 0;
        console.log("obj", obj);
        obj.forEach(k => {
          if (k[1].completed == true) {
            total_completed++;
          }
        });
        // console.log("total_completed", total_completed);
        activeCourse.totalCompleted = total_completed;
        console.log(total_completed, this.total, total_completed / this.total);
        activeCourse.totalCompletedRate = Math.round(
          (total_completed / this.total) * 100
        );
      }
      this.$store.dispatch("course/setCourseLast", {
        unitId,
        lessonId,
        courseId: "all",
        unitData: activeCourse
      });
      this.goPath('course/' + unitId + '/' + this.next.id);
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
    async getLessons() {
      //   let fields = `sort,lesson_photo,lesson_unite,lesson_type,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video`;
      let fields = this.fields;

      let lesson_section = this.$route.params.unit;

      axios({
        url: process.env.baseURL + "lesson",
        method: "get",
        params: {
          limit: 100,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["sort,ASC"],
          filter: { prev_Id: ["=", lesson_section] }
        }
      })
        .then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            let allLessons = response.data.formattedData;
            let i = 0;
            this.allLessons = allLessons.map(k => {
              i++;
              if(k.lesson_content){
                  k.lesson_content = JSON.parse(k.lesson_content)
              }
              if(k.lesson_question && (k.lesson_question.charAt(0)=="["  || k.lesson_question.charAt(0)=="{") ){
                  k.lesson_question = JSON.parse(k.lesson_question)
              }
              return { ...k, sort: i };
            });
            this.allLessons.push({
              id: "finish",
              sort: i + 1
            });
            this.total = this.allLessons.length;
            this.steps = this.allLessons.map(k => "");
            // this.setCourseLast();
            this.setSelect();
          }
        })
        .catch(e => {
          this.data = {};
          console.log(e);
        });
    },
    async getSection() {
      this.loading=true;
      let fields =
        "id,sort,status,prev_id,prev.unit_name,lesson_course.cou_link,lesson_course.cou_name,lesson_course.id";
      
      axios({
        url: process.env.baseURL + "sections",
        method: "get",
        params: {
          limit: 1,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["sort,ASC"],
          filter: { id: ["=", this.unit] }
        }
      })
        .then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.sections = response.data.formattedData[0];
            this.course = response.data.formattedData[0].from_lesson_course;
            this.unite = response.data.formattedData[0].from_prev;

          }
            this.loading=false;
        })
        .catch(e => {
          this.unite= null;
          this.course= null;
          this.unite= null;
          this.loading=false;
        });
    },
    async getQuestion() {
      let fields =  "id,sort,status,exa_type,rs_Question,exa_image,exa_sound,exa_video,exa_timer,exa_ready";
      // this.getAnswers();
      axios({
        url: process.env.baseURL + "exam_q",
        method: "get",
        params: {
          limit: 100,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["sort,ASC"],
          filter: { id: ["in", this.data.lesson_question] }
        }
      })
        .then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            let a = response.data.formattedData;
            let b= a.map(p=>{
                return {
                  q:p,
                  a:null
                }
            })
            this.questions = b;
            this.question.q = response.data.formattedData[0];
          }
        })
        .catch(e => {
          this.questions =[]
          this.question.q = null;
        });
    },
    async getAnswers() {
      this.question.a = null;
      let fields =
        "id,sort,status,exa_q_answer,exa_q_image,exa_q_sound,exa_q_true";
      axios({
        url: process.env.baseURL + "exam_q_answer",
        method: "get",
        params: {
          limit: 100,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["sort,ASC"],
          filter: { prev_id: ["in", this.data.lesson_question] }
        }
      })
        .then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.question.a = response.data.formattedData;
          }
        })
        .catch(e => {
          this.question.a = null;
        });
    },
    setSelect() {
      let id = this.$route.params.id;
      this.data = this.allLessons.find(k => k.id == id);
      if(!this.data){
        this.data = this.allLessons[0]
      }
      this.next = this.allLessons[this.data.sort];
      this.prev = this.allLessons[this.data.sort - 2];
      this.order = this.data.sort;
    },
    isCompletedAll(){
        let allCompleted = true;
        let ids = this.allLessons.map(k=> k.id);
        ids.forEach(a=>{
          if(a!="finish"){
            let ca= this.activeLesson.cl_completed_list_arr.includes(a) 
            if(!ca){
              allCompleted=false;
            }
            }
        })
    
       return allCompleted
       
    },
    isCompleted(st,i){
        let id = this.allLessons[st - 1].id;
        let ca= this.activeLesson.cl_completed_list_arr.includes(id) 
        console.log("isCompleted",);
       return i + 1 == this.order ? 'selected-tab' :  ca ? 'active-tab' : ''
       
    },
    selectStep(step) {
      let id = this.allLessons[step - 1].id;
      this.goPath("course/" + this.unit + "/" + id);
      this.setSelect();
    },
    async getLesson() {
      let fields = this.fields;
      let id = this.$route.params.id;
      let filters = { status: ["=", 1], id: ["=", id] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "lesson",
          method: "get",
          params: {
            limit: 1,
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
              let d = response.data.formattedData[0];
              this.data = d;
              this.getOtherLessons();
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
  },
  components: { 
    counter,
    question, 
  },
  computed: {
    activeCourse: {
      get() {
        return this.$store.state.course.activeCourse;
      },
      set(val) {
        Object.assign(this.$store.state.course.activeCourse, val);
      }
    }
  },
  watch: {
    "$route.params.unit"(val) {
      this.getSection();
      // this.activeCourse.last = val;
      // setCourseLast
      // this.setCourseLast({
      //   unitId: this.$route.params.unit,
      //   lessonId: val,
      //   unitData: this.activeCourse
      // });
    },
    "data.lesson_question"(val) {
      // console.log("get question", this.data.lesson_question);
      if (val) {
        this.getQuestion();
        this.isAnswered = false;
      } else {
        // this.question=[]
      }
    }
  }
};
</script>
<style>
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
.color-white {
  color: #fff;
}

.arrows {
  width: 100%;
  text-align: center;
  right: 20px;
  top: 7px;
  font-size: 30px;
  color: #fff;
  margin-top: 30px;
  margin-bottom: 30px;
}

.card {
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  margin-top: 10px;
     height: calc(100vh - 250px);
    overflow: hidden;
    overflow-y: auto;
}
.card-header {
  padding: 6px 10px;
  background: #fff;
  border-radius: 5px;
  margin-top: 10px;
  display: inline-flex;
  width: 100%;
  overflow: auto;
}
.head-tab {
  border: 1px solid #f3f3f3;
  background: #ffffff;
  border-radius: 0.35rem;
  width: fit-content;
  min-width: 28px;
  height: 25px;
  padding: 0px 3px;
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
  float: left;
}
.selected-tab {
  background: rgb(226, 184, 168);
  color: #fff;
}
.active-tab {
  background: rgb(73, 177, 25);
  color: #fff;
}
.arrows a.next {
  border-radius: 10px;
  background: rgb(49, 143, 25);
  font-size: 12px;
  font-size: 14px;
  padding: 10px;
}

.arrows a.next.primary{
  background: rgb(40, 81, 194);

  }
.arrows a.next:hover,
.arrows a.prev:hover {
  color: rgb(40, 81, 194);
  background: rgba(40, 81, 194, 0.384);
}
.arrows a.prev {
  border-radius: 10px;
  border: 1px solid rgb(40, 81, 194);
  color: rgb(40, 81, 194);
  font-size: 14px;
  padding: 10px;
}

.title484 h2 {
  text-align: right;
}
.title484,
.title484 div,
.title484 p {
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
  color: rgb(43, 42, 42);
  text-align: right;
  font-family: Cairo;
}

a.download_btn2 {
  position: absolute;
  right: 20px;
  top: 6px;
  background: rgb(233, 143, 83);
  color: #fff !important;
  padding: 5px;
  border-radius: 7px;
}

.text-T{
  padding: 10px;
  border-bottom: 1px solid #f7f7f7;
  font-size: 24px;
  width: 100%;
  display: block;
  margin-bottom: 15px;

}

.align-center{
  text-align: center;
}
.align-left{
  text-align: left;
}
.align-right{
  text-align: right;
}
</style>
