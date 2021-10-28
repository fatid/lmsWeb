<template>
  <b-modal
    hide-footer
    id="modal-sm"
    size="sm"
    class="modal-like "
    v-model="dialogShow"
    :title="l('Add to List', 'g')" 
  >
 
 
   <div v-if="auth && auth!=null && auth.token">
    <b-row>
      
      <b-col  >
       
        <p>
          <strong>{{l('Your Comment Title','g')}}</strong>
          <b-form-input type="text" class="pa-10" v-model="comment.title"></b-form-input>
        </p>
           <p>
          <strong>{{l('Your Comment ','g')}}</strong>
          <b-form-input type="textarea" class="pa-10" v-model="comment.content"></b-form-input>
        </p>
        <p>
          <b-button size="sm" @click="save()" variant="primary"
            ><i class="fa fa-save"></i> {{ l("Save", "g") }}</b-button
          >
          <b-button size="sm" @click="addNew = false" variant="danger">{{
              l("Cancel", "g")
          }}</b-button>
        </p>
        <hr />
      </b-col>
    </b-row>
  
    <b-alert show variant="warning"><a href="#" class="alert-link">Sign in to access this feature.</a></b-alert>
  </div>
  </b-modal>
</template>
<script>
import general from "@/mixins/general";
import axios from "axios";
export default {
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
    comment:{
      title:'',
      content:'',
      model:'',
      app:'',
      status:1,
      user:''
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
    commentModal: {
      get() {
        return this.$store.state.commentModal;
      },
      set(val) {
        this.$store.state.commentModal = val;
      }
    },
    dialogShow: {
      get() {
        return this.$store.state.commentModal.show;
      },
      set(val) {
        this.$store.state.commentModal.show = val;
      }
    }
  },
  watch: {
 
  },
  methods: {
 
   
    async save(mp) {
      let method = "post";
      let url = process.env.baseURL + "comments";

      await axios({
        url,
        method,
        data: {
          title: this.comment.title,
          content: this.comment.content,
          model:this.model,
          app:this.app, 
          status: 1,
          prev_id: this.auth.id
        }
      }).then(async response => {
     
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
        k => k.uye_list_cat == this.commentModal.type && !this.addedLists.includes(k.id)
      );
    },
    setLikesFav() {
      console.log("this.commentModal.data,this.inputList", this.inputList);
      

          this.$store.dispatch("setLikes", {
            item: this.commentModal.data,
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
}
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
