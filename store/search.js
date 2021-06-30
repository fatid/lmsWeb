import axios from 'axios'
// import {KurumsalSayfalar} from '@/transformers/KurumsalSayfalar'

const state = () => ({
 
  topics:[], 
  searchFilter:{
          module:'Word',
          keyword:'',
          qtype:[],
          media:[],
          category:[],
          level:[],
          selectionC:[],
          selectionW:[],
  },
  searchFilterQuery:{ 
    exa_type:null,
    exa_categories:null,
    dict_category:null,
    dict_degree:null,
    exa_degree:null,
    exa_image:null,
  },
  searchFilterQuery_Copy:{ 
    exa_type:null,
    exa_categories:null,
    dict_category:null,
    dict_degree:null,
    exa_degree:null,
    exa_image:null,
  },
  counts:{ 
    topics:[],// durması lazım 
    degree:{},
    exa_type:{},
    categories:{},
  }, 
})

const getters = {
  
   
}

const mutations = {
  setSearch(state, payload){
    
    //  Object.assign(state.searchFilterQuery,state.searchFilterQuery_Copy)
    //  Object.assign(state.searchFilterQuery,payload)
     state.searchFilterQuery=payload
  },  
  async setCounts(state, payload) {
    let g =payload.group;
    // Object.assign(state.counts[g], payload.count.map(k=> obj[k[g]]=k.count ));
    let counts = {...state.counts}
    counts[g] = {}
    let g_from = g;
    if(g=="exa_categories" || g=="dict_category"){  g='categories'; counts[g]=[] }
    else if(g=="exa_degree" || g=="dict_degree"){ g='degree'; counts[g]=[]  }
   
    payload.count.forEach(k=>{
      if(k[g_from]){
        let obj ={} 
        obj[k[g_from]]=k.count;
        Object.assign(counts[g],obj); 
      }
    });

    state.counts=counts
  },
 
}

const actions = {
  

  groupFields({ commit, dispatch, state }, payload) {
    let slang = payload &&  payload.lang  ? payload.lang : "ar" 
    let group = payload &&  payload.group ?  payload.group : ''
    let moduleName = payload &&  payload.module ?  payload.module : ''
    // let filter = {...state.searchFilterQuery};
    if(group){

      let group_arr=[group]
      
      let filterObj = Object.keys(state.searchFilterQuery);
      let filter = {}
      filterObj.forEach(k=> {
        if(state.searchFilterQuery[k]!=null){
          filter[k]=state.searchFilterQuery[k]
        }else{
          filter[k]=[] 
        }
        
      }); 
    delete filter[group]
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL+moduleName,
        method: 'get',
        params: { 
            lang:slang,
            filter:filter,
            fields:'id,'+group, 
            group:group_arr
        }  
      }).then(response => {
            let donen = response.data && response.data.count && response.data.count[0] ? response.data.count:  [];
         
            commit("setCounts", {group:group,count:donen})
          
          resolve(donen); 
      }).catch(e => {
        commit("setCounts", {group:group,count:[]})
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
