<template>
  <b-modal :title="l('List', 'g')" v-model="isVisible">
    <div v-if="isSuccess" class="form-group col-12 ">
      <b-alert :show="isSuccess" dismissible variant="success">
        Succesfully saved.
      </b-alert>
    </div>

    <form ref="form" okTitle="Save" v-if="selectedList">
      <div class="d-block">
        <div class="d-block mr-5">
          <p>{{ l("List Name", "g") }}</p>
          <input
            type="text"
            name="listname"
            class="prompt srch_explore pa-10 mr-5 w-100"
            v-model="selectedList.uye_list_name"
          />
        </div>
        <div class="d-block mr-5" v-if="!selectedList.id">
          <p>{{ l("List Category", "g") }}</p>
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
        <b-button class="btn btn-primary" @click="saveUyeList(selectedList)">
          {{ l("Save", "g") }}
        </b-button>
        <a size="md" variant="success" @click="isVisible = false">{{
          l("Close", "g")
        }}</a>
      </div>
    </template>
  </b-modal>
</template>
<script>
import general from "@/mixins/general";
import listDetails from "@/components/list/listDetails";
import axios from "axios";
export default {
  mixins: [general],
  components: {
    listDetails
  },
  async created() {
    this.search.module = this.listType ? this.listType : "";  
  },
  watch: {
    
  },
  props:{
      selectedList:Object
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
    listModal: {
      get() {
        return this.$store.state.listModal;
      },
      set(val) {
        this.$store.state.listModal = val;
      }
    },
    listModalShow: {
      get() {
        return this.$store.state.listModal.show;
      },
      set(val) {
        this.$store.state.listModal.show = val;
      }
    }
  },
  data() {
    return {
      my_lists: [],
    
      isVisible: false,
      isSuccess: false,
      uyeListItem: {
        id: null,
        uye_list_name: ""
      },
      search: {
        keyword: "",
        module: "Word"
      },
      listOptions: [
        { name: "Course", value: "Course" },
        { name: "Exam", value: "Exam" },
        { name: "Word", value: "Word" }
      ]
    };
  },
  methods: {
     
    getList() {
      let id = this.$route.query.id;
      if (id) {
        this.selectedList = this.my_lists.find(k => k.id == id);
      }
    },
    editList(list) {
      this.selectedList = list;
      this.isVisible = true;
    },
    getListData(id, type = "data") {
      let items = this.likes.filter(k => k.list == id);
      if (type == "data") {
        return items;
      } else {
        return items.length;
      }
    },
    addNewList() {
      this.selectedList = {
        id: null,
        uye_list_name: "",
        view: "edit"
      };
      this.isVisible = true;
    },
    async saveUyeList(mp) {
      let method = "post";
      let url = process.env.baseURL + "uye_Lists";

      if (mp.id) {
        method = "put";
        url = process.env.baseURL + "uye_Lists/" + mp.id;
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
      let filters = { prev_id: ["=", this.auth.id] };
      if (this.search.module) {
        filters.uye_list_cat = ["=", this.search.module];
      } else if (this.listId) {
        filters.id = ["=", this.listId];
      }

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
        })
          .then(response => {
            console.log(
              " response.data.formattedData",
              response.data.formattedData
            );
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              this.my_lists = response.data.formattedData.map(k => {
                return { ...k, view: "read" };
              });
              console.log("this.my_lists", this.my_lists, this.listId);
              if (this.my_lists && this.listId) {
                let sl = this.my_lists.find(k => k.id == this.listId);
                if (sl) {
                  this.selectedList = sl;
                }
              }

              this.isVisible = false;
            }
          })
          .catch(err => console.log("err", err));
      });
    }
  }
};
</script>
