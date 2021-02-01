import axios from 'axios'
// import {KurumsalSayfalar} from '@/transformers/KurumsalSayfalar'

const state = () => ({
  experts: {data:[],count:0},
  expert: {},
  expCat:[],
  expAreaofInt:[],
})

const getters = {
  getExperts() {
    return state.experts;
  },
  getExpert() {
    return state.expert;
  },
   
}

const mutations = { 
  async setData(state, payload) {
    state.experts = payload;
  },
  async setExpCat(state, payload) {
    state.expCat = payload;
  },
  async setExpAreaofInt(state, payload) {
    state.expAreaofInt = payload;
  }
}

const actions = {

getExpCat({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL+"expCat",
          method: 'get',
          params: {
              limit:2000,
              offset:0,
              lang:slang,
              filter:{status:["=",1]},
              fields:'b124_rc_Name,id,status,b124_rc_Desc,b124_rc_Link,b124_rc_TCat',
              sort:['sort,DESC', 'created_on,ASC']
          }  
        }).then(response => {
              let donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
              commit("setExpCat", donen)
              resolve(donen); 
        }).catch(e => {
           console.log(e)
          })
        });

  },
  getExpAreaofInt({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL+"expAreaofInt",
          method: 'get',
          params: {
              limit:2000,
              offset:0,
              lang:slang,
              filter:{status:["=",1]},
              fields:'b126_b124_rc_Name,id,status,b126_b124_rc_Link,b126_b124_rc_Desc,b126_b124_rc_TCat',
              
             
              sort:['sort,DESC', 'created_on,ASC']
          }  
        }).then(response => {
              let donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
              commit("setExpAreaofInt", donen)
              resolve(donen); 
        }).catch(e => {
           console.log(e)
          })
        });

  },
  async getData({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    let limit = payload &&  payload.limit  ? payload.limit : 20
    let offset = payload &&  payload.offset  ? payload.offset : 0
    let search = payload &&  payload.search  ? payload.search : {}
    let filter = {status:["=",1]}
    if(search){
        if(search.exp_AreaofInt ){
            filter.exp_AreaofInt = []
            search.exp_AreaofInt.forEach(k=>{ 
                filter.exp_AreaofInt.push({exp_AreaofInt: ['=',k]}) 
            }) 
        }
        if(search.keyword){
            filter.exp_FullName = []   
          
            if(search.keyword){
              filter.exp_FullName.push({exp_FullName: ['LIKE',search.keyword]})
              filter.exp_FullName.push({exp_Title: ['LIKE',search.keyword]})
              filter.exp_FullName.push({exp_Bio: ['LIKE',search.keyword]})
            }
        
           
            // filter.rs_Name.push({rs_Short: ['LIKE',search.keyword]}) 
        }
        if(search.category && search.category[0]){
            filter.exp_Area = []   
            search.category.forEach(k=>{
                if(k && k.id){
                    filter.exp_Area.push({exp_Area: ['=',k.id]})
                    filter.exp_Area.push({exp_Sub: ['LIKE',k.id]})
                }else if(k){ 
                    filter.exp_Area.push({exp_Area: ['=',k]})
                    filter.exp_Area.push({exp_Sub: ['LIKE',k]})
                }

            })
           
            
        }

    }
     let fields = `exp_Bio,exp_Country,exp_Link,exp_AreaofInt,exp_Degree,exp_SenderMemberId,exp_City,exp_SenderMail,exp_BirthD,exp_Mail,exp_Phone,exp_SenderName,exp_FullName,exp_Photo,exp_Title,exp_Area,exp_Sub,exp_Language,exp_HideMobile,exp_HideMail,created_on,created_by,id,status`
    //  let fields = `rs_Name,rs_Type.rt_Name,rs_Link,rs_Edition,rs_Publisher,rs_City,rs_Country,rs_DoPubl,rs_ISBN,rs_StartPage,rs_EndPage,rs_SeriesBook,rs_Year,rs_Month,rs_Lang,rs_Author,rs_MainT,rs_SubTopic,rs_Issue,rs_Part,rs_Frequency,rs_ShContent,rs_SourceL,rs_Notes,rs_TotalP,rs_TitleMain,rs_TitleChapter,rs_TitleArticle,rs_TitlePeriod,rs_TypeJourn,rs_emailSown,rs_siteSowner,rs_nameSender,rs_SenderMail,rs_File,rs_TitleConference,rs_TypeConfBook,rs_FolderNum,rs_FolderSect,rs_Jurisdiction,rs_College,rs_University,rs_Supervisor,rs_namePubl,rs_Short,rs_User,rs_isPublished,rs_Keywords,rs_AuthorNames,rs_Source,rs_Editor,rs_TypeTheis,rs_DocId,rs_Translator,rs_Reviewer,rs_ISSN,created_on,created_by,id,status`
     fields=fields.replace(" ","")
     fields=fields.replace(/(\r\n|\n|\r)/gm,"");
 
     return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL+"Uzman",
        method: 'get',
        params: {
            limit,
            offset,
            lang:slang,
            filter:filter,
            fields,
            sort:['sort,ASC']
        }  
      }).then(response => {
            let donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
            
            commit("setData", {data:donen,count:response.data.count})
            resolve(donen); 
      }).catch(e => {
         console.log(e)
        })
      });
  },

}
export default {
  state,
  getters,
  mutations,
  actions
}