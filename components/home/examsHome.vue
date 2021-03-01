<template>
  <div class="container">


    <div class="section3125 mt-50">
							<h4 class="item_title"> {{l('Courses','g')}} </h4>
							<a href="#" class="see150">See all</a>
							<div class="la5lo1">
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
													<a href="#"><i class='uil uil-ellipsis-v'></i></a>
													<div class="dropdown-content">
														<span><i class='uil uil-share-alt'></i>Share</span>
														<span><i class="uil uil-heart"></i>Save</span>
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
						</div>
    
	  
    <!-- <div class="list-group"> -->
      <!-- <li class="list-group-item list-group-item-action" v-for="d in data">
        <div class="d-flex w-100 ">
             @click="goPath('word/deneme')" 
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
      </li> -->
    <!-- </div>  -->
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
