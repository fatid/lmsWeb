<template>
  <div class="container">
    

        <div class="fcrse_1" v-for="d in data"> 
										<a @click="goPath('course/'+d.cou_link)" @click.middle="goPathBlank('course/'+d.cou_link)"  class="hf_img">
											<img v-if="d.cou_image" :src="show_image(d.cou_image,'150','150','','90')" alt="">
											<img v-else-if="options['cou_settings']" :src="show_image(options['cou_settings'][0].cou_setting_image,'150','150','c','')" alt="">
											<div class="course-overlay">
												<div class="badge_seller">{{getOptName(d.cou_level,'co_level','cou_level_name')}}</div>
												<div class="crse_reviews">
													<i class="uil uil-star"></i> No
												</div>
												<span class="play_btn1"><i class="uil uil-play"></i></span>
										 
											</div>
										</a>
										<div class="hs_content">
											<div class="eps_dots eps_dots10 more_dropdown">
												<a href="javascript:;" ><i class="uil uil-ellipsis-v"></i></a>
												<div class="dropdown-content">
													<span><i class="uil uil-share-alt"></i>Share</span>
													<span><i class="far fa-heart"></i>Save</span>
													<span><i class="uil uil-ban"></i>Not Interested</span>
													<span><i class="uil uil-windsock"></i>Report</span>
												</div>																											
											</div>
											<!-- <div class="vdtodt">
												<span class="vdt14">{{d.cou_total_view}} {{l('views','g')}}</span>
												<!-- <span class="vdt14">15 days ago</span> -->
												<!-- </div> -->
											<a @click="goPath('course/'+d.cou_link)" @click.middle="goPathBlank('course/'+d.cou_link)" class="crse14s title900">{{d.cou_name}}</a>
											<a href="#" class="crse-cate">{{d.cou_short}}</a>
											<div class="crse-cate mt-1">
												<a href="javascript:;"  >{{getOptName(d.cou_category,'co_labels','cou_label_name')}} </a> 
												<span class="  ml-1">|</span> 
												<a href="javascript:;"  v-if="d.cou_tags" :class="'ml-2'" :key="'tg'+tag"  v-for="tag in d.cou_tags.split(',')">{{tag}} </a>
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
    data: [],
    settings:[]
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
}
</style>
