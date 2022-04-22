<template>
  <b-modal
    hide-footer
    id="modal-sm"
    size="sm"
    class="modal-like "
    v-model="likeModalShow"
    :title="l('Add to List', 'g')"
    v-if="options && options['uye_Lists']"
  >

  <div v-if="auth && auth!=null && auth.token">
    {{
      likeModal.topModuleData ? likeModal.topModuleData.unit_name + " > " : ""
    }} 
    <p v-if="likeModal.data && likeModal.data.lesson_name">
      {{ likeModal.data.lesson_name }}
    </p>
 
    <b-row class="mb-1 text-center" v-if="!addNew">
      <b-col cols="2">{{ l("List", "g") }}</b-col>

      <b-col >
        <b-form-select
          id="popover-input-2"
          v-model="inputList"
          :options="getSelect()"
          value-field="id"
          text-field="uye_list_name"
          :placeholder="l('Select List', 'g')"
          size="sm"
        ></b-form-select
      ></b-col>
    </b-row>
    <b-row>
      <b-col v-if="!addNew" >
        <div class="addnewlist">
          <a class="" @click="addNew = true">+ Add New List</a>
        </div>
          <!-- {{addedLists}} -->
      </b-col>
      <b-col v-if="addNew">
       
        <p>
          <strong>{{l('New List Name','g')}}</strong>
          <b-form-input type="text" class="pa-10" v-model="newAdd.uye_list_name"></b-form-input>
        </p>
        <p>
          <b-button size="sm" @click="saveNewList()" variant="primary"
            ><i class="fa fa-save"></i> {{ l("Save", "g") }}</b-button
          >
          <b-button size="sm" @click="addNew = false" variant="danger">{{
              l("Cancel", "g")
          }}</b-button>
        </p>
        <hr />
      </b-col>
    </b-row>
    <div style="width: 100%; text-align: center; margin-top: 15px;" v-if="!addNew">
      <b-button
        size="sm"
        :disabled="!inputList"
        @click="
          setLikesFav();
          likeModalShow = false;
        "
        variant="primary"
        ><i class="fa fa-save"></i> {{ l("Save", "g") }}</b-button
      >

      <b-button size="sm" @click="likeModalShow = false" variant="danger">{{
        l("Close", "g")
      }}</b-button>
    </div>
  </div><div v-else>
    <!--<b-alert show variant="warning"><a href="#" class="alert-link">
	{{l('Sign in to access this feature.','g')}}</a></b-alert>!-->
	<login></login>
  </div>
  </b-modal>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
import login from  "@/components/common/login";
export default {
  components:{
  	login
  },
  mixins: [general],
  data: () => ({
    data: [],
    units: [],
    lessons: [],
    likePopover: false,
    addNew: false,
    inputList: "",
    newAdd: {
      uye_list_name: ""
    },
    addedLists:[]
  }),
  
  async created() {
    if (this.auth) {
      await this.$store.dispatch("core/getOptions", {
        slang: this.$store.state.locale,
        group: "uye_Lists",
        prev_id: this.auth.id,
        fields: "id,uye_list_name,uye_list_cat"
      });
    }
  },
  computed: {
   
    auth() {
      return this.$store.state.user.auth;
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
  watch: {
    likeModalShow() {
      this.inputList = "";
      this.getAddedLists();
    }
  },
  methods: {
     getAddedLists() {
      console.log("this.likes",this.likes,this.likeModal.data.id);
      let a=this.likes.filter(k => k.id == this.likeModal.data.id);
      console.log("a",a)
      if (a) {
          this.addedLists =  a.map(k=>{
              return k.list
          })
      }
   
    },
    async saveNewList(mp) {
      let method = "post";
      let url = process.env.baseURL + "uye_Lists";

      await axios({
        url,
        method,
        data: {
          uye_list_name: this.newAdd.uye_list_name,
          uye_list_cat: this.likeModal.type,
          status: 1,
          prev_id: this.auth.id
        }
      }).then(async response => {
        await this.$store.dispatch("core/getOptions", {
          slang: this.$store.state.locale,
          group: "uye_Lists",
          prev_id: this.auth.id,
          fields: "id,uye_list_name,uye_list_cat"
        });
          if (
            response  && response.data
          ) {
            // console.log("response",response)
            this.inputList = response.data.id;
                this.addNew = false;
                this.newAdd = {
                  uye_list_name: ""
                };
          }
      });
    },
    getSelect() {
      return this.options["uye_Lists"].filter(
        k => k.uye_list_cat == this.likeModal.type && !this.addedLists.includes(k.id)
      );
    },
    setLikesFav() {
      console.log("this.likeModal.data,this.inputList", this.inputList);
      

          this.$store.dispatch("setLikes", {
            item: this.likeModal.data,
            list: this.inputList
          });
      
    },
    removeLikes(selected) {
      let f = this.likes.filter((k, i) => k.id != selected);
      f = JSON.stringify(f);
      this.$store.dispatch("setLikesFirst", f);
    },
    getLikes() {
      return this.$store.getters.getLikes;
    },
    isLiked(id) {
      if (this.likes.find(k => k.id == id)) {
        return true;
      }
      return false;
    },

   
    getOptName(id, group, field) {
      let options = this.$store.state.core.options;

      if (options && options[group]) {
        let res = options[group].find(k => k.id == id);
        if (field && res) {
          return res[field];
        } else {
          return res;
        }
      }
    }
  }
};
</script>
<style>
.modal-like .modal-body {
  padding: 10px 16px;
  height: 190px !important;
  overflow: auto;
}
.modal-dialog{
    /* left: 0; */
    right: 50%;
    position: absolute;
    width: 100%;
    margin-right: -150px;
    }
    .custom-select{
      padding: 6px;
      border-radius: 4px;
      font-size: 12px;
      width: 100%;
    }
    .addnewlist{
      padding: 10px 0px;  
    }
</style>
