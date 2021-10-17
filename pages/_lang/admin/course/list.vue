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
          <label>{{ l("Title", "g") }} EN/AR</label>
          <span
            ><input
              type="text"
              class="modal-form-input"
              v-model="edited.all_cou_name.en"
              @blur="createUrl(false)"
               placeholder="in English"
            />
            <input
              type="text"
              class="modal-form-input"
              v-model="edited.all_cou_name.ar"
              @blur="createUrl(false)"
              placeholder="in Arabic"
            />
          </span>
        </div>
        <div class="modal-form-row">
          <label>{{ l("Campaign Text", "g") }} EN/AR</label>
          <span
            ><input
              type="text"
              class="modal-form-input"
              v-model="edited.all_cou_campaign_text.en" 
              placeholder="in English"
            />
            <input
              type="text"
              class="modal-form-input"
              v-model="edited.all_cou_campaign_text.ar" 
               placeholder="in Arabic"
            />
          </span>
        </div>
        <div class="modal-form-row">
          <label>{{ l("Level", "g") }}</label>
          <span>
            <select class="modal-form-input" v-model="edited.cou_level">
              <option v-for="u in levels" :key="u.id" :value="u.id">{{
                u.cou_level_name
              }}</option>
            </select>
          </span>
        </div>
        <div class="modal-form-row">
          <label>{{ l("Url", "g") }}</label>
          <span>
            <span
              ><input
                type="text"
                class="modal-form-input"
                v-model="edited.all_cou_link.en"
              />

              <a @click="createUrl(true)">Random</a>
            </span>
          </span>
        </div>
        <div class="modal-form-row">
          <label>{{ l("Category", "g") }}</label>
          <span>
            <select class="modal-form-input" v-model="edited.cou_category">
              <option v-for="u in categories" :key="u.id" :value="u.id">{{
                u.cou_label_name
              }}</option>
            </select>
          </span>
        </div>
        <div class="ui left icon input swdh11 swdh19">
          <div v-if="!edited.cou_image">
            <p>
              <a>{{ l("Upload image", "g") }}</a>
            </p>
            <input
              type="file"
              name="changeFile"
              @change="onFileChange($event, 'cou_image')"
            />
          </div>
          <div v-else>
            <img :src="edited.cou_image" class="g-width-200 imageUpload" />
            <p class="margin-top-10 mt-10 g-mt-10">
              <a @click="removeImage('cou_image')"
                ><i class="fa fa-times"></i> {{ l("Remove image", "g") }}</a
              >
            </p>
          </div>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
      
          <label>{{l('Sort Order','g')}}</label>
           <input
              type="number"
              class="modal-form-input"
              v-model="edited.sort"
              :placeholder="l('Sort Order','g')"
            />
      
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
          <h3>{{ l("Course", "g") }}</h3>
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
          <div class="btn btn-primary" @click="openModal({ id: 'new' })">
            {{ l("Add New", "g") }}
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
            initialSortBy: { field: 'cou_name', type: 'asc' }
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
                @click="goPath(`admin/course/${props.row.id}/units`)"
                @click.middle="
                  goPathBlank(`admin/course/${props.row.id}/units`)
                "
                ><i class="fas fa-list-alt"></i
              ></a>
              <a
                class="table-buttons"
                @click="goPath('course/' + props.row.cou_link)"
                @click.middle="goPathBlank('course/' + props.row.cou_link)"
                ><i class="fa fa-eye"></i
              ></a>
            </span>
            <span v-else-if="props.column.field == 'cou_image'">
              <img
                v-if="props.row.cou_image"
                :src="show_image(props.row.cou_image, '50', '50', '', '90')"
                alt=""
              />
            </span>
            <span v-else-if="props.column.field == 'cou_level'">
              <span>
                {{
                  getOptName(props.row.cou_level, "co_level", "cou_level_name")
                }}
                <br />
                {{
                  getOptName(
                    props.row.cou_category,
                    "co_labels",
                    "cou_label_name"
                  )
                }}
              </span>
            </span>
            <span v-else-if="props.column.field == 'cou_category'">
              <span style="font-weight: bold; color: blue;">
                {{
                  getOptName(
                    props.row.cou_category,
                    "co_labels",
                    "cou_label_name"
                  )
                }}
              </span>
            </span>
            <span v-else-if="props.column.field == 'count'">
              {{ count[props.row.id] }}
            </span>
            <span v-else
              ><a @click="goPath(`admin/course/${props.row.id}/units`)">
                {{ props.formattedRow[props.column.field] }}
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
  computed: {
    levels() {
      return this.$store.state.core.options["co_level"];
    },
    categories() {
      return this.$store.state.core.options["co_labels"];
    }
  },
  data: () => ({
    search: {
      keyword: ""
    },
    edited: {
      id: null,
      cou_name: '',
      all_cou_name: {
        en:'',
        ar:'',
        tr:''
      },
      cou_campaign_text: "",
      all_cou_campaign_text: {
        en:'',
        ar:'',
        tr:''
      },
      
      cou_level: "",
      cou_category: "",
      cou_link: "",
      all_cou_link: {
        en:'',
        ar:'',
        tr:''
      },
      status: 1
    },
    columns: [
      {
        label: "No",
        field: "sort",
        width: "30px"
      },
      {
        label: "Image",
        field: "cou_image",
        width: "70px",
        sortable: false
      },

      {
        label: "Course Name",
        field: "cou_name"
      },
      {
        label: "Level",
        field: "cou_level"
      },
      {
        label: "Units",
        field: "count",
        width: "60px",
        sortable: false
      },
      {
        label: "Action",
        field: "action",
        width: "120px",
        sortable: false
      }
    ]
  }),
  async created() {
    this.$store.dispatch("search/groupFields", {
      module: "unite",
      group: "prev_id",
      lang: this.LOCALE
    });

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

    this.getList();
  },

  methods: {
    createUrl(random) {
      if (!random && this.edited.cou_link == "") {
        let u = this.edited.cou_name;
        u = u.toLowerCase();
        let u2 = u.split(" ");
        u = u2.join("_");
        this.edited.cou_link = u;
      } else if (random) {
        let u = new Date().valueOf();
        this.edited.cou_link = u;
      }
    },
    async save() {
      let d = this.edited;
      let method = "post";
      let url = process.env.baseURL + "courses";
      if (d.id && d.id != "new") {
        method = "put";
        url = process.env.baseURL + "courses/" + d.id;
      }

      if(d.all_cou_link.en){
          
          d.all_cou_link={
            en:d.all_cou_link.en,
            ar:d.all_cou_link.ar,
            tr:d.all_cou_link.tr
          }
          
      }
      await axios({
        url,
        method,
        data: {
          id: d.id,
          cou_name: d.all_cou_name,
          cou_campaign_text: d.all_cou_campaign_text,
          cou_level: d.cou_level,
          cou_category: d.cou_category,
          cou_image: d.cou_image,
          cou_link: d.all_cou_link,
          status: d.status,
          pdb_status: d.status
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
    openModal(row) {
      this.show = true;
      this.edited = row;
    },
    async getList() {
      let fields = `sort,cou_name,cou_campaign_text,cou_level,cou_category,cou_link,cou_tags,cou_total_time,cou_image,cou_short,cou_description,cou_total_view,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", this.filter.status ? this.filter.status  : 1] };
      if (this.search.keyword) {
        filters.cou_name = ["LIKE", this.search.keyword];
      }
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "courses",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields,
            editMode:true,
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
              d= d.map(k=>{
                k.all_cou_name  = k.all_cou_name ? k.all_cou_name : {tr:'',en:'',ar:''}
                k.all_cou_campaign_text  = k.all_cou_campaign_text ? k.all_cou_campaign_text : {tr:'',en:'',ar:''}
                k.all_cou_link  = k.all_cou_link ? k.all_cou_link : {tr:'',en:'',ar:''}
                return k;
              })
              this.data = d;
            } else {
              this.data = {};
            }
          })
          .catch(e => {
            this.data = {};
            console.log(e);
          });
      });
    }
  }
};
</script>
<style lang="scss" src="@/pages/_lang/admin/course/style.scss"></style>
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
.toolbar-cart {
  position: absolute;
  top: 20px;
  right: 20px;
}
.fcrse_1 {
  margin-bottom: 10px;
}
</style>
<style lang="scss">
.search-header {
  display: inline-flex;
  width: 100%;
  padding: 10px 0px;
  justify-content: space-between;
  border-bottom: 1px solid #d0d0d0;
  margin-bottom: 10px;
  .title-field {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
  }
  .search-field {
    .input-std {
      border: 1px solid #d0d0d0;
      border-radius: 10px;
      padding: 7px 10px;
    }
  }
}

.vgt-table.striped tbody tr:nth-of-type(odd) {
  background-color: rgba(51, 68, 109, 0.03);
}
.vgt-right-align {
  text-align: right;
}
.vgt-left-align {
  text-align: left;
}
.vgt-center-align {
  text-align: center;
}
.vgt-pull-left {
  float: left !important;
}
.vgt-pull-right {
  float: right !important;
}
.vgt-clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.vgt-responsive {
  width: 100%;
  overflow-x: auto;
  position: relative;
}
.vgt-text-disabled {
  color: #909399;
}
.sr-only {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.vgt-wrap {
  position: relative;
}
.vgt-fixed-header {
  position: absolute;
  z-index: 10;
  overflow-x: auto;
}
table.vgt-table {
  font-size: 16px;
  border-collapse: collapse;
  background-color: #fff;
  width: 100%;
  max-width: 100%;
  table-layout: auto;
  border: 1px solid #dcdfe6;
}
table.vgt-table td {
  padding: 0.75em 0.75em 0.75em 0.75em;
  vertical-align: top;
  border-bottom: 1px solid #dcdfe6;
  color: #606266;
}
table.vgt-table tr.clickable {
  cursor: pointer;
}
table.vgt-table tr.clickable:hover {
  background-color: #f1f5fd;
}
.vgt-table th {
  padding: 0.75em 1.5em 0.75em 0.75em;
  vertical-align: middle;
  position: relative;
}
.vgt-table th.sortable button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.vgt-table th.sortable button:focus {
  outline: 0;
}
.vgt-table th.sortable button:after {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  right: 6px;
  top: 50%;
  margin-top: -7px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #606266;
}
.vgt-table th.sortable button:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  right: 6px;
  top: 50%;
  margin-bottom: -7px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #606266;
}
.vgt-table th.line-numbers,
.vgt-table th.vgt-checkbox-col {
  padding: 0 0.75em 0 0.75em;
  color: #606266;
  border-right: 1px solid #dcdfe6;
  word-wrap: break-word;
  width: 25px;
  text-align: center;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
.vgt-table th.filter-th {
  padding: 0.75em 0.75em 0.75em 0.75em;
}
.vgt-table th.vgt-row-header {
  border-bottom: 2px solid #dcdfe6;
  border-top: 2px solid #dcdfe6;
  background-color: #fafafb;
}
.vgt-table th.vgt-row-header .triangle {
  width: 24px;
  height: 24px;
  border-radius: 15%;
  position: relative;
  margin: 0 8px;
}
.vgt-table th.vgt-row-header .triangle:after {
  content: "";
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin-top: -6px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #606266;
  margin-left: -3px;
  transition: 0.3s ease transform;
}
.vgt-table th.vgt-row-header .triangle.expand:after {
  transform: rotate(90deg);
}
.vgt-table thead th {
  color: #606266;
  vertical-align: bottom;
  border-bottom: 1px solid #dcdfe6;
  padding-right: 1.5em;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
.vgt-table thead th.vgt-checkbox-col {
  vertical-align: middle;
}
.vgt-table thead th.sorting-asc button:after {
  border-bottom: 5px solid #409eff;
}
.vgt-table thead th.sorting-desc button:before {
  border-top: 5px solid #409eff;
}
.vgt-input,
.vgt-select {
  width: 100%;
  height: 32px;
  line-height: 1;
  display: block;
  font-size: 14px;
  font-weight: 400;
  padding: 6px 12px;
  color: #606266;
  border-radius: 4px;
  box-sizing: border-box;
  background-image: none;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.vgt-input::placeholder,
.vgt-select::placeholder {
  color: #606266;
  opacity: 0.3;
}
.vgt-input:focus,
.vgt-select:focus {
  outline: 0;
  border-color: #409eff;
}
.vgt-loading {
  position: absolute;
  width: 100%;
  z-index: 10;
  margin-top: 117px;
}
.vgt-loading__content {
  background-color: #c0dfff;
  color: #409eff;
  padding: 7px 30px;
  border-radius: 3px;
}
.vgt-inner-wrap.is-loading {
  opacity: 0.5;
  pointer-events: none;
}
.vgt-table.bordered td,
.vgt-table.bordered th {
  border: 1px solid #dcdfe6;
}
.vgt-table.bordered th.vgt-row-header {
  border-bottom: 3px solid #dcdfe6;
}
.vgt-wrap.rtl {
  direction: rtl;
}
.vgt-wrap.rtl .vgt-table thead th,
.vgt-wrap.rtl .vgt-table.condensed thead th {
  padding-left: 1.5em;
  padding-right: 0.75em;
}
.vgt-wrap.rtl .vgt-table th.sorting-asc:after,
.vgt-wrap.rtl .vgt-table th.sorting:after {
  margin-right: 5px;
  margin-left: 0;
}
.vgt-wrap.rtl .vgt-table th.sortable:after,
.vgt-wrap.rtl .vgt-table th.sortable:before {
  right: inherit;
  left: 6px;
}
.vgt-table.condensed td,
.vgt-table.condensed th.vgt-row-header {
  padding: 0.4em 0.4em 0.4em 0.4em;
}
@media (max-width: 576px) {
  .vgt-compact * {
    box-sizing: border-box;
  }
  .vgt-compact tbody,
  .vgt-compact td,
  .vgt-compact tr {
    display: block;
    width: 100%;
  }
  .vgt-compact thead {
    display: none;
  }
  .vgt-compact tr {
    margin-bottom: 15px;
  }
  .vgt-compact td {
    text-align: right;
    position: relative;
  }
  .vgt-compact td:before {
    content: attr(data-label);
    position: relative;
    float: left;
    left: 0;
    width: 40%;
    padding-left: 10px;
    font-weight: 700;
    text-align: left;
  }
  .vgt-compact th.line-numbers {
    width: 100% !important;
    display: block;
    padding: 0.3em 1em !important;
  }
}
.vgt-global-search {
  padding: 5px 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  border: 1px solid #dcdfe6;
  border-bottom: 0;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
.vgt-global-search form {
  display: flex;
}
.vgt-global-search form label {
  margin-top: 3px;
}
.vgt-global-search__input {
  position: relative;
  padding-left: 40px;
  flex-grow: 1;
}
.vgt-global-search__input .input__icon {
  position: absolute;
  left: 0;
  max-width: 32px;
}
.vgt-global-search__input .input__icon .magnifying-glass {
  margin-top: 3px;
  margin-left: 8px;
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid #494949;
  position: relative;
  border-radius: 50%;
}
.vgt-global-search__input .input__icon .magnifying-glass:before {
  content: "";
  display: block;
  position: absolute;
  right: -7px;
  bottom: -5px;
  background: #494949;
  width: 8px;
  height: 4px;
  border-radius: 2px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}
.vgt-global-search__actions {
  margin-left: 10px;
}
.vgt-selection-info-row {
  background: #fdf9e8;
  padding: 5px 16px;
  font-size: 13px;
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  color: #d3aa3b;
  font-weight: 700;
}
.vgt-selection-info-row a {
  font-weight: 700;
  display: inline-block;
  margin-left: 10px;
}
.vgt-wrap__actions-footer {
  border: 1px solid #dcdfe6;
}
.vgt-wrap__footer {
  color: #606266;
  font-size: 1.1rem;
  padding: 1em;
  border: 1px solid #dcdfe6;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
.vgt-wrap__footer .footer__row-count {
  position: relative;
  padding-right: 3px;
}
.vgt-wrap__footer .footer__row-count__label,
.vgt-wrap__footer .footer__row-count__select {
  display: inline-block;
  vertical-align: middle;
}
.vgt-wrap__footer .footer__row-count__label {
  font-size: 1.1rem;
}
.vgt-wrap__footer .footer__row-count__select {
  font-size: 1.1rem;
  background-color: transparent;
  width: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  height: auto;
  margin-left: 8px;
  color: #606266;
  font-weight: 700;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 15px;
  padding-left: 5px;
}
.vgt-wrap__footer .footer__row-count__select::-ms-expand {
  display: none;
}
.vgt-wrap__footer .footer__row-count__select:focus {
  outline: 0;
  border-color: #409eff;
}
.vgt-wrap__footer .footer__row-count::after {
  content: "";
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  right: 6px;
  top: 50%;
  margin-top: -1px;
  border-top: 6px solid #606266;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: none;
  pointer-events: none;
}
.vgt-wrap__footer .footer__navigation {
  font-size: 1.1rem;
}
.vgt-wrap__footer .footer__navigation > button:first-of-type {
  margin-right: 16px;
}
.vgt-wrap__footer .footer__navigation__info,
.vgt-wrap__footer .footer__navigation__page-btn,
.vgt-wrap__footer .footer__navigation__page-info {
  display: inline-block;
  vertical-align: middle;
  color: #909399;
}
.vgt-wrap__footer .footer__navigation__page-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  border: none;
  text-decoration: none;
  color: #606266;
  font-weight: 700;
  white-space: nowrap;
  vertical-align: middle;
}
.vgt-wrap__footer .footer__navigation__page-btn:hover {
  cursor: pointer;
}
.vgt-wrap__footer .footer__navigation__page-btn.disabled,
.vgt-wrap__footer .footer__navigation__page-btn.disabled:hover {
  opacity: 0.5;
  cursor: not-allowed;
}
.vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.left:after,
.vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.left:after {
  border-right-color: #606266;
}
.vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.right:after,
.vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.right:after {
  border-left-color: #606266;
}
.vgt-wrap__footer .footer__navigation__page-btn span {
  display: inline-block;
  vertical-align: middle;
  font-size: 1.1rem;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron {
  width: 24px;
  height: 24px;
  border-radius: 15%;
  position: relative;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron:after {
  content: "";
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin-top: -6px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron.left::after {
  border-right: 6px solid #409eff;
  margin-left: -3px;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron.right::after {
  border-left: 6px solid #409eff;
  margin-left: -3px;
}
.vgt-wrap__footer .footer__navigation__info,
.vgt-wrap__footer .footer__navigation__page-info {
  display: inline-block;
  margin: 0 16px;
}
.vgt-wrap__footer .footer__navigation__page-info span {
  display: inline-block;
  vertical-align: middle;
}
.vgt-wrap__footer .footer__navigation__page-info__current-entry {
  width: 30px;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  margin: 0 10px;
  font-weight: 700;
}
@media only screen and (max-width: 750px) {
  .vgt-wrap__footer .footer__navigation__info {
    display: none;
  }
  .vgt-wrap__footer .footer__navigation__page-btn {
    margin-left: 16px;
  }
}
.vgt-table.nocturnal {
  border: 1px solid #435169;
  background-color: #324057;
}
.vgt-table.nocturnal tr.clickable:hover {
  background-color: #445168;
}
.vgt-table.nocturnal td {
  border-bottom: 1px solid #435169;
  color: #c7ced8;
}
.vgt-table.nocturnal th.line-numbers,
.vgt-table.nocturnal th.vgt-checkbox-col {
  color: #c7ced8;
  border-right: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}
.vgt-table.nocturnal thead th {
  color: #c7ced8;
  border-bottom: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}
.vgt-table.nocturnal thead th.sortable:before {
  border-top-color: #3e5170;
}
.vgt-table.nocturnal thead th.sortable:after {
  border-bottom-color: #3e5170;
}
.vgt-table.nocturnal thead th.sortable.sorting-asc {
  color: #fff;
}
.vgt-table.nocturnal thead th.sortable.sorting-asc:after {
  border-bottom-color: #409eff;
}
.vgt-table.nocturnal thead th.sortable.sorting-desc {
  color: #fff;
}
.vgt-table.nocturnal thead th.sortable.sorting-desc:before {
  border-top-color: #409eff;
}
.vgt-table.nocturnal.bordered td,
.vgt-table.nocturnal.bordered th {
  border: 1px solid #435169;
}
.vgt-table.nocturnal .vgt-input,
.vgt-table.nocturnal .vgt-select {
  color: #c7ced8;
  background-color: #232d3f;
  border: 1px solid #435169;
}
.vgt-table.nocturnal .vgt-input::placeholder,
.vgt-table.nocturnal .vgt-select::placeholder {
  color: #c7ced8;
  opacity: 0.3;
}
.vgt-wrap.nocturnal .vgt-wrap__footer {
  color: #c7ced8;
  border: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count {
  position: relative;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__label {
  color: #8290a7;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__select {
  color: #c7ced8;
  background: #232d3f;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 15px;
  padding-left: 10px;
  border-radius: 3px;
  text-align: center;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__select:focus {
  border-color: #409eff;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count::after {
  content: "";
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  right: 6px;
  top: 50%;
  margin-top: -1px;
  border-top: 6px solid #c7ced8;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: none;
  pointer-events: none;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-btn {
  color: #c7ced8;
}
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.left:after,
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.left:after {
  border-right-color: #c7ced8;
}
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.right:after,
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.right:after {
  border-left-color: #c7ced8;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__info,
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-info {
  color: #8290a7;
}
.vgt-wrap.nocturnal .vgt-global-search {
  border: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}
.vgt-wrap.nocturnal .vgt-global-search__input .input__icon .magnifying-glass {
  border: 2px solid #3f4c63;
}
.vgt-wrap.nocturnal
  .vgt-global-search__input
  .input__icon
  .magnifying-glass:before {
  background: #3f4c63;
}
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input,
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-select {
  color: #c7ced8;
  background-color: #232d3f;
  border: 1px solid #435169;
}
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input::placeholder,
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-select::placeholder {
  color: #c7ced8;
  opacity: 0.3;
}
.vgt-table.black-rhino {
  border: 1px solid #435169;
  background-color: #dfe5ee;
}
.vgt-table.black-rhino tr.clickable:hover {
  background-color: #fff;
}
.vgt-table.black-rhino td {
  border-bottom: 1px solid #bbc5d6;
  color: #49515e;
}
.vgt-table.black-rhino th.line-numbers,
.vgt-table.black-rhino th.vgt-checkbox-col {
  color: #dae2f0;
  border-right: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}
.vgt-table.black-rhino thead th {
  color: #dae2f0;
  text-shadow: 1px 1px #3e5170;
  border-bottom: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}
.vgt-table.black-rhino thead th.sortable:before {
  border-top-color: #607498;
}
.vgt-table.black-rhino thead th.sortable:after {
  border-bottom-color: #607498;
}
.vgt-table.black-rhino thead th.sortable.sorting-asc {
  color: #fff;
}
.vgt-table.black-rhino thead th.sortable.sorting-asc:after {
  border-bottom-color: #409eff;
}
.vgt-table.black-rhino thead th.sortable.sorting-desc:before {
  border-top-color: #409eff;
}
.vgt-table.black-rhino.bordered td {
  border: 1px solid #bbc5d6;
}
.vgt-table.black-rhino.bordered th {
  border: 1px solid #435169;
}
.vgt-table.black-rhino .vgt-input,
.vgt-table.black-rhino .vgt-select {
  color: #dae2f0;
  background-color: #34445f;
  border: 1px solid transparent;
}
.vgt-table.black-rhino .vgt-input::placeholder,
.vgt-table.black-rhino .vgt-select::placeholder {
  color: #dae2f0;
  opacity: 0.3;
}
.vgt-wrap.black-rhino .vgt-wrap__footer {
  color: #dae2f0;
  border: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count {
  position: relative;
  padding-right: 3px;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__label {
  color: #98a5b9;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select {
  color: #49515e;
  background: #34445f;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 15px;
  padding-left: 5px;
  border-radius: 3px;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select::-ms-expand {
  display: none;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select:focus {
  border-color: #409eff;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count::after {
  content: "";
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  right: 6px;
  top: 50%;
  margin-top: -1px;
  border-top: 6px solid #49515e;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: none;
  pointer-events: none;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-btn {
  color: #dae2f0;
}
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.left:after,
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.left:after {
  border-right-color: #dae2f0;
}
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.right:after,
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.right:after {
  border-left-color: #dae2f0;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__info,
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-info {
  color: #dae2f0;
}
.vgt-wrap.black-rhino .vgt-global-search {
  border: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}
.vgt-wrap.black-rhino .vgt-global-search__input .input__icon .magnifying-glass {
  border: 2px solid #3f4c63;
}
.vgt-wrap.black-rhino
  .vgt-global-search__input
  .input__icon
  .magnifying-glass:before {
  background: #3f4c63;
}
.vgt-wrap.black-rhino .vgt-global-search__input .vgt-input,
.vgt-wrap.black-rhino .vgt-global-search__input .vgt-select {
  color: #dae2f0;
  background-color: #44516c;
  border: 1px solid transparent;
}
.vgt-wrap.black-rhino .vgt-global-search__input .vgt-input::placeholder,
.vgt-wrap.black-rhino .vgt-global-search__input .vgt-select::placeholder {
  color: #dae2f0;
  opacity: 0.3;
}
.vgt-inner-wrap {
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.1),
    0 1px 2px 0 rgba(50, 50, 93, 0.06);
}
.vgt-table.polar-bear {
  border-spacing: 0;
  border-collapse: separate;
  font-size: 1rem;
  background-color: #fff;
  border: 1px solid #e3e8ee;
  border-bottom: none;
  border-radius: 0.25rem;
}
.vgt-table.polar-bear td {
  padding: 1em 0.75em 1em 0.75em;
  border-bottom: 1px solid #e4ebf3;
  color: #525f7f;
}
.vgt-table.polar-bear td.vgt-right-align {
  text-align: right;
}
.vgt-table.polar-bear th.line-numbers,
.vgt-table.polar-bear th.vgt-checkbox-col {
  color: #394567;
  border-right: 1px solid #e3e8ee;
  background: #f7fafc;
}
.vgt-table.polar-bear thead th {
  color: #667b94;
  font-weight: 600;
  border-bottom: 1px solid #e3e8ee;
  background: #f7fafc;
}
.vgt-table.polar-bear thead th.sorting-asc,
.vgt-table.polar-bear thead th.sorting-desc {
  color: #5e72e4;
}
.vgt-table.polar-bear thead th.sorting-desc:before {
  border-top: 5px solid #7485e8;
}
.vgt-table.polar-bear thead th.sorting-asc:after {
  border-bottom: 5px solid #7485e8;
}
.vgt-table.polar-bear thead th .vgt-input,
.vgt-table.polar-bear thead th .vgt-select {
  height: 2.75em;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e4ebf3;
}
.vgt-table.polar-bear thead th .vgt-input:focus,
.vgt-table.polar-bear thead th .vgt-select:focus {
  outline: 0;
  border-color: #cae0fe;
}
.vgt-table.polar-bear thead tr:first-child th:first-child {
  border-top-left-radius: 0.25rem;
}
.vgt-table.polar-bear thead tr:first-child th:last-child {
  border-top-right-radius: 0.25rem;
}
.vgt-table.polar-bear.bordered td {
  border: 1px solid #e3e8ee;
  background: #fff;
}
.vgt-table.polar-bear.bordered th {
  border: 1px solid #e3e8ee;
}
.vgt-wrap.polar-bear .vgt-wrap__footer {
  color: #394567;
  border: 1px solid #e3e8ee;
  border-bottom: 0;
  border-top: 0;
  background: linear-gradient(#f7fafc, #f7fafc);
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count {
  position: relative;
  padding-right: 3px;
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__label {
  color: #98a5b9;
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__select {
  text-align: center;
  color: #525f7f;
  background: #fff;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 5px;
  padding-right: 30px;
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e4ebf3;
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__select::-ms-expand {
  display: none;
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__select:focus {
  border-color: #5e72e4;
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count::after {
  content: "";
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  right: 15px;
  top: 50%;
  margin-top: -3px;
  border-top: 6px solid #525f7f;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: none;
  pointer-events: none;
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-btn {
  color: #394567;
}
.vgt-wrap.polar-bear
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.left:after,
.vgt-wrap.polar-bear
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.left:after {
  border-right-color: #394567;
}
.vgt-wrap.polar-bear
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.right:after,
.vgt-wrap.polar-bear
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.right:after {
  border-left-color: #394567;
}
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__info,
.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-info {
  color: #394567;
}
.vgt-wrap.polar-bear .vgt-global-search {
  border: 1px solid #e3e8ee;
  border-bottom: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background: #f7fafc;
}
.vgt-wrap.polar-bear .vgt-global-search__input .input__icon .magnifying-glass {
  border: 2px solid #dde3ea;
}
.vgt-wrap.polar-bear
  .vgt-global-search__input
  .input__icon
  .magnifying-glass:before {
  background: #dde3ea;
}
.vgt-wrap.polar-bear .vgt-global-search__input .vgt-input,
.vgt-wrap.polar-bear .vgt-global-search__input .vgt-select {
  height: 2.75em;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e4ebf3;
}
.vgt-wrap.polar-bear .vgt-global-search__input .vgt-input::placeholder,
.vgt-wrap.polar-bear .vgt-global-search__input .vgt-select::placeholder {
  color: #394567;
  opacity: 0.3;
}
</style>
