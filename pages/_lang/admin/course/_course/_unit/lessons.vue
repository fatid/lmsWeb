<template>
  <div class="container">
    <b-modal
      id="modal-xl"
      v-model="showMass.show"
      scrollable
      size="xl"
      :title="'Mass Addition'"
    ></b-modal>
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


 <b-modal
      id="modal-xl"
      v-model="showTopic"
      scrollable
      size="xl"
      :title="editedTopic.id ? l('Editing', 'g') : l('Create New', 'g')"
    >
      <!-- {{editedTopic}} -->
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
              v-model="editedTopic.lesson_name"
            />
             <select class="modal-form-input" v-model="editedTopic.lesson_type">
              <option v-for="u in lessonType" :key="u.value" :value="u.value">{{
                u.label
              }}</option>
          </select>
          </span>
        </div>  
          <div class="modal-form-row" v-show="editedTopic.lesson_type=='Exam'">
       
          <span style="width: 100%; display: block;">  
          <span style="width: 100%; display: inline-flex;">  
            Choose Question
            <input
              type="text"
              class="modal-form-input"
              v-model="qs.name" 
              @change="getQuestions()"
            />
             <select class="modal-form-input" v-model="qs.type" @change="getQuestions()">
              <option    v-for="(opt, key) in l('cat.QuestionTypes.list', 'g')"  :key="key" :value="key">{{
                  opt.name 
              }}</option>
             </select>
             <select class="modal-form-input" v-model="qs.level" @change="getQuestions()">
               <option v-for="u in levels" :key="u.id" :value="u.id">{{
                u.cou_level_name
              }}</option>
            </select>
          </span>
          <span style="width: 100%; display: block;">
            <span class="question-border" 
            :class="editedTopic.lesson_question==q.q.id ? 'green-border':''"
            v-for="q in questions">  
          
                <a v-if="editedTopic.lesson_question==q.q.id" @click="editedTopic.lesson_question='q.q.id'">Deselect this question</a>
                <a v-else @click="editedTopic.lesson_question=q.q.id">Select this question {{q.q.id}} </a>

                <question
                  :question="q" 
                  :isAnswered="false" 
                ></question>
            </span>
            </span>
            </span>
        </div> 
         <div class="modal-form-row" v-show="editedTopic.lesson_type=='Content'">
       
          <span style="width: 100%; display: block;">     <!-- <tiptap    /> --> 
                  <tiptap v-model="editedTopic.lesson_description"  
                          @updated="editedTopic.lesson_description=$event"
                  /> 
            <!-- <textarea
              type="text"
              class="modal-form-input"
              v-model="editedTopic.lesson_description"
            ></textarea> -->
          </span>
        </div> 
        <div class="ui left icon input swdh11 swdh19" v-show="editedTopic.lesson_type=='Image'">
          <div v-if="!editedTopic.lesson_photo">
            <p>
              <a>{{ l("Upload image", "g") }}</a>
            </p>
            <input
              type="file"
              name="changeFile"
              @change="onFileChange2($event, 'lesson_photo')"
            />
          </div>
          <div v-else>
            <img :src="editedTopic.lesson_photo" class="g-width-200 imageUpload" />
            <p class="margin-top-10 mt-10 g-mt-10">
              <a @click="removeImage2('lesson_photo')"
                ><i class="fa fa-times"></i> {{ l("Remove image", "g") }}</a
              >
            </p>
          </div>
        </div>
        <div class="modal-form-row">
          <label>{{l('Sort Order','g')}}</label>
          <span
            ><input
              type="number"
              class="modal-form-input"
              v-model="editedTopic.sort"
            />
          </span>
        </div>  
      </div>
      <template #modal-footer>
        <div class="w-100">
            <select class="modal-form-input" v-model="editedTopic.status">
              <option v-for="u in statusList" :key="u.value" :value="u.value">{{
                u.label
              }}</option>
          </select>
          <b-button
            variant="default"
            size="sm"
            class="float-right"
            @click="showTopic = false"
          >
            Close
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="saveTopic()"
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
            {{l('Courses','g')}} >
            <a @click="goPath('admin/course/list')">{{ course.cou_name }}</a> >
            <a @click="goPath('admin/course/'+courseId+'/units')">{{ unite.unit_name }}</a> >
            {{ l("Lessons", "g") }}
          </h3>
        </div>
        <div>

           <select
            class="modal-form-input"
            v-model="filter.status"
            @change=" selectedLesson ?  getTopics(): getList()"
           
          >
            <option v-for="u in statusList" :key="u.value" :value="u.value">{{
              u.label
            }}</option>
          </select>
          <div class="btn btn-success" v-if="selectedLesson"  @click="openModalTopic({id:null })">
            + {{ l("Add New Topic", "g") }}
          </div>
          <div class="btn btn-primary"    @click="openModal({id:null })">
            + {{ l("Add New Lesson", "g") }}
          </div>
        </div>
      </div>
      <div v-show="selectedLesson" class="col-12 col-md-12 col-sm-12">
        <div class="topic_container">
              <div><ul class="my_lists">
                  <li v-for="d in data" :class="selectedLesson==d.id ? 'selected':''" > 
                      <a  @click="selectedLesson=d.id">{{ d.section_name }}
                      </a>
                      {{ count ? count[d.id] : '' }}   
                  </li>
              </ul>
              <br />
   <div class="btn btn-danger"   @click="openModalMass({type:'question' })">
            + {{ l("Add Mass Questions", "g") }}
          </div>
              <br />
              <br />
   <div class="btn btn-danger"    @click="openModalMass({type:'image' })">
            + {{ l("Add Mass Images", "g") }}
          </div>
              </div>
              <div class="table_topic">
                    <vue-good-table
                      :columns="columns2"
                      :rows="dataLesson"
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
                          <a class="table-buttons" @click="openModalTopic(props.row)"
                            ><i class="fa fa-pen"></i
                          ></a>
                          <a
                            class="table-buttons"
                            @click="selectedLesson=props.row.id"
                            @click.middle="
                              goPathBlank('admin/course/' + courseId + '/' + uniteId +'/lessons?lesson='+props.row.id)
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
                        <span v-else-if="props.column.field == 'lesson_photo'">
                          <img
                            v-if="props.row.lesson_photo"
                            :src="show_image(props.row.lesson_photo, '50', '50', '', '90')"
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
      <div v-show="!selectedLesson" class="col-12 col-md-12 col-sm-12">
  
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
                @click="selectedLesson=props.row.id"
                @click.middle="
                  goPathBlank('admin/course/' + courseId + '/' + uniteId +'/lessons?lesson='+props.row.id)
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
              <a  @click="selectedLesson=props.row.id">{{ props.row[props.column.field] }}</a>
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
import { VueGoodTable } from "vue-good-table";
import banners from "@/components/common/banner.vue";
import tiptap from "@/components/common/Tiptap.vue";
import "vue-good-table/dist/vue-good-table.css";
import question from "@/components/utils/question.vue"; 

export default {
  mixins: [general, admin_course],
  components: {
    banners,
    VueGoodTable,
    tiptap,
    question
  },
  computed:{
    lessonId(){
      return this.$route.query.lesson;
    },
     levels() {
      return this.$store.state.core.options["co_level"];
    },
  },
  data: () => ({
    edited: {
      id: null, 
    },
    search: {
      keyword: ""
    },
    selectedLesson:null,
    topics:[],
    dataLesson:[],
    showTopic:false,
    editedTopic:{
      status:1
    },
    lessonType:[
      {label:'Exam',value:'Exam'},
      {label:'Course',value:'Course'},
      {label:'Video',value:'Video'},
      {label:'Image',value:'Image'},
      {label:'Content',value:'Content'},
    ],
    showMass:{
      show: false,type:null
    },
    qs:{
      name:'',
      type:'',
      level:''
    },
    questions:[],
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
    ],
    columns2: [
      {
        label: "Sort",
        field: "sort",
        width: "60px",
         type: 'number',
      }, 
      {
        label: "Image",
        field: "lesson_photo",
            width: "100px",
        sortable: false,
      },
      {
        label: "Topic Name",
        field: "lesson_name"
      },
      {
        label: "Type",
        field: "lesson_type"
      },

      {
        label: "Action",
        field: "action",
        width: "120px",
        sortable: false,
      }
    ]
  }),
  watch:{
    selectedLesson(val){
           this.getTopics();
          this.setDefaultTopic();
    },
    'editedTopic.lesson_question'(val){

        this.getQuestions(val);

    }

  },
  async created() {
    this.setDefault();

    this.$store.dispatch("search/groupFields", {
      module: "lesson",
      group: "prev_id",
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
    onFileChange2(e,field) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage2(files[0],field);
    },
    createImage2(file,field) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        this.editedTopic[field] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage2: function (e) {
      this.editedTopic[e] = '';
    },

    setDefault(){
      this.edited = {
          id: null,
          section_name: "",
          status:1,
          prev_id:this.uniteId, 
          sort:this.data.length+1,
       }
    },
    setDefaultTopic(){
      this.editedTopic = {
          id: null,
          lesson_name: "",
          lesson_video: "",
          lesson_video_url: "",
          lesson_photo: "",
          lesson_type: "",
          lesson_question: "",
          lesson_acc_type: "",
          lesson_subject: "",
          lesson_description: "",
          lesson_total_time: "",
          lesson_counter: "", 
          status:1,
          prev_id:this.selectedLesson, 
          sort:this.dataLesson.length+1,
       }
    },
    openModalMass(type) {
      this.showMass.show = true;
      this.showMass.type = type; 
    },
    openModal(row) {
      this.show = true;
      if(!row.id){
        this.setDefault();
      }else{
        this.edited = {...row};
      }
    },
    openModalTopic(row) {
      this.showTopic = true;
      if(!row.id){
        this.setDefaultTopic();
      }else{
        this.editedTopic = {...row};
      }
    },
    async saveTopic() {
      let d = this.editedTopic;
      let method = "post";
      let url = process.env.baseURL + "lesson";
      if (d.id && d.id != "new") {
        method = "put";
        url = process.env.baseURL + "lesson/" + d.id;
      }
      await axios({
        url,
        method,
        data: {
          id: d.id &&  d.id!='new' ? d.id : null,
          status: d.status,
          lesson_name: d.lesson_name, 
          lesson_photo: d.lesson_photo, 
          lesson_description: d.lesson_description, 
          lesson_type: d.lesson_type, 
          lesson_question: d.lesson_question, 
          lesson_video_url: d.lesson_video_url, 
          prev_id: this.selectedLesson, 
          sort: d.sort,
        }
      }).then(response => {
        this.saveStatus = { show: true, status: "success" };
        this.getTopics();
        this.setDefaultTopic();
           this.$store.dispatch("search/groupFields", {
      module: "lesson",
      group: "prev_id",
      lang: this.LOCALE
    });
        setTimeout(() => {
          this.showTopic = false;
          this.saveStatus = { show: false, status: "success" };
        }, 500);
      });
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
        this.saveStatus = { show: true, status: "success" };
        this.getList();
        setTimeout(() => {
          this.show = false;
          this.saveStatus = { show: false, status: "success" };
        }, 500);
      });
    },
 async getQuestions(id) {
        let fields =
        "id,sort,status,exa_type,rs_Question,exa_image,exa_sound,exa_video,exa_timer,exa_ready";
        let filter={}
        if(id){
            filter.id= ["=", id];
        }else{
 
            if(this.qs.name){
              filter.rs_Question= ["LIKE", this.qs.name];
            }
            if(this.qs.level){
              filter.exa_degree= ["=", this.qs.level];
            }
            if(this.qs.type){
              filter.exa_type= ["=", this.qs.type];
            }
        }
      axios({
        url: process.env.baseURL + "exam_q",
        method: "get",
        params: {
          limit: 20,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["random,ASC"],
          filter
        }
      })
        .then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
           this.questions  = response.data.formattedData.map(k=>{
                return {a:null,q:k}
            })
          
          }
        })
        .catch(e => {
          this.questions = null;
        });
    },
    async getList() {
      let fields = `sort,section_name,lesson_unite,id,status,created_on,created_by,id,status`;
      // let prev = this.$route.params.course;
      let filters = {   prev_id: ["=", this.uniteId] };
      filters.status=["=", this.filter.status ? this.filter.status  : 1] ;
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
    },
    async getTopics() {
      let fields = `sort,lesson_name,lesson_photo,lesson_question,lesson_video,lesson_type,lesson_description,lesson_video_url,created_on,created_by,id,status`;
      // let prev = this.$route.params.course;
      let filters = {   prev_id: ["=", this.selectedLesson] };
filters.status=["=", this.filter.status ? this.filter.status  : 1] ;
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "lesson",
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

              this.dataLesson = d.map(element => {
                element.sort = parseInt(element.sort)
                return { ...element };
              });
            } else {
              this.dataLesson = [];
            }
          })
          .catch(e => {
            this.dataLesson = [];
            console.log(e);
          });
      });
    }
  }
};
</script>
<style lang="scss" src="@/pages/_lang/admin/course/style.scss"></style>
<style lang="scss">

</style>