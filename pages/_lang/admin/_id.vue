<template>
  <div class="container">
 
    
<div class="row">
  
      <div class="col-12 col-md-12 col-sm-12">


        <vue-good-table
  :columns="columns"
  :rows="data"
  >

   <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'action'">
      <a @click="goPathBlank('admin/course/'+d.cou_id)" @click.middle="goPathBlank('admin/course/'+d.cou_link)"   >E</a>
      <a  @click="goPathBlank('admin/section/'+d.cou_id)" @click.middle="goPathBlank('admin/section/'+d.cou_link)">S</a>
      <a @click="goPathBlank('course/'+d.cou_link)" @click.middle="goPathBlank('course/'+d.cou_link)">W</a>
    </span>
    <span v-else-if="props.column.field == 'cou_image'">
     <img v-if="props.row.cou_image" :src="show_image(props.row.cou_image,'50','50','','90')" alt="">
    </span>
    <span v-else-if="props.column.field == 'co_level'">
      <span style="font-weight: bold; color: blue;">{{getOptName(props.row.co_level,'co_level','cou_level_name')}}
        <br />
        {{getOptName(props.row.cou_category,'co_labels','cou_label_name')}}
        </span> 
    </span>
    <span v-else-if="props.column.field == 'cou_category'">
      <span style="font-weight: bold; color: blue;"> {{getOptName(props.row.cou_category,'co_labels','cou_label_name')}}  </span> 
    </span>
    <span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
  </template>
</vue-good-table>

        <div class="fcrse_1" v-for="d in data"> 
										<div><a @click="goPath('course/'+d.cou_link)" @click.middle="goPathBlank('course/'+d.cou_link)"  class="hf_img">
											<img v-if="d.cou_image" :src="show_image(d.cou_image,'150','150','','90')" alt="">
											<img v-else-if="options['cou_settings']" :src="show_image(options['cou_settings'][0].cou_setting_image,'150','150','c','')" alt="">
											<div class="course-overlay">
												<div class="badge_seller">{{getOptName(d.cou_level,'co_level','cou_level_name')}}</div> 
											</div>
										</a>
											</div>
										<div class="hs_content">
										 
											<a @click="goPath('course/'+d.cou_link)" @click.middle="goPathBlank('course/'+d.cou_link)" class="crse14s title900">{{d.cou_name}}</a>
											<a href="#" class="crse-cate">{{d.cou_short}}</a>
											<div class="crse-cate mt-1">
												<a href="javascript:;"  >{{getOptName(d.cou_category,'co_labels','cou_label_name')}} </a> 
												<span class="  ml-1">|</span> 
												<a href="javascript:;"  v-if="d.cou_tags" :class="'ml-2'" :key="'tg'+tag"  v-for="tag in d.cou_tags.split(',')">{{tag}} </a>
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
import banners from "@/components/common/banner.vue"; 
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
export default {
  mixins: [general],
  components:{
    banners,
    VueGoodTable
  },
  data: () => ({
    data: [],
    settings:[],
    search:{
      keyword:''
    },
    columns: [

        {
          label: 'Image',
          field: 'cou_image', 
        },
        {
          label: 'Course Name',
          field: 'cou_name',
        },
        {
          label: 'Level',
          field: 'co_level', 
        }, 
        {
          label: 'Action',
          field: 'action', 
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
  }),
  async created() {
	  	await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_level',
			fields:'id,cou_level_name,cou_level_color'
		});
		await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_labels',
			fields:'id,cou_label_name'
		});
    await this.$store.dispatch("core/getOptions", {
          slang: this.$store.state.locale,
          group: 'cou_settings',
          fields:'id,cou_setting_image'
		});
	
	this.getCourse();
	
  },
  
  methods: {
    
    async getCourse() { 
      let fields = `cou_name,cou_level,cou_category,cou_link,cou_tags,cou_total_time,cou_image,cou_short,cou_description,cou_total_view,id,status,created_on,created_by,id,status`;

      let filters = { status: ["=", 1] };
      if(this.search.keyword){
        filters.cou_name = ["LIKE",this.search.keyword]
      }
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "courses",
          method: "get",
          params: {
            limit: 100,
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
.fcrse_1{
  margin-bottom: 10px;
}
</style>
<style lang="scss">

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






.vgt-table.striped tbody tr:nth-of-type(odd){background-color:rgba(51,68,109,.03)}.vgt-right-align{text-align:right}.vgt-left-align{text-align:left}.vgt-center-align{text-align:center}.vgt-pull-left{float:left!important}.vgt-pull-right{float:right!important}.vgt-clearfix::after{display:block;content:"";clear:both}.vgt-responsive{width:100%;overflow-x:auto;position:relative}.vgt-text-disabled{color:#909399}.sr-only{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.vgt-wrap{position:relative}.vgt-fixed-header{position:absolute;z-index:10;overflow-x:auto}table.vgt-table{font-size:16px;border-collapse:collapse;background-color:#fff;width:100%;max-width:100%;table-layout:auto;border:1px solid #dcdfe6}table.vgt-table td{padding:.75em .75em .75em .75em;vertical-align:top;border-bottom:1px solid #dcdfe6;color:#606266}table.vgt-table tr.clickable{cursor:pointer}table.vgt-table tr.clickable:hover{background-color:#f1f5fd}.vgt-table th{padding:.75em 1.5em .75em .75em;vertical-align:middle;position:relative}.vgt-table th.sortable button{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;border:none;position:absolute;top:0;left:0;width:100%;height:100%}.vgt-table th.sortable button:focus{outline:0}.vgt-table th.sortable button:after{content:"";position:absolute;height:0;width:0;right:6px;top:50%;margin-top:-7px;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid #606266}.vgt-table th.sortable button:before{content:"";position:absolute;height:0;width:0;right:6px;top:50%;margin-bottom:-7px;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #606266}.vgt-table th.line-numbers,.vgt-table th.vgt-checkbox-col{padding:0 .75em 0 .75em;color:#606266;border-right:1px solid #dcdfe6;word-wrap:break-word;width:25px;text-align:center;background:linear-gradient(#f4f5f8,#f1f3f6)}.vgt-table th.filter-th{padding:.75em .75em .75em .75em}.vgt-table th.vgt-row-header{border-bottom:2px solid #dcdfe6;border-top:2px solid #dcdfe6;background-color:#fafafb}.vgt-table th.vgt-row-header .triangle{width:24px;height:24px;border-radius:15%;position:relative;margin:0 8px}.vgt-table th.vgt-row-header .triangle:after{content:"";position:absolute;display:block;left:50%;top:50%;margin-top:-6px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:6px solid #606266;margin-left:-3px;transition:.3s ease transform}.vgt-table th.vgt-row-header .triangle.expand:after{transform:rotate(90deg)}.vgt-table thead th{color:#606266;vertical-align:bottom;border-bottom:1px solid #dcdfe6;padding-right:1.5em;background:linear-gradient(#f4f5f8,#f1f3f6)}.vgt-table thead th.vgt-checkbox-col{vertical-align:middle}.vgt-table thead th.sorting-asc button:after{border-bottom:5px solid #409eff}.vgt-table thead th.sorting-desc button:before{border-top:5px solid #409eff}.vgt-input,.vgt-select{width:100%;height:32px;line-height:1;display:block;font-size:14px;font-weight:400;padding:6px 12px;color:#606266;border-radius:4px;box-sizing:border-box;background-image:none;background-color:#fff;border:1px solid #dcdfe6;transition:border-color .2s cubic-bezier(.645,.045,.355,1)}.vgt-input::placeholder,.vgt-select::placeholder{color:#606266;opacity:.3}.vgt-input:focus,.vgt-select:focus{outline:0;border-color:#409eff}.vgt-loading{position:absolute;width:100%;z-index:10;margin-top:117px}.vgt-loading__content{background-color:#c0dfff;color:#409eff;padding:7px 30px;border-radius:3px}.vgt-inner-wrap.is-loading{opacity:.5;pointer-events:none}.vgt-table.bordered td,.vgt-table.bordered th{border:1px solid #dcdfe6}.vgt-table.bordered th.vgt-row-header{border-bottom:3px solid #dcdfe6}.vgt-wrap.rtl{direction:rtl}.vgt-wrap.rtl .vgt-table thead th,.vgt-wrap.rtl .vgt-table.condensed thead th{padding-left:1.5em;padding-right:.75em}.vgt-wrap.rtl .vgt-table th.sorting-asc:after,.vgt-wrap.rtl .vgt-table th.sorting:after{margin-right:5px;margin-left:0}.vgt-wrap.rtl .vgt-table th.sortable:after,.vgt-wrap.rtl .vgt-table th.sortable:before{right:inherit;left:6px}.vgt-table.condensed td,.vgt-table.condensed th.vgt-row-header{padding:.4em .4em .4em .4em}@media (max-width:576px){.vgt-compact *{box-sizing:border-box}.vgt-compact tbody,.vgt-compact td,.vgt-compact tr{display:block;width:100%}.vgt-compact thead{display:none}.vgt-compact tr{margin-bottom:15px}.vgt-compact td{text-align:right;position:relative}.vgt-compact td:before{content:attr(data-label);position:relative;float:left;left:0;width:40%;padding-left:10px;font-weight:700;text-align:left}.vgt-compact th.line-numbers{width:100%!important;display:block;padding:.3em 1em!important}}.vgt-global-search{padding:5px 0;display:flex;flex-wrap:nowrap;align-items:stretch;border:1px solid #dcdfe6;border-bottom:0;background:linear-gradient(#f4f5f8,#f1f3f6)}.vgt-global-search form{display:flex}.vgt-global-search form label{margin-top:3px}.vgt-global-search__input{position:relative;padding-left:40px;flex-grow:1}.vgt-global-search__input .input__icon{position:absolute;left:0;max-width:32px}.vgt-global-search__input .input__icon .magnifying-glass{margin-top:3px;margin-left:8px;display:block;width:16px;height:16px;border:2px solid #494949;position:relative;border-radius:50%}.vgt-global-search__input .input__icon .magnifying-glass:before{content:"";display:block;position:absolute;right:-7px;bottom:-5px;background:#494949;width:8px;height:4px;border-radius:2px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg)}.vgt-global-search__actions{margin-left:10px}.vgt-selection-info-row{background:#fdf9e8;padding:5px 16px;font-size:13px;border-top:1px solid #dcdfe6;border-left:1px solid #dcdfe6;border-right:1px solid #dcdfe6;color:#d3aa3b;font-weight:700}.vgt-selection-info-row a{font-weight:700;display:inline-block;margin-left:10px}.vgt-wrap__actions-footer{border:1px solid #dcdfe6}.vgt-wrap__footer{color:#606266;font-size:1.1rem;padding:1em;border:1px solid #dcdfe6;background:linear-gradient(#f4f5f8,#f1f3f6)}.vgt-wrap__footer .footer__row-count{position:relative;padding-right:3px}.vgt-wrap__footer .footer__row-count__label,.vgt-wrap__footer .footer__row-count__select{display:inline-block;vertical-align:middle}.vgt-wrap__footer .footer__row-count__label{font-size:1.1rem}.vgt-wrap__footer .footer__row-count__select{font-size:1.1rem;background-color:transparent;width:auto;padding:0;border:0;border-radius:0;height:auto;margin-left:8px;color:#606266;font-weight:700;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding-right:15px;padding-left:5px}.vgt-wrap__footer .footer__row-count__select::-ms-expand{display:none}.vgt-wrap__footer .footer__row-count__select:focus{outline:0;border-color:#409eff}.vgt-wrap__footer .footer__row-count::after{content:"";display:block;position:absolute;height:0;width:0;right:6px;top:50%;margin-top:-1px;border-top:6px solid #606266;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:none;pointer-events:none}.vgt-wrap__footer .footer__navigation{font-size:1.1rem}.vgt-wrap__footer .footer__navigation>button:first-of-type{margin-right:16px}.vgt-wrap__footer .footer__navigation__info,.vgt-wrap__footer .footer__navigation__page-btn,.vgt-wrap__footer .footer__navigation__page-info{display:inline-block;vertical-align:middle;color:#909399}.vgt-wrap__footer .footer__navigation__page-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;border:none;text-decoration:none;color:#606266;font-weight:700;white-space:nowrap;vertical-align:middle}.vgt-wrap__footer .footer__navigation__page-btn:hover{cursor:pointer}.vgt-wrap__footer .footer__navigation__page-btn.disabled,.vgt-wrap__footer .footer__navigation__page-btn.disabled:hover{opacity:.5;cursor:not-allowed}.vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.left:after,.vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.left:after{border-right-color:#606266}.vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.right:after,.vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.right:after{border-left-color:#606266}.vgt-wrap__footer .footer__navigation__page-btn span{display:inline-block;vertical-align:middle;font-size:1.1rem}.vgt-wrap__footer .footer__navigation__page-btn .chevron{width:24px;height:24px;border-radius:15%;position:relative;margin:0;display:inline-block;vertical-align:middle}.vgt-wrap__footer .footer__navigation__page-btn .chevron:after{content:"";position:absolute;display:block;left:50%;top:50%;margin-top:-6px;border-top:6px solid transparent;border-bottom:6px solid transparent}.vgt-wrap__footer .footer__navigation__page-btn .chevron.left::after{border-right:6px solid #409eff;margin-left:-3px}.vgt-wrap__footer .footer__navigation__page-btn .chevron.right::after{border-left:6px solid #409eff;margin-left:-3px}.vgt-wrap__footer .footer__navigation__info,.vgt-wrap__footer .footer__navigation__page-info{display:inline-block;margin:0 16px}.vgt-wrap__footer .footer__navigation__page-info span{display:inline-block;vertical-align:middle}.vgt-wrap__footer .footer__navigation__page-info__current-entry{width:30px;text-align:center;vertical-align:middle;display:inline-block;margin:0 10px;font-weight:700}@media only screen and (max-width:750px){.vgt-wrap__footer .footer__navigation__info{display:none}.vgt-wrap__footer .footer__navigation__page-btn{margin-left:16px}}.vgt-table.nocturnal{border:1px solid #435169;background-color:#324057}.vgt-table.nocturnal tr.clickable:hover{background-color:#445168}.vgt-table.nocturnal td{border-bottom:1px solid #435169;color:#c7ced8}.vgt-table.nocturnal th.line-numbers,.vgt-table.nocturnal th.vgt-checkbox-col{color:#c7ced8;border-right:1px solid #435169;background:linear-gradient(#2c394f,#2c394f)}.vgt-table.nocturnal thead th{color:#c7ced8;border-bottom:1px solid #435169;background:linear-gradient(#2c394f,#2c394f)}.vgt-table.nocturnal thead th.sortable:before{border-top-color:#3e5170}.vgt-table.nocturnal thead th.sortable:after{border-bottom-color:#3e5170}.vgt-table.nocturnal thead th.sortable.sorting-asc{color:#fff}.vgt-table.nocturnal thead th.sortable.sorting-asc:after{border-bottom-color:#409eff}.vgt-table.nocturnal thead th.sortable.sorting-desc{color:#fff}.vgt-table.nocturnal thead th.sortable.sorting-desc:before{border-top-color:#409eff}.vgt-table.nocturnal.bordered td,.vgt-table.nocturnal.bordered th{border:1px solid #435169}.vgt-table.nocturnal .vgt-input,.vgt-table.nocturnal .vgt-select{color:#c7ced8;background-color:#232d3f;border:1px solid #435169}.vgt-table.nocturnal .vgt-input::placeholder,.vgt-table.nocturnal .vgt-select::placeholder{color:#c7ced8;opacity:.3}.vgt-wrap.nocturnal .vgt-wrap__footer{color:#c7ced8;border:1px solid #435169;background:linear-gradient(#2c394f,#2c394f)}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count{position:relative}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__label{color:#8290a7}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__select{color:#c7ced8;background:#232d3f;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding-right:15px;padding-left:10px;border-radius:3px;text-align:center}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__select:focus{border-color:#409eff}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count::after{content:"";display:block;position:absolute;height:0;width:0;right:6px;top:50%;margin-top:-1px;border-top:6px solid #c7ced8;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:none;pointer-events:none}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-btn{color:#c7ced8}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.left:after,.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.left:after{border-right-color:#c7ced8}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.right:after,.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.right:after{border-left-color:#c7ced8}.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__info,.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-info{color:#8290a7}.vgt-wrap.nocturnal .vgt-global-search{border:1px solid #435169;background:linear-gradient(#2c394f,#2c394f)}.vgt-wrap.nocturnal .vgt-global-search__input .input__icon .magnifying-glass{border:2px solid #3f4c63}.vgt-wrap.nocturnal .vgt-global-search__input .input__icon .magnifying-glass:before{background:#3f4c63}.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input,.vgt-wrap.nocturnal .vgt-global-search__input .vgt-select{color:#c7ced8;background-color:#232d3f;border:1px solid #435169}.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input::placeholder,.vgt-wrap.nocturnal .vgt-global-search__input .vgt-select::placeholder{color:#c7ced8;opacity:.3}.vgt-table.black-rhino{border:1px solid #435169;background-color:#dfe5ee}.vgt-table.black-rhino tr.clickable:hover{background-color:#fff}.vgt-table.black-rhino td{border-bottom:1px solid #bbc5d6;color:#49515e}.vgt-table.black-rhino th.line-numbers,.vgt-table.black-rhino th.vgt-checkbox-col{color:#dae2f0;border-right:1px solid #435169;background:linear-gradient(#4c5c79,#4e5d7c)}.vgt-table.black-rhino thead th{color:#dae2f0;text-shadow:1px 1px #3e5170;border-bottom:1px solid #435169;background:linear-gradient(#4c5c79,#4e5d7c)}.vgt-table.black-rhino thead th.sortable:before{border-top-color:#607498}.vgt-table.black-rhino thead th.sortable:after{border-bottom-color:#607498}.vgt-table.black-rhino thead th.sortable.sorting-asc{color:#fff}.vgt-table.black-rhino thead th.sortable.sorting-asc:after{border-bottom-color:#409eff}.vgt-table.black-rhino thead th.sortable.sorting-desc:before{border-top-color:#409eff}.vgt-table.black-rhino.bordered td{border:1px solid #bbc5d6}.vgt-table.black-rhino.bordered th{border:1px solid #435169}.vgt-table.black-rhino .vgt-input,.vgt-table.black-rhino .vgt-select{color:#dae2f0;background-color:#34445f;border:1px solid transparent}.vgt-table.black-rhino .vgt-input::placeholder,.vgt-table.black-rhino .vgt-select::placeholder{color:#dae2f0;opacity:.3}.vgt-wrap.black-rhino .vgt-wrap__footer{color:#dae2f0;border:1px solid #435169;background:linear-gradient(#4c5c79,#4e5d7c)}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count{position:relative;padding-right:3px}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__label{color:#98a5b9}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select{color:#49515e;background:#34445f;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding-right:15px;padding-left:5px;border-radius:3px}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select::-ms-expand{display:none}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select:focus{border-color:#409eff}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count::after{content:"";display:block;position:absolute;height:0;width:0;right:6px;top:50%;margin-top:-1px;border-top:6px solid #49515e;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:none;pointer-events:none}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-btn{color:#dae2f0}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.left:after,.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.left:after{border-right-color:#dae2f0}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.right:after,.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.right:after{border-left-color:#dae2f0}.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__info,.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-info{color:#dae2f0}.vgt-wrap.black-rhino .vgt-global-search{border:1px solid #435169;background:linear-gradient(#4c5c79,#4e5d7c)}.vgt-wrap.black-rhino .vgt-global-search__input .input__icon .magnifying-glass{border:2px solid #3f4c63}.vgt-wrap.black-rhino .vgt-global-search__input .input__icon .magnifying-glass:before{background:#3f4c63}.vgt-wrap.black-rhino .vgt-global-search__input .vgt-input,.vgt-wrap.black-rhino .vgt-global-search__input .vgt-select{color:#dae2f0;background-color:#44516c;border:1px solid transparent}.vgt-wrap.black-rhino .vgt-global-search__input .vgt-input::placeholder,.vgt-wrap.black-rhino .vgt-global-search__input .vgt-select::placeholder{color:#dae2f0;opacity:.3}.vgt-inner-wrap{border-radius:.25rem;box-shadow:0 1px 3px 0 rgba(50,50,93,.1),0 1px 2px 0 rgba(50,50,93,.06)}.vgt-table.polar-bear{border-spacing:0;border-collapse:separate;font-size:1rem;background-color:#fff;border:1px solid #e3e8ee;border-bottom:none;border-radius:.25rem}.vgt-table.polar-bear td{padding:1em .75em 1em .75em;border-bottom:1px solid #e4ebf3;color:#525f7f}.vgt-table.polar-bear td.vgt-right-align{text-align:right}.vgt-table.polar-bear th.line-numbers,.vgt-table.polar-bear th.vgt-checkbox-col{color:#394567;border-right:1px solid #e3e8ee;background:#f7fafc}.vgt-table.polar-bear thead th{color:#667b94;font-weight:600;border-bottom:1px solid #e3e8ee;background:#f7fafc}.vgt-table.polar-bear thead th.sorting-asc,.vgt-table.polar-bear thead th.sorting-desc{color:#5e72e4}.vgt-table.polar-bear thead th.sorting-desc:before{border-top:5px solid #7485e8}.vgt-table.polar-bear thead th.sorting-asc:after{border-bottom:5px solid #7485e8}.vgt-table.polar-bear thead th .vgt-input,.vgt-table.polar-bear thead th .vgt-select{height:2.75em;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);border:1px solid #e4ebf3}.vgt-table.polar-bear thead th .vgt-input:focus,.vgt-table.polar-bear thead th .vgt-select:focus{outline:0;border-color:#cae0fe}.vgt-table.polar-bear thead tr:first-child th:first-child{border-top-left-radius:.25rem}.vgt-table.polar-bear thead tr:first-child th:last-child{border-top-right-radius:.25rem}.vgt-table.polar-bear.bordered td{border:1px solid #e3e8ee;background:#fff}.vgt-table.polar-bear.bordered th{border:1px solid #e3e8ee}.vgt-wrap.polar-bear .vgt-wrap__footer{color:#394567;border:1px solid #e3e8ee;border-bottom:0;border-top:0;background:linear-gradient(#f7fafc,#f7fafc)}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count{position:relative;padding-right:3px}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__label{color:#98a5b9}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__select{text-align:center;color:#525f7f;background:#fff;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:5px;padding-right:30px;border-radius:3px;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);border:1px solid #e4ebf3}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__select::-ms-expand{display:none}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count__select:focus{border-color:#5e72e4}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__row-count::after{content:"";display:block;position:absolute;height:0;width:0;right:15px;top:50%;margin-top:-3px;border-top:6px solid #525f7f;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:none;pointer-events:none}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-btn{color:#394567}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.left:after,.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.left:after{border-right-color:#394567}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.right:after,.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-btn.disabled:hover .chevron.right:after{border-left-color:#394567}.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__info,.vgt-wrap.polar-bear .vgt-wrap__footer .footer__navigation__page-info{color:#394567}.vgt-wrap.polar-bear .vgt-global-search{border:1px solid #e3e8ee;border-bottom:0;border-top-left-radius:3px;border-top-right-radius:3px;background:#f7fafc}.vgt-wrap.polar-bear .vgt-global-search__input .input__icon .magnifying-glass{border:2px solid #dde3ea}.vgt-wrap.polar-bear .vgt-global-search__input .input__icon .magnifying-glass:before{background:#dde3ea}.vgt-wrap.polar-bear .vgt-global-search__input .vgt-input,.vgt-wrap.polar-bear .vgt-global-search__input .vgt-select{height:2.75em;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);border:1px solid #e4ebf3}.vgt-wrap.polar-bear .vgt-global-search__input .vgt-input::placeholder,.vgt-wrap.polar-bear .vgt-global-search__input .vgt-select::placeholder{color:#394567;opacity:.3}
</style>
