<template>
  <div v-if="question && question.q">
    <div class="row">
      <div class="col-3">
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
          @update="updated"
        ></counter>
      </div>
      <div class="col-9">
        <div class="question">{{ order }} - {{ parseQuestion(question.q.rs_Question) }} - {{question.exa_type}}</div>
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
                  :tabindex="i"
                  class="hidden"
                />
                <label>{{ a.exa_q_answer }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="myAlphabet">
            {{answerText}}  ==={{trueText}}
        </div>
        <div class="alphabets">
          <div class="alphabet_item" v-for="alp in randomAlphabets()" @click="addToAnswer(alp)">{{ alp }}</div>
          <div class="alphabet_item"   @click="removeAnswer()">
              <i class="fa fa-trash"></i>
          </div>
          <div class="alphabet_item"   @click="backspaceAnswer()">
              <-
          </div>
        </div>
        <a @click="answer()" class="download_btn">Answer</a>
        <div class="success" v-if="isTrue">Başarılı Doğru Cevap</div>
        <div class="success" v-else-if="isTrue === false">
          Lütfen cevabınızı kontrol ediniz.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import counter from "@/components/utils/counter.vue";

export default {
  props: {
    question: [Object, Array],
    order: Number
  },
  data() {
    return {
      isTrue: null,
      answerText: '',
      trueText:'',
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
  methods: {
      addToAnswer(val){
        this.answerText+=val;
      },
      removeAnswer(val){
        this.answerText='';
      },
      backspaceAnswer(val){
        this.answerText=this.answerText.slice(0, -1); ;
      },
      randomAlphabets(){

            return this.alphabets;
      },
      parseQuestion(val){
         val = val.replaceAll('&lt;', '<');
         val = val.replaceAll('&gt;', '>');
         let before = val.split("<<<");
         let after = before[1] ? before[1].split(">>>") : ['','']
         let newVal = before[0]+" "+after[1]; 
         this.trueText = after[0];
         return newVal;
      },
    answer() {
        if(this.trueText){
            this.$emit("answered", true);
            this.isTrue = this.trueText==this.answerText ? false : true;
        }else{

            this.$emit("answered", true);
      this.isTrue = this.isTrue ? false : true;
        }
    }
  }
};
</script>
<style scoped>
.question {
  font-size: 15px;
  font-weight: bold;
}
.download_btn {
  color: #fff !important;
}

.alphabets {
  width: 100%;
  display: inline-flex;
}
.alphabet_item {
  width: 25px;
  height: 25px;
  padding-top: 4px;
  margin-right: 3px;
  border-radius: 10px;
  background: #efefef;
  border: 1px solid #afafaf;
  text-align: center;
  cursor:pointer;
}
</style>
