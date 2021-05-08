import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import * as mutations from './mutations/index'
//import * as getters from './getters'
// import * as actions from './actions'
import pages from './pages'
import comments from './comments'
import pageDetail from './pageDetail'
import research from './research'
import user from './user' 
import form from './form'
import core from './core'
import poll from './poll'
import expert from './expert'
import course from './course'
// import note from './note'
Vue.use(Vuex); 

export const state = () => ({
    locales: ['ar','tr', 'en'],
    locale: 'en',
    customClass: {flexRow:'flex-row',dir:'ltr',float:'pull-left'},
    isMobile: false,
    isErrorReportVisible: false,
    langFile:{},
    likes:[]
});

const checkIfMobile = (context) => {
  
    const userAgent = context.isServer ? context.req.headers['user-agent'] : '';
    //navigator.userAgent 
    let mobile = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) mobile = true;
    })(userAgent)
   
    return mobile
}

export const getters={ 
    isMobile(state) { 
        return state.isMobile;
    },
    getLikes(state){
        return  state.likes;
    }
}

export const mutations= {
    setLike(state, item){
        state.likes=[];
        if(item && item[0] && typeof item[0]=="object"){
            item.forEach(element => {
            state.likes.push(element) 
            });
        }
    },
    pushLike(state, item) { 
        state.likes.push(item)
    },
    changeMobile(state, isMobile) { 
       state.isMobile = isMobile 
    },
    setLangFile(state, payload) { 
       state.langFile = payload 
    },
    setLocale(state, payload) {
       state.locale = payload
    },
    setCustomClass(state, payload) {
        let customClass = {}
        customClass.flexRow = payload == 'ar' ? 'flex-row-reverse' : 'flex-row'
        customClass.dir = payload == 'ar' ? 'dirRight' : 'dirLeft'
        customClass.textDir = payload == 'ar' ? 'text-right' : 'text-left'
        customClass.float = payload == 'ar' ? 'pull-right' : 'pull-left'
       state.customClass = customClass
    }
}

export const actions = { 
    changeDevice({ commit }, context) { 
        commit('changeMobile', checkIfMobile(context))
    },

    async setLikes({commit,state,rootState},item){

        console.log("likes",state.likes,item)
        if(item && item.id && state.likes.find(k=>k.id==item.id)){
        }else{
            commit("pushLike",item)
        
            let t = JSON.stringify(state.likes);
            
            if(rootState.user.auth && rootState.user.auth.id){
                await axios({
                  url: process.env.baseURL+"uye/"+rootState.user.auth.id,
                  method: "put",
                  data: { 
                      U_likedPages:t
                  }
                }).then(response => { 

                  console.log("res",response)
                });
          }else{
            window.localStorage.setItem("likes", t);
          }
           
            
        }
    }, 
    async setLikesFirst({commit ,state,rootState},item){

        console.log("item",item)
        if (item && item.trim().charAt(0) == "[") {  
            let p = JSON.parse(item)  
            commit("setLike",p)
          
            if(rootState.user.auth && rootState.user.auth.id){
               
                  await axios({
                    url: process.env.baseURL+"uye/"+rootState.user.auth.id,
                    method: "put",
                    data: { 
                        U_likedPages:item 
                    }
                  }).then(response => { 
                    console.log("res",response)
                  });
            }else{
                window.localStorage.setItem("likes", item);
            }
        }
    },
    async getLikes({state,dispatch,rootState},payload){
        console.log("we area here 999 ")

        if(rootState.user.auth && rootState.user.auth.id){
            console.log("we area here 1 id")
            try{

                         await axios({
                             url: process.env.baseURL+"uye",
                             method: "get",
                             params: {
                             limit: 1,
                             lang: 'NONE',
                             filter: { id: ["=",rootState.user.auth.id] },
                             fields: "U_likedPages",
                             sort: ["created_on,DESC"]
                             } 
                         }).then(response=>{
                             let a = response.data.formattedData[0]
                         
                             let likes = a.U_likedPages
                   
                             if(likes){
                                dispatch("setLikesFirst", likes); 
                            }
                         })
             }
             catch(err){
                 console.log("Err",err)
             }
        }else{ 
            console.log("we area here")
            let likes = window.localStorage.getItem("likes");
            if(likes){
                dispatch("setLikesFirst", likes); 
            }
        }
    },
}


export const store = new Vuex.Store({
    state,
    getters, 
    mutations,
    actions, 
    modules: {
            pages,
            comments,
            pageDetail,
            user,
            form,
            core,
            research,
            expert,
            poll,
            course
    }
});