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
  },
  methods:{
    async getWords() {
        let fields = `dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;
         this.loading=true;   
        let filters = { status: ["=", 1] };
  
        if (this.search.keyword) {
          filters.dict_word = ["LIKE", this.search.keyword];
        }
        // if (this.search.level && this.search.level[0]) {
        //     filters.exa_degree = ["=", this.search.level];
        //   }
        return new Promise((resolve, reject) => {
          axios({
            url: process.env.baseURL + "dict_word",
            method: "get",
            params: {
              limit: this.pagination.limit,
              offset:  this.pagination.page,
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
        console.log("search",this.search)
    
        let filters = { status: ["=", 1] };
        this.loading=true;   
  
        if (this.search.keyword) {
          filters.rs_Question = ["LIKE", this.search.keyword];
        }
        if (this.search.qtype && this.search.qtype[0]) {
          filters.exa_type = ["=", this.search.qtype];
        }
        if (this.search.category && this.search.category[0]) {
          filters.exa_categories = ["=", this.search.category];
        }
        if (this.search.level && this.search.level[0]) {
          filters.exa_degree = ["=", this.search.level];
        }
        filters.exa_image = {exa_image:["!=", ''],rs_Question:["!=", ''],exa_sound:["!=", ''],exa_video:["!=", '']};
        let fields = "id,sort,status,exa_type,rs_Question,exa_image,exa_sound,exa_video,exa_timer";
        // this.getAnswers();
        axios({
            url: process.env.baseURL + "exam_q",
            method: "get",
            params: {
                limit: this.pagination.limit,
                offset:  this.pagination.page,
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
                offset:  this.pagination.page,
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