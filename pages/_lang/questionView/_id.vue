<template>
    <div >
      
        <question
        :question="question"
        :order="1"
        :isAnswered="false"
        @answered="isAnswered = $event"
      ></question>

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
   }),
   components:{
       question
   },
   created(){
       this.getQuestion();
   },
    methods:{

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
          filter: { prev_id: ["=", this.$route.params.id] }
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
         async getQuestion() {
      let fields =
        "id,sort,status,exa_type,rs_Question,exa_image,exa_sound,exa_video,exa_timer";
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
          filter: { id: ["=", this.$route.params.id] }
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
    }
}
</script>
