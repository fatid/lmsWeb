<template>
  <div :lang="LOCALE" class="w-100">
    <div class="_215v12">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section3125">
              <div class="row justify-content-md-center">
                <div class="col-md-6">
                  <div class="help_stitle">
                    <h2>How may we help you?</h2>
                    <div class="explore_search">
                      <div class="ui search focus">
                        <div class="ui left icon input swdh11">
                          <input
                            class="prompt srch_explore"
                            v-model="key"
                            :placeholder="l('What are you looking for?', 'g')"
                            value="test"
                            @keyup.enter="getResults()"
                          />
                          <i class="uil uil-search-alt icon icon2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  computed: {},
  components: {
    Breadcrumb
  },
  methods: {
    async getResults() {
      await axios({
        url: process.env.baseURL + "KurumsalSayfalar",
        method: "get",
        params: {
          limit: 100,
          lang: this.$store.state.locale,
          filter: { SA_Baslik: ["LIKE", this.key] },
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
.searchBox {
  width: 100%;
  display: inline-block;
  margin: 10px auto;
  text-align: center;
}
.searchField {
  width: 300px;
  margin: 0px auto 20px auto;
  text-align: center;
}
</style>
