<template>
  <div class="container">
	  <h3>{{l('Dictionary','g')}}</h3>
    <div class="list-group">
      <li class="list-group-item list-group-item-action" v-for="d in data">
        <div class="d-flex w-100 ">
            <!-- @click="goPath('word/deneme')" -->
          <a
            @click="goPath('word/' + d.dict_word)"
            class=" active"
            aria-current="true"
          >
            <div>
              <img
                v-if="d.dict_image"
                :src="d.dict_image"
                class="image-inside"
                alt="..."
              />
              <div v-else class="box-inside"></div>
            </div>
            <div>
              <h5 class="mb-1">{{ d.dict_word }}  </h5>  
              <div class="font-11" v-html="HtmlEncode(d.dict_mean)"></div>
            </div>
          </a>
        </div>
		<div class="toolbar-cart">
			<i class="fas fa-star"></i>
			<a @click="responsiveVoice.speak(d.dict_word)">
				<i class="fas fa-play"></i>
			</a>
		</div>
        <div class="width-full w-100">
          <button @click="goPath('search',{keyword:label})" v-for="label in d.labels" type="button" class="btn btn-light">
            {{ label }}
          </button>
        </div>
      </li>
    </div> 
  </div>
</template>
<script src="https://code.responsivevoice.org/responsivevoice.js?key=Czvpi6ON"></script>
<script>
import general from "@/mixins/general";
import axios from "axios";
export default {
  mixins: [general],

  data: () => ({
    data: []
  }),
  created() {
    this.getDictionary();
  },
  methods: {
    async getDictionary() {
      let fields = `dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };
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
              let d = response.data.formattedData;
              d.map(element => {
                let k = element;
                if (k.dict_tag) {
                  k.labels = k.dict_tag.split(",");
                }
              });

              this.data = d;
            } else {
              this.data = [];
            }
          })
          .catch(e => {
            console.log(e);
          });
      });
    }
  }
};
</script>
<style>
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
.toolbar-cart{
	position: absolute;
	top: 20px;
	right: 20px;
}
</style>
