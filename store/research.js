import axios from 'axios'
// import {KurumsalSayfalar} from '@/transformers/KurumsalSayfalar'

const state = () => ({
  researches: {data:[],count:0},
  research: {},
  topics:[],
  searchFilter:null,
  researchTypes:[],
  counts:{
    researchTypes:{},
    topics:[],// durması lazım
    rs_MainT:{},
    rs_Type:{},
    rs_Lang:{},
    rs_Country:{},
  },
  search: {
    category: [],
    fullText:false,
    keyword: "",
    country: [],
    language: [],
    researchType: [],
    rs_Country: [],
    created_on_start:'',
    created_on_end:'',
    page: 1,
    keywordFields: {
      title: "",
      author: "",
      keyword: "",
      docId: "",
      college: "",
      publisher: "",
      periodicalTitle: ""
    }
  },
})

const getters = {
  getResearch() {
    return state.research;
  },
  getResearches() {
    return state.researches;
  },
  getSearch(state, payload) {
    return state.search;
  },
   
}

const mutations = {
  async setValues(state, payload) {
    state.pageData = payload;
  },
  async setSearch(state, payload) {
   return state.search=payload;
  },
  async setResearches(state, payload) {
    state.researches = payload;
  },
  async setTopics(state, payload) {
    state.topics = payload;
  },
  async setTypes(state, payload) {
    state.researchTypes = payload;
  },
  async setCounts(state, payload) {
    let g =payload.group;
    // Object.assign(state.counts[g], payload.count.map(k=> obj[k[g]]=k.count ));
    let counts = {...state.counts}
    counts[g] = {}
    if(g=="rs_MainT"){ counts['topics']=[] }
    payload.count.forEach(k=>{
      if(k[g]){
        let obj ={}
        
        obj[k[g]]=k.count;
        Object.assign(counts[g],obj);

      

        if(g=="rs_MainT"){
          let t= state.topics.find(z=>z.id==k[g])
          if(t){
            let f = t.from_rc_TCat && t.from_rc_TCat.rc_Name ? t.from_rc_TCat.rc_Name+'>' : ''; 
            let o = {id:t.id, name: f+" "+t.rc_Name+" ("+k.count+")", count: k.count};
            counts['topics'].push(o); 
          }
        }

      }
    });

    

    state.counts=counts
  },
  async setSearchFilter(state, payload) {
    state.searchFilter = payload;
  }
}

const actions = {

  getTopics({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL+"ReCat",
          method: 'get',
          params: {
              limit:2000,
              offset:0,
              lang:slang,
              filter:{status:["=",1]},
              fields:'rc_Name,id,status,rc_Link,rc_TCat,rc_TCat.rc_Name',
              sort:['sort,DESC', 'created_on,ASC']
          }  
        }).then(response => {
              let donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
              commit("setTopics", donen)
              resolve(donen); 
        }).catch(e => {
           console.log(e)
          })
        });

  },
  getResearchType({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL+"ResearchTypes",
          method: 'get',
          params: {
              limit:2000,
              offset:0,
              lang:slang,
              filter:{status:["=",1]},
              fields:'rt_Name,id,status,rt_NameofTitle,rt_Icon,rt_ShowHome',
              sort:['rt_ShowHome,DESC', 'created_on,ASC']
          }  
        }).then(response => {
              let donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
              commit("setTypes", donen)
              resolve(donen); 
        }).catch(e => {
           console.log(e)
          })
        });

  },
  async getResearches({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    let limit = payload &&  payload.limit  ? payload.limit : 20
    let sort = payload &&  payload.sort  ? [payload.sort] : ['created_on,DESC'];
    let offset = payload &&  payload.offset  ? payload.offset : 0
    let search = payload &&  payload.search  ? payload.search : {}
    let filter = {status:["=",1]}
 
    if(search){
        if(search.researchType ){
            filter.rs_Type = []
            search.researchType.forEach(k=>{ 
                filter.rs_Type.push({rs_Type: ['=',k]}) 
            }) 
        }
        if(search.fullText ){ 
             filter.rs_FullText = ['=','on']
        }
        if(search.language && search.language[0] ){ 
             filter.rs_Lang = ['=',search.language[0]]
        }
        if(search.rs_Country && search.rs_Country[0] ){ 
             filter.rs_Country = ['=',search.rs_Country]
        }
        if(search.keyword){
            filter.rs_Name = []   
            console.log("search.keywordFields",search.keywordFields)
            let anySelected = false;
            let kf = Object.keys(search.keywordFields) 
            kf.forEach(e => {
                if(search.keywordFields[e]){
                  anySelected = true;
                }
            });
            if(anySelected==false || search.keywordFields.title){
              filter.rs_Name.push({rs_Name: ['LIKE',search.keyword]})
              filter.rs_Name.push({rs_Short: ['LIKE',search.keyword]})
            }
            if(anySelected==false ||  search.keywordFields.author){
              filter.rs_Name.push({rs_Author: ['LIKE',search.keyword]})
              filter.rs_Name.push({rs_AuthorNames: ['LIKE',search.keyword]})
            }
            if(anySelected==false || search.keywordFields.keyword){
              filter.rs_Name.push({rs_Keywords: ['LIKE',search.keyword]})
            }
            // if(anySelected==false || search.keywordFields.docId){
            //   filter.rs_Name.push({rs_DocId: ['LIKE',search.keyword]})
            // }
            if(anySelected==false ||  search.keywordFields.college){
              filter.rs_Name.push({rs_College: ['LIKE',search.keyword]})
            }
            if(anySelected==false || search.keywordFields.publisher){
              filter.rs_Name.push({rs_Publisher: ['LIKE',search.keyword]})
            }
            if(anySelected==false || search.keywordFields.periodicalTitle){
              filter.rs_Name.push({rs_TitlePeriod: ['LIKE',search.keyword]})
            }
            if(anySelected==false || search.keywordFields.docId){
              filter.rs_Name.push({rs_DocId: ['LIKE',search.keyword]})
            }
            
            dispatch("pages/searchCounter",{key: search.keyword}, {root: true})
          
            // filter.rs_Name.push({rs_Short: ['LIKE',search.keyword]}) 
        }
        if(search.category && search.category[0]){
            filter.rs_MainT = []   
            search.category.forEach(k=>{
                if(k && k.id){
                    filter.rs_MainT.push({rs_MainT: ['=',k.id]})
                    filter.rs_MainT.push({rs_SubTopic: ['LIKE',k.id]})
                }else if(k){ 
                    filter.rs_MainT.push({rs_MainT: ['=',k]})
                    filter.rs_MainT.push({rs_SubTopic: ['LIKE',k]})
                }

            })
           
            
        }
        if(search.created_on_start){
          filter.created_on_start= ['>=',search.created_on_start] ;
        }
        if(search.created_on_end){ 
          filter.created_on_end= ['<=',search.created_on_end];
        } 

        if(search.rs_Year_start){
          filter.rs_Year= ['between',[search.rs_Year_start,search.rs_Year_end]] ;
        }
        if(search.rs_Year_end){ 
          // filter.rs_Year_end= ['<=',search.rs_Year_end];
        } 

    } 
    commit("setSearchFilter", filter)

     let fields = `rs_FullText,rs_Name,rs_Type,rs_Link,rs_Edition,rs_Publisher,rs_City,rs_Country,rs_DoPubl,rs_ISBN,rs_StartPage,rs_EndPage,rs_SeriesBook,rs_Year,rs_Month,rs_Lang,rs_Author,rs_MainT,rs_SubTopic,rs_Issue,rs_Part,rs_Frequency,rs_ShContent,rs_SourceL,rs_Notes,rs_TotalP,rs_TitleMain,rs_TitleChapter,rs_TitleArticle,rs_TitlePeriod,rs_TypeJourn,rs_emailSown,rs_siteSowner,rs_nameSender,rs_SenderMail,rs_File,rs_TitleConference,rs_TypeConfBook,rs_FolderNum,rs_FolderSect,rs_Jurisdiction,rs_College,rs_University,rs_Supervisor,rs_namePubl,rs_Short,rs_User,rs_isPublished,rs_Keywords,rs_AuthorNames,rs_Source,rs_Editor,rs_TypeTheis,rs_DocId,rs_Translator,rs_Reviewer,rs_ISSN,created_on,created_by,id,status`
    //  let fields = `rs_Name,rs_Type.rt_Name,rs_Link,rs_Edition,rs_Publisher,rs_City,rs_Country,rs_DoPubl,rs_ISBN,rs_StartPage,rs_EndPage,rs_SeriesBook,rs_Year,rs_Month,rs_Lang,rs_Author,rs_MainT,rs_SubTopic,rs_Issue,rs_Part,rs_Frequency,rs_ShContent,rs_SourceL,rs_Notes,rs_TotalP,rs_TitleMain,rs_TitleChapter,rs_TitleArticle,rs_TitlePeriod,rs_TypeJourn,rs_emailSown,rs_siteSowner,rs_nameSender,rs_SenderMail,rs_File,rs_TitleConference,rs_TypeConfBook,rs_FolderNum,rs_FolderSect,rs_Jurisdiction,rs_College,rs_University,rs_Supervisor,rs_namePubl,rs_Short,rs_User,rs_isPublished,rs_Keywords,rs_AuthorNames,rs_Source,rs_Editor,rs_TypeTheis,rs_DocId,rs_Translator,rs_Reviewer,rs_ISSN,created_on,created_by,id,status`
     fields=fields.replace(" ","")
     fields=fields.replace(/(\r\n|\n|\r)/gm,"");
 
     return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL+"ReMain",
        method: 'get',
        params: {
            limit,
            offset,
            lang:slang,
            filter:filter,
            fields,
            sort:sort
        }  
      }).then(response => {
            let donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
             
            commit("setResearches", {data:donen,count:response.data.count})
            resolve(donen); 
      }).catch(e => {
         console.log(e)
        })
      });
  },

  groupFields({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar" 
    let group = payload &&  payload.group ?  payload.group : ''
    let filter = {...state.searchFilter};
    if(group){

      let group_arr=[group]
      if(group=="rs_MainT"){
        group_arr.push("rs_SubTopic")
      }
    delete filter[group]
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL+"ReMain",
        method: 'get',
        params: { 
            lang:slang,
            filter:filter,
            fields:'id,'+group, 
            group:group_arr
        }  
      }).then(response => {
            let donen = response.data && response.data.count && response.data.count[0] ? response.data.count:  [];
          if(group=="rs_MainT"){
            let count=[]
            let totals={}
            donen.forEach(k=>{
                let sub = k.rs_SubTopic.split("---")
                let main = k.rs_MainT;
                if(!sub.includes(main)){
                    sub.push(main)
                }
                sub.forEach(z=>{
                  // let find = count.find(k=> k.rs_MainT==a)
                  if(!totals[z]){ totals[z]=0; }
                  totals[z]+=k.count;
                })
            })
            let totalsKeys = Object.keys(totals);
            totalsKeys.forEach(a=>{
              let data = totals[a];
              count.push({rs_MainT:a,count:data})
            })

            commit("setCounts", {group:group,count})
          }else{
            commit("setCounts", {group:group,count:donen})
          }
          resolve(donen); 
      }).catch(e => {
         console.log(e)
        })
      });
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
