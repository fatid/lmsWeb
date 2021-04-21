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
    token:'',
    auth:{}
})

const getters = {
    getForm: (state) => {
        return state.result
    },
    
}

const mutations = { 
    setForm: (state,payload) => {
        state.result = payload.v
        payload.callback(payload.v);
    } , 
    async restoreResult(state, payload) {
        Object.assign(state.result, payload);
      },
}

const actions = {
      documentSubmit({commit,state},{ form,pageData}){

        let sendobj = form;
        sendobj.rs_FullText = sendobj.rs_FullText ? 'on' :'';
        let sended={
          name:"",
          title:"Üzgünüz",
          text: "Masajınız alınırken bir sorunla karşılaştık",
          status: false,
          show: false
       };

        return new Promise((resolve, reject) => {

            axios({
                url: process.env.baseURL+"ReMain",
                method: "post",
                data: { 
                  ...sendobj 
                }
              })
                .then(response => { 
                    if(response.data.status == 'success'){
                      //console.log(response.status); 
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
             }); 
    },
    postData({commit,state},{ form,model,pageData}){

        let sendobj = form;
        let sended={
          name:"",
          title:"Üzgünüz",
          text: "Masajınız alınırken bir sorunla karşılaştık",
          status: false,
          show: false
       };

        return new Promise((resolve, reject) => {

            axios({
                url: process.env.baseURL+model,
                method: "post",
                data: { 
                  ...sendobj 
                }
              })
                .then(response => { 
                    if(response.data.status == 'success'){
                      //console.log(response.status); 
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
             }); 
    },
  
    expertSubmit({commit,state},{ form,pageData}){

        let sendobj = form;
        let sended={
          name:"",
          title:"Üzgünüz",
          text: "Masajınız alınırken bir sorunla karşılaştık",
          status: false,
          show: false
       };

        return new Promise((resolve, reject) => {

            axios({
                url: process.env.baseURL+"Uzman",
                method: "post",
                data: { 
                  ...sendobj 
                }
              })
                .then(response => { 
                    if(response.data.status == 'success'){
                      //console.log(response.status); 
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
             }); 
    },
    submitComment({commit,state},{ form,pageData}){

      let sendobj = {...form}
      sendobj.mainid= pageData.id
      sendobj.maingrup= 'AllYorumlar'
      let sended={
          name:"",
          title:"Üzgünüz",
          text: "Masajınız alınırken bir sorunla karşılaştık.",
          status: false,
          show: false
       }
       return new Promise((resolve, reject) => {

        axios({
          url: process.env.baseURL+"AllYorumlar",
          method: "post",
          data: { 
            ...sendobj 
          }
        })
          .then(response => {
              console.log(response);
              if(response.data.status === 'success'){
                //console.log(response.status); 
                 sended.name = sendobj.name  
                 sended.title= "Congratulations" 
                 sended.status= true,
                 sended.show= true,
                 sended.text="Masajınız başarıyla alındı. Teşekkürler" 
                 commit("setForm", { v: sended,  callback: resolve  })
                 return sended;
              }
          })
          .catch(err => {
             console.log("Error:"+err);
             commit("setForm", { v: sended,  callback: resolve  })
          });
       });
    },
    formSubmit({commit,state},{ form,pageData}){
        //let pageData =  state.pages.pageData
        let sendobj = {}
        let sended={
            name:"",
            title:"Üzgünüz",
            text: "Masajınız alınırken bir sorunla karşılaştık.",
            status: false,
            show: false
         }
         return new Promise((resolve, reject) => {
     
      form.name ? sendobj.name = form.name : sendobj.name = "Noname";
      form.surname ? sendobj.surname = form.surname: sendobj.surname = ""; 
      if (form.mobile) { sendobj.mobile = form.mobile;      } else {    sendobj.mobile = "";    }
      if (form.phone) {  sendobj.phone = form.phone;        } else {    sendobj.phone = "";     }
      if (form.mail) {  sendobj.mail = form.mail;           } else {    sendobj.mail = "";     }
      if (form.message) {  sendobj.message = form.message;  } else {    sendobj.message = "";  }
      if (form.subject) {  sendobj.subject = form.subject;  } else {    sendobj.subject = pageData.SA_Baslik;  }
      sendobj.page = pageData.SA_Baslik;
      sendobj.path =  window.location.pathname;
      sendobj.notificationType = "1";
      if (form.category) {   sendobj.category = form.category; }else{  sendobj.category = "FRM_General"; }
      if (form.fv && form.fn) {
        for (var key in form.fv ) {
            sendobj.message += '<br />'+form.fn[key] +':'+form.fv[key]+","
        }
      }
      
      //console.log("Mesaj: "+sendobj.message);
      sendobj.status = "Not_Active"; 
      //console.log(sendobj);
      axios({
        url: process.env.baseURL+"notes",
        method: "post",
        data: { 
          ...sendobj 
        }
      })
        .then(response => {
            console.log(response);
            if(response.data.status === 'success'){
              //console.log(response.status); 
               sended.name = sendobj.name  
               sended.title= "Congratulations" 
               sended.status= true,
               sended.show= true,
               sended.name= 'contact',
               sended.text="Masajınız başarıyla alındı. Teşekkürler" 
               commit("setForm", { v: sended,  callback: resolve  })
               return sended;
            }
        })
        .catch(err => {
           console.log("Error:"+err);
           commit("setForm", { v: sended,  callback: resolve  })
        });
     });
         
    } 

}

export default {
    state,
    getters,
    mutations,
    actions
}