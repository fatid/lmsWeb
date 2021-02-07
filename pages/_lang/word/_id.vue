<template>
  <div class="container"> 
   
        <div class="card" style="width: 100%;"  v-if="!loading.general && data && data.dict_word">
        <div class="card-body">
            <h5 class="card-title">{{ data.dict_word }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
            <img :src="data.dict_image" class="image-word"/>
            </h6>
            <p class="card-text">{{ data.dict_mean }}</p>
            <a v-if="data.dict_sound" @click="sound(data.dict_sound)" class="card-link"><i class="fa fa-play"></i> Play Sound</a>
            <a @click="goPath('home')" class="card-link">All Words</a>
            <a @click="goPath('home')" class="card-link">Another link</a>

            <div class="others">
            <h6>Other Meanings</h6>

            <div v-for="ot in others" class="other-item">
                {{ot.dict_mean_explain}}
            </div>
            </div>
        </div>
        </div>
        <div class="" v-else>
            Loading
        </div>
  
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";

export default {
  mixins: [general],

  data(){
      return{
            data: {},
            others:[],
            word:'',
            loading:{
                general:false,
                similar: false,
                other: false,
            }
        }
  },

  created() {
    // this.word = this.$route.params.word;

    this.getDictionary();
  },
  watch:{
      word(val){
         this.getDictionary();
      }
  },
  methods: {
    sound(file){
       file = file.replace("/visual","");
       var audio = new Audio(file);
       audio.play() 
    },
    async getOtherMeanings() {

            this.loading.other = true;
   let fields = `dict_mean_explain,dict_mean_image,dict_mean_sound,id,created_on,created_by,id,status`;

        let filters = { prev_id: ["=", this.data.id] };
        return new Promise((resolve, reject) => {
          axios({
            url: process.env.baseURL + "dict_meanings",
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
              this.others =
                response.data &&
                response.data.formattedData &&
                response.data.formattedData[0]
                  ? response.data.formattedData
                  : {};
                    this.loading.other = false;
 
            })
            .catch(e => {
                    this.loading.other = false;

              console.log(e);
            });
        });
    },
    async getSimilarWords() {

            this.loading.similar = true;
 
            this.loading.similar = false;
    },
    async getDictionary() {
      let word = this.$route && this.$route.params ? this.$route.params.id : "";
      this.loading.general = true;
      if (word) {
        let fields = `dict_word,dict_mean,dict_image,dict_sound,dict_w_similar,id,status,created_on,created_by,id,status`;

        let filters = { dict_word: ["=", word] };
        return new Promise((resolve, reject) => {
          axios({
            url: process.env.baseURL + "dict_word",
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
              this.data =
                response.data &&
                response.data.formattedData &&
                response.data.formattedData[0]
                  ? response.data.formattedData[0]
                  : {};
                    this.loading.general = false;

                  this.getOtherMeanings(this.data .id);
                  this.getSimilarWords();
            })
            .catch(e => {
                    this.loading.general = false;

              console.log(e);
            });
        });
      }
    }
  }
};
</script>
<style scoped>
.image-word{
 width: 90px; 
}
.others{
  margin: 20px 0px;
  border-top: 1px solid #efefef;
  padding-top: 15px;
}
.other-item{
  width: 100%;
  display: block;
  border-top: 1px solid #efefef;
}
</style>