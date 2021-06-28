<template>
  <div class="view-filter">  
        <div class="side-bar"   data-simplebar :class="customClass.textDir+' '+customClass.dir"> 
                <div class="serach-item">
                            <div class="search-title">
                                {{l('Type','g')}} 
                            </div> 
                            <div class="search-box"  @click="search.module='Course'">
								<input type="radio" tabindex="0" :checked="search.module=='Course' ? 'checked' : '' " value="Course"   />
								<label> {{(l('Lessons','g'))}}  </label>
							</div>
                              <div class="search-box" @click="search.module='Word'">
								<input type="radio" tabindex="1"  :checked="search.module=='Word' ? 'checked' : '' " value="Word"   />
								<label> {{(l('Words','g'))}}  </label>
							</div>
                              <div class="search-box"   @click="search.module='Exam'">
								<input type="radio" tabindex="2" value="Exam"  :checked="search.module=='Exam' ? 'checked' : '' "   />
								<label> {{(l('Question','g'))}}  </label>
							</div>
                </div>
                <div class="serach-item"> 
                
                            <div class="search-title">
                                {{l('Level','g')}} 
                            </div> 
                            <div class="search-box"  v-for="(opt,key) in options['co_level']"    
                              @click="addSearch('level',opt.id)" >
								<input type="checkbox"      :checked="search.level.includes(opt.id) ? 'checked' : false " />
                                <label> {{opt.cou_level_name}} </label>
							</div>
				</div>
                <!-- <div class="serach-item">
                            <div class="search-title">
                                {{l('Search keyword','g')}} 
                            </div>
                            <div class="search-box"   >
								<input type="text" class="input-std" 
                                        @change="getResults()"
                                        v-model="search.keyword" :placeholder="l('Type keyword','g')"  /> 
							</div>
				</div>     -->
                <div class="serach-item" v-if="search.module=='Exam'"> 
                
                            <div class="search-title">
                                {{l('Questition Type','g')}}  
                            </div> 
                            <div class="search-box"  v-for="(opt,key) in l('cat.QuestionTypes.list','g')"    
                            @click="addSearch('qtype',key)" >
								<input type="checkbox"      :checked="search.qtype.includes(key) ? 'checked' : false "  />
                                <label> {{opt.name}} </label>
							</div>
				</div>
                <div class="serach-item"> 
                
                            <div class="search-title">
                                {{l('Categories','g')}} 
                            </div> 
                            <div class="search-box"  v-for="(opt,key) in options['co_labels']"    
                              @click="addSearch('category',opt.id)" >
								<input type="checkbox"      :checked="search.category.includes(opt.id) ? 'checked' : false " />
                                <label> {{opt.cou_label_name}} </label>
							</div>
				</div>
            
         </div>
        <div class="content" v-show="loading"> Loading </div>
        <div class="content" v-show="!loading">   
             <div class="row">
                    <div class="col-6 " :class="customClass.textDir+' '+customClass.dir">
                         {{l('Total results','g')}} {{pagination.total}}   
                            {{search.module=='Course' && search.selectionC && search.selectionC.length>0 ? '('+search.selectionC.length+' '+l('selected','g') +')' : '' }}
                            {{search.module=='Word' && search.selectionW && search.selectionW.length>0 ? '('+search.selectionW.length+' '+l('selected','g')  +')' : '' }}
                            <b-dropdown id="dropdown-1" size="sm"  :text="'Order by:'+orderByList[orderBy].label" class="m-md-2">
                                <b-dropdown-item @click="orderBy=i" v-for="(order,i) in orderByList">{{order.label}}</b-dropdown-item>
                               
                            </b-dropdown>   
                    </div> 
                            <div class="col-6 " >
								<input type="text" class="input-std" 
                                        @change="getResults()"
                                        v-model="search.keyword" :placeholder="l('Type keyword','g')"  /> 
							</div>
				     
                    </div>

            <div class="content-table">
                <div v-if="search.module=='Word'">
                    <div v-for="dt in data" class="list_item"  :class="customClass.textDir+' '+customClass.dir">
                            <div class="word-container">
                            <div class="content-side">
                                <h3 @click="goPathBlank('word/'+dt.dict_word)">{{dt.dict_word}}</h3>
                                <div class="word-content">
                                <span v-html="HtmlEncode(dt.dict_mean)"></span>
                                <span class="pull-right" v-if="dt.dict_image"><img :src="show_image(dt.dict_image, '100', '100', true)" /></span>
                                </div>
                            </div>
                            <div class="button-side">
                                <!-- <a @click="goPathBlank('word/'+dt.dict_word)">Detail</a> -->
                                <br />
                                    <a    
                                        href="javascript:;"  
                                        class="like-button"
                                        v-if="!isLiked(dt.id)"
                                        @click="openLikeModal(dt,null,'Word')"
                                    >  <span class="text-black"><i class="uil uil-heart "></i> </span> 
                                    </a>
                                    <a    
                                        href="javascript:;" 
                                        class="like-button"
                                        v-else
                                        @click="removeLikeModal(dt,null,'Word')"
                                    >  <span class="text-red"> <i class="uil uil-heart "></i> </span> 
                                    </a>  <br />
                                    <input type="checkbox" class="check-centered"  
                                      :checked="search.selectionW.includes(dt.id) ? 'checked' : false " 
                                      @click="addSearch('selectionW',dt.id)"/>
                            </div>
                            </div>
                    </div>
                </div>
                <div v-else-if="search.module=='Exam'">
                    <div v-for="dt in data" class="list_item"  :class="customClass.textDir+' '+customClass.dir"> 
                        <div class="questition-container">
                                   <div class="content-side"> <question
                                        :question="{q:dt,a:[]}"
                                        :order="1"
                                        :isAnswered="false" 
                                    ></question>
                                    <!-- {{dt.id}} -->
                                        </div>
                                         <div class="button-side">
                                <!-- <a @click="goPathBlank('questionView/'+dt.id)">Detail</a><br /> -->
                                  <br />
                                    <a    
                                        href="javascript:;"  
                                        class="like_button"
                                        v-if="!isLiked(dt.id)"
                                        @click="openLikeModal(dt,{id:dt.lesson_unite},'Course')"
                                    >  <span class="text-black"><i class="uil uil-heart "></i> </span> 
                                    </a>
                                    <a    
                                        href="javascript:;" 
                                        class="like_button"
                                        v-else
                                        @click="removeLikeModal(dt,{id:dt.lesson_unite},'Course')"
                                    >  <span class="text-red"> <i class="uil uil-heart "></i> </span> 
                                    </a>
                                    <br />
                                    <input type="checkbox"  class="check-centered"
                                     :checked="search.selectionC.includes(dt.id) ? 'checked' : false " 
                                      @click="addSearch('selectionW',dt.id)"
                                    />

                                    </div>
                            </div>
                    </div>
                </div>
                <div v-else-if="search.module=='Course'">
                    <div v-for="dt in data" class="list_item"  :class="customClass.textDir+' '+customClass.dir"> 
                        <div class="questition-container">
                                   <div class="questition-container">
                                   <div class="content-side"> <h3>{{dt.lesson_name  }}</h3></div> 
                                              <div class="button-side">
                                <a @click="goPathBlank('course/'+dt.prev_id)">Detail</a><br />
                                
                                   
                                    </div> 
                                    </div>
                                    </div>
                    </div>
                </div>
                </div>
                <div class="row"> 
                    <div class="col-12" :class="customClass.textDir+' '+customClass.dir">
                            <b-pagination
                            v-model="pagination.page"
                            :total-rows="pagination.total"
                            :per-page="pagination.limit"
                            aria-controls="my-table"
                            ></b-pagination>
                    </div>
                </div>
        </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import filter from "@/mixins/filter"; 
import axios from "axios"; 
import question from "@/components/utils/question.vue"; 

export default {
  mixins: [general,filter],
  components:{ 
    question
  },
 async created() {
   await this.getResults();  
  },
  watch:{
    'search.module'(val){
        this.getResults();
    },
    'pagination.page'(val){
        this.getResults();
    }
  },
  computed: {
    auth() {
      return this.$store.state.user.auth;
    }  
  },
  data() {
    return {
      lists: [],  
      search:{
          module:'Word',
          keyword:'',
          qtype:[],
          category:[],
          level:[],
          selectionC:[],
          selectionW:[],
      },
      orderBy:0,
      orderByList:[
            {label:this.l('Recent','g'), value:'created_on' },
            {label:this.l('Popular','g'), value:'created_on'},
            {label:this.l('Best Rated','g'), value:'created_on'}
      ]
    };
  },
  methods: {
    addSearch(field,key){
        if(this.search[field].includes(key)){
            this.search[field] = this.search[field].filter(k=> k!=key)
        }else{
            this.search[field].push(key)
        } 
        this.getResults()
    },
    getResults() {

        if(this.search.module=="Course"){
                this.getLesson();
        }else if(this.search.module=="Word"){
                this.getWords();

        }else if(this.search.module=="Exam"){
                this.getQuestition(); 
        }
    //   let filters = { prev_id: ["=", this.auth.id] };
      // uye_languages
     
    },
    
  }
};
</script>
<style lang="scss" scoped>
.view-filter{
    margin-bottom: 0px;
        font-family: Cairo;
        text-align: right;
    flex: 190px auto;
    display: inline-flex;
    width: 100%;
    .side-bar{
        background: #fff;
        width: 190px;
        height: calc(100vh - 100px);
        min-width: 190px;
        padding :10px;
        border-radius: 5px;
                    box-shadow: 1px -1px 0px 0px rgba(186, 186, 186, 0.19);
            -webkit-box-shadow: 1px -1px 0px 0px rgba(186, 186, 186, 0.19);
            -moz-box-shadow: 1px -1px 0px 0px rgba(186, 186, 186, 0.19);
            overflow: auto;
        .serach-item{

        }
        .search-title{
            font-weight: 600;
            border-bottom: 1px solid rgb(240, 240, 240);
            padding-bottom: 7px;
            margin-bottom: 7px;
            margin-top: 12px;


        }   
        .search-box{
            width: 100%;
            display: block;
        }
    }
    .content{
        width: 100%;
            font-family: Cairo;
        // background: red;
        height: calc(100vh - 100px);
        padding : 0px 10px;
        .content-table{
            height: calc(100vh - 195px);
            overflow: auto;
            margin-bottom: 10px;
            padding-right:20px;
        }
        .list_item{
            margin-bottom: 10px;
            padding: 5px;
            border: .1em solid #efefef;
            border-radius: 5px;
            background :#fff;
            width: 100%;
            text-align:right;
            direction: rtl;
                             box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
            -webkit-box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
            -moz-box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
        }
    }
    .input-std{
        padding: 5px;
        border-radius: 4px;
        border: .1em solid #f9f9f9;
        width: 100%;
    }
    .questition-container{
        padding: 10px;
        display: inline-flex;
        flex: auto 60px;
        width: 100%;
              text-align:right;
    }
    .word-container{
        padding: 10px;
        display: inline-flex;
        flex: auto 60px;
              text-align:right;
        width: 100%;
        .word-content{
            display: inline-flex;
            width: 100%;
            place-content: flex-end;
            img{
                margin-left: 20px;
            }

        }
        h3{
            font-weight: 600;
            font-size: 18px;
            font-family: Cairo;
            margin: 3px 0;
            cursor: pointer;
        }
    }

           
        .content-side{

               width: inherit;
            padding: 10px;
        }
        .button-side{
            border-left: 1px solid #efefef;
            min-width: 30px;
            padding-left: 10px; 
        }
}
 
</style>
<style>
.text-black{
  color: #a0a0a0;
  width: 25px;

}
.text-red{
  color: #e71146;
  width: 25px;
}
body{
    overflow: auto;
}
.check-centered{
    display: block;
    margin-left: 4px;
    margin-top: 10px;
}
.liked-item{
    border: 1px solid #e71146;
}
</style>