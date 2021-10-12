<template>
  <div class="container">
    <b-modal
      id="modal-xl"
      v-model="show"
      scrollable
      size="xl"
      :title="edited.id ? l('Editing', 'g') : l('Create New', 'g')"
    >
    
      <b-alert :show="saveStatus.show" dismissible :variant="saveStatus.status">
        {{ l("Saved", "g") }}
      </b-alert>
      <div class="modal-form" :lang="LOCALE">
        <div class="modal-form-row">
          <label>{{l('Label','g')}}</label>
          <span
            ><input
              type="text"
              class="modal-form-input"
              v-model="edited.unit_name"
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
        <div class="ui left icon input swdh11 swdh19">
          <div v-if="!edited.unit_image">
            <p>
              <a>{{ l("Upload image", "g") }}</a>
            </p>
            <input
              type="file"
              name="changeFile"
              @change="onFileChange($event, 'unit_image')"
            />
          </div>
          <div v-else>
            <img :src="edited.unit_image" class="g-width-200 imageUpload" />
            <p class="margin-top-10 mt-10 g-mt-10">
              <a @click="removeImage('unit_image')"
                ><i class="fa fa-times"></i> {{ l("Remove image", "g") }}</a
              >
            </p>
          </div>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">

           <select class="modal-form-input" v-model="edited.status">
              <option v-for="u in statusList" :key="u.value" :value="u.value">{{
                u.label
              }}</option>
            </select>


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
            {{ l("Units", "g") }}
          </h3>
        </div>
        <div>
           <select
            class="modal-form-input"
            v-model="filter.status"
            @change="getList()"
          >
            <option v-for="u in statusList" :key="u.value" :value="u.value">{{
              u.label
            }}</option>
          </select>
          <div class="btn btn-primary" @click="openModal({ id: null })">
            {{ l("Add New", "g") }}
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-sm-12">
        <!-- {{ count }} -->
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
                @click="goPath('admin/course/' + courseId + '/' + props.row.id+'/lessons')"
                @click.middle="
                  goPathBlank('admin/course/' + courseId + '/' + props.row.id+'/lessons')
                "
                ><i class="fas fa-list-alt"></i
              ></a>
              <a
                class="table-buttons"
                @click="
                  goPath(
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
              {{ count?  count[props.row.id] :'' }}  
            </span>
            <span v-else><a @click="goPath('admin/course/' + courseId + '/' + props.row.id+'/lessons')">
              {{ props.row[props.column.field] }}
              </a>
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
      sections_name: "",
      prev_id:null,
      status:1,
      sort:0
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
        label: "Image",
        field: "unit_image",
        width: "70px",
        sortable: false,
      },
   
      {
        label: "Unit Name",
        field: "unit_name"
      },
   {
        label: "Lesson",
        field: "count",
        width: "60px",
        sortable: false,
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

   await this.$store.dispatch("search/groupFields", {
      module: "sections",
      group: "prev_id",
      lang: this.LOCALE
    });
    this.getList();
    this.getCourseName();

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
          sections_name: "",
          prev_id:null,
          status:1,
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
      let url = process.env.baseURL + "unite";
      if (d.id) {
        method = "put";
        url = process.env.baseURL + "unite/" + d.id;
      } 
      await axios({
        url,
        method,
        data: {
          id: d.id,
          unit_name: d.unit_name,
          unit_image: d.unit_image,
          status: d.status,
          pdb_status: d.status,
          prev_id:this.courseId,
          prev:this.courseId,
          sort: d.sort,
        }
      }).then(response => {
        this.saveStatus = { show: true, status: "success" };
        this.getList();
        setTimeout(() => {
          this.show = false;
          this.saveStatus = { show: false, status: "success" };
        }, 500);
      });
    },

    async getList() {
      let fields = `sort,unit_name,unit_image,id,status,created_on,created_by,id,status`;
      let prev = this.$route.params.course;
      let filters = {   prev_id: ["=", prev] };
      filters.status=["=", this.filter.status ? this.filter.status  : 1] ;
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "unite",
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
