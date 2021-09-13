import axios from 'axios'
const Cookies =   require('js-cookie')
import Vue from 'vue';
import Vuex from 'vuex'

const cookieparser = require('cookieparser')

const state = () => ({
    formId:'', 
    result: { 
        name:"Misafimiz",
        title:"Üzgünüz",
        text: "Masajınız alınırken bir sorunla karşılaştık.",
        status: false,
        show: false,
        form:'', 
    },
    results:{
        er_empty:null,
        er_false:null,
        er_time:null,
        er_true:null,
        er_total:null,
        show:false
    },
    examList:[],
    resultExam:{},
    finishedExam:{
        status:false,
        id:null
    },
    exam:{
        id:null,
        created_on:null
    },
    uf_exam:{
        id:null,
        created_on:null
    }
})

const getters = {
    
}

const mutations = { 
    setCurrentExam: (state,payload) => {
        state.exam = payload.v
        payload.callback(payload.v);
    } , 
    setCurrentListExams: (state,payload) => {
        state.examList = payload.v
        payload.callback(payload.v);
    } , 
    setUnfinihedExam: (state,payload) => {
        // console.log("payload.v",payload.v)
        state.uf_exam = payload.v 
    } , 
    setResults: (state,payload) => {
        // console.log("payload.v",payload.v)
        state.results = payload.v 
    } , 
    async restoreResult(state, payload) {
        Object.assign(state.result, payload);
      },
}

const actions = {

    async getExam({commit,state,rootState},id){

        await axios({
            url: process.env.baseURL+"ExamResults",
            method: "get",
            params: {
                limit: 1,
                lang: 'NONE',
                filter: { id: ["=",id], created_by: rootState.user.auth.id  },
                fields: "id,created_on,created_by,pdb_user,er_true,er_false,er_empty,er_total,er_List,er_time,created_by,er_user",
                sort: ["created_on,DESC"]
            } 
        }).then(response=>{
            let a = response.data.formattedData
            console.log("response.data",a)   
            commit("setCurrentExam", { v: a,  callback: resolve  })
        })

    },
    async getExamResults({commit,state,rootState},form){
        let filter = { 
            status:["=",1], 
            er_List: ["=",form.list], 
            created_by: ["=",rootState.user.auth.id]
        };
        await axios({
            url: process.env.baseURL+"ExamResults",
            method: "get",
            params: {
                limit: 1,
                lang: 'NONE',
                filter,
                fields: "id,created_on,created_by,pdb_user,er_true,er_false,er_empty,er_total,er_List,er_time,created_by,er_user",
                sort: ["created_on,DESC"]
            } 
        }).then(response=>{
            let a = response.data.formattedData 
            commit("setCurrentListExams", { v: a,  callback: resolve  })
        })

    },
    async getUnfinishedExam({commit,state,rootState},form){

        let filter = { 
            status:["=",2], 
            er_List: ["=",form.list], 
            created_by: ["=",rootState.user.auth.id]
        };
        await axios({
            url: process.env.baseURL+"ExamResults",
            method: "get",
            params: {
                limit: 1,
                lang: 'NONE',
                filter,
                fields: "id,created_on,created_by,pdb_user,er_true,er_false,er_empty,er_total,er_List,er_time,created_by,er_user",
                sort: ["created_on,DESC"]
            } 
        }).then(response=>{
            let a = response.data.formattedData ? response.data.formattedData[0] 
            :  {id:null}
            console.log("response.data",a)   
            commit("setUnfinihedExam", { v: a  })
        })

    },
    async   startExam({commit,state,rootState},{ form }){
 
        let sendobj = {
            er_true:0,
            status:2,
            er_false:0,
            er_empty:0,
            er_total:form.total,
            er_List:form.list,
            er_time:0,
            created_by: rootState.user.auth.id,
            er_user: rootState.user.auth.id
        };
       
        let sended={
          name:"",
          title:"Üzgünüz",
          text: "Sınav başlatılmadı. bir sorunla karşılaştık",
          status: false,
          show: false
       };

        return new Promise((resolve, reject) => {

            axios({
                url: process.env.baseURL+"ExamResults",
                method: "post",
                data: { 
                  ...sendobj 
                }
              })
                .then(response => { 
                    console.log("response.data startExam" ,response,response.data)     
                        if(response){
                            commit("setCurrentExam", { v: response.data,  callback: resolve  })
                            return response.data;
                        }
                })
                .catch(err => {
                   
                   commit("setCurrentExam", { v: {id:null},  callback: resolve  })
                });
             }); 
    },
    async cancelExam({commit,state,dispatch,rootState},{ form }){
 
        let sendobj = {
            id:form.id, 
            status:3
        };
        console.log("sendobj",sendobj)
        return new Promise((resolve, reject) => {
            axios({
                url: process.env.baseURL+"ExamResults/"+sendobj.id,
                method: "put",
                data: { 
                  ...sendobj 
                }
              })
                .then(response => {      
                 
                       commit("setCurrentExam", { v: 
                        {
                            id:null,
                            created_on:null
                        },  callback: resolve  })

                        dispatch("getUnfinishedExam",{list:form.list});
                       return sended;
                     
                })
                .catch(err => { 
                   commit("setCurrentExam", { v: {id:null},  callback: resolve  })
                });
        }); 
   
    },
    async   finishExam({commit,state,rootState},{ form }){
 

        console.log("form",form)
        // let sendobj = {
        //     id:form.id,
        //     er_true:form.true,
        //     er_false:form.false,
        //     er_empty:form.empty,
        //     er_total:form.total,
        //     er_List:form.list,
        //     er_time:0,
        //     status:1
        // };
        let sendobj = {
            list:form.list,
            exam:form.exam.id,
            results:form.results,
            // er_true:form.true,
            // er_false:form.false,
            // er_empty:form.empty,
            // er_total:form.total,
            // er_List:form.list,
            er_time:0,
            status:1
        };

        let r = form.results;
       
        let sended={
          name:"",
          title:"Üzgünüz",
          text: "Sınav başlatılmadı. bir sorunla karşılaştık",
          status: false,
          show: false
       }; 

       console.log("sended",sendobj);
       return new Promise((resolve, reject) => {

            axios({
                url: process.env.baseURL+"saveExam/"+form.exam.id,
                method: "put",
                data: { 
                  ...sendobj 
                } 
            }).then(response => { 
            
                    // store.state.finishedExam = {status: true,id:form.exam.id }
                    commit("setCurrentExam", { v: {
                                        id:null,
                                        created_on:null
                                    },  callback: resolve  })
                                       commit("setResults", { v: {show:true, ...sendobj},  callback: resolve  })
                                 
            
            }).catch(err => {
                       
                       commit("setCurrentExam", { v: {id:null},  callback: resolve  })
            });
        }); 
        // return new Promise((resolve, reject) => {

        //     axios({
        //         url: process.env.baseURL+"ExamResults/"+form.id,
        //         method: "put",
        //         data: { 
        //           ...sendobj 
        //         }
        //       })
        //         .then(response => { 
                   
        //                commit("setCurrentExam", { v: {
        //                 id:null,
        //                 created_on:null
        //             },  callback: resolve  })
        //                commit("setResults", { v: {show:true, ...sendobj},  callback: resolve  })
        //                return response.data;
                     
        //         })
        //         .catch(err => {
                   
        //            commit("setCurrentExam", { v: {id:null},  callback: resolve  })
        //         });
        //      }); 
    },
    
}

export default {
    state,
    getters,
    mutations,
    actions
}