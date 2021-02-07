<template>
  <div class="container">
	  <h3>{{l('Courses','g')}}</h3>
    <div class="list-group">
      <li class="list-group-item list-group-item-action" v-for="d in data">
        <div class="d-flex w-100 ">
            <!-- @click="goPath('word/deneme')" -->
          <a
            @click="goPath('course/' + d.cou_label_link)"
            class=" active"
            aria-current="true"
          >
            <div>
              <img
                v-if="d.cou_label_image"
                :src="d.cou_label_image"
                class="image-inside"
                alt="..."
              />
              <div v-else class="box-inside"></div>
            </div>
            <div>
              <h5 class="mb-1">{{ d.cou_label_name }}  </h5>   
            </div>
          </a>
        </div>
		<div class="toolbar-cart">
			<i class="fas fa-star"></i>
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
<script>
import general from "@/mixins/general";
import axios from "axios";

export default {
  mixins: [general],

  data: () => ({
    data: []
  }),
  created() {
    this.getData();
  },
  methods: {

    async getCourses() {


 let fields = `cou_label_name,cou_label_link,cou_label_image,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "co_labels",
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
              this.data = d;
            } else {
              this.data = [];
            }
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    async getData() {
      let fields = `cou_label_name,cou_label_link,cou_label_image,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "co_labels",
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
