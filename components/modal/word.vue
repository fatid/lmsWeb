<template>
     <b-modal
    hide-footer
    id="modal-xl" size="xl"
    class="modal-word " scrollable 
    v-model="wordModalShow"
    :title="wordModal.word"
 
  >
  <div style="min-height:200px;" v-if="!loading">
      <template v-for="dt in data">
            <wordModel  :dt="dt"   ></wordModel>
      </template>
       <h4>{{ l("More Examples", "g") }} : </h4>
              <a style="text-align:right; " v-for="d in bank"> {{d.sb_sentence}}  <br /></a>

              </div>
              <div style="min-height:200px; padding: 30px;" v-else="loading">

                    Loading...

              </div>
    </b-modal>
</template>

<script>
import general from "@/mixins/general";
import word from "@/mixins/word";
import axios from "axios";
import wordModel from "@/components/utils/word.vue"; 

export default {
  mixins: [general,word],
  data: () => ({ 
    bank: [],
    data:[],
    loading:false
  }),
  watch:{
    'wordModal.word'(val){
        this.getDictionary();
        this.getSentenceBank();
    }
  },
  async created() {
    
  },
  components:{
    wordModel
  },
  computed: {
   
    wordModalShow: {
      get() {
        return this.$store.state.wordModal.show;
      },
      set(val) {
        this.$store.state.wordModal.show = val;
      }
    }
  },

  methods: {

       async getSentenceBank() {
      let fields = `sb_sentence,id,status,created_on,created_by,id,status`;
      let filters = { sb_sentence: ["LIKE", this.wordModal.word] };
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "SentenceBank",
          method: "get",
          params: {
            limit: 20,
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
           
              this.bank = response.data.formattedData;
            }
          })
          .catch(e => {
            this.d = {};
            console.log(e);
          });
      });
    },
       async getDictionary() {
         this.loading = true;

      let fields = `dict_sound,dict_degree,dict_mean,dict_goole_image_search,dict_usage_mix,dict_daily_usage,dict_verb_type,dict_pattern,dict_root,dict_same_root,dict_example,dict_type,dict_verb,dict_plural,dict_singular,dict_w_opposites,dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;
      let filters = { dict_word: ["=", this.wordModal.word] };
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "dict_word",
          method: "get",
          params: {
            limit: 20,
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
              let words = response.data.formattedData;
              let data = words.map(d => {
                if (d.dict_tag) {
                  d.labels = d.dict_tag.split(",");
                }
                if (d.dict_w_opposites) {
                  d.dict_w_opposites_arr = d.dict_w_opposites.split(",");
                }

                if (d.dict_same_root) {
                  d.dict_same_root_arr = d.dict_same_root.split(",");
                }
                if (d.dict_w_similar) {
                  d.dict_w_similar_arr = d.dict_w_similar.split(",");
                }
                if (d.dict_example) {
                  d.dict_example_arr = d.dict_example.split("\r");
                }
                if (d.dict_usage_mix) {
                  d.dict_usage_mix_arr = d.dict_usage_mix.split("\r");
                }
                d.level = this.getLevel(d.dict_degree);
                d.show=false;

                return d;
              });
         this.loading = false;

              this.data = data;
            }
          })
          .catch(e => {
            this.d = {};
            console.log(e);
          });
      });
    }
  }
};
</script>
<style>
.modal-word .modal-body {
  padding: 10px 16px;
  height: 90vh !important;
  overflow: auto;
  width: 90vw;
}
 .modal-title {
 font-size: 25px;
}
  .modal-dialog{
    left: 5%;
    right: 5%;
    margin-right: 0px;

    position: absolute;
    width: 100%;

    }
    .custom-select{
      padding: 6px;
      border-radius: 4px;
      font-size: 12px;
      width: 100%;
    }
    .addnewlist{
      padding: 10px 0px;  
    }
</style>
<style lang="scss" href="./style.scss"></style>
