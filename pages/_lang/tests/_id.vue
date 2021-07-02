<template>
  <div class="container">
    <div v-for="d in data">
      <div class="fcrse_1">
        <a @click="goPath('test/' + d.id)" class="hf_img">
          <img
            v-if="d.dict_image"
            :src="show_image(d.dict_image, '100', '100', true)"
            class="image-inside"
            alt="..."
          />
          <img
            v-else
            src="/images/get-img.jpg"
            class="image-inside"
            alt="..."
          />

          <div class="course-overlay">
            <div class="badge_seller">{{ getDegree(d.ex_degree) }}</div>
        
            <span class="play_btn1"><i class="uil uil-play"></i></span>
            <div class="crse_timer">
              {{ d.ex_total_time }}min.
            </div>
          </div>
        </a>
        <div class="hs_content">
          <div class="eps_dots eps_dots10 more_dropdown">
            <a href="#"><i class="uil uil-ellipsis-v"></i></a>
            <div class="dropdown-content">
              <span><i class="uil uil-share-alt"></i>Share</span>
              <span><i class="far fa-heart"></i>Save</span> 
            </div>
          </div>
          <div class="vdtodt">
            <span class="vdt14">109k views</span> 
          </div>
          <a @click="goPath('test/' + d.id)"  class="crse14s title900"
            >{{d.ex_label}}</a
          >
          <div class="tags">
            <div
              class="ui red horizontal label cursor-pointer"
              @click="goPath('test/all_words', { keyword: label })"
              v-for="label in d.labels"
            >
              {{ label }}
            </div>
          </div>
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
    data: []
  }),
  created() {
    this.getCourse();
  },
  methods: {
	  getDegree (){ 
		  return 'Advanced'
	  },
	  getCategories (){ 
		  return  ['Shopping','Tanışma']
	  },
    async getCourse() {
      let fields = `ex_label,ex_degree,ex_category,ex_tags,ex_total_time,ex_image,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "exams",
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
                if (k.ex_tags) {
                  k.labels = k.ex_tags.split(",");
                }
              });
              this.data = d;
            } else {
              this.data = {};
            }
          })
          .catch(e => {
            this.data = {};
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
.toolbar-cart {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
