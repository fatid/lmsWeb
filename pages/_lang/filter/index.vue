<template>
  <div class="view-filter">  
      <div class="drawer" @click="closeDrawer()" :class="selectedItem.show ? 'visible': 'hidden'">
          <div class="content" @click.stop="" >
                    <h3>{{selectedItem.data.dict_word}}</h3>
                    <div v-html="HtmlEncode(selectedItem.data.dict_mean)"></div>
                     
                                <span class="pull-right" v-if="selectedItem.data.dict_image">
                                    <img :src="show_image(selectedItem.data.dict_image, '100', '100', true)" /></span>
                                
        
            </div>
      </div>
        <div class="side-bar"   data-simplebar :class="customClass.textDir+' '+customClass.dir"> 
                <div class="serach-item">
                            <!-- <div class="search-title">
                                {{l('Type','g')}} 
                            </div>  -->
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
                            <div class="search-box inline"  v-for="(opt,key) in options['co_level']"    
                              @click="addSearch('level',opt.id)" >
								<input type="checkbox"      :checked="search.level.includes(opt.id) ? 'checked' : false " />
                                <label> {{opt.cou_level_name}} 
                                        {{counts['degree'][opt.id] ? '('+counts['degree'][opt.id]+')':''}}  
                                </label>
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
                             <div class="search-checkbox">
                                <div class="search-box"  v-for="(opt,key) in l('cat.QuestionTypes.list','g')"    
                                @click="addSearch('qtype',key)" >
                                    <input type="checkbox"      :checked="search.qtype.includes(key) ? 'checked' : false "  />
                                    <label> {{opt.name}} ({{counts['exa_type'][key]}}) </label>
                                </div>
							</div>
				</div>
                <div class="serach-item" v-if="search.module=='Exam'"> 
                
                            <div class="search-title">
                                {{l('Questition Media','g')}}  
                            </div> 
                             <div class="search-checkbox">
                                <div class="search-box"  v-for="(opt,key) in mediaTypes"    
                                @click="addSearch('media',opt.value)" >
                                    <input type="checkbox"      :checked="search.media.includes(opt.value) ? 'checked' : false "  />
                                    <label> {{opt.name}} </label>
                                </div>
							</div>
				</div>
                <div class="serach-item"> 
                
                            <div class="search-title">
                                {{l('Categories','g')}} 
                            </div> 
                            <div class="search-checkbox">
                                <div class="search-box"  v-for="(opt,key) in options['co_labels']"  v-show="counts['categories'][opt.id]"  
                                @click="addSearch('category',opt.id)" >
                                    <input type="checkbox"      :checked="search.category.includes(opt.id) ? 'checked' : false " />
                                    <label> {{opt.cou_label_name}} {{counts['categories'][opt.id] ? '('+counts['categories'][opt.id]+')':''}} </label>
                                </div>
							</div>
				</div>
            
         </div>
        <div class="content" v-show="loading"> Loading </div>
        <div class="content" v-show="!loading">   
             <div class="row">
                    <div class="col-6 " :class="customClass.textDir+' '+customClass.dir">
                         {{l('Total results','g')}} {{pagination.total}}   
                           
                            
                            <b-dropdown id="dropdown-1" size="sm"  :text="'Order by:'+orderByList[orderBy].label" class="m-md-2">
                                <b-dropdown-item @click="orderBy=i" v-for="(order,i) in orderByList">{{order.label}}</b-dropdown-item>
                               
                            </b-dropdown>   
                    </div> 
                            <div class="col-3 " >
                                  <template v-if="search.module=='Course' && selection.selectionC && selection.selectionC.length>0">
                                     <a class="addListLink">Add to list {{selection.selectionC.length+' '+l('selected','g')  }}</a>
                            </template>
                            <template v-if="search.module=='Word' && selection.selectionW && selection.selectionW.length>0">
                                     <a class="addListLink">Add to list {{selection.selectionW.length+' '+l('selected','g')  }}</a>
                            </template>
                            </div>
                            <div class="col-3 " >
                                <i class="fa fa-search input-icon"></i>
								<input type="text" class="input-std" 
                                        @change="getResults()"
                                        v-model="search.keyword" :placeholder="l('Search keyword','g')"  /> 
							</div>
				     
                    </div>

            <div class="content-table">
                <div v-if="search.module=='Word'">
                    <div v-for="dt in data" class="list_item"  :class="customClass.textDir+' '+customClass.dir">
                            <div class="word-container">
                            <div class="content-side">
                                <h3 @click="openDrawer('word',dt)">{{dt.dict_word}}</h3>
                                <!-- <h3 @click="goPathBlank('word/'+dt.dict_word)">{{dt.dict_word}}</h3> -->
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
                                      :checked="selection.selectionW.includes(dt.id) ? 'checked' : false " 
                                      @click="addSelection('selectionW',dt.id)"/>
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
                                        :levels="options['co_level']"
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
                                     :checked="selection.selectionC.includes(dt.id) ? 'checked' : false " 
                                      @click="addSelection('selectionW',dt.id)"
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
                    <div class="col-12 text-center" :class="customClass.textDir+' '+customClass.dir" >
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
    }, 
    search() {
      return this.$store.state.search.searchFilter; 
    },
    selection() {
      return this.$store.state.search.selection; 
    }  
  },
  data() {
    return {
      lists: [],  
    //   search:{
    //       module:'Word',
    //       keyword:'',
    //       qtype:[],
    //       media:[],
    //       category:[],
    //       level:[],
    //       selectionC:[],
    //       selectionW:[],
    //   },
    selectedItem:{
        show:false,
        type:'',
        data:{

        }
    },
      orderBy:0,
      orderByList:[
            {label:this.l('Recent','g'), value:'created_on' },
            {label:this.l('Popular','g'), value:'created_on'},
            {label:this.l('Best Rated','g'), value:'created_on'}
      ],
      mediaTypes:[
            {name:this.l('Image','g'), value:'image' },
            {name:this.l('Video','g'), value:'video'},
            {name:this.l('Listenin Skills','g'), value:'audio'},
            {name:this.l('Reading Skills','g'), value:'trext'},
      ]
    };
  },
  methods: {
      closeDrawer(){
          this.selectedItem={
                show:false,
                type:'',
                data:{}
            }
      },
      openDrawer(type,data){
            this.selectedItem={
                show:true,
                type,
                data
            }
      },
    addSearch(field,key){
        if(this.search[field].includes(key)){
            this.search[field] = this.search[field].filter(k=> k!=key)
        }else{
            this.search[field].push(key)
        } 
        console.log("this.search",this.search,field,key)
        this.getResults()
    },
    addSelection(field,key){
        if(this.selection[field].includes(key)){
            this.selection[field] = this.selection[field].filter(k=> k!=key)
        }else{
            this.selection[field].push(key)
        }  
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
            padding-bottom: 5px;
            margin-bottom: 5px;
            margin-top: 7px;
            font-family: Cairo; 
        }   
        .search-checkbox{
            width: 100%;
            display: block;
            max-height: 109px;
            overflow: auto;
        }
        .search-box{
            width: 100%;
            display: inline-flex; 
            label {
                display: inline-block;
                margin-bottom: .2rem; 
                width: 145px; 
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden; 
                margin-left: 5px;
                margin-top: -2px;
            }
            &.inline{
                display: inline-flex;
                width: 50%;
                 label {
                        display: inline-block;
                        margin-bottom: .2rem;
                        display: inline-block;
                        width: 55px; 
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;  
                        margin-top: 0px;
                }
            }
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
    .input-icon{
        position: absolute;
        left: 22px;
        top: 7px;
    }
    .input-std{
        padding: 5px 5px 5px 26px;
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

.drawer{
    width: 100%;
   z-index:1000;
   display: none;
    position: fixed;
    background: rgba(68, 68, 68, 0.508);
        height: 100vh;
 left: 0;
        top:0;
    &.visible{
   display: block;
        
        .content{
                right: 0;
                top:0;
       transition: 2s all;

        }
    }
    .content{
         width: 500px;
        height: 100vh;
        padding: 15px;
        position: fixed;
        right: -600px;
          max-width: 80%;
         background: #fff;
       transition: 2s all;
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
.pagination{
        text-align: center;
    margin: 0 auto;
    display: inline-flex;
}
a.addListLink{
    color: #e71146!important;
    cursor: pointer;
    text-decoration: underline!important;
}

</style>