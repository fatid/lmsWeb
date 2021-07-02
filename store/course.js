import axios from 'axios' 
const Cookies =   require('js-cookie')
import { encode, decode } from 'js-base64';

const state = () => ({
    courses: [],
    categories:{},
    activeCourse:{},
    courseProcess:{
        last:{
            courseId:null,
            unitId:null,
            lessonId:null
        },
        data:{}
    }
});

const mutations= {
    setCategory(state, payload){
       state.categories = payload 
    },
    setCategory(state, payload){
        state.categories = payload 
     },
}
const actions = {
    getAllCourseProcess({state}, payload){

        let st = localStorage.getItem('courseProcess'); 
        if(st){
            st = JSON.parse(st);
            Object.assign(state.courseProcess,st)
        }
    },
    getCourseLast({state}, payload){
       let st = localStorage.getItem('courseProcess'); 
      
       if(st){
           st = JSON.parse(st) 
           Object.assign(state.courseProcess,st)
            
            if(st.data && payload.unit && st.data[payload.unit]){ 
                Object.assign(state.activeCourse,st.data[payload.unit])
            }else{ 
                Object.assign(state.activeCourse,
                    {
                        last:{
                            courseId:null,
                            unitId:payload.unit,
                            lessonId:payload.id
                        },
                        data:{}
                    })
            }
       }
    },

    // payload
    // counter, courseId, unitId, lessonId
   
    setCourseLast({state}, payload){
        let st =  {...state.courseProcess};
        if(st){
             if(!st.data || !st.data[payload.unitId]){
                let std = {
                    point:0,
                    last: payload.lessonId,
                    lessons:{}
                } 
                if(!st.data){
                    st.data = {}
                }
                st.data[payload.unitId] = {} 
             }
             st.data[payload.unitId].last=payload.lessonId;
             Object.assign(st.data[payload.unitId],payload.unitData);
 
             localStorage.setItem('courseProcess', JSON.stringify(st));   
             Object.assign(state.courseProcess,st)
        }
     },
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
                  fields:'cou_label_name,id,status,cou_label_link,cou_label_image,cou_label_color,cou_top_category',
                  
                 
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