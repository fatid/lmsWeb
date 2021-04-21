<template>
  <div v-if="question && question.q">
    <div class="row">
      <div class="col-3" v-if="question.q && question.q.exa_timer">
        {{ order }}
        <counter
          v-if="question.q && question.q.exa_timer"
          ref="countDown"
          :initial-value="parseInt(question.q.exa_timer)"
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
        <p>
          Your Point: {{score*10}}
        </p>
      </div>
      <div class="col-9">
        <div class="question" v-if="question.q.exa_type=='SentenceCorrect'">
            {{l('Make the sentence correct','g')}}
            <div class="myAlphabet" v-if="question.q.rs_Question">
              <!-- {{answerText == trueText ? "Yes true." : "Try Again"}}   {{answerText}}==={{trueText}} -->
              <div class="answerSentence">
                {{ l("Answer", "g") }}: {{ answerText }}  
              </div> 
              
            </div>
            <div class="words" >
                      <div
                        class="words_item"
                        v-for="alp in splitwords(question.q.rs_Question)"
                        @click="addToAnswer(alp,' ')"
                      >
                        {{ alp }}
                      </div>
                      </div>
        </div>
        <div v-else>
          {{ order }} - {{ parseQuestion(question.q.rs_Question) }} -
          {{ question.q.exa_type }}
        </div>
        <div v-if="question.q.exa_video">
          <video width="640" height="480" controls autoplay>
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
        <div class="myAlphabet" v-if="question.q.exa_type=='FillBlanks' && trueText.length">
          <!-- {{answerText == trueText ? "Yes true." : "Try Again"}}   {{answerText}}==={{trueText}} -->
          <div class="answerTitle">
            {{ l("Answer", "g") }}: {{ answerText }}
          </div>

          <div class="answerAlphabet" v-for="i in trueText.length">
            {{ answerText && answerText[i - 1] ? answerText[i - 1] : "" }}
          </div>
        </div>
        <div class="alphabets" v-if="question.q.exa_type=='FillBlanks' &&  trueText.length">
          <div
            class="alphabet_item"
            v-for="alp in randomAlphabets"
            @click="addToAnswer(alp)"
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
            chance == 1 ? l("Answer", "g") : l("Answer (2nd chance)", "g")
          }}</a
        >
        <a @click="nextQuestion()" class="download_btn" v-else-if="isTimeOut"
          >Timeout. Just Answer to learn</a
        >
        <div class="success-result" v-if="isTrue">Başarılı Doğru Cevap</div>
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
      score: null,
      isTimeOut: false,
      isTrue: null,
      answerText: "",
      answer: "",
      trueText: "",
      alphabets: [
        "ا",
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
        "ي",
        "ء"
      ]
    };
  },
  components: {
    counter
  },
  computed: {
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
  methods: {
    hasFinished() {
      this.isTimeOut = true;
    },
    addToAnswer(val,space) {
      let total = this.answerText ? this.answerText.length : 0;
      if (total < this.trueText.length) {
        this.answerText += space+val;
        this.answerText = this.answerText.trim()
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
      console.log("result", result, arr, item);
      if (start.includes(item) === true) {
        return this.getRandomItem(arr, start);
      } else {
        return item;
      }
    },
    splitwords(words){
         let ws =words.split(" ");
         let w =  ws.map(k=>{
            return k.replaceAll(".", "").trim();
         })
          this.trueText = w.join(' ').trim();
         return  w.sort(() => Math.random() - 0.5);
          
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
        if (this.trueText) {
          this.$emit("answered", true);
          this.isTrue = this.trueText === this.answerText ? true : false;
          if (this.trueText == this.answerText) {

            let divide = this.question.q.exa_timer ?  this.question.q.exa_timer / this.updated : 1000; 
            // eğer süre yarısını geçtiyse, puan yarıya düşüyor ( iki ihtimalden biri gerçekleşirse  )
            if (this.chance == 1) {
              if(divide<2){
                this.score = 0.5;
              }else{
                this.score = 1;
              }
            } else if (this.chance == 2) {
              this.score = 0.5;
            } else {
              this.score = 0;
            }
          
          }else{
              this.chance += 1;
          }
        } else {
          this.$emit("answered", true);
          let answer = this.question.a.find(
            k => k.id == this.answer && k.exa_q_true == "on"
          );

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
  font-family: 'Cairo';
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
</style>
