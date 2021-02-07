<template>
  <div class="container">
    Test edyoruz
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
    this.getDictionary();
  },
  methods: {
    async getDictionary() {
      let fields = `dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };
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
