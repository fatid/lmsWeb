// import general from "@/mixins/general";
import axios from "axios"; 
export default { 
  data() {
    return {
      saveStatus: { show: false, stataus: "success" },
      show:false,
      data: [],
      settings: [],
      lesson:{},
      course:{},
      unite:{},
      filter:{
        status:1
      },
      statusList:[
        {value:0,label:'All'},
        {value:1,label:'Published'},
        {value:2,label:'Draft'},
        {value:3,label:'Removed'}
      ]
    };
  },
  
  computed:{
    count(){
      return  this.$store.state.search.counts.prev_id
    },
    courseId(){
      return  this.$route.params.course
    },
    uniteId(){
      return  this.$route.params.unit
    },
    lessonId(){
      // return  this.$route.params.lesson
      return this.$route.query.lesson;
    }
  },
 
  methods: {

    onFileChange(e,field) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0],field);
    },
    createImage(file,field) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        this.edited[field] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.edited[e] = '';
    },
    async getLessonName () {
      let fields = `section_name,created_on,created_by,id,status`;

      let filters = { id: ["=", this.lessonId] }; 
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "sections",
          method: "get",
          params: {
            limit: 1,
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
              this.lesson = response.data.formattedData[0];
 
            } else {
              this.lesson = {};
            }
          })
          .catch(e => {
            this.lesson = {};
            console.log(e);
          });
      });
    },
    async getUniteName () {
      let fields = `unit_name,created_on,created_by,id,status`;

      let filters = { id: ["=", this.uniteId] }; 
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "unite",
          method: "get",
          params: {
            limit: 1,
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
              this.unite = response.data.formattedData[0];
 
            } else {
              this.unite = {};
            }
          })
          .catch(e => {
            this.unite = {};
            console.log(e);
          });
      });
    },
    async getCourseName () {
      let fields = `cou_name,cou_level,cou_category,cou_link,cou_tags,cou_total_time,cou_image,cou_short,cou_description,cou_total_view,id,status,created_on,created_by,id,status`;

      let filters = { id: ["=", this.courseId] }; 
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "courses",
          method: "get",
          params: {
            limit: 1,
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
              this.course = response.data.formattedData[0];
 
            } else {
              this.course = {};
            }
          })
          .catch(e => {
            this.course = {};
            console.log(e);
          });
      });
    },
  }
};
