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
            fields:'id,cou_level_name,cou_level_color'
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
    levels() {
      return this.options["co_level"];
    },
  },
  methods:{

    getLevel(q) {
      if (this.levels && q && q) {
        let a = q
          ? this.levels.find(k => k.id == q)
            ? this.levels.find(k => k.id == q)
            : {}
          : {};
        return { color: a.cou_level_color, name: a.cou_level_name };
      } else {
        return { color: "#000", name: "-" };
      }
    },
    getListData(id,type="data"){
      let items  = this.likes.filter(k=> k.list==id );
      if(type=="data"){
        return items
      }else if(type=="ids"){
        return items.map(k=> k.id)
      }else{
        return items.length
      }
    },

    async getWords() {
        let fields = `dict_goole_image_search,dict_usage_mix,dict_daily_usage,dict_verb_type,dict_pattern,dict_root,dict_same_root,dict_example,dict_type,dict_verb,dict_plural,dict_singular,dict_w_opposites,dict_degree,dict_category,dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;
         this.loading=true;   
        let filters = { status: ["=", 1] };
  
        if (this.search.keyword) {
          filters.dict_word = [{ dict_word: ["LIKE", this.search.keyword]}, {dict_mean: ["LIKE", this.search.keyword] }] ;
          // filters.dict_word = ["LIKE", this.search.keyword];
        }
        if (this.search.category && this.search.category[0]) {
            filters.dict_category = ["=", this.search.category];
        }
        if (this.search.level && this.search.level[0]) {
            filters.dict_degree = ["=", this.search.level];
        }
        if (this.search.dict_type && this.search.dict_type[0]) {
          filters.dict_type = ["in", this.search.dict_type];
        }
        if(this.$route.query.list){
          let listId = this.$route.query.list;
          let ids = this.getListData(listId,"ids"); 
          if(ids && ids[0]){
            filters.id = ["in", ids];  
          }else{
            filters.id = ["in", ['x']]; 
          }
        
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
                d=d.map(element => {
                  let k = element;
                  if (k.dict_tag) {
                    k.labels = k.dict_tag.split(",");
                  } 
                    if (k.dict_tag) {
                      k.labels = k.dict_tag.split(",");
                    }
                    if (k.dict_w_opposites) {
                      k.dict_w_opposites_arr = k.dict_w_opposites.split(",");
                    }
    
                    if (k.dict_same_root) {
                      k.dict_same_root_arr = k.dict_same_root.split(",");
                    }
                    if (k.dict_w_similar) {
                      k.dict_w_similar_arr = k.dict_w_similar.split(",");
                    }
                    if (k.dict_example) {
                      k.dict_example_arr = k.dict_example.split("\r");
                    }
                    if (k.dict_usage_mix) {
                      k.dict_usage_mix_arr = k.dict_usage_mix.split("\r");
                    }
                    k.level = this.getLevel(k.dict_degree);
                    k.show = false;
                    return k;
                  }); 
  
                this.pagination.total = response.data.count;
                this.data = d;
                this.$store.dispatch("search/groupFields", {module:'dict_word', group:'dict_category',lang: this.LOCALE});
                this.$store.dispatch("search/groupFields", {module:'dict_word', group:'dict_degree',lang: this.LOCALE});
                this.$store.dispatch("search/groupFields", {module:'dict_word', group:'dict_type',lang: this.LOCALE});
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
          filters.exa_type = ["in", this.search.qtype];
        }
      
        // console.log("skills",this.search)
        if (this.search.skills && this.search.skills[0]) {
          filters.exa_skills = []
          this.search.skills.forEach(h=>{
            filters.exa_skills.push({exa_skills:["=", h]});
          }) 
          
        }
        if (this.search.category && this.search.category[0]) {
          filters.exa_categories = ["in", this.search.category];
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
        //   filters.exa_degree = ["in", this.search.level];
          filters.exa_degree = []
          this.search.level.forEach(h=>{
            filters.exa_degree.push({exa_degree:["LIKE", h]});
          }) 
          
        }

        if(this.$route.query.list){
          let listId = this.$route.query.list;
          let ids = this.getListData(listId,"ids"); 
          if(ids && ids[0]){
            filters.id = ["in", ids]; 
          }else{
            filters.id = ["in", ['x']]; 
          }
          this.pagination.limit=200;
          this.pagination.page=1;
        }


        filters.exa_timer = {exa_image:["!=", ''],rs_Question:["!=", ''],exa_sound:["!=", ''],exa_video:["!=", '']};
        this.$store.commit("search/setSearch",filters);
        let fields = "id,sort,status,exa_type,exa_degree,exa_categories,rs_Question,exa_image,exa_sound,exa_video,exa_ready,exa_timer,exa_skills";
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
                setTimeout(() => {
                    
                    this.data = response.data.formattedData;
                    this.pagination.total = response.data.count;
                }, 1000);
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_degree',lang: this.LOCALE});
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_type',lang: this.LOCALE});
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_categories',lang: this.LOCALE});   
                this.$store.dispatch("search/groupFields", {module:'exam_q', group:'exa_skills',lang: this.LOCALE});
 
                setTimeout(() => {
                    this.loading=false;    
                    
                }, 2000);
            }else {
                this.data = [];
                this.pagination.total = 0;
 

                setTimeout(() => {
                  this.loading=false;    
                    
                  this.data = [];
                  this.pagination.total = 0;
                }, 1000);
            }
 

            // this.loading=false;    
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

 
    },
  async getSections() {
    
    let filters = { status: ["=", 1] };
    this.loading=true;   

    if (this.search.keyword) {
      filters.section_name = ["LIKE", this.search.keyword];
    }
   
    // if (this.search.category) {
    //   filters.exa_type = ["=", this.search.category];
    // }
 
    let fields = `prev.cou_link,prev.cou_name,lesson_unite,lesson_unite.unit_name,lesson_unite.unit_image,section_name,id,prev_id,status,created_on,created_by`;

    // let filters = { status: ["=", 1], prev_id: ["=", prev] };

    return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL + "sections",
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