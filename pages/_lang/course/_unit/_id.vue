<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a @click="goPath('courses')">{{ l("Course", "g") }}</a>
            </li>

            <li
              class="breadcrumb-item active" v-if="data.from_prev"
              @click="
                goPath(
                  'course/'+data.from_prev.cou_link
                )
              "
              aria-current="page"
            >
              {{data.from_prev.cou_name}}
            </li>
            <li
              class="breadcrumb-item active" v-if="data.from_lesson_subject"
              @click="
                goPath(
                  'course/'+data.from_prev.cou_link
                )
              "
              aria-current="page"
            >
              {{data.from_lesson_subject.section_name}}
            </li>
          </ol>

          <a
            class="download_btn2"
            @click="
              goPath('course/'+data.from_prev.cou_link)
            "
            >{{l('Back to Course','g')}}</a
          >
        </nav>
      </div>
    </div>
    <div class="card-header"> 
    </div>
<div class="card-header" v-if="1==1">
 
      <div
        v-for="(st, i) in getPages()"
        @click="selectStep(st)"
        class="head-tab"
        :class="st== order ? 'selected-tab' : ''"
      >
        
        {{ st== steps.length ? "Results" : st }}
      </div>
      </div>
    <div class="card-header" v-else>
      <div
        v-for="(st, i) in steps.length"
        @click="selectStep(i + 1)"
        class="head-tab"
        :class="i + 1 == order ? 'selected-tab' : ''"
      >    
        {{ i + 1 == steps.length ? "Results" : i + 1 }}
      </div>
     
      <!-- <vue-step
        :now-step="order"
        :step-list="steps"
        
      ></vue-step> -->
    </div> 
    <!-- {{activeCourse}} -->
    <div class="card" v-if="data.lesson_question">
      <question
        :question="question"
        :order="data.sort"
        :isAnswered="isAnswered"
        @answered="isAnswered = $event"
      ></question>
    </div>
    <div class="card" v-else-if="data.lesson_name && data.id != 'finish'">
      <div class="row" style="margin-top: 30px;">
        <!-- <div class="col-md-12">{{ data.sort }} / {{ total }}</div> -->

        <div class="col-auto">
          <div class="title484">
            <h2>{{ data.sort }} - {{ data.lesson_name }}</h2>

            <img class="line-title" src="/images/line.svg" alt="" />
            <div class="row">
              <div class="col-2">
                <img
                  :src="show_image(data.lesson_photo, '150', '150', '', '90')"
                />
              </div>
              <div class="col">
                <p v-html="HtmlEncode(data.lesson_description)"></p>
                {{ HtmlEncode(data.lesson_question) }}
              </div>
            </div>

            <!-- @finish="finished"
                @update="updated" -->
          </div>
        </div>
        <div class="col-md-6">
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
        </div>
      </div>
    </div>
    <div class="card" v-show="data.id == 'finish'">
      <div class="result_content">
        <h2>Congratulation!</h2>
        <p>You finished this course.</p>
        <p>Your total score is: {{ activeCourse.point * 10 }}</p>
        <a
          class="download_btn"
          download="w3logo"
          @click="
            goPath('course/the_only_course_you_need_to_learn_web_development')
          "
          >Turn Back Course Page</a
        >
      </div>
    </div>
    <div class="arrows " v-if="data.id != 'finish'">
      <a
        class="prev"
        v-if="prev && prev.id"
        @click="goPath('course/' + unit + '/' + prev.id)"
        ><i class="fa fa-chevron-left" /> {{ l("Prev", "g") }}</a
      >
      <a
        class="next"
        v-if="next && next.id"
        @click="goPath('course/' + unit + '/' + next.id)"
        ><i class="fa fa-chevron-right" /> {{ l("Next", "g") }}</a
      >
      <b-button
        variant="outline-primary"
        @click="$store.state.isErrorReportVisible = true"
        class="pull-right float-right"
        >Report Error</b-button
      >
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
      lesson_question: ""
    },
    totalPoints: [],
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
    fields: `prev.cou_name,prev.cou_link,lesson_subject.section_name,prev.cou_level,sections.section_name,lesson_question,sort,lesson_photo,lesson_counter,lesson_subject,lesson_type,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video`,
    unit: null,
    next: null,
    prev: null
  }),
  async created() {
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

    this.getCourseLast(this.unit);
    this.getLessons();
  },                         
  
  methods: {
    getPages(){
        let list = [];
        let steps = this.steps;
        let order = this.order;
        let top = steps.length<=7 ? steps.length : null;
        console.log(steps,order,top)
        if(top==null){
           
           list.push(order-2);
           list.push(order-1);
           list.push(order);
           list.push(order+1);
           list.push(order+2);
         
           list = list.filter((k,i)=>{
            return  k<steps.length && k>1
           });
              list.unshift(1);
             list.push(steps.length );
        }else{
            for(let i=1; i<=top; i++){
                list.push(i)
            }
        }
console.log("list",list)
        return list
        // [1,2 ... 5 6 7 ... 10 11]
    },
    getCourseLast(unit) {
      let id = this.$route.params.id;
      this.$store.dispatch("course/getCourseLast", { unit, id });
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
        console.log("total_completed", total_completed);
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
          filter: { lesson_subject: ["=", lesson_section] }
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
              return { ...k, sort: i };
            });
            this.allLessons.push({
              id: "finish",
              sort: i + 1
            });
            this.total = this.allLessons.length;
            this.steps = this.allLessons.map(k => "");
            this.setCourseLast();
            this.setSelect();
          }
        })
        .catch(e => {
          this.data = {};
          console.log(e);
        });
    },
    async getQuestion() {
      let fields =
        "id,sort,status,exa_type,rs_Question,exa_image,exa_sound,exa_video,exa_timer,exa_ready";
      this.getAnswers();
      axios({
        url: process.env.baseURL + "exam_q",
        method: "get",
        params: {
          limit: 1,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["sort,ASC"],
          filter: { id: ["=", this.data.lesson_question] }
        }
      })
        .then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.question.q = response.data.formattedData[0];
          }
        })
        .catch(e => {
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
          filter: { prev_id: ["=", this.data.lesson_question] }
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
    "$route.params.id"(val) {
      // this.activeCourse.last = val;
      this.setCourseLast({
        unitId: this.$route.params.unit,
        lessonId: val,
        unitData: this.activeCourse
      });
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
.arrows a.next {
  border-radius: 10px;
  background: rgb(40, 81, 194);
  font-size: 12px;
  font-size: 14px;
  padding: 10px;
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
  font-family: Scheherazade;
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

</style>
