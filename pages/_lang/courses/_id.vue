<template>
  <div class="container" :lang="LOCALE">
 
    
<div class="row" :class="reverseClass">
      <div class="col-12 ">
        <div class="search-header" :class="reverseClass">
            <div class="title-field">{{l('Courses','g')}}</div>
            <div class="search-field">
        			<input type="text" class="input-std" 
                                        @change="getCourse()"
                                        v-model="search.keyword" :placeholder="l('Search keyword','g')"  /> 
             </div>
             </div>
      </div>
      <div class="col-9 col-md-9 col-sm-12" :lang="LOCALE">
        <div class="fcrse_1"  :class="reverseClass" v-for="d in data"> 
										<div><a @click="goPath('course/'+d.cou_link)" @click.middle="goPathBlank('course/'+d.cou_link)"  class="hf_img">
											<img v-if="d.cou_image" :src="show_image(d.cou_image,'150','150','','90')" alt="">
											<img v-else-if="options['cou_settings']" :src="show_image(options['cou_settings'][0].cou_setting_image,'150','150','c','')" alt="">
											<div class="course-overlay">
												<div class="badge_seller">{{getOptName(d.cou_level,'co_level','cou_level_name')}}</div> 
											</div>
										</a>
											</div>
										<div class="hs_content">
										 
											<a @click="goPath('course/'+d.cou_link)" @click.middle="goPathBlank('course/'+d.cou_link)" class="crse14s title900" :lang="LOCALE">{{d.cou_name}}</a>
											<a href="#" class="crse-cate" :lang="LOCALE">{{d.cou_short}}</a>
											<div class="crse-cate mt-1" :lang="LOCALE">
												<a href="javascript:;"  >{{getOptName(d.cou_category,'co_labels','cou_label_name')}} </a> 
												<span class="  ml-1">|</span> 
												<a href="javascript:;"  v-if="d.cou_tags" :class="'ml-2'" :key="'tg'+tag"  v-for="tag in d.cou_tags.split(',')">{{tag}} </a>
											</div>
									 
										</div>
									</div>
									</div>
                  

      <div class="col-3 col-md-3 col-sm-12">
         <banners  area="Courses"    ></banners>
        </div>
        </div> 
  </div>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import banners from "@/components/common/banner.vue"; 

export default {
  mixins: [general],
  components:{
    banners
  },
  data: () => ({
    data: [],
    settings:[],
    search:{
      keyword:''
    }
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
	
	this.getCourse();
	
  },
  
  methods: {
    
    async getCourse() { 
      let fields = `cou_name,cou_level,cou_category,cou_link,cou_tags,cou_total_time,cou_image,cou_short,cou_description,cou_total_view,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };
      if(this.search.keyword){
        filters.cou_name = ["LIKE",this.search.keyword]
      }
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "courses",
          method: "get",
          params: {
            limit: 100,
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
      margin-bottom: 10px;
    display: flex;
    width: 100%;
    height: 130px;
}
.hf_img img{
    height: 105px;
    width: auto;
	display: block;
}
.hf_img {
    height: 105px;
    width: 100%;
    display: flex;
    max-width: 120px;
    overflow: hidden;
    min-width: 120px;
}
:lang(ar) .hs_content{
	direction:rtl;
	text-align: right;
}
.crse-cate:lang(ar) ,  .crse14s:lang(ar){
	direction:rtl;
	text-align: right;
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
   font-family: Cairo;
	  font-weight: 700;
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
	  font-family: Cairo;
	  font-weight: 700;
    }
  }

}


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
