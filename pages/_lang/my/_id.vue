<template>
  <div class="container">
    
<div class="owl-carousel featured_courses owl-theme">
									<div class="item" v-for="d in data">
										<div class="fcrse_1 mb-20">
											<a  @click="goPath('course/' + d.cou_label_link)" class="fcrse_img">
												 <img
													v-if="d.cou_label_image"
													:src="d.cou_label_image"
													class="image-inside"
													alt="..."
                          						/>
												<div class="course-overlay">
													<div class="badge_seller">{{ d.cou_label_name }} </div>
													<div class="crse_reviews">
														<i class='uil uil-star'></i>4.5
													</div>
													<span class="play_btn1"><i class="uil uil-play"></i></span>
													<div class="crse_timer">
														25 hours
													</div>
												</div>
											</a>
											<div class="fcrse_content">
												<div class="eps_dots more_dropdown">
													<a href="javascript:;" ><i class='uil uil-ellipsis-v'></i></a>
													<div class="dropdown-content">
														<span><i class='uil uil-share-alt'></i>Share</span>
														<span><i class="far fa-heart"></i>Save</span>
														<span><i class='uil uil-ban'></i>Not Interested</span>
														<span><i class="uil uil-windsock"></i>Report</span>
													 </div>																										
												</div>
												<div class="vdtodt">
													<span class="vdt14">109k views</span>
													<span class="vdt14">15 days ago</span>
												</div>
												<a  @click="goPath('course/' + d.cou_label_link)" class="crse14s">Complete Python Bootcamp: Go from zero to hero in Python 3</a>
												<a href="#" class="crse-cate">Web Development | Python</a>

                        	<a href="#" @click="goPath('search',{keyword:label})" v-for="label in d.labels"   class="crse-cate">
            {{ label }}
          </a>
												<div class="auth1lnkprce">
													<p class="cr1fot">By <a href="#">John Doe</a></p>
													<div class="prce142">$10</div>
													<button class="shrt-cart-btn" title="cart"><i class="uil uil-shopping-cart-alt"></i></button>
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
    async getCourse() {
    
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
