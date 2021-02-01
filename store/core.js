import axios from 'axios'

const state = () => ({
    countries: [],
});

const mutations= {
    setCountries(state, payload){
       state.countries = payload 
    }
}
const actions = {

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