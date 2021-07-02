import axios from 'axios'

export default {
    async created() { 
        await this.$store.dispatch("core/getOptions", {
          slang: this.$store.state.locale,
          group: "co_labels",
          fields: "id,cou_label_name"
        });
        await this.$store.dispatch("core/getOptions", {
            slang: this.$store.state.locale,
			group: 'co_level',
			fields:'id,cou_level_name'
		});
    },
  data() {
    return {
        pagination:{
            total:0,
            page:1,
            limit:20
        },
        loading: false,
        data:[]
    };
  },
  computed: {
    counts(){
        return this.$store.state.search.counts
    },      
  },
  methods:{
    async getWords() {
        let fields = `dict_degree,dict_category,dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;
         this.loading=true;   
        let filters = { status: ["=", 1] };
  
        if (this.search.keyword) {
          filters.dict_word = ["LIKE", this.search.keyword];
        }
        if (this.search.category && this.search.category[0]) {
            filters.dict_category = ["=", this.search.category];
        }
        if (this.search.level && this.search.level[0]) {
            filters.dict_degree = ["=", this.search.level];
        }
        this.$store.commit("search/setSearch",filters);
        return new Promise((resolve, reject) => {
          axios({
            url: process.env.baseURL + "dict_word",
            method: "get",
            params: {
              limit: this.pagination.limit,
              offset:  (this.pagination.page-1)*this.pagination.limit,
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
                d.map(element => {
                  let k = element;
                  if (k.dict_tag) {
                    k.labels = k.dict_tag.split(",");
                  }
                });
  
                this.pagination.total = response.data.count;
                this.data = d;
                this.$store.dispatch("search/groupFields", {module:'dict_word', group:'dict_category',lang: this.LOCALE});
                this.$store.dispatch("search/groupFields", {module:'dict_word', group:'dict_degree',lang: this.LOCALE});
              } else {
                this.data = [];
                this.pagination.total = 0;
              }
              this.loading=false;   
            })
            .catch(e => {
                this.data = [];
                this.pagination.total = 0;
                this.loading=false;    
                console.log(e);
            });
        });
      },
    async getQuestition() { 
        let filters = { status: ["=", 1] };
        this.loading=true;   
  
        if (this.search.keyword) {
          filters.rs_Question = ["LIKE", this.search.keyword];
        }
        if (this.search.qtype && this.search.qtype[0]) {
          filters.exa_type = ["=", this.search.qtype];
        }
        if (this.search.skills && this.search.skills[0]) {
          filters.exa_skills = ["LIKE", this.search.skills];
        }
        if (this.search.category && this.search.category[0]) {
          filters.exa_categories = ["=", this.search.category];
        } 
        if (this.search.media && this.search.media[0]) {
        
          if(this.search.media.includes('image')){
              filters.exa_image = ["!=", ''];
          }
          if(this.search.media.includes('audio')){
             filters.exa_sound = ["!=", ''];
          }
          if(this.search.media.includes('text')){
             filters.rs_Question = ["!=", ''];
          }
          if(this.search.media.includes('video')){
             filters.exa_video = ["!=", ''];
          } 
        }
   
        if (this.search.level && this.search.level[0]) {
          filters.exa_degree = ["=", this.search.level];
        }
        filters.exa_timer = {exa_image:["!=", ''],rs_Question:["!=", ''],exa_sound:["!=", ''],exa_video:["!=", '']};
        this.$store.commit("search/setSearch",filters);
        let fields = "id,sort,status,exa_type,exa_degree,exa_categories,rs_Question,exa_image,exa_sound,exa_video,exa_timer,exa_skills";
        // this.getAnswers();
        axios({
            url: process.env.baseURL + "exam_q",
            method: "get",
            params: {
                limit: this.pagination.limit,
                offset:  (this.pagination.page-1)*this.pagination.limit,
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
                this.data = response.data.formattedData;
                this.pagination.total = response.data.count;
                this.loading=false;    
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_degree',lang: this.LOCALE});
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_type',lang: this.LOCALE});
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_categories',lang: this.LOCALE});   
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_skills',lang: this.LOCALE});


            }else {
                this.data = [];
                this.pagination.total = 0;
            }
            this.loading=false;    
            })
            .catch(e => {
                    this.question.q = null;
                    this.loading=false;  
                    this.data = [];
                    this.pagination.total = 0;

            });
        },
  async getLesson() {
    
    let filters = { status: ["=", 1] };
    this.loading=true;   

    if (this.search.keyword) {
      filters.lesson_name = ["LIKE", this.search.keyword];
    }
   
    if (this.search.category) {
      filters.exa_type = ["=", this.search.category];
    }
 
        let fields = `lesson_photo,lesson_unite,lesson_type,lesson_total_time,lesson_description,lesson_name,id,status,created_on,created_by,lesson_video_url,lesson_video,prev_id`;
   
  
        return new Promise((resolve, reject) => {
          axios({
            url: process.env.baseURL + "lesson",
            method: "get",
            params: {
                limit: this.pagination.limit,
                offset:  (this.pagination.page-1)*this.pagination.limit,
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
                    this.data = response.data.formattedData;
                    this.pagination.total = response.data.count;
                    this.loading=false;    
        
        
                }else {
                    this.data = [];
                    this.pagination.total = 0;
                }
                this.loading=false;    
            
            })
            .catch(e => {
                this.question.q = null;
                this.loading=false;  
                this.data = [];
                this.pagination.total = 0;
            });
        }); 

 
    }

  }

}