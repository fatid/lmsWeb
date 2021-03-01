<template>
  <div class="container">
    

        <div class="fcrse_1">
										<a @click="goPath('course/1')" class="hf_img">
											<img src="/images/courses/img-1.jpg" alt="">
											<div class="course-overlay">
												<div class="badge_seller">Bestseller</div>
												<div class="crse_reviews">
													<i class="uil uil-star"></i>4.5
												</div>
												<span class="play_btn1"><i class="uil uil-play"></i></span>
												<div class="crse_timer">
													25 hours
												</div>
											</div>
										</a>
										<div class="hs_content">
											<div class="eps_dots eps_dots10 more_dropdown">
												<a href="#"><i class="uil uil-ellipsis-v"></i></a>
												<div class="dropdown-content">
													<span><i class="uil uil-share-alt"></i>Share</span>
													<span><i class="uil uil-heart"></i>Save</span>
													<span><i class="uil uil-ban"></i>Not Interested</span>
													<span><i class="uil uil-windsock"></i>Report</span>
												</div>																											
											</div>
											<div class="vdtodt">
												<span class="vdt14">109k views</span>
												<span class="vdt14">15 days ago</span>
											</div>
											<a href="course_detail_view.html" class="crse14s title900">Complete Python Bootcamp: Go from zero to hero in Python 3</a>
											<a href="#" class="crse-cate">Web Development | Python</a>
											<div class="auth1lnkprce">
												<p class="cr1fot">By <a href="#">John Doe</a></p>
												<div class="prce142">$10</div>
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
