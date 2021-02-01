<template>
  <div class="container">
    <div class="list-group">
      <a
        href="#"
        class="list-group-item list-group-item-action active"
        aria-current="true"
        v-for="d in data"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ d.dict_word }}</h5>
          <small>{{ d.dict_mean }}</small>
        </div>
      </a>
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
    this.getDictionary();
  },
  methods: {
    async getDictionary() {
      let fields = `dict_word,dict_mean,dict_image,dict_w_similar,id,status,created_on,created_by,id,status`;

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
            this.data =
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
                ? response.data.formattedData
                : [];
          })
          .catch(e => {
            console.log(e);
          });
      });
    }
  }
};
</script>
