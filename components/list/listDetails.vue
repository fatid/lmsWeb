<template>
  <div class="width-100">
 
<div class="card-header" v-if="listItems && listItems[0] && listItems[0].type=='Exam'">
 
 <div
        v-for="(st, i) in listItems.length"
        @click="selectStepQ(i)"
        class="head-tab"
        :class="i == order ? 'selected-tab' : ''"
      >    
        {{ i  == listItems.length ? "Results" : i+1 }}
      </div>
      </div>

    <div class="card" style="padding:20px;position:relative;"  v-if="listItems && listItems[0] && listItems[0].type=='Exam'">
    <question
        :question="{q:listItems[order],a:null}"
        :order="order"
        :levels="options['co_level']"
        :isAnswered="isAnswered"
        @answered="isAnswered = $event"
        class="top-padding-30"
      ></question>

</div>
<div   style="width: 100%;" v-else-if="listItems && listItems[0] && listItems[0].type=='Word'">
 
     

    <div class="row"  style="width: 100%;">
      <div class="col-12"  v-for="d in listItems">
         <wordModel :dt="d"></wordModel>   
      </div>
 </div>
 </div>
<div class="card-header" v-else-if="listItems && listItems[0] && listItems[0].type=='Course'">
 
 
   <b-list-group class="w-100 width-100 "> 
                <b-list-group-item :key="'listItems'+dt.id"  v-for="dt in listItems"  class="d-flex w-100 width-100 justify-content-between align-items-center"  style="cursor: pointer;"
                  @click="goUrl('course/'+dt.id+'/'+dt.id)"
                >
                          {{dt.section_name}}<br />
                        <p>Unit: {{dt.topModuleData.unit_name}}</p>
                </b-list-group-item>
          </b-list-group>
    </div>
    
    <div class="arrows " v-if="data.id != 'finish'">
      <a
        class="prev"
        v-if="prev && prev.id"
        @click="goPath('my/list?id=' + listId + '&view=1&lesson=' + prev.id)"
        ><i class="fa fa-chevron-left" /> {{ l("Prev", "g") }}</a
      >
      <a
        class="next"
        v-if="next && next.id"
        @click="goPath('my/list?id=' + listId + '&view=1&lesson=' + next.id)"
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
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
// import vueStep from "vue-step";
import counter from "@/components/utils/counter.vue";
import question from "@/components/utils/question.vue"; 
import wordModel from "@/components/utils/word_mini.vue"; 


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
    order: 0,
    allLessons: [],
    fields: `lesson_question,sort,lesson_photo,lesson_counter,lesson_unite,lesson_type,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video`,
    list: null,
    next: null,
    prev: null
  }),
  props:{
      listItems:[Object,Array],
      selectedList:[Object,Array],
      listId:null
  },
  async created() {
    this.list = this.$route.query.id;
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
 
    this.data = this.listItems[this.order];
    // this.getLessons();
  },                         
  
  methods: {

     goUrl(url){
  
          let href = this.$router.resolve({path:'/'+this.LOCALE+'/'+url});
         window.open(href.href, '_blank');

    },
    getPages(){
        let list = [];
        let steps = this.steps;
        let order = this.order;
        let top = steps.length<=7 ? steps.length : null;
        console.log("getPages",steps,order,top,list)
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
      async getLikes({ state, dispatch, rootState }, payload) {
      if (rootState.user.auth && rootState.user.auth.id) {
        try {
          await axios({
            url: process.env.baseURL + "Favorites",
            method: "get",
            params: {
              limit: 1,
              lang: "NONE",
              filter: { fav_owner_user: ["=", rootState.user.auth.id] },
              fields:
                "fav_content,fav_owner_user,fav_list,uye_fav_type,fav_total,pdb_user",
              sort: ["created_on,DESC"]
            }
          }).then(response => {
            let a = response.data.formattedData;
            let likes = a.fav_content;
          });
        } catch (err) {
          console.log("Err", err);
        }
      } else {
        let likes = window.localStorage.getItem("likes");
        if (likes) {
          dispatch("setLikesFirst", likes);
        }
      }
    },
    async getLessons() {
      //   let fields = `sort,lesson_photo,lesson_unite,lesson_type,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video`;
      let fields = this.fields;

      let lesson_unite = this.$route.params.id;
      console.log("listItems",this.listItems)
        let idList = this.listItems.map(k=>  k.id)
      axios({
        url: process.env.baseURL + "lesson",
        method: "get",
        params: {
          limit: 100,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["sort,ASC"],
          filter: { id: ["in", idList] }
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
      let id = this.$route.query.lesson;
      this.data = this.allLessons.find(k => k.id == id);
      if(!this.data){
            this.data = this.allLessons[0]
      }
      this.next = this.allLessons[this.data.sort];
      this.prev = this.allLessons[this.data.sort - 2];
      this.order = this.data.sort;
    },
  
    selectStepQ(step) {
      let id = this.listItems[step].id;
      this.data = this.listItems[step];
      // this.goPath('my/list?id='+this.listId+"&view=1&item=" + id);
       this.next = this.listItems[step-1];
      this.prev = this.listItems[step+1];
      this.order = step;
    },
    selectStep(step) {
      let id = this.listItems[step - 1].id;
      this.goPath('my/list?id='+this.listId+"&view=1&lesson=" + id);
      this.setSelect();
    },
    async getLesson() {
      let fields = this.fields;
      let id = this.$route.params.id;
      let filters = { status: ["=", 1], id: ["in", id] };

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
    wordModel 
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
    "$route.query.lesson"(val) {
      // this.activeCourse.last = val;
      this.setCourseLast({
        unitId: this.$route.params.unit,
        lessonId: val,
        unitData: this.activeCourse
      });
    },
    "data.lesson_question"(val) {
 
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

</style>
