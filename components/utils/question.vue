<template>
  <div v-if="question && question.q">
    <div class="row">
      <!-- <div class="col-12">{{ activeCourse }}</div> -->
      <div class="col-3" v-if="question.q && question.q.exa_timer">
        {{ order }}
        <counter
          v-if="timeCounterStartPoint && counterStatus == 'start'"
          :status="counterStatus"
          ref="countDown"
          :initial-value="parseInt(timeCounterStartPoint)"
          :stroke-width="5"
          :seconds-stroke-color="'#f00'"
          :underneath-stroke-color="'lightgrey'"
          :seconds-fill-color="'#efefef'"
          :size="200"
          :padding="14"
          :second-label="''"
          :show-second="true"
          :show-minute="false"
          :show-hour="false"
          :show-negatives="false"
          @update="updated = $event"
          @finish="hasFinished($event)"
        ></counter>
        <div v-if="counterStatus == 'stopped'" class="stopped">
          <h2>{{ updated ? updated.value : '' }} / {{ question.q.exa_timer }}</h2>
          <p>{{ l("seconds", "g") }}</p>
        </div>
        <!-- <p>Your Point: {{ score * 10 }}</p> -->
      </div>
      <div class="col-9">
        <div class="question" v-if="question.q.exa_type == 'SentenceCorrect'">
          {{ l("Make the sentence correct", "g") }}
          <div class="myAlphabet" v-if="question.q.rs_Question">
            <!-- {{answerText == trueText ? "Yes true." : "Try Again"}}   {{answerText}}==={{trueText}} -->
            <div
              class="answerSentence"
              :class="counterStatus == 'stopped' ? 'answered' : ''"
            >
              {{ l("Answer", "g") }}: {{ answerText }}
            </div>
          </div>
          <div class="words" v-show="counterStatus != 'stopped'">
  
            <draggable v-model="splitwords_answer" @end="splitwords_setanswer()">
                  <transition-group style=" display: inline-flex;">
                          <div
                            class="words_item"
                            v-for="(alp,i) in splitwords_answer"
                            :key="'alp'+i"
                          >
                            <!-- @click="addToAnswer(alp, ' ')" -->
                            {{ alp }}
                          </div>  
                  </transition-group>
            </draggable>
            <p><i>Please set answer drag and drop words.</i></p>
           
          </div>
        </div>
        <div v-else>
          {{ order }} - {{ parseQuestion(question.q.rs_Question) }} -
          
        </div>
        <div v-if="question.q.exa_video">
          <video   width="100%" style="max-width: 640px;"  height="480" controls autoplay>
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

        <div class="ui form">
          <div class="grouped fields">
            <div class="field fltr-radio" v-for="(a, i) in question.a">
              <div class="ui radio checkbox">
                <input
                  type="radio"
                  name="example"
                  v-model="answer"
                  :value="a.id"
                  class="hidden"
                  :disable="isTrue"
                />
                <label @click="answer = a.id">{{ a.exa_q_answer }} </label>
              </div>
            </div>
          </div>
        </div>
        <div
          class="myAlphabet"
          v-if="question.q.exa_type == 'FillBlanks' && trueText.length"
        >
          <!-- {{answerText == trueText ? "Yes true." : "Try Again"}}   {{answerText}}==={{trueText}} -->
          <div class="answerTitle">
            {{ l("Answer", "g") }}: {{ answerText }}
          </div>

          <!-- <div class="answerAlphabet" v-for="i in trueText.length">
            {{ answerText && answerText[i - 1] ? answerText[i - 1] : "" }}
          </div> -->
        </div>
        <div
          class="alphabets"
          v-if="question.q.exa_type == 'FillBlanks' && trueText.length"
        >
          <div
            class="alphabet_item"
            v-for="alp in randomAlphabets"
            @click="addToAnswer(alp, '')"
          >
            {{ alp }}
          </div>
          <div class="alphabet_item" @click="removeAnswer()">
            <i class="fa fa-trash"></i>
          </div>
          <div class="alphabet_item" @click="backspaceAnswer()">
            <-
          </div>
          <div class="alphabet_item" @click="spaceAnswer()">
            |_|
          </div>
        </div>
        <a
          @click="setanswer()"
          class="download_btn"
          v-if="!isTimeOut && !isTrue"
          >{{
            chance == 1 ? l("Answer", "g") : chance == 2 ? l("Answer (2nd chance)", "g") : l("Answer to learn answer", "g")
          }}</a
        >
        <a @click="nextQuestion()" class="download_btn" v-else-if="isTimeOut"
          >Timeout. Just Answer to learn</a
        >
        <div class="success-result" v-if="isTrue">
          {{ getRandomResultText() }}
        </div>
        <div class="fail-result" v-else-if="isTrue === false">
          Lütfen cevabınızı kontrol ediniz.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import counter from "@/components/utils/counter.vue";
import general from "@/mixins/general";
  import draggable from 'vuedraggable'
export default {
  mixins: [general],

  props: {
    question: [Object, Array],
    order: Number
  },
  data() {
    return {
      updated: null,
      chance: 1,
      timeCounterStartPoint:null,
      unit: null,
      score: null,
      isTimeOut: false,
      isTrue: null,
      answerText: "",
      splitwords_answer: [],
      answer: "",
      counterStatus: "start",
      trueText: "",
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
   
    randomAlphabets() {
      let alp = this.trueText.trim();
      let start = alp.split("");
      const total = start.length + 4;
      // this.alphabets;
      for (let i = 0; i < 4; i++) {
        start.push(this.getRandomItem(this.alphabets, start));
      }
      return start.sort(() => Math.random() - 0.5);
    }
  },
  created() {
    this.chooseActive();
   
  },
  watch: {
    "activeCourse.last"(val) {
      this.chooseActive();
    },
    "question.q"(val){
      
      this.splitwords();
    }, 
    "updated.value"(val) {
        let unitId = this.$route.params.unit;
        let lessonId = this.$route.params.id;
        let activeCourse = this.activeCourse;
        Object.assign(activeCourse.lessons[lessonId],{ 
              duration: this.updated, 
            }) 
            this.$store.dispatch("course/setCourseLast", {
              unitId,
              lessonId,
              courseId: "all",
              unitData: activeCourse
            }); 
    }
  },
  methods: {
    getRandomResultText() {
      return "Başarılı Cevap Tebrikler";
    },

    splitwords_setanswer(){
        this.answerText = this.splitwords_answer.join(" ");
    },
     splitwords() {

      let words = this.question.q.rs_Question;
      let ws = words.split(" ");
      let w = ws.map(k => {
        return k.replaceAll(".", "").trim();
      });
      this.trueText = w.join(" ").trim();
      this.splitwords_answer = w.sort(() => Math.random() - 0.5);
      return [...this.splitwords_answer]
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
        this.updated = s.duration ? s.duration : this.updated ? this.updated : {value:120} ;
        this.chance = s.chance ? s.chance : this.chance;
        this.answerText = s.answer ? s.answer : this.answerText;
        this.score = s.score ? s.score : this.score;
        this.isTimeOut = s.isTimeOut ? s.isTimeOut : this.isTimeOut;
        this.isTrue = s.isTrue ? s.isTrue : this.isTrue;
        this.counterStatus = s.counterStatus ? s.counterStatus : "start";
         this.timeCounterStartPoint = s && s.duration && s.duration.value ? s.duration.value  : this.question.q && this.question.q.exa_timer ?  this.question.q.exa_timer : 0;
      }else{
        this.timeCounterStartPoint=this.question.q && this.question.q.exa_timer ?  this.question.q.exa_timer : 0;
      }
    },
    hasFinished() {
      this.isTimeOut = true;
    },
    addToAnswer(val, space) {
      let total = this.answerText ? this.answerText.length : 0;
      if (total < this.trueText.length) {
        this.answerText += space + val;
        this.answerText = this.answerText.trim();
      }
    },
    removeAnswer(val) {
      this.answerText = "";
    },
    backspaceAnswer(val) {
      this.answerText = this.answerText.slice(0, -1);
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
      val = val.replaceAll("&lt;", "<");
      val = val.replaceAll("&gt;", ">");
      let before = val.split("<<<");
      let after = before[1] ? before[1].split(">>>") : ["", ""];
      let newVal = before[0] + " " + after[1];
      this.trueText = after[0].trim();
      return newVal;
    },
    nextQuestion() {
      this.$emit("answered", true);
    },
    setanswer() {
      if (!this.isTrue) {
        let unitId = this.$route.params.unit;
        let lessonId = this.$route.params.id;
        let activeCourse = this.activeCourse;
        if (this.trueText) {
          this.$emit("answered", true);
          console.log("aaa");

          this.isTrue = this.trueText === this.answerText ? true : false;
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
          } else {
            this.chance += 1;
            activeCourse.point = activeCourse.point + this.score;
            activeCourse.last = lessonId;
            if (!activeCourse.lessons) {
              activeCourse.lessons = {};
            }
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
        } else {
          this.$emit("answered", true);
          let answer = this.question.a.find(
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


          }else{ 
            this.chance += 1;
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
          this.isTrue = answer ? true : false;
        }
      }
    }
  }
};
</script>
<style scoped>
.question {
  font-size: 15px;
  font-weight: bold;
  font-family: "Cairo";
}
.download_btn {
  color: #fff !important;
}

.alphabets {
  width: 100%;
  display: inline-flex;
}
.alphabet_item {
  width: 35px;
  height: 35px;
  padding-top: 6px;
  margin-right: 3px;
  /* border-radius: 10px; */
  background: #efefef;
  border: 1px solid #afafaf;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
}

.words {
  width: 100%;
  display: inline-flex;
}
.words_item {
  width: auto;
  height: 30px;
  padding: 5px;
  margin-right: 3px;
  /* border-radius: 10px; */
  background: #efefef;
  border: 1px solid #afafaf;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
}

.myAlphabet {
  width: 100%;
  display: inline-flex;
  margin: 10px 0;
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
  text-align: center;
  cursor: pointer;
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
  color: rgb(134, 231, 78);
  margin: 10px 0;
  font-weight: 600;
}
.fail-result {
  font-size: 16px;
  color: rgb(207, 27, 27);
  margin: 10px 0;
  font-weight: 600;
}

.stopped {
  margin: 20px 0;
}
</style>
