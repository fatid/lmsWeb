import axios from 'axios' 
const Cookies =   require('js-cookie')
import { encode, decode } from 'js-base64';

const state = () => ({
    courses: [],
    categories:{}
});

const mutations= {
    setCategory(state, payload){
       state.categories = payload 
    }
}
const actions = {
    getCourseCategories({ commit, dispatch, state }, payload) {
        let slang = payload &&  payload.lang  ? payload.lang : "ar"
        return new Promise((resolve, reject) => {
            axios({
              url: process.env.baseURL+"co_labels",
              method: 'get',
              params: {
                  limit:2000,
                  offset:0,
                  lang:slang,
                  filter:{status:["=",1]},
                  fields:'cou_label_name,id,status,cou_label_link,cou_label_image,cou_label_color',
                  
                 
                  sort:['sort,DESC', 'created_on,ASC']
              }  
            }).then(response => {
                  let donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
                  commit("setCategory", donen)
                  resolve(donen); 
            }).catch(e => {
               console.log(e)
              })
            });
    
      }, 
}
export default {
    state,
    mutations,
    actions
}