<template>
  <div class="container">
    <div class="row">
      <div class="col-12 ">
        <div class="search-header">
          <div class="title-field">{{l('My Active Courses','g')}}</div>
          <div class="search-field"> 
          </div>
        </div>
      </div>
      <div class="col-9 col-md-9 col-sm-12  col-xs-12">
        <div class="fcrse_1 my_crse_1" v-for="d in courseOrders">
          <a
            @click="goPath('course/' + d.from_corder_course.cou_link)"
            class="hf_img"
          >
            <img
              :src="
                show_image(
                  d.from_corder_course.cou_image,
                  '150',
                  '150',
                  'c',
                  ''
                )
              "
              alt=""
            />
            <div class="course-overlay">
              <div class="badge_seller">
                {{
                  getOptName(
                    d.from_corder_course.cou_level,
                    "co_level",
                    "cou_level_name"
                  )
                }}
              </div>
            </div>
          </a>
          <div class="hs_content">
            <div class="vdtodt">
              <span class="vdt14"
                >{{ d.from_corder_course.cou_total_view }}
                {{ l("views", "g") }}</span
              >
            </div>
            <a
              @click="goPath('course/' + d.from_corder_course.cou_link)"
              class="crse14s title900"
              >{{ d.from_corder_course.cou_name }}</a
            >
            <a href="#" class="crse-cate">{{
              d.from_corder_course.cou_short
            }}</a>
            <div class="crse-cate mt-1">
              <a href="#"
                >{{
                  getOptName(
                    d.from_corder_course.cou_category,
                    "co_labels",
                    "cou_label_name"
                  )
                }}
              </a> 
              <br />
              <b>Your last unite:</b>
              <!-- {{d.from_corder_course.corder_text}} -->
              {{ d.from_corder_last_unite ? d.from_corder_last_unite.unite_name +" >": '' }} 
              {{ d.from_corder_last_lesson ? d.from_corder_last_lesson.section_name+" >": '' }}
              {{ d.from_corder_last_topic ?  d.from_corder_last_topic.lesson_name+" >": '' }}
              <a v-if="d.corder_last_lesson"
                @click="
                  goPath(
                    '/course/' +
                      d.corder_last_lesson +
                      '/' +
                      d.corder_last_lesson
                  )
                "
              >
                {{ l("Continue") }}</a
              >
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
