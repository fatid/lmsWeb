<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="result-container" v-if="data && data.from_er_List">
          <h3>{{ data.from_er_List.uye_list_name }}</h3>
          <div class="width-100">
            <div class="c_row">
              <div class="c_title">Total Question</div>
              <div class="c_result">{{ data.er_total }}</div>
            </div>
            <div class="c_row">
              <div class="c_title">Correct Answer</div>
              <div class="c_result">{{ data.er_true }}</div>
            </div>
            <div class="c_row">
              <div class="c_title">False Answer</div>
              <div class="c_result">{{ data.er_false }}</div>
            </div>
            <div class="c_row">
              <div class="c_title">Empty Answer</div>
              <div class="c_result">{{ data.er_empty }}</div>
            </div>
            <div class="c_row">
              <div class="c_title">Duration</div>
              <div class="c_result">{{ data.er_time | formatTime}}</div>
            </div>
            <div class="c_row">
              <div class="c_title">Date</div>
              <div class="c_result">{{ data.created_on | date('DD MMM YYYY - HH:mm') }} </div>
            </div>
            <div class="c_row text-align-center">
              <a
                class="btn btn-primary mr-10"
                @click="goPath('filter/Exam',{list:data.from_er_List.id})"
                @click.middle="goPathBlank('filter/Exam',{list:data.from_er_List.id})"
                >{{ l("Start New Exam", "g") }} {{data.from_er_List ? data.from_er_List.id : ''}}</a
              > 
              <a  v-if="view!='detail'"
                class="btn btn-success mr-10"
                @click="goPath('filter/result/' + id, { view: 'detail' })"
                @click.middle="
                  goPathBlank('filter/result/' + id, { view: 'detail' })
                "
                >{{ l("Detail View", "g") }}</a
              >
            </div>
          </div>
        </div>
         <div class="result-container-ul" v-if="data && data.from_er_List">
        <ul>
          <li v-for="oe in other_exams"    @click="goPath('filter/result/' + oe.id, { view: 'detail' })">
            <div>{{l('Result','g')}}: {{ oe.er_true}} / {{ oe.er_total}}</div>
            <div>{{ oe.created_on | date('DD MMM YYYY - HH:mm') }}</div>
          </li>
          </ul>
      </div>
      </div>

      <div class="col-8">
        <div class="list_group">
          <!-- <h3 v-if="data.from_er_List">{{ data.from_er_List.uye_list_name }}</h3> -->
          <div v-for="dt in questions" class="list_item"
            :class="detail[dt.id].isTrue ? 'list-correct':'list-false'"
          >
              <div class="question-title" v-if="detail && detail[dt.id]">
                {{l('Your Answer','g')}} : {{detail[dt.id].answerText}} / {{detail[dt.id].isTrue ? 'Correct' : 'Wrong'}}
             </div>
            <div class="questition-container">
              <div class="content-side">
                <question
                  :question="{ q: dt, a: [] }"
                  :order="1"
                  :levels="options['co_level']"
                  :isAnswered="false"
                  :answerable="true"
                ></question>
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
import question from "@/components/utils/question.vue";
import { encode, decode } from 'js-base64';

export default {
  mixins: [general],
  components: {
    question
  },
  data: () => ({
    data: [],
    questions: [],
    detail:[],
    other_exams:[]
  }),
  created() {
    this.getCourse();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    view() {
      return this.$route.query.view;
    }
  },
  watch: {
    id() {
      this.getCourse();
    },
    "data.er_answers"(val) {}
  },
  methods: {
    async getQ(a) {
      console.log(typeof a);
      let k = Object.keys(a);
      console.log("k", k);
      let fields =
        "id,sort,status,exa_type,exa_degree,exa_categories,rs_Question,exa_image,exa_sound,exa_video,exa_ready,exa_timer,exa_skills";

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "exam_q",
          method: "get",
          params: {
            limit: 1000,
            offset: 0,
            fields,
            lang: this.$store.state.locale,
            sort: ["pdb_date,DESC"],
            filter: {
              id: ["in", k]
            }
          }
        })
          .then(response => {
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              this.questions = response.data.formattedData;
            } else {
              this.questions = {};
            }
          })
          .catch(e => {
            this.questions = {};
            console.log(e);
          });
      });
    },
    async getCourse() {
      let fields = `er_answers,er_true,er_total,er_time,er_current_duration,er_result,er_empty,er_user,er_List.id,er_List.uye_fav_type,er_List.uye_list_name,er_false,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1], id: ["=", this.id] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "ExamResults",
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
            console.log(
              "response.data.formattedData ",
              response.data.formattedData
            );
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              let d = response.data.formattedData[0];

              this.data = d;
              if (this.view == "detail") {
                let a = JSON.parse(this.data.er_answers);
                let y = Object.keys(a); 
                y.forEach(k=>{
                    a[k].answerText=decode(a[k].answer)
                }) 
                this.detail=a;

                this.getQ(a);
                this.getListExam();
              }
            } else {
              this.data = {};
            }
          })
          .catch(e => {
            this.data = {};
            console.log(e);
          });
      });
    },
     async getListExam() {
      let fields = `er_answers,er_true,er_total,er_time,er_current_duration,er_result,er_empty,er_user,er_List.uye_fav_type,er_List.uye_list_name,er_false,id,status,created_on,created_by,id,status`;
      let list = this.data.from_er_List.id;
      let filters = { status: ["=", 1], er_List: ["=", list] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "ExamResults",
          method: "get",
          params: {
            limit: 100,
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
              let d = response.data.formattedData;

              this.other_exams = d;
               
            } else {
              this.other_exams = {};
            }
          })
          .catch(e => {
            this.other_exams = {};
            console.log(e);
          });
      });
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
.result-container {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
      background: #fff; 
    border-radius: 10px;
}
.c_row {
  display: inline-flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #efefef;
}
.c_title {
  width: 150px;
text-align:left;
}
.c_result { 
}
.mr-10 {
  margin-right: 10px;
}
.text-align-center {
  text-align: center;
}


  .questition-container {
    padding: 10px;
    display: inline-flex;
    flex: auto 60px;
    width: 100%;
    text-align: right;
  }

.list_group{

  margin-top: 20px;
}
.list_item {
  margin-bottom: 10px;
  padding: 5px;
  border: 0.1em solid #efefef;
  border-radius: 5px;
  background: #fff;
  width: 100%;
  text-align: right;
  direction: rtl;
  box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
  -webkit-box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
  -moz-box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
  transition: 0.5s all;

  &:hover {
    border: 0.1em solid #75aaf0;
    transition: 0.5s all;
  }
}
  .list-correct{
     border: .1em solid #6dba21; 
  }
  .list-false{
     border: .1em solid #d83915; 
  }
 .content-side {
    cursor: pointer;
    width: inherit;
    position: relative;
    padding: 0px 10px;
  }

  .result-container-ul{
      width: 100%;
      margin: 0 auto;
      text-align: center;
      padding: 10px;
      margin-top: 20px;
      background: #fff; 
      border-radius: 10px;
  }
   .result-container-ul ul li {

     border-bottom: .1em solid #efefef;
     display: inline-flex;
     justify-content: space-between;
     width: 100%;
     cursor: pointer;

   }
</style>
