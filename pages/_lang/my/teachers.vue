<template>
  <div class="container">
    <div class="row">
      <div class="col-12 ">
        <div class="search-header">
          <div class="title-field">{{l('My Teachers','g')}}</div>
          <div class="search-field"> 
          </div>
        </div>
      </div>
      <div class="col-9 col-md-9 col-sm-12">
			No active teacher yet.
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
  computed: {
    courseOrders() {
      return this.$store.state.course.orders;
    }
  },
  async created() {
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "co_level",
      fields: "id,cou_level_name,cou_level_color"
    });
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "co_labels",
      fields: "id,cou_label_name"
    });
    this.$store.dispatch("course/getCourseOrders", {});
    this.data = this.$store.state.likes;
  },
  methods: {}
};
</script>
<style lang="scss">
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
.my_crse_1{
	margin-bottom: 15px
}

.search-header{
  display:inline-flex;
  width:100%;
  padding: 10px 0px;
  justify-content: space-between;
  border-bottom: 1px solid #d0d0d0;
  margin-bottom: 10px;
  .title-field{

    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
  }
  .search-field{
    .input-std{
      border: 1px solid #d0d0d0;
      border-radius: 10px;
      padding: 7px 10px;
    }
  } 
}
</style>
