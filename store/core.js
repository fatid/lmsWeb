import axios from 'axios'

const state = () => ({
    countries: [],
    banners:[],
  
    options: {
      'co_level':[],
      'uye_Lists':[],
      'SSS_Kategori':[]
    },
});

const mutations= {
    setCountries(state, payload){
       state.countries = payload 
    },
    setBanners(state, payload){
       state.banners = payload 
    },
    setOptions(state, payload){
       state.options[payload.group] = payload.data
    }    
}
const actions = {

async getOptions({ commit, dispatch, state },payload){
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    let prev_id = payload &&  payload.prev_id  ? payload.prev_id :  null
    let group = payload &&  payload.group  ? payload.group : null
    let sort = payload &&  payload.sort  ? [payload.sort] : ["id,ASC"]

    let filter= { status: ["=",1] };
    if(prev_id){
      filter.prev_id=["=",prev_id]
    }

    let  params = {
      limit: 100,
      lang: slang,
    filter,  
      sort
    }
    if(payload &&  payload.fields){
      params.fields = payload.fields
    }

    if(group!=null){

      await axios({
        url: process.env.baseURL+group,
        method: "get",
        params
      })
        .then(response => {
          commit('setOptions',{group,data:response.data.formattedData});
        })
        .catch(e => {
          console.log("ERR", e);
        });

    }
  
},

async getCountries({ commit, dispatch, state },payload){
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    await axios({
    url: process.env.baseURL+'LocalCountries',
    method: "get",
    params: {
      limit: 100,
      lang: slang,
      filter: { status: ["=",1] },
      fields: "id,countryName",
      sort: ["countryName,DESC"]
    }
  })
    .then(response => {
      commit('setCountries',response.data.formattedData);
    })
    .catch(e => {
      console.log("ERR", e);
    });
},
async getBanners({ commit, dispatch, state },payload){
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    await axios({
    url: process.env.baseURL+'Card_Banner',
    method: "get",
    params: {
      limit: 100,
      lang: slang,
      filter: { status: ["=",1] },
      fields: "id,cbanner_title,cbanner_subtitle,cbanner_buttontext,cbanner_buttonurl,cbanner_bg,cbanner_part,cbanner_style,cbanner_who",
 
    }
  })
    .then(response => {
      commit('setBanners',response.data.formattedData);
    })
    .catch(e => {
      console.log("ERR", e);
    });
},

}
export default {
    state,
    mutations,
    actions
}