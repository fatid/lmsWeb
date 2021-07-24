<template>
  <div v-if="question && question.q && question.q.exa_type">
    <div class="row">
      <div class="col-12">
        <div class="degree-class" v-if="question.q.exa_degree" :style="{background:level.color}">
          {{level.name}} 
        </div>
        <div
          class="question"
          v-if="question.q && question.q.exa_type == 'ParagraphOrder'"
        >
          {{ l("Make the text correct", "g") }}

             <!-- {{splitparagraph_answer}} {{counterStatus}} -->
          <div class="myParagraph" v-if="question.q.rs_Question">
            <!-- {{answerText == trueText ? "Yes true." : "Try Again"}}   {{answerText}}==={{trueText}} -->
           
            <div
              class="answerSentence"
              :class="counterStatus == 'stopped' ? 'answered' : ''"
            >
              <!-- {{ l("Answer", "g") }}: {{ answerText }} -->
            </div>
          </div>
          
          <div class="words">
            <div style="width: 100%;float: right;" v-if="!isTrue">
           
              <draggable
                v-model="splitparagraph_answer"
                @end="splitparagraph_setanswer()"
              >
                <transition-group style=" text-align: right;">
                  <div
                    class="paragraph_item"
                    v-for="(alp, i) in splitparagraph_answer"
                    :key="'alp' + i"
                  >
                    <!-- @click="addToAnswer(alp, ' ')" -->
                    {{ alp }} <i class="fas fa-sort"></i>
                    <!-- <span style="float: right; margin-left: 5px;">{{i+1}}</span> -->
                  </div>
                </transition-group>
              </draggable>

                <p :class="customClass.float">
                      <i>Please set answer drag and drop words.</i>
                </p>
            </div>
            <div v-else>
                {{splitparagraph_answer.join(" ")}}
            </div>
          </div>
      
        </div>
        <div
          class="question"
          v-else-if="question.q.exa_type == 'ReadyQuestion'  "
        > 
        

        
        </div>
        <div
          class="question"
          v-else-if="question.q.exa_type == 'SentenceCorrect'"
        >
          <!-- {{splitwords_answer_original}} {{splitwords_answer}} {{splitwords_answer_ordered}} -->
          <!-- {{trueText}} = {{answerText}}  --  {{splitwords_answer_ordered}} -->

          <div
            :key="setKeywordKey"
            style="margin: 10px 0 ; justify-content: flex-end;
                                display: inline-flex
                                flex-wrap: wrap;
                                align-items: end;
                                width: 100%;"
          >
         
            <span
              class="draggable words_item unselectable "
              v-for="(dd, i) in splitwords_answer"
              :id="'drag' + question.q.id + i"
              draggable="true"
              @dragstart="drag($event)"
              >{{ dd }}</span
            >
          </div>
          <br />

          <div class="words">
            <draggable
              v-model="splitwords_answer_ordered"
              @end="splitwords_setanswer"
              style=" justify-content: flex-end;
                                display: inline-flex;
                                flex-wrap: wrap;
                                align-items: end;
                                width: 100%;"
              tag="div"
              :id="'allAnswers' + question.q.id"
            >
              <div
                class="answerbox unselectable "
                v-for="(dd, i) in splitwords_answer_ordered"
                :id="'answer' + question.q.id + i"
                @drop="drop($event)"
                draggable="true"
                @dragover="allowDrop($event)"
              ></div>
            </draggable>
          </div>

          <!-- {{answerText}} == {{trueText}} -->
          <a :class="customClass.float">
            {{ l("Make the sentence correct", "g") }}</a
          >
          <br />
        </div>
        <div
        v-if="parsedQuestion &&  question.q.exa_type != 'MultipleChoice'   &&  question.q.exa_type != 'ReadyQuestion'   &&  question.q.exa_type != 'ParagraphOrder' &&  question.q.exa_type != 'SentenceCorrect'"
          style=" text-align: right; direction:rtl;  font-size: 22px; line-height: 2;"
        >
          <!-- <span v-html="parseQuestion(question.q.rs_Question)"></span> -->
          <span v-html="parsedQuestion"></span>
        </div>
        <div v-if="question.q.exa_video">
          <video
            width="100%"
            style="max-width: 640px;"
            height="480"
            controls
            autoplay
          >
            <source
              :src="getVideoPath(question.q.exa_video)"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div v-if="question.q.exa_image">
          <img :src="question.q.exa_image" />
        </div>
      
        <div
          class="ui form"
          v-if="
            question.q.exa_type == 'MultipleChoice' &&
              question.a &&
              question.a[0]
          "
        >

         <div  style=" text-align: right; direction:rtl;  font-size: 22px;"   > 
          <span v-html="question.q.rs_Question"></span>   
       
        </div>
          <div class="grouped fields">
             
            <div class="field fltr-radio" v-for="(a, i) in question.a">
              <div class="ui radio checkbox toRight">
                 <label @click="answerText = a.id">{{ a.exa_q_answer }} </label>
                <input
                  type="radio"
                   :name="'question-'+question.q.id"
                  v-model="answerText"
                  :value="a.id"
                  class="hidden"
                  :disable="isTrue"
                />
               
              </div>
            </div>
          </div>
        </div>
        <div class="ui form" v-else-if="question.q.exa_type == 'MultipleChoice'">
             <div  style=" text-align: right; direction:rtl;  font-size: 22px;"   > 
         <span v-html="question.q.rs_Question"></span>    
          <!-- header_right -->
        </div>
          <div class="grouped fields" v-if="answers && answers[0]">
            <div class="field fltr-radio" v-for="(a, i) in answers">
              <div class="ui radio checkbox">
                <input
                  type="radio"
                  :name="'question-'+question.q.id"
                  v-model="answerText"
                  :value="a.id"
                  class="hidden"
                  :disable="isTrue"
                />
                <label @click="answerText = a.id">{{ a.exa_q_answer }} </label>
              </div>
            </div>
          </div>
        </div>
      
        <div
          class="alphabets"
          
          v-if="question.q.exa_type == 'FillBlanks' && trueText.length"
        >
<!-- {{answerText}}==={{trueText}}
       -->
          <div class="alphabet_item" @click="removeAnswer()">
            <i class="fa fa-trash"></i>
          </div>
          <div class="alphabet_item" @click="backspaceAnswer()">
            <-
          </div>
          <div class="alphabet_item" @click="spaceAnswer()">
            _
          </div>
      
          <div
            class="alphabet_item"
            v-for="alp in randomAlphabets"
            @click="addToAnswer(alp, '')"
          >
            {{ alp }}
          </div>
        </div>
        <a
          @click="setanswer()"
          class="download_btn"
          v-if="!isTimeOut && !isTrue"
          >{{
            chance == 1
              ? l("Answer", "g")
              : chance == 2
              ? l("Answer (2nd chance)", "g")
              : l("Answer to learn answer", "g")
          }}</a
        >
        <a @click="nextQuestion()" class="download_btn" v-else-if="isTimeOut"
          >Timeout. Just Answer to learn</a
        >
        <a
          class="download_reset"
          v-show="answerText"
          @click="
            resetSetwords();
            removeAnswer();
          "
          >Reset</a
        >
        <a class="success-result download_btn" v-if="isTrue">
         <i class="fas fa-check-circle"></i> {{ getRandomResultText() }}
        </a>
        <a class="download_btn fail-result" v-else-if="isTrue === false">
          <i class="fas fa-exclamation-circle"></i> {{l('Lütfen cevabınızı kontrol ediniz.','g')}}
        </a>
      </div>

      
    </div>
  </div>
</template>
<script>
import counter from "@/components/utils/counter.vue";
import general from "@/mixins/general";
import draggable from "vuedraggable";
import axios from "axios";

export default {
  mixins: [general],

  props: {
    question: [Object, Array],
    levels: [Object, Array],
    order: Number
  },
  data() {
    return {
      updated: null,
      chance: 1,
      timeCounterStartPoint: null,
      unit: null,
      score: null,
      isTimeOut: false,
      isTrue: null,
      answerText: "",
      answers: [],
      setKeywordKey: "setKeywordKey",
      splitwords_answer: [],
      splitwords_answer_in_sort: [],
      splitwords_answer_ordered: [],
      splitparagraph_answer: [],
      answer: "",
      counterStatus: "start",
      trueText: "",
      alternativeText: [],

      alternativeChars: [],
      parsedQuestion:'',
      alphabets: [
        "ا",
        "أ",
        "إ",
        "آ",
        "ب",
        "ت",
        "ث",
        "ج",
        "ح",
        "خ",
        "د",
        "ذ",
        "ر",
        "ز",
        "س",
        "ش",
        "ص",
        "ض",
        "ط",
        "ظ",
        "ع",
        "غ",
        "ف",
        "ق",
        "ك",
        "ل",
        "م",
        "ن",
        "ه",
        "و",
        "ؤ",
        "ئ",
        "ي",
        "ء"
      ]
    };
  },
  components: {
    counter,
    draggable
  },
  computed: {
    activeCourse: {
      get() {
        return this.$store.state.course.activeCourse;
      },
      set(val) {
        this.$store.state.course.activeCourse = val;
      }
    },
    level(){
  
          let q =   this.question.q.exa_degree
              ? this.levels.find(k => k.id == this.question.q.exa_degree)
                ? this.levels.find(k => k.id == this.question.q.exa_degree)
                : {}
              : {}
          return {color:q.cou_level_color ,name:q.cou_level_name}
    },
    randomAlphabets() {
      let alp = this.trueText.trim();
      let start = alp.split("");
      const total = start.length + 4;
      let total_given_alphabets = this.alternativeChars
        ? this.alternativeChars.length
        : 0;
      // console.log("total_given_alphabets",total_given_alphabets,this.alternativeChars,this.trueText)
      if (this.alternativeChars) {
        this.alternativeChars.forEach(element => {
          start.push(element);
        });
      }
      // this.alphabets;
      for (let i = 0; i < 4 - total_given_alphabets; i++) {
        start.push(this.getRandomItem(this.alphabets, start));
      }

      let startArr = start.filter(function(item, pos) {
          return start.indexOf(item) == pos;
      })
      startArr= startArr.filter(k=> k!=" ")
      return startArr.sort(() => Math.random() - 0.5);
    }
  },
  async created() { 
      this.starter()  
  },
  watch: {
    "activeCourse.last"(val) {
      this.chooseActive();
    },
     "question.q.id"(val){  
           this.starter() 
    },
    "updated.value"(val) {
      let unitId = this.$route.params.unit;
      let lessonId = this.$route.params.id;
      let activeCourse = this.activeCourse;
      Object.assign(activeCourse.lessons[lessonId], {
        duration: this.updated
      });
      this.$store.dispatch("course/setCourseLast", {
        unitId,
        lessonId,
        courseId: "all",
        unitData: activeCourse
      });
    }
  },
  methods: {
    starter(){
            this.chooseActive();

            this.splitwords();
            if(this.question && this.question.q){
              this.parseQuestion(this.question.q.rs_Question);
            }
            if (
                this.question &&
                this.question.q &&
                this.question.q.exa_type == "MultipleChoice" &&
                (!this.question.a || !this.question.a[0])
              ) {
                // console.log("try answers", this.question.q, this.question.q.exa_type)
                  this.getAnswers1();
              } 

            this.removeAnswer();
    },
    resetSetwords() {
      this.splitwords_answer = this.splitwords_answer_original;
      if(this.splitwords_answer_original){ 
            this.splitwords_answer_original.forEach((k, i) => {
            this.splitwords_answer_ordered[i] = "";
            this.splitwords_setanswer();
          });
      }
      this.setKeywordKey = "k" + Math.random(9, 99999);
    },
    getRandomResultText() {
      return "Başarılı Cevap Tebrikler";
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
    },
    drop(ev) {
      var data = ev.dataTransfer.getData("Text");

      if (
        data.substr(0, 4) == "drag" &&
        data &&
        document.getElementById(data) &&
        ev.target &&
        ev.target.id
      ) {
        ev.preventDefault();
        // console.log("id", data, ev.target);
        //  document.getElementById(data).parentNode.replaceChild('',document.getElementById(data));
        document.getElementById(
          ev.target.id
        ).innerText = document.getElementById(data).innerText;
        document.getElementById(data).className = "item-hidden";
        let total = this.splitwords_answer.length;
        let answer = "";
        // console.log("total", total);
        if (total) {
          for (let i = 0; i < total; i++) {
            this.splitwords_answer_ordered[i] = document.getElementById(
              "allAnswers" + this.question.q.id
            ).childNodes[i].innerText;
          }
        }
        let c = [...this.splitwords_answer_ordered];
        let s = c.reverse();
        this.answerText = s.join(" ");
      }
      // document.getElementById(data).className = "";
      // this.splitwords_answer.forEach(k=>{

      // })
    },
    async getAnswers1() {
      // console.log("Answers");
      // this.question.a = null;
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
          filter: { prev_id: ["=", this.question.q.id] }
        }
      })
        .then(response => {
          if (
            response &&
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.answers = response.data.formattedData.sort(() => Math.random() - 0.5);
            this.answers.forEach(k=>{
                    if(k.exa_q_true=="on"){
                        this.trueText = k.id;
                    } 
              });
          }
        })
        .catch(e => {
          this.answers = null;
        });
    },
    splitwords_setanswer(event) {
      // console.log("event");
      // this.splitwords_answer_ordered =   this.splitwords_answer;
      let total = this.splitwords_answer_ordered.length;
      console.log(
        "this.splitwords_answer_ordered",
        this.splitwords_answer_ordered
      );
      let answer = "";
      if (total) {
        for (let i = 0; i < total; i++) {
          let byId = document.getElementById("allAnswers" + this.question.q.id)
          if(byId &&  byId.childNodes &&  byId.childNodes[i]){
              let t = byId.childNodes[i].innerText;
              //  this.splitwords_answer_ordered[i]=t;
              // console.log(i,this.splitwords_answer_ordered[i],t)
              document.getElementById("allAnswers" + this.question.q.id).childNodes[
                i
              ].innerText = this.splitwords_answer_ordered[i];
          }
        }
      }
      this.answerText = this.splitwords_answer_ordered.join(" ");
    },
    splitparagraph_setanswer() {
      this.answerText = this.splitparagraph_answer.join(" ");
    },
    decodeHTMLEntities (str) {
       var element = document.createElement('div');
        if(str && typeof str === 'string') {
          // strip script/html tags
          str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
          element.innerHTML = str;
          str = element.textContent;
          element.textContent = '';
        }

        return str;
    },
    checkRTL(t){           
        
       var txt = document.createElement("textarea");
        txt.innerHTML = t;
        return txt.value;   
    },

    splitwords() {
      if(this.question && this.question.q && this.question.q.rs_Question){
      let words = this.question.q.rs_Question.trim();
      let wp = words.split("\n");

        let txt = this.question.q.rs_Question 
        txt = txt.replaceAll("&lt;", "<");
        txt = txt.replaceAll("&gt;", ">");
        this.question.q.rs_Question = txt


      if(this.question.q.exa_type == 'FillBlanks'){
        let val =  this.question.q.rs_Question;
       
       let isRtl = this.decodeHTMLEntities(val)
      //  let isRtl = this.decodeHTMLEntities("بلبل 123++ ? شبسبسي ++ ")
        isRtl = isRtl.replaceAll("&lt;", "<");
        isRtl = isRtl.replaceAll("&gt;", ">");
        let before = isRtl.split("++");
        
        console.log("Splitted",isRtl);
        console.log(val,"val")
        console.log(before,"before")
        console.log(isRtl,"isRtl")
//         console.log("Typed left to right:");
// console.log("2132-سسس".split('-'));
// console.log("8635-بحد".split('-'));

// console.log("---------------");

// console.log("Typed right to left as Arabians follow:");
// console.log("سسس-2132".split('-'));
// console.log("بحد-8635".split('-'));
        let after = before[1]!="undefined" ? before[1].split("++") : ["", ""];
    
        let answer = before[1] ? before[1].split("+") : [];
        this.trueText = answer && answer[0] ? answer[0].trim() : "";
         let answer_char = answer && answer[1] ? answer[1].trim() : "";
         this.alternativeChars = answer_char ? answer_char.trim().split("") : [];
      }else
      if(this.question.q.exa_type == 'ParagraphOrder'){
         this.trueText = wp.join(" ").trim();
         this.splitparagraph_answer = wp.sort(() => Math.random() - 0.5);
          this.splitwords_answer_original = wp.sort(() => Math.random() - 0.5);

          return [...this.splitwords_answer];
     } else
      if(this.question.q.exa_type == 'MultipleChoice'){
         this.trueText = ''; 
            
      }else{
        if(wp){
           var ws = wp[0].trim().split(" ");
            let w = ws.map(k => {
            return k
              .replaceAll(".", "")
              .replaceAll(" ", "")
              .trim();
            });
          if(wp[1]){
            var ws2 =  wp[1].trim().split(" ");
             let w2 = ws2.map(k => {
                return k
                  .replaceAll(".", "")
                  .replaceAll(" ", "")
                  .trim();
                });
                  this.alternativeText = w2.join(" ").trim();
          }
          this.trueText = w.join(" ").trim();

          this.splitwords_answer = w.sort(() => Math.random() - 0.5);
          this.splitwords_answer.forEach(
            (k, i) => (this.splitwords_answer_ordered[i] = "")
          );
          this.splitwords_answer_original = w.sort(() => Math.random() - 0.5);

          this.splitparagraph_answer = wp.sort(() => Math.random() - 0.5);
          return [...this.splitwords_answer];
        }
      }
    
      }
    },
    chooseActive() {
      this.unit = this.$route.params.unit;
      let id = this.$route.params.id;
      if (
        this.unit &&
        id &&
        this.activeCourse &&
        this.activeCourse.lessons &&
        this.activeCourse.lessons[id]
      ) {
        let s = this.activeCourse.lessons[id];
        this.updated = s.duration
          ? s.duration
          : this.updated
          ? this.updated
          : { value: 120 };
        // this.chance = s.chance ? s.chance : this.chance;
        this.chance = 1;
        this.answerText = s.answer ? s.answer : this.answerText;
        this.score = s.score ? s.score : this.score;
        this.isTimeOut = s.isTimeOut ? s.isTimeOut : this.isTimeOut;
        // this.isTrue = s.isTrue ? s.isTrue : this.isTrue;
        this.isTrue = null;
        this.counterStatus = s.counterStatus ? s.counterStatus : "start";
        this.timeCounterStartPoint =
          s && s.duration && s.duration.value
            ? s.duration.value
            : this.question.q && this.question.q.exa_timer
            ? this.question.q.exa_timer
            : 0;
      } else {
        this.timeCounterStartPoint =
          this.question.q && this.question.q.exa_timer
            ? this.question.q.exa_timer
            : 0;
      }
    },
    hasFinished() {
      this.isTimeOut = true;
    },
    addToAnswer(val, space) {
      let total = this.answerText ? this.answerText.length : 0; 
      this.answerText += space + val;
      this.parseQuestion(this.question.q.rs_Question);
      this.answerText = this.answerText ? this.answerText.trim() : this.answerText;
    },
    removeAnswer(val) {
      this.answerText = "";
      this.answer = '';
      this.isTrue = null;

      if(this.question.q && this.question.q.rs_Question){
        this.parseQuestion(this.question.q.rs_Question);
      }
      if(this.answers && this.answers[0]){
          this.answers.sort(() => Math.random() - 0.5);
      }
      this.splitwords();
      this.chance = 1;
    },
    backspaceAnswer(val) {
      this.answerText = this.answerText.slice(0, -1);
      if(this.question.q && this.question.q.rs_Question){
         this.parseQuestion(this.question.q.rs_Question);
      }

    },
    spaceAnswer(val) {
      this.answerText += " ";
    },
    getRandomItem(arr, start) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const item = arr[randomIndex];
      const result = arr.includes(item);
      if (start.includes(item) === true) {
        return this.getRandomItem(arr, start);
      } else {
        return item;
      }
    },
    parseQuestion(val) {
      if (val) {
        val = val.replaceAll("&lt;", "<");
        val = val.replaceAll("&gt;", ">");
        let before = val.split("++");
        let after = before[1] ? before[1].split("++") : ["", ""];
        let add = "";
        if (before[2]) {
          add =
            " <span class='answerbox'>" +
            this.answerText +
            "</span>  " +
            before[2];
        }
        let newVal = before[0] + add;
        this.parsedQuestion = newVal;
        // return newVal;
      }
    },
    nextQuestion() {
      this.$emit("answered", true);
    },
    setanswer() {
      console.log("answered",this.question.q,this.trueText,this.answerText)
      if (!this.isTrue) {
        let unitId = this.$route.params.unit;
        let lessonId = this.$route.params.id;
        let activeCourse = this.activeCourse;
        console.log("this.trueText",this.trueText,"anser",this.answerText)
        if (this.trueText) {
          this.$emit("answered", true);

          this.isTrue = this.trueText === this.answerText || this.alternativeText === this.trueText   ? true : false;
          if (this.trueText == this.answerText) {
            let divide = this.question.q.exa_timer
              ? parseInt(this.question.q.exa_timer) / this.updated
              : 1000;
            // eğer süre yarısını geçtiyse, puan yarıya düşüyor ( iki ihtimalden biri gerçekleşirse  )

            if (this.chance == 1) {
              if (divide < 2) {
                this.score = 0.5;
                this.counterStatus = "stopped";
              } else {
                this.score = 1;
                this.counterStatus = "stopped";
              }
            } else if (this.chance == 2) {
              this.score = 0.5;
              this.counterStatus = "stopped";
            } else {
              this.score = 0;
              this.counterStatus = "stopped";
            }

            activeCourse.point =
              (activeCourse.point ? parseInt(activeCourse.point) : 0) +
              this.score;
            activeCourse.last = lessonId;
            if (!activeCourse.lessons) {
              activeCourse.lessons = {};
            }
 if(lessonId &&  activeCourse.lessons){
            activeCourse.lessons[lessonId] = {
              completed: true,
              isTimeOut: this.isTimeOut,
              isTrue: true,
              duration: this.updated,
              chance: this.chance,
              score: this.score,
              answer: this.answerText,
              counterStatus: this.counterStatus
            };
            this.$store.dispatch("course/setCourseLast", {
              unitId,
              lessonId,
              courseId: "all",
              unitData: activeCourse
            });
 }
          } else {
            this.chance += 1;
            activeCourse.point = activeCourse.point + this.score;
            activeCourse.last = lessonId;
            if (!activeCourse.lessons) {
              activeCourse.lessons = {};
            }
             if(lessonId &&  activeCourse.lessons){
                  activeCourse.lessons[lessonId] = {
                    completed: false,
                    isTimeOut: this.isTimeOut,
                    isTrue: false,
                    duration: this.updated,
                    chance: this.chance,
                    score: this.score,
                    answer: this.answerText,
                    counterStatus: this.counterStatus
                  };
                  this.$store.dispatch("course/setCourseLast", {
                    unitId,
                    lessonId,
                    courseId: "all",
                    unitData: activeCourse
                  });
             }
          }
        } else {
          this.$emit("answered", true);
          let multiple_options =
            this.question.a && this.question.a[0]
              ? this.question.a
              : this.answers;
          let answer = multiple_options.find(
            k => k.id == this.answer && k.exa_q_true == "on"
          );

          if (answer) {
            let divide = this.question.q.exa_timer
              ? parseInt(this.question.q.exa_timer) / this.updated
              : 1000;
            // eğer süre yarısını geçtiyse, puan yarıya düşüyor ( iki ihtimalden biri gerçekleşirse  )

            if (this.chance == 1) {
              if (divide < 2) {
                this.score = 0.5;
                this.counterStatus = "stopped";
              } else {
                this.score = 1;
                this.counterStatus = "stopped";
              }
            } else if (this.chance == 2) {
              this.score = 0.5;
              this.counterStatus = "stopped";
            } else {
              this.score = 0;
              this.counterStatus = "stopped";
            }

            activeCourse.point =
              (activeCourse.point ? parseInt(activeCourse.point) : 0) +
              this.score;
            activeCourse.last = lessonId;
            if (!activeCourse.lessons) {
              activeCourse.lessons = {};
            }
 if(lessonId &&  activeCourse.lessons){
            activeCourse.lessons[lessonId] = {
              completed: true,
              isTimeOut: this.isTimeOut,
              isTrue: true,
              duration: this.updated,
              chance: this.chance,
              score: this.score,
              answer: this.answerText,
              counterStatus: this.counterStatus
            };
            this.$store.dispatch("course/setCourseLast", {
              unitId,
              lessonId,
              courseId: "all",
              unitData: activeCourse
            });
 }
          } else {
            this.chance += 1;
             if(lessonId &&  activeCourse.lessons){
            activeCourse.lessons[lessonId] = {
              completed: false,
              isTimeOut: this.isTimeOut,
              isTrue: false,
              duration: this.updated,
              chance: this.chance,
              score: this.score,
              answer: this.answerText,
              counterStatus: this.counterStatus
            };
            this.$store.dispatch("course/setCourseLast", {
              unitId,
              lessonId,
              courseId: "all",
              unitData: activeCourse
            });
             }
          }
          this.isTrue = answer ? true : false;
        }
      }
    }
  }
};
</script>
<style>
.answerbox {
  height: 14px;
  border: 1px solid #efefef;
  background: rgb(240, 240, 240);
  color: rgb(100, 100, 100);
  border-radius: 5px;
  padding: 4px 5px;
  margin-left: 5px;
  margin-right: 5px;
  min-width: 32px;
  height: 32px;
  display: inline-block;
  line-height: 1;
}

.ui.radio.checkbox .box:before, .ui.radio.checkbox label:before {
 
    right: 0!important;
    left: auto!important;
}

.ui.radio.checkbox .box:after, .ui.radio.checkbox label:after {
 
    right: 0!important; 
    left: auto!important; 
}

.ui.checkbox {
    position: relative;
    display: inline-block;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    outline: 0;
    vertical-align: baseline;
    font-style: normal;
    min-height: 17px;
    font-size: 1rem;
    line-height: 17px;
    min-width: 17px;
}
.ui.checkbox input[type=checkbox], .ui.checkbox input[type=radio] {
    right: 0!important; 
    left: auto!important; 
}
.ui.radio.checkbox .box, .ui.radio.checkbox label {
    padding-right: 1.85714em;
    padding-left: 0!important;
}
</style>
<style scoped>
.question {
  font-size: 15px;
  font-weight: bold;
  font-family: "Scheherazade";
}
.download_btn {
  color: #fff !important;
  float: right;
  padding: 7px 10px;
  height: 32px;
}
.download_reset {
  background: #fff !important;
  float: right;
  padding: 7px 10px;
  height: 32px;
  font-weight: 500;
  font-size: 14px;
  margin-right: 20px;
  font-family: "Scheherazade", sans-serif;
  text-align: center;
  color: #ee682d !important;
  border-radius: 20px;
  border: 0;
  display: inline-block;
  margin-top: 25px;
}

.alphabets {
  width: 100%;
  display: inline-flex;
  place-content: flex-end;
}
.alphabet_item {
  width: 35px;
  height: 35px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-right: 3px;
  /* border-radius: 10px; */
  background: #fcfcfc;
  border: 1px solid #efefef;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
}

.words {
  width: 100%;
  float: right;
}
.paragraph_item {
  width: auto;
  min-height: 30px;
  padding: 5px;
  margin-bottom: 3px;
  margin-right: 3px;
  /* border-radius: 10px; */
  background: #fff;
  border: 1px solid #efefef;
  text-align: right;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}
.words_item.reset {
  margin-right: 20px;
  background: #fff;
  border: 0;
  color: #d64b4b;
  font-weight: 400;
}
.words_item {
  width: auto;
  height: 32px;
  padding: 6px;
  margin-right: 5px;
  /* border-radius: 10px; */
  background: #fff;
  border: 1px solid #efefef;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
}

.myAlphabet {
  width: 100%;
  display: inline-flex;
  flex-direction: right;
  margin: 10px 0;
  place-content: flex-end;
}
.answerAlphabet {
  width: 35px;
  height: 35px;
  padding-top: 4px;
  margin-right: 3px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e0e0e0;
  text-align: center;
  cursor: pointer;
}
.answerTitle {
  width: 125px;
  height: 25px;
  padding-top: 4px;
  margin-right: 3px;
  background: #fff;
  cursor: pointer;
  text-align: right;
}

.answerSentence {
  width: 100%;
  height: 25px;
  padding-top: 4px;
  margin-right: 3px;
  background: #fff;
  text-align: left;
  cursor: pointer;
}
.answerSentence.answered {
  font-size: 30px;
  transition: 1s all;
}
.success-result {
  font-size: 16px;
  background: rgb(134, 231, 78);
  margin: 10px 0;
  font-weight: 600;
      float: left;
    margin-top: 15px;
}
.fail-result {
  font-size: 16px;
  background: rgb(207, 27, 27);
  margin: 10px 0;
  font-weight: 600; 
    float: left;
    margin-top: 15px;
}

.stopped {
  margin: 20px 0;
}
.rotate-180 {
  transform: rotate(90deg);
}

.number-right {
  float: right;
  text-align: center;
  margin: 0px 3px;
  padding: 1px 3px;
  min-width: 25px;
  height: 25px;
  border-radius: 5px;
  font-size: 90%;
  border: 1px solid #f9f9f9;
  color: #fff;
  background: rgb(230, 97, 8);
}
.unselectable {
  /* -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; */
}
.item-hidden {
  display: none;
}
.degree-class {
  padding: 5px;
  border-radius: 10px;
  background: red;
  color: #fff;
  position: absolute;
  left: 0px;
  top: -10px;
}

</style>
