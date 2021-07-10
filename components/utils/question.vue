<template>
  <div v-if="question && question.q && question.q.exa_type">
    <div class="row">
      <div class="col-12">
        <div class="degree-class" v-if="question.q.exa_degree">
          {{
            question.q.exa_degree
              ? levels.find(k => k.id == question.q.exa_degree)
                ? levels.find(k => k.id == question.q.exa_degree).cou_level_name
                : ""
              : ""
          }}
        </div>
        <div
          class="question"
          v-if="question.q && question.q.exa_type == 'ParagraphOrder'"
        >
          {{ l("Make the text correct", "g") }}
          <div class="myParagraph" v-if="question.q.rs_Question">
            <!-- {{answerText == trueText ? "Yes true." : "Try Again"}}   {{answerText}}==={{trueText}} -->
            <div
              class="answerSentence"
              :class="counterStatus == 'stopped' ? 'answered' : ''"
            >
              <!-- {{ l("Answer", "g") }}: {{ answerText }} -->
            </div>
          </div>
          <div class="words" v-show="counterStatus != 'stopped'">
            <div style="width: 100%;float: right;">
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
            </div>
          </div>
          <p :class="customClass.float">
            <i>Please set answer drag and drop words.</i>
          </p>
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
                                display: inline-flex;
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
          v-else
          style=" text-align: right; direction:rtl;  font-size: 22px;"
        >
          <span v-html="parseQuestion(question.q.rs_Question)"></span>
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
        <div class="ui form" v-else-if="answers && answers[0]">
          <div class="grouped fields">
            <div class="field fltr-radio" v-for="(a, i) in answers">
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
          <!-- <div class="answerTitle">
            {{ l("Answer", "g") }}: {{ answerText }}
          </div> -->

          <!-- <div class="answerAlphabet" v-for="i in trueText.length">
            {{ answerText && answerText[i - 1] ? answerText[i - 1] : "" }}
          </div> -->
        </div>
        <div
          class="alphabets"
          v-if="question.q.exa_type == 'FillBlanks' && trueText.length"
        >
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
          @click="
            resetSetwords();
            removeAnswer();
          "
          >Reset</a
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
      alternativeChars: [],
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
      return start.sort(() => Math.random() - 0.5);
    }
  },
  created() {
    console.log("created",this.question)
    this.chooseActive();

    if (
      this.question &&
      this.question.q &&
      this.question.q.exa_type == "MultipleChoice" &&
      !this.question.a[0]
    ) {
      console.log("inside ");
      this.getAnswers1();
    }
  },
  watch: {
    "activeCourse.last"(val) {
      this.chooseActive();
    },
    "question.q"(val) {
      this.splitwords();
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
    resetSetwords() {
      this.splitwords_answer = this.splitwords_answer_original;
      this.splitwords_answer_original.forEach((k, i) => {
        this.splitwords_answer_ordered[i] = "";
        this.splitwords_setanswer();
      });
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
        console.log("id", data, ev.target);
        //  document.getElementById(data).parentNode.replaceChild('',document.getElementById(data));
        document.getElementById(
          ev.target.id
        ).innerText = document.getElementById(data).innerText;
        document.getElementById(data).className = "item-hidden";
        let total = this.splitwords_answer.length;
        let answer = "";
        console.log("total", total);
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
      console.log("Answers");
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
            this.answers = response.data.formattedData;
          }
        })
        .catch(e => {
          this.answers = null;
        });
    },
    splitwords_setanswer(event) {
      console.log("event");
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
    splitwords() {
      if(this.question && this.question.q && this.question.q.rs_Question){
      let words = this.question.q.rs_Question.trim();
      let wp = words.split("\n");
      let ws = wp[0].trim().split(" ");
      let w = ws.map(k => {
        return k
          .replaceAll(".", "")
          .replaceAll(" ", "")
          .trim();
      });
      this.trueText = w.join(" ").trim();
      this.splitwords_answer = w.sort(() => Math.random() - 0.5);
      this.splitwords_answer.forEach(
        (k, i) => (this.splitwords_answer_ordered[i] = "")
      );
      this.splitwords_answer_original = w.sort(() => Math.random() - 0.5);

      this.splitparagraph_answer = wp.sort(() => Math.random() - 0.5);
      return [...this.splitwords_answer];
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
      this.answerText = this.answerText ? this.answerText.trim() : this.answerText;
    },
    removeAnswer(val) {
      this.answerText = "";
      this.isTrue = null;
      this.chance = 1;
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
        let answer = before[1] ? before[1].split("+") : [];
        this.trueText = answer && answer[1] ? answer[1].trim() : "";
        let answer_char = answer && answer[1] ? answer[0].trim() : "";
        this.alternativeChars = answer_char ? answer_char.trim().split("") : [];
        return newVal;
      }
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
}
</style>
<style scoped>
.question {
  font-size: 15px;
  font-weight: bold;
  font-family: "Cairo";
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
  font-family: "Cairo", sans-serif;
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
