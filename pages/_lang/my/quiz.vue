<template>
  <div class="container">
 
    
<div class="row">
      <div class="col-12 ">
        <div class="search-header">
            <div class="title-field">{{l('Quizs','g')}}</div>
            <div class="search-field">
        			<input type="text" class="input-std" 
                                        @change="getData()"
                                        v-model="search.keyword" :placeholder="l('Search keyword','g')"  /> 
             </div>
             </div>
      </div>
      <div class="col-9 col-md-9 col-sm-12">
        <div class="fcrse_1" v-for="d in data"> 
									 
										<div class="hs_content" v-if="d && d.from_er_List ">
										 
											<a @click="goPath('filter/result/'+d.id)" @click.middle="goPathBlank('filter/result/'+d.id)" class="crse14s title900">{{d.from_er_List.uye_list_name}}</a>
											<a href="#" class="crse-cate">{{d.er_true}} true in {{d.er_total}} on {{d.created_on | date("DD MMM YYYY HH:mm")}}</a>
											<!-- <div class="crse-cate mt-1">
												<a href="javascript:;"  >{{getOptName(d.cou_category,'co_labels','cou_label_name')}} </a> 
												<span class="  ml-1">|</span> 
												<a href="javascript:;"  v-if="d.cou_tags" :class="'ml-2'" :key="'tg'+tag"  v-for="tag in d.cou_tags.split(',')">{{tag}} </a>
											</div> -->
									 
										</div>
									</div>

                                       <div class="row">
              <div
                class="col-12 text-center"
                :class="customClass.textDir + ' ' + customClass.dir"
              >
                <b-pagination
                  v-model="pagination.page"
                  :total-rows="pagination.total"
                  :per-page="pagination.limit"
                  aria-controls="my-table"
                ></b-pagination>
              </div>
            </div>
									</div>
                  

      <div class="col-3 col-md-3 col-sm-12">
         <!--  search type -  date range and  -->
                 <banners  area="Courses"    ></banners>
                 <h3>{{l('Search','g')}}</h3>
                  <date-picker v-model="range" @change="getData()" range></date-picker>
        </div>
        </div> 
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import banners from "@/components/common/banner.vue"; 
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  mixins: [general],
  components:{
    banners,
    DatePicker
  },
  data: () => ({
    data: [],
    settings:[],
    search:{
      keyword:''
    },
    range:[],
    pagination:{
            total:0,
            page:1,
            limit:20
    },
  }),
  async created() {
	  	await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_level',
			fields:'id,cou_level_name,cou_level_color'
		});
		await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_labels',
			fields:'id,cou_label_name'
		});
    await this.$store.dispatch("core/getOptions", {
          slang: this.$store.state.locale,
          group: 'cou_settings',
          fields:'id,cou_setting_image'
		});
	
	this.getData();
	
  },
  watch:{
    "pagination.page"(val) {
      this.getData();
    },
  },
  methods: {
    
    async getData() { 
        let fields = `er_answers,er_true,er_total,er_time,er_current_duration,er_result,er_empty,er_user,er_List.id,er_List.uye_fav_type,er_List.uye_list_name,er_false,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };
    let range =this.range
    if(range[0]){
        filters.created_on =  ["between", range] ;
    }

      if(this.search.keyword){
        filters.er_List = ["LIKE",this.search.keyword]
      }
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "ExamResults",
          method: "get",
          params: {
           limit: this.pagination.limit,
            offset:  (this.pagination.page-1)*this.pagination.limit,
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
.toolbar-cart{
	position: absolute;
	top: 20px;
	right: 20px;
}
.fcrse_1{
  margin-bottom: 10px;
}
</style>
<style lang="scss">

.search-header{
  display:inline-flex;
  width:100%;
  padding: 10px 0px;
  justify-content: space-between;
  border-bottom: 1px solid #d0d0d0;
  margin-bottom: 10px;
  .title-field{

    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
  }
  .search-field{
    .input-std{
      border: 1px solid #d0d0d0;
      border-radius: 10px;
      padding: 7px 10px;
    }
  }

}


</style>
