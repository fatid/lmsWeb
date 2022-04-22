<template>
  <div class="page-content">  

      <div class="page-header ">
	  <div class="container">  
	  <div class="row">  
 <div class="col-12 ">
        <div class="search-header">
            <div class="title-field">{{l('My Lists','g')}}</div>
            <div class="search-field" v-if="!listId">
            
              <b-button variant="success" @click="addNewList()"
        >+ {{ l("Add New List", "g") }}  </b-button
      >
        			<input type="text" class="input-std" 
                                        @change="getCourse()"
                                        v-model="search.keyword" 
                                        :placeholder="l('Search keyword','g')"  /> 
             </div>
             </div>
             </div>
             </div>
             </div>
      </div> 
<div class="container">  
<div class="row no-gutters">  
 <div class="col-9 ">
 
    <div v-if="listId && viewType && getListData(listId,'data')">
        <h4 style="margin-bottom: 5px;" v-if="selectedList">  </h4>
     <p> <a @click="goPath('my/list')" v-if="selectedList">{{l('All Lists','g')}}</a> /  <a v-if="selectedList.uye_list_cat" @click="goPath('my/list',{type:selectedList.uye_list_cat})"> {{selectedList.uye_list_cat}} / </a>   {{selectedList.uye_list_name}}  </p>  
        <list-details
          :listItems="getListData(listId,'data')"
          :listId="listId"
          :selectedList="selectedList"
        ></list-details>
    </div>
    <div v-else-if="listId ">
      
          <h4 style="margin-bottom: 5px;" v-if="selectedList">    </h4>
          <p> <a @click="goPath('my/list')">{{l('All Lists','g')}}</a> / {{selectedList.uye_list_cat ?  selectedList.uye_list_cat+'/' : '' }}  {{selectedList.uye_list_name}} </p>  
          <b-list-group> 
                <b-list-group-item  v-for="dt in getListData(listId,'data')"  class="d-flex justify-content-between align-items-center"  style="cursor: pointer;"
                  @click="goPath('course/'+dt.topModuleData.id+'/'+dt.id)"
                >
                          {{dt.lesson_name}}
                        <p>{{l('Unit','g')}}: {{dt.topModuleData.unit_name}}</p>
                </b-list-group-item>
          </b-list-group>

    </div>
    <div v-else>  
      <div class="colsRow"> 
    <div v-if="loading" class="pa-10 text-center"> 
	<img src="/img/loading.gif" style="height: 150px;" />
		<br />	
		<br />	
		Loading
	
	</div>
    <b-list-group v-else-if="my_lists && my_lists[0]"> 
	<!-- my_lists<br /> -->
	<!-- {{my_lists}} -->
      <b-list-group-item
        v-for="(list, i) in my_lists"
        :key="'l' + i"
        class="d-flex justify-content-between align-items-center"
      >
        <span   @click="goUrl(list);" style="cursor: pointer;">
          {{ list.uye_list_name }} - {{ list.uye_list_cat }} (  {{getListData(list.id,'total')}} )
        </span>
       
        <span >
          <b-button
            v-if="list.view == 'read'"
            variant="success"
            :title="'Open List'"
            @click="goPath('filter/'+list.uye_list_cat, {list:list.id})"
            pill
            >OPEN</b-button
          >
          <b-button
            v-if="list.view == 'read'"
            variant="warning"
            :title="'Copy Link'"
            @click="copyText('my/list?id='+list.id+'&view=1')"
            pill
            ><i class="fa fa-copy"></i> </b-button
          >
          <b-button
            v-if="list.view == 'read'"
            variant="warning"
            @click="editList(list)"
            pill
            ><i class="fa fa-pen"></i> </b-button
          >
          <b-button
            v-if="list.view == 'edit'"
            variant="warning"
            @click="list.view = 'read'"
            pill
            >Close</b-button
          >
           <b-button
            variant="warning"
            v-if="list.id"
            @click="removeList(list.id)"
            pill
            ><i class="fa fa-trash"></i> </b-button
          >
         
        </span>
      </b-list-group-item>
    </b-list-group> 
    <div v-else class="pa-10 text-center">
			<img src="/img/search-no-found.png" style="height: 250px;" />
			<br />
			<h2>{{l('No Items Added','g')}}</h2>

	</div>
    </div>
 
    </div>
    </div> <div class="col-3 ">



        <div class="fcrse_3 frc123 pa-10">


               <div class="search-box"  :lang="$store.state.locale" @click="search.module='Course'">
								<input type="radio" tabindex="0" :checked="search.module=='Course' ? 'checked' : '' " value="Course"   />
								<label :lang="$store.state.locale"> {{(l('Course','g'))}}  </label>
							</div>
                              <div class="search-box" :lang="$store.state.locale"  @click="search.module='Word'">
								<input type="radio" tabindex="1"  :checked="search.module=='Word' ? 'checked' : '' " value="Word"   />
								<label :lang="$store.state.locale"> {{(l('Words','g'))}}  </label>
							</div>
                              <div class="search-box" :lang="$store.state.locale"  @click="search.module='Exam'">
								<input type="radio" tabindex="2" value="Exam"  :checked="search.module=='Exam' ? 'checked' : '' "   />
								<label :lang="$store.state.locale"> {{(l('Question','g'))}}  </label>
							</div>
							  <div class="search-box" :lang="$store.state.locale"  @click="search.module='Quiz'">
								<input type="radio" tabindex="2" value="Quiz"  :checked="search.module=='Quiz' ? 'checked' : '' "   />
								<label :lang="$store.state.locale"> {{(l('Quiz','g'))}}  </label>
							</div>
							</div>
        <div class="fcrse_3 frc123">


    <ul class="ttrm15">
      <li  >
        <a 
          class="tt_item active"
          @click.prevent="
            goPath('my/profile')
          " 
        > {{l('My Profile','g')}}</a
        >
      </li>
       <li  >
        <a 
          class="tt_item active"
          @click.prevent="
            goPath('my/courses')
          " 
        > {{l('My Courses','g')}}</a
        >
      </li>
	    <li  >
        <a 
          class="tt_item active"
          @click.prevent="
            goPath('my/exams')
          " 
        > {{l('My Exams','g')}}</a
        >
      </li>
    </ul>
  </div>
      </div>
    </div>



    
 <b-modal 
      :title="l('List','g')"
      v-model="isVisible" 
    > 
        
    <div v-if="isSuccess" class="form-group col-12 ">
        <b-alert
            :show="isSuccess"
            dismissible
            variant="success"
          
          >
            Succesfully saved. 
          </b-alert>
    </div>
    
      <form ref="form"
      okTitle='Save'
      >
       <div class="d-block">
                 <div class="d-block mr-5">
                     <p>{{l('List Name','g')}}</p>
            <input
              type="text"
              name="listname"
              class="prompt srch_explore pa-10 mr-5 w-100"
              v-model="selectedList.uye_list_name"
            />
          </div>
          <div class="d-block mr-5" v-if="!selectedList.id">
                <p>{{l('List Category','g')}}</p>
            <select
              type="text"
              name="listname"
              class="prompt srch_explore pa-10 mr-5  w-100"
              v-model="selectedList.uye_list_cat"
            >
              <option v-for="opt in listOptions" :value="opt.value">{{
                opt.name
              }}</option>
            </select>
            </div>
        
          </div> 
     
      </form>
       <template #modal-footer="{ ok, cancel, hide }">
             <div>
                    <b-button  class="btn btn-primary" 
                         @click="saveUyeList(selectedList)"
                      >
                      {{ l("Save", "g") }}
                    </b-button >
       <a size="md"  variant="success"
        @click="isVisible=false"
       >{{l('Close','g')}}</a>  
       </div>
           </template>
 
    </b-modal>
  </div>
</template>
<script>
import general from "@/mixins/general";
import listDetails from "@/components/list/listDetails";
import axios from "axios"; 
export default {
  mixins: [general],
  components:{
    listDetails
  },
 async created() {

   this.search.module = this.listType ?  this.listType : '';
   await this.getUyeLists();
  //  await this.getLikes();
    

  },
  watch:{
    '$route.query.id'(val){
      this.getList()
    },
    '$route.query.type'(val){
     this.search.module = val ?  val : '';
    },
    'search.module'(){
      this.getUyeLists()
    }
  },
  computed: {
    auth() {
      return this.$store.state.user.auth;
    },
    listId() {
      return this.$route.query.id;
    },
    listType() {
      return this.$route.query.type;
    },
    viewType() {
      return this.$route.query.view;
    },
    likeModal: {
      get() {
        return this.$store.state.likeModal;
      },
      set(val) {
        this.$store.state.likeModal = val;
      }
    },
    likeModalShow: {
      get() {
        return this.$store.state.likeModal.show;
      },
      set(val) {
        this.$store.state.likeModal.show = val;
      }
    }
  },
  data() {
    return {
      my_lists: [],
      selectedList: {},
      isVisible:false,
      loading:false,
      isSuccess:false,
      uyeListItem: {
        id: null,
        uye_list_name: ""
      },
      search:{
        keyword:'',
        module:'Word',
        },
      listOptions: [
        { name: "Course", value: "Course" },
        { name: "Exam", value: "Exam" },
        { name: "Word", value: "Word" },
        { name: "Quiz ", value: "Quiz " },
      ]
    };
  },
  methods: {

    goUrl(list){
 
      if(list.uye_list_cat=="xxCourse"){
        
          let href = this.$router.resolve({path:'/'+this.LOCALE+'/course/'+list.id})
         window.open(href.href, '_blank');
      }else{
        this.goPath('my/list?id='+list.id+'&view=1')
      }
    },
    removeList(id){
    
    },
    copyText(text) {
 
        const body = document.querySelector('body'); 
        const area = document.createElement('textarea');
        body.appendChild(area);

        area.value = window.location.origin+'/'+this.$store.state.locale+'/'+text;
        area.select();
        document.execCommand('copy');

        body.removeChild(area);
     },
    getList(){
        let id = this.$route.query.id;
      if(id){
        this.selectedList = this.my_lists.find(k=> k.id==id);  
      }
    },
    editList(list){
    
        this.selectedList = list;  
        this.isVisible = true; 
      
    },
    getListData(id,type="data"){
      let items  = this.likes.filter(k=> k.list==id );
      if(type=="data"){
        return items
      }else{
        return items.length
      }
    },
    addNewList() { 
      this.selectedList = {
        id: null,
        uye_list_name: "",
        view:'edit'
      };
      this.isVisible = true;
    },
 async saveUyeList(mp) { 
      let method = "post";
      let url = process.env.baseURL + "uye_Lists";

      if(mp.id){
          method='put';
          url = process.env.baseURL + "uye_Lists/"+ mp.id
      }

     
      await axios({
        url,
        method,
        data: {
          id: mp.id,
          uye_list_name: mp.uye_list_name,
          uye_list_cat: mp.uye_list_cat,
          status: 1, 
          prev_id: this.auth.id
        }
      }).then(response => {
        this.saveStatus = { show: true, stataus: "success" };
              this.getUyeLists();
     
      });
    },
    getUyeLists() {
      let filters = { prev_id: ["=", this.auth.id] } 
      if(this.search.module){
        filters.uye_list_cat= ['=',this.search.module] ;
      }else if(this.listId){
        filters.id= ['=',this.listId];
      }
	   this.loading = true;
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "uye_Lists",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields: "uye_list_name,id,uye_list_cat",
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
            filter: filters
          }
        }).then(response => {
          console.log(" response.data.formattedData", response.data.formattedData)
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
 

            this.my_lists = response.data.formattedData.map(k => {
              return { ...k, view: "read" };
            });
            console.log("this.my_lists",this.my_lists,this.listId)
            if(this.my_lists && this.listId){
              let sl = this.my_lists.find(k=> k.id==this.listId);
              if(sl){
                this.selectedList = sl;  
              }
            }
         

            this.isVisible = false;
            this.loading = false;
          }else{
		  
			this.my_lists =[]
		  }
		  
		  this.loading = false;
        }).catch(err=> {
				console.log("err",err)
			this.loading = false;
		});
      });
    },
     
  }
};
</script>
<style scoped>
.list-group{


}

.list-group-item{
 margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 0.1em solid #aaa;
	border-top: 0.1em solid #fff; 
	border-left: 0.1em solid #fff; 
	border-right: 0.1em solid #fff; 
    padding: 10px 0px;
    border-radius: 0;
 }
 .list-group-item:hover {
	border-top: 0.1em solid #fff; 
	border-left: 0.1em solid #fff; 
	border-right: 0.1em solid #fff; 
    border-bottom: .1em solid #aaa;  
} 
.swdh19 textarea{ 
  padding: 5px;
    height: 100px; 
}
.pa-10 {
  padding: 10px !important;
}
.mr-5{
    margin-right: 6px;
}
.colsRow{
    overflow: auto;
    height: calc(100vh - 160px);
    padding-right: 10px;
  }
</style>
<style lang="scss">

.search-header{
  display:inline-flex;
  width:100%;
  padding: 10px 0px;
  justify-content: space-between;
  border-bottom: 1px solid #f9f9f9;
  margin-bottom: 10px;
  .title-field{ 
    font-size: 18px;
    font-weight: 500;
    line-height: 2.3;
	color: #706969;
  }
  .search-field{ 
  
    .input-std{
          border: 1px solid #f6ecec;
    border-radius: 4px;
    height: 35px;
    padding: 4px 10px;
    }
  }

}


</style>