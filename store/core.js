import axios from 'axios'

const state = () => ({
    countries: [],
    options: {},
});

const mutations= {
    setCountries(state, payload){
       state.countries = payload 
    },
    setOptions(state, payload){
       state.options[payload.group] = payload.data
    }
}
const actions = {

async getOptions({ commit, dispatch, state },payload){
    let slang = payload &&  payload.lang  ? payload.lang : "ar"
    let group = payload &&  payload.group  ? payload.group : null
    let sort = payload &&  payload.sort  ? [payload.sort] : ["id,DESC"]

    let  params = {
      limit: 100,
      lang: slang,
      filter: { status: ["=",1] }, 
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

}
export default {
    state,
    mutations,
    actions
}