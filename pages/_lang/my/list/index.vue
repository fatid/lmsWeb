<template>
  <div>  
    
    <div v-if="listId && viewType && getListData(listId,'data')">
        <h4 style="margin-bottom: 5px;" v-if="selectedList"> {{selectedList.uye_list_name}}   </h4>
     <p> <a @click="goPath('my/list')" v-if="selectedList">{{l('All Lists','g')}}</a> / {{selectedList.uye_list_cat}} </p>  
        <list-details
          :listItems="getListData(listId,'data')"
          :listId="listId"
        ></list-details>
    </div>
    <div v-else-if="listId ">
      
     <h4 style="margin-bottom: 5px;" v-if="selectedList"> {{selectedList.uye_list_name}}   </h4>
     <p> <a @click="goPath('my/list')">{{l('All Lists','g')}}</a> / {{selectedList.uye_list_cat}} </p>  
        <b-list-group> 
      <b-list-group-item  v-for="dt in getListData(listId,'data')"  class="d-flex justify-content-between align-items-center"  style="cursor: pointer;"
        @click="goPath('course/'+dt.topModuleData.id+'/'+dt.id)"
      >
                {{dt.lesson_name}}
               <p>Unite: {{dt.topModuleData.unit_name}}</p>
      </b-list-group-item>
        </b-list-group>

    </div>
    <div v-else>  
    <b-list-group> 
      <b-list-group-item
        v-for="(list, i) in my_lists"
        :key="'l' + i"
        class="d-flex justify-content-between align-items-center"
      >
        <span v-show="list.view == 'read'" @click="goPath('my/list?id='+list.id+'&view=1')" style="cursor: pointer;">
          {{ list.uye_list_name }} - {{ list.uye_list_cat }} (  {{getListData(list.id,'total')}} )
        </span>
        <span v-show="list.view && list.view == 'edit'">
          <div class="d-flex j align-items-start">
                 <div class="d-block mr-5">
                     <p>{{l('List Name','g')}}</p>
            <input
              type="text"
              name="listname"
              class="prompt srch_explore pa-10 mr-5 w-100"
              v-model="list.uye_list_name"
            />
          </div>
          <div class="d-block mr-5">
                <p>{{l('List Category','g')}}</p>
            <select
              type="text"
              name="listname"
              class="prompt srch_explore pa-10 mr-5  w-100"
              v-model="list.uye_list_cat"
            >
              <option v-for="opt in listOptions" :value="opt.value">{{
                opt.name
              }}</option>
            </select>
            </div>
            <div class="d-block mr-5">

            <b-button variant="success" class="pa-10" @click="saveUyeList(list)">
              <i class="fa fa-save"></i> Save</b-button
            >
          </div> 
          </div> 
        </span>
        <span>
          <b-button
            v-if="list.view == 'read'"
            variant="primary"
            :title="'Copy Link'"
            @click="copyText('my/list?id='+list.id+'&view=1')"
            pill
            ><i class="fa fa-copy"></i> </b-button
          >
          <b-button
            v-if="list.view == 'read'"
            variant="danger"
            @click="list.view = 'edit'"
            pill
            ><i class="fa fa-pen"></i> </b-button
          >
          <b-button
            v-if="list.view == 'edit'"
            variant="danger"
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
    <div class="col-lg-12 mt-2 text-center align-center">
      <b-button variant="success" @click="addNewList()"
        >+ {{ l("Add New List", "g") }}</b-button
      >
    </div>
    </div>
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
   await this.getUyeLists();
   await this.getLikes();
    

  },
  watch:{
    listId(val){
      this.getList(val)
    }
  },
  computed: {
    auth() {
      return this.$store.state.user.auth;
    },
    listId() {
      return this.$route.query.id;
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
      uyeListItem: {
        id: null,
        uye_list_name: ""
      },
      listOptions: [
        { name: "Course", value: "Course" },
        { name: "Exam", value: "Exam" },
        { name: "Word", value: "Word" }
      ]
    };
  },
  methods: {

    copyText(text) {
 
        const body = document.querySelector('body'); 
        const area = document.createElement('textarea');
        body.appendChild(area);

        area.value = window.location.origin+'/'+this.$store.state.locale+'/'+text;
        area.select();
        document.execCommand('copy');

        body.removeChild(area);
     },
    getList(id){
      if(id){
        this.selectedList = this.my_lists.find(k=> k.id==id);  
      }
    },
    getListData(id,type="data"){
      let items  = this.likes.filter(k=> k.list==id);
      if(type=="data"){
        return items
      }else{
        return items.length
      }
    },
    addNewList() {
      this.my_lists.push({
        id: null,
        uye_list_name: "",
        view:'edit'
      });
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
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }, 500);
      });
    },
    getUyeLists() {
      let filters = { prev_id: ["=", this.auth.id] };
      // uye_languages
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
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.my_lists = response.data.formattedData.map(k => {
              return { ...k, view: "read" };
            });

            this.getList(this.listId)
          }
        });
      });
    },
    async getLikes({ state, dispatch, rootState }, payload) {
      if (rootState.user.auth && rootState.user.auth.id) {
        try {
          await axios({
            url: process.env.baseURL + "Favorites",
            method: "get",
            params: {
              limit: 1,
              lang: "NONE",
              filter: { fav_owner_user: ["=", rootState.user.auth.id] },
              fields:
                "fav_content,fav_owner_user,fav_list,uye_fav_type,pdb_user",
              sort: ["created_on,DESC"]
            }
          }).then(response => {
            let a = response.data.formattedData;
            let likes = a.fav_content;
          });
        } catch (err) {
          console.log("Err", err);
        }
      } else {
        let likes = window.localStorage.getItem("likes");
        if (likes) {
          dispatch("setLikesFirst", likes);
        }
      }
    }
  }
};
</script>
<style scoped>
.list-group-item{
    margin-bottom: 15px;
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
</style>
