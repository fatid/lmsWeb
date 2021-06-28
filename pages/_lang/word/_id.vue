<template>
  <div class="container">
    <div class="head-word">
        <a @click="goPath('words/all_words')"> <i class="fa fa-chevron-left"></i></a>
        <span class="head-title">{{data.dict_word}}</span>
        <a class="like" title="" :class="isLiked(data.id) ? 'selected' :''" @click="setLikes(data)"> <i class="fa fa-heart"></i></a>
    </div>
    
    <div class="row">
        <div class="col-12">

        <img
              v-if="data.dict_image"
              :src="show_image(data.dict_image, '300', '300', true)"
              class="image-inside"
              alt="..."
            />
            <img
              v-else
              src="/images/get-img.jpg"
              class="image-inside"
              alt="..."
            />

        <div class="font-11" v-html="HtmlEncode(data.dict_mean)"></div>
        <br />
        <br />
        </div>
        <div class="col-12">
   <div class="tags">
              <div
                class="ui red horizontal label cursor-pointer" 
                @click="goPath('words/all_words', { keyword: label })"
                v-for="label in data.labels"
              >
                {{ label }}
              </div>
            </div>
            </div>
        <div class="col-12 mt-20">
                <h3>{{l('Other Meanings','g')}}</h3>
                <div class="" v-for="m in meanings">
                        {{m.dict_mean_explain}}
                </div>
        </div>
    </div>  
  </div>
</template> 
<script>
import general from "@/mixins/general";
import axios from "axios";
export default {
  mixins: [general],

  data: () => ({
    data: {},
    meanings: [],
    id: ""
  }),
  created() {
      this.id =  this.$route.params && this.$route.params.id  ? this.$route.params.id : "";
    this.getDictionary();
  },
  methods: {
    async getMeanings() {


      let fields = `dict_mean_explain,dict_mean_sound,dict_mean_image,id,status,created_on,created_by,id,status`; 
      let filters = { prev_id: ["=", this.data.id] }; 
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "dict_meanings",
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
               this.meanings =  response.data.formattedData;
           
            } else {
              this.meanings = [];
            }
          })
          .catch(e => {
             this.meanings = [];
            console.log(e);
          });
      });
        

    },
    async getDictionary() {
      let fields = `dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`; 
      let filters = { dict_word: ["=", this.id] }; 
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
              let d = response.data.formattedData[0];
         
              if(d.dict_tag){
                  d.labels = d.dict_tag.split(",");
              } 
                this.data = d;
                this.getMeanings();
            } else {
              this.dict_tag = {};
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
<style lang="scss">
.fcrse_img {
  width img {
    max-width: 100%;
    height: 200px;
  }
}

.tags {
  display: inline-flex;
}
.list-group-item {
  margin-bottom: 10px;
  border: 0;
  border-radius: 10px;
  border: 0.1em solid #f7f7f7;
  .title-item {
    display: inline-flex;
    margin-bottom: 10px;
  }
  transition: 1s all;

  &:hover {
    background: #fff;
    border: 0.1em solid #000;
    transition: 1s all;
  }
}
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
.cursor-pointer {
  cursor: pointer;
}

.head-word{
    display: inline-flex;
    padding: 10px 0px;
}
.head-title{
    font-size: 42px;
}
.head-word a{
    background: #fff;
    width: 40px;
    height: 40px;
    text-align: center;
    padding: 10px 0;
    border-radius: 50%;
    margin-top: -8px;
    margin-right: 20px;
    &.like{
        margin-left: 30px;
        &:hover, .selected{
            background: rgb(212, 113, 130);
            color: #fff;
        }
    }
}
</style>
