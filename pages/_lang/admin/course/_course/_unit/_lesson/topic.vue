<template>
  <div class="container">
    <b-modal
      id="modal-xl"
      v-model="show"
      scrollable
      size="xl"
      :title="edited.id ? l('Editing', 'g') : l('Create New', 'g')"
    >
      <!-- {{edited}} -->
      <b-alert :show="saveStatus.show" dismissible :variant="saveStatus.status">
        {{ l("Saved", "g") }}
      </b-alert>
      <div class="modal-form" :lang="LOCALE">
        <div class="modal-form-row">
          <label>{{l('Title','g')}}</label>
          <span
            ><input
              type="text"
              class="modal-form-input"
              v-model="edited.section_name"
            />
          </span>
        </div>  
        <div class="modal-form-row">
          <label>{{l('Sort Order','g')}}</label>
          <span
            ><input
              type="number"
              class="modal-form-input"
              v-model="edited.sort"
            />
          </span>
        </div>  
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="default"
            size="sm"
            class="float-right"
            @click="show = false"
          >
            Close
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="save()"
          >
            {{ l("Save", "g") }}
          </b-button>
        </div>
      </template>
    </b-modal>

    <div class="row">
      <div class="col-12 col-md-12 col-sm-12 table-header">
        <div>
          <h3>
            Courses /
            <a @click="goPath('admin/course/list')">{{ course.cou_name }}</a> /
            <a @click="goPath('admin/course/'+courseId+'/units')">{{ unite.unit_name }}</a> /
            {{ l("Lessons", "g") }}
          </h3>
        </div>
        <div>
          <div class="btn btn-primary" @click="openModal({id:null })">
            + {{ l("Add New", "g") }}
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-sm-12">
  
        <vue-good-table
          :columns="columns"
          :rows="data"
          :search-options="{
            enabled: true,
            trigger: 'enter'
          }"
          :sort-options="{
            enabled: true,
            initialSortBy: { field: 'sort', type: 'asc' }
          }"
          :rtl="LOCALE == 'ar' ? true : false"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <a class="table-buttons" @click="openModal(props.row)"
                ><i class="fa fa-pen"></i
              ></a>
              <a
                class="table-buttons"
                @click="goPathBlank('admin/' + courseId + '/' + props.row.id)"
                @click.middle="
                  goPathBlank('admin/' + courseId + '/' + props.row.id)
                "
                ><i class="fas fa-list-alt"></i
              ></a>
              <a
                class="table-buttons"
                @click="
                  goPathBlank(
                    'course/' + props.row.prev_id + '/' + props.row.id
                  )
                "
                @click.middle="
                  goPathBlank(
                    'course/' + props.row.prev_id + '/' + props.row.id
                  )
                "
                ><i class="fa fa-eye"></i
              ></a>
            </span>
            <span v-else-if="props.column.field == 'unit_image'">
              <img
                v-if="props.row.unit_image"
                :src="show_image(props.row.unit_image, '50', '50', '', '90')"
                alt=""
              />
            </span>
            <span v-else-if="props.column.field == 'count'">
              {{ count ? count[props.row.id] : '' }}  
            </span>
            <span v-else>
              {{ props.row[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import admin_course from "@/mixins/admin_course";
import axios from "axios";
import banners from "@/components/common/banner.vue";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
export default {
  mixins: [general, admin_course],
  components: {
    banners,
    VueGoodTable
  },

  data: () => ({
    edited: {
      id: null, 
    },
    search: {
      keyword: ""
    },
    columns: [
   
      {
        label: "Sort",
        field: "sort",
        width: "60px",
         type: 'number',
      },
   
      {
        label: "Lesson",
        field: "count",
        width: "60px",
        sortable: false,
      },
      {
        label: "Lesson Name",
        field: "section_name"
      },

      {
        label: "Action",
        field: "action",
        width: "120px",
        sortable: false,
      }
    ]
  }),
  async created() {
    this.setDefault();
    this.$store.dispatch("search/groupFields", {
      module: "sections",
      group: "lesson_unite",
      lang: this.LOCALE
    });
    this.getList();
    this.getCourseName();
    this.getUniteName();

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
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "cou_settings",
      fields: "id,cou_setting_image"
    });
  },

  methods: {
    setDefault(){
      this.edited = {
          id: null,
          section_name: "",
          status:1,
          prev_id:this.uniteId, 
          sort:this.data.length+1,
       }
    },
    openModal(row) {
      this.show = true;
      if(!row.id){
        this.setDefault();
      }else{
        this.edited = {...row};
      }
    },

    async save() {
      let d = this.edited;
      let method = "post";
      let url = process.env.baseURL + "sections";
      if (d.id && d.id != "new") {
        method = "put";
        url = process.env.baseURL + "sections/" + d.id;
      }
      await axios({
        url,
        method,
        data: {
          id: d.id &&  d.id!='new' ? d.id : null,
          section_name: d.section_name, 
          prev_id: this.uniteId, 
          status: d.status,
          sort: d.sort,
        }
      }).then(response => {
        this.saveStatus = { show: true, stataus: "success" };
        this.getList();
        setTimeout(() => {
          this.show = false;
          this.saveStatus = { show: false, stataus: "success" };
        }, 500);
      });
    },

    async getList() {
      let fields = `sort,section_name,lesson_unite,id,status,created_on,created_by,id,status`;
      // let prev = this.$route.params.course;
      let filters = { status: ["=", 1], prev_id: ["=", this.uniteId] };

      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "sections",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields,
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
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

              this.data = d.map(element => {
                element.sort = parseInt(element.sort)
                return { ...element };
              });
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
<style lang="scss" src="@/pages/_lang/admin/course/style.scss"></style>

