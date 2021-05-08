import axios from 'axios'
const Cookies =   require('js-cookie')
import Vue from 'vue';
import Vuex from 'vuex'

const cookieparser = require('cookieparser')

const state = () => ({
    uId:'',
    auth:{},
    uDetail: {},
    signupSuccess:false
})

const getters = {
    getUser: (state) => {
        return state.uDetail
    },
    getAuth: (state) => {
        return state.auth
    } 
}

const mutations = {

    setUser: (state,payload) => {
        state.uDetail = payload.v
    },
  
    setAuth: (state, payload) => {
        state.auth = payload.v
        payload.callback(payload.v);
    },
    removeAuth: (state, payload) => {
        state.auth = {} 
        if(payload.c){   payload.c(payload.v);   }
    },
}

const actions = {
    async findAuth({ commit,router },{ headers }){
   
        let a = localStorage.getItem('auth'); 
        console.log("a",a)

        let auth = {};
        // let auth = headers ? cookieparser.parse(headers) :{};
        
        return new Promise((resolve, reject) => {
       
            if (auth || a) { 
                auth = auth && auth.token ? auth : a;    
                try { 
                    console.log("2",auth,a);
                    auth = JSON.parse(auth)
                    commit('setAuth', { v: auth, callback: resolve });
                } catch (err) { 
                    this.$router.push("/login");
                    console.log("3");
                    localStorage.getItem('removeAuth',{v:"",c:resolve})
                    
                }
            } else {
                console.log("4");
                localStorage.getItem('removeAuth',{v:"",c:resolve}) 
                auth.token = ''; 
            } 

        });

        //     let a = localStorage.getItem('auth');
        //     let auth={}
        //     if (a) { 
        //         auth =  a;
        //     try { 
        //         auth = JSON.parse(auth)
        //     } catch (err) {
        //         console.log("hata")
        //     }
        //     }else{
        //         auth.token = '';
                
        //     }
        //     console.log("auth inside ",auth)

        //    commit('setAuth',  {v: auth})
           
        //     return auth;
    },
    formSignUp({commit,state},{ form,pageData}){
        console.log("uye girişi")
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
                url: process.env.baseURL+"uye",
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
                       commit("form/setForm", { v: sended,  callback: resolve} , {root: true })
                       state.signupSuccess = true
                       return sended;
                    }
                })
                .catch(err => {
                   console.log("Error:"+err);
                   commit("form/setForm", { v: sended,  callback: resolve } , {root: true })
                });
             }); 
    },
    
    logout({commit,state,dispatch,rootState},{ form}){

        localStorage.setItem('auth', JSON.stringify({})); 
        Cookies.set('auth', JSON.stringify({})); 
        dispatch("getLikes", {} , {root: true })
        console.log("local",rootState.locale)

        // burada middleware auth üzerinden cookie req auth ile geldiği için state güncellenesede orası görmüyor. 
        // o nedenle reload ettiriyoruz.
        window.location.href = `/${rootState.locale}/form/login`
    },
    login({commit,state,dispatch,rootState},{ form,pageData}){

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
                url: process.env.baseURL+"uye",
                method: "get",
                params: {
                  limit: 1,
                  lang: 'NONE',
                  filter: { U_mail: ["=",sendobj.email], U_Password: ["=",sendobj.password] },
                  fields: "U_mail,U_rname,U_surname,id,U_Status,U_likedPages",
                  sort: ["created_on,DESC"]
                } 
              })
                .then(response => {  
                    if(response.statusText == 'OK'){
                      let token = response.data.token;
                      commit("setAuth", { v: token, callback: resolve})
                      let a = response.data.formattedData[0]; 
                      console.log("localStorage",token,response,a);
                      if (token) { 
                            let authData=JSON.stringify({token,U_mail: a.U_mail,id:a.id,name:a.U_rname,surname:a.U_surname,fullName:`${a.U_rname} ${a.U_surname}`});
                            localStorage.setItem('auth', authData);
                            Cookies.set('auth', authData); 
                        }
                        state.token = token; 

                      //console.log(response.status); 
                       sended.name = `${a.U_rname} ${a.U_surname}`  
                       sended.title= "Welcome " + sended.name
                       sended.status= true,
                       sended.show= true,
                       sended.text="Kaydınız başarıyla alındı. Teşekkürler" 
                       commit("form/setForm", { v: sended,  callback: resolve} , {root: true })
                       dispatch("getLikes", {} , {root: true })
                    //    this.$router.push('/'+rootState.locale+"/account/dashboard");
            

                       window.location.href = `/${rootState.locale}/home`
                       return sended;
                    }
                })
                .catch(err => {
                   console.log("Error:"+err);
                   commit("form/setForm", { v: sended,  callback: resolve  }, {root: true })
                });
             }); 
    },

}

export default {
    state,
    getters,
    mutations,
    actions
}