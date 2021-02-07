<template>
  <div :lang="LOCALE" class="w-100">
    <breadcrumb size="1"></breadcrumb>
     <div class="container py-0 my-0">
					<div class="row align-items-center">

        <!-- Search Form -->
      
          <div class="form-group searchBox">
            <div class="input-group searchField">
              <input
                class="form-control form-control-md g-brd-white g-font-size-16 
                                  border-right-0 pr-0 g-py-15"
                type="text"
                name="key"
                v-model="key"
                :placeholder="l('What are you looking for?','g')"
                value="test"
                @keyup.enter="getResults()"
              />
              <div
                class="input-group-addon d-flex align-items-center g-bg-white g-brd-white g-color-gray-light-v1 g-pa-2"
              > 
                <button type="submit" 
                 class="btn btn-dark btn-modern font-weight-bold custom-btn-border-radius text-3 
                 btn-px-4 ml-3 my-1" 
                 @click.prevent="getResults()">{{l('Search','g')}}
                </button>
              </div>
            </div>
            <small v-show="key" class="form-text g-opacity-0_8 g-font-size-default"
              >{{l('Please write what you search.','g')}}</small
            >
          </div> 
        <!-- End Search Form -->
      </div>
    </div>
    <div class="container mb-5">
      <div class="row">
        <div v-for="item in founds" class="col-lg-4 ">
          <!-- Search Result -->
          <article class="pa-5 u-shadow-v11 rounded">
            <h2 class="h4 mb-5">
              <a
                class="u-link-v5 g-color-gray-dark-v1 g-color-primary--hover"
                :href="item.SA_Link"
              >
                {{ item.SA_Baslik }}
              </a>
            </h2>
            <p class="g-mb-15"></p>
          </article>
          <!-- End Search Result -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Breadcrumb from "~/components/common/breadcrumb.vue";
import general from "@/mixins/general";

export default {
  mixins: [general],

  data() {
    return {
      founds: [],
      key: this.$route.query.keyword
    };
  },
  created() {
    this.getResults();
  },
  computed: {
     
  },
  components: {  
    Breadcrumb
  },
  methods: {
    async getResults() {
      await axios({
        url: process.env.baseURL+'KurumsalSayfalar',
        method: "get",
        params: {
          limit: 100,
          lang: this.$store.state.locale,
          filter: { SA_Baslik: ["LIKE",this.key] },
          fields: "SA_Baslik,SA_Link,SA_Fotograf",
          sort: ["sort,DESC", "created_on,ASC"]
        }
      })
        .then(response => {
          this.founds = response.data.formattedData;
        })
        .catch(e => {
          console.log("ERR", e);
        });
    }
  }
};
</script>
<style scoped>
.searchBox{
    width: 100%;
    display: inline-block;
    margin: 10px auto;
    text-align: center;
}
.searchField{
        width: 300px;
        margin: 0px auto 20px auto;
        text-align: center;
}
</style>