import axios from 'axios' 
const Cookies =   require('js-cookie')
import { encode, decode } from 'js-base64';
import moment from 'moment';

const state = () => ({
    courses: [],
    categories:{},
    activeCourse:{},
    orders:[],
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
     setOrders(state, payload){
        state.orders = payload
    },
}
const actions = {

    async setCourseOrder({ commit, dispatch, state,rootState },payload){
        let corder_date=moment().format("YYYY-MM-DD")
        let slang = payload &&  payload.lang  ? payload.lang : "ar";
        let user = rootState.user.auth;
        let sendobj = {
            corder_course:payload.id,
            corder_user:user.id,
            corder_end:null,
            corder_date:corder_date,
            status:1,
            pdb_status:1,
            lang:'NONE',
            id:null
        }
        let found = state.orders ? state.orders.find(a=> a.corder_course==payload.id) : [];
        let method="post";
        let url =process.env.baseURL+'Course_Order';
        if(found && found.id){
            sendobj.id=found.id;
            method="patch";
            url=url+"/"+found.id; 
        }
        await axios({
            url,
            method,
            data: { 
                ...sendobj 
            }
        })
          .then(response => { 
              if(response.data.status == 'success'){
                //console.log(response.status); 
                dispatch('getCourseOrders',{})
                let sended ={};
                 sended.name = sendobj.name  
                 sended.title= "Congratulations" 
                 sended.status= true,
                 sended.show= true,
                 sended.text="Kaydınız başarıyla alındı. Teşekkürler" 
                 commit("setForm", { v: sended,  callback: resolve  })
                 return sended;
              }
          })
          .catch(err => {
             console.log("Error:"+err);
             commit("setForm", { v: sended,  callback: resolve  })
          });
    },
    async getCourseOrders({ commit, dispatch, state , rootState},payload){
        let slang = payload &&  payload.lang  ? payload.lang : "ar";
        let user = rootState.user.auth;
        await axios({
        url: process.env.baseURL+'Course_Order',
        method: "get",
        params: {
          limit: 100,
          lang: slang,
          filter: { status: ["=",1],corder_user:["=",user.id]  },
          fields: "id,corder_course,corder_user,corder_end,corder_date",
          sort: ["corder_course,DESC"]
        }
      })
        .then(response => {
          commit('setOrders',response.data.formattedData);
        })
        .catch(e => {
          console.log("ERR", e);
        });
      },
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