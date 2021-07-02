<template>
  <div class="container">
    
<!-- {{data}} -->
        <div class="fcrse_1" v-for="d in data">
										<a @click="goPath('course/'+d.cou_link)" class="hf_img">
											<img :src="show_image(d.cou_image,'150','150','c','')" alt="">
											<div class="course-overlay">
												<div class="badge_seller">{{getOptName(d.cou_level,'co_level','cou_level_name')}}</div>
												<div class="crse_reviews">
													<i class="uil uil-star"></i>4.5
												</div>
												<span class="play_btn1"><i class="uil uil-play"></i></span>
												<div class="crse_timer">
													{{d.cou_total_time}} hours
												</div>
											</div>
										</a>
										<div class="hs_content">
											<div class="eps_dots eps_dots10 more_dropdown">
												<a href="#"><i class="uil uil-ellipsis-v"></i></a>
												<div class="dropdown-content">
													<span><i class="uil uil-share-alt"></i>Share</span>
													<span><i class="far fa-heart"></i>Save</span>
													<span><i class="uil uil-ban"></i>Not Interested</span>
													<span><i class="uil uil-windsock"></i>Report</span>
												</div>																											
											</div>
											<div class="vdtodt">
												<span class="vdt14">{{d.cou_total_view}} {{l('views','g')}}</span>
												<!-- <span class="vdt14">15 days ago</span> -->
											</div>
											<a @click="goPath('course/'+d.cou_link)" class="crse14s title900">{{d.cou_name}}</a>
											<a href="#" class="crse-cate">{{d.cou_short}}</a>
											<div class="crse-cate mt-1">
												<a href="#" >{{getOptName(d.cou_category,'co_labels','cou_label_name')}} </a> 
												<span class="  ml-1">|</span> 
												<a href="#" v-if="d.cou_tags" :class="'ml-2'" :key="'tg'+tag"  v-for="tag in d.cou_tags.split(',')">{{tag}} </a>
											</div>
											<div class="auth1lnkprce">
												<!-- <p class="cr1fot">By <a href="#">John Doe</a></p> -->
												<!-- <div class="prce142">$10</div> -->
												<button class="shrt-cart-btn" title="cart"><i class="uil uil-shopping-cart-alt"></i></button>
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
  async created() {
	  	await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_level',
			fields:'id,cou_level_name'
		});
		await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_labels',
			fields:'id,cou_label_name'
		});
	
	this.data = this.$store.state.likes;
	
  },
  methods: {
    
   
    
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
