<template>
  <div class="container">
    <h3>{{ l("Dictionary", "g") }}</h3>
    <div class="row">
      <div class="col-xl-12 col-lg-8">
						<div class="section3125">
							<div class="explore_search">
								<div class="ui search focus">
									<div class="ui left icon input swdh11">
										<input class="prompt srch_explore"  
                        v-model="seachKeyword"
                        :placeholder="l('What are you looking for?', 'g')"
                        value="test"
                        @keyup.enter="getDictionary()" 
                    >
										<i class="uil uil-search-alt icon icon2"></i>
									</div>
								</div>
							</div>							
						</div>							
					</div>
      
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4" v-for="d in data">
        <div class="fcrse_1 mt-30">
          <a @click="goPath('word/' + d.dict_word)" class="fcrse_img">
            <img
              v-if="d.dict_image"
              :src="show_image(d.dict_image, '300', '300', true)"
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
              <div class="badge_seller">Bestseller</div>
              <div class="crse_reviews"><i class="uil uil-star"></i>4.5</div>
              <span class="play_btn1"><i class="uil uil-link"></i></span>
              <div class="crse_timer">
                25 hours
              </div>
            </div>
          </a>
          <div class="fcrse_content">
            <div class="eps_dots more_dropdown">
              <a href="#"><i class="uil uil-ellipsis-v"></i></a>
              <div class="dropdown-content">
                <span
                  ><i class="uil uil-share-alt"></i>{{ l("Share", "g") }}</span
                >
                <span><i class="uil uil-heart"></i>{{ l("Save", "g") }}</span>
                <!-- <span><i class="uil uil-ban"></i>{{l('Not Interested','g')}} </span>  -->
              </div>
            </div>
            <!-- <div class="vdtodt">
												<span class="vdt14">109k views</span>
												<span class="vdt14">15 days ago</span>
											</div> -->
            <a @click="goPath('word/' + d.dict_word)" class="crse14s"
              >{{ d.dict_word }}
            </a>
            <div class="tags">
              <div
                class="ui red horizontal label cursor-pointer" 
                @click="goPath('words/all_words', { keyword: label })"
                v-for="label in d.labels"
              >
                {{ label }}
              </div>
            </div>
          </div>
        </div>
      </div>
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
    data: [],
    seachKeyword: ""
  }),
  created() {
    this.getDictionary();
    this.seachKeyword =  this.$route.query && this.$route.query.keyword  ? this.$route.query.keyword : "";
  },
  methods: {
    async getDictionary() {
      let fields = `dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };

      if (this.seachKeyword) {
        filters.dict_word = ["LIKE", this.seachKeyword];
      }
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
             this.data = [];
            console.log(e);
          });
      });
    }
  }
};
</script>
<style lang="scss">
.fcrse_img {
  width img {
    max-width: 100%;
    height: 200px;
  }
}

.tags {
  display: inline-flex;
}
.list-group-item {
  margin-bottom: 10px;
  border: 0;
  border-radius: 10px;
  border: 0.1em solid #f7f7f7;
  .title-item {
    display: inline-flex;
    margin-bottom: 10px;
  }
  transition: 1s all;

  &:hover {
    background: #fff;
    border: 0.1em solid #000;
    transition: 1s all;
  }
}
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
.cursor-pointer {
  cursor: pointer;
}
</style>
