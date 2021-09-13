import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import * as mutations from './mutations/index'
//import * as getters from './getters'
// import * as actions from './actions'
import pages from './pages'
import comments from './comments'
import pageDetail from './pageDetail'
import search from './search'
import user from './user' 
import form from './form'
import core from './core'
import poll from './poll'  
import exam from './exam'  
// import note from './note'
Vue.use(Vuex); 

export const state = () => ({
    locales: ['ar','tr', 'en'],
    locale: 'en',
    customClass: {flexRow:'flex-row',dir:'ltr',float:'pull-left'},
    isMobile: false, 
    isErrorReportVisible: false,
    langFile:{},
    likes:[],
    likeModal:{
        show: false,
        detail:{
            type:'',
            label:''
        }
    },
    listModal:{
        show: false,
        data:{ 
        }
    },
    suggestWord:{
        show: false,
        word:''
    },
    wordModal:{
        show: false,
        word:'',
        detail:{ 
        }
    }
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
            console.log("imte",item)
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

    async setLikes({commit,state,rootState},itemx){
        console.log("itemx.item",itemx.item)
        let itemAll =  itemx.item ? itemx.item.all? itemx.item.all : [itemx.item] : [];
        let list = itemx.list;

        let options = rootState.core.options ? rootState.core.options['uye_Lists'] : [];
        let uye_fav_type = options.find(k=> k.fav_list==list);
 
        let newList=[];
        if(state.likes.find(k=>k.list==list)){
            newList= state.likes.filter(k=>k.list==list)
        }
            itemAll.forEach(item=>{ 

                if(item && item.id && state.likes.find(k=>k.id==item.id && k.list==list)){
                    console.log("nopushLike",item)
                }else{
                    newList.push(item)
                    console.log("pushLike",newList)
                    commit("pushLike",{...item,list:list})  
                }       
            })
           if(newList){
              
            let t = JSON.stringify(newList); 
            let total = newList ? newList.length : 0;
            if(rootState.user.auth && rootState.user.auth.id){
              
                    await axios({
                            url: process.env.baseURL+"Favorites",
                            method: "get",
                            params: {
                            limit: 1,
                            lang: 'NONE',
                            filter: { fav_owner_user: ["=",rootState.user.auth.id],fav_list:["=",list] },
                            fields: "id,fav_content,fav_owner_user,fav_list,uye_fav_type,fav_total,pdb_user",
                            sort: ["created_on,DESC"]
                            } 
                    }).then(async response=>{ 
                        let fav_id = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData[0].id : null
                        
                        if(!fav_id){
                        await axios({
                            url: process.env.baseURL+"Favorites",
                            method: "post",
                            data: { 
                                fav_content:t,
                                fav_list:list,
                                status:1,
                                fav_total:total,
                                uye_fav_type: uye_fav_type ? uye_fav_type.uye_fav_type : '',
                                created_by: rootState.user.auth.id,
                                fav_owner_user: rootState.user.auth.id
                            }
                            }).then(response => {  
                                 rootState.search.selection = {
                                    selectionC:[],
                                    selectionW:[],
                                    selectionE:[],
                                 }
                            });
                        }else{
                                await axios({
                                        url: process.env.baseURL+"Favorites/"+fav_id,
                                        method: "put",
                                        data: { 
                                            fav_content:t,
                                            fav_list:list,
                                            status:1,
                                            fav_total:total,
                                            uye_fav_type: uye_fav_type ? uye_fav_type.uye_fav_type : '',
                                            created_by: rootState.user.auth.id,
                                            fav_owner_user: rootState.user.auth.id
                                        }
                                }).then(response => {
                                
                                    rootState.search.selection = {
                                        selectionC:[],
                                        selectionW:[],
                                        selectionE:[],
                                     }
                                
                                });
                        }
                    });
                
              
          }else{
            window.localStorage.setItem("likes", t);
          } 

        }
    }, 
    async removeLikes({commit,state,rootState},itemx){
        
        let items = itemx.items;
        let selected = itemx.selected;

        let list_item = state.likes.find(k=> k.id==selected.id); 
        let list = list_item ? list_item.list : ''; 
        let options = rootState.core.options ? rootState.core.options['uye_Lists'] : []; 
        let uye_fav_type = options.find(k=> k.id==list); 
        let new_list = state.likes.filter(l=>{
            return l.list==list && selected.id!=l.id
        });
        // console.log("state.likes",state.likes,list)
        // console.log("selected",selected)
        // console.log("new_list",new_list)
        commit("setLike",new_list)
        let t = JSON.stringify(new_list); 
            console.log("Favorites", list_item,selected)
            if(rootState.user.auth && rootState.user.auth.id){
                // await axios({
                //     url: process.env.baseURL+"Favorites",
                //     method: "get",
                //     params: {
                //     limit: 1,
                //     lang: 'NONE',
                //     filter: { fav_owner_user: ["=",rootState.user.auth.id],fav_list:["=",list] },
                //     fields: "fav_content,fav_owner_user,fav_list,uye_fav_type,pdb_user",
                //     sort: ["created_on,DESC"]
                //     } 
                // }).then(async response=>{ 
                    let fav_id = list_item.favoriteId;
                        await axios({
                        url: process.env.baseURL+"Favorites/"+fav_id,
                        method: "put",
                        data: {
                            fav_content:t
                        }
                        }).then(response => { 

                             
                        });
                        // });
             
          }else{
            window.localStorage.setItem("likes", t);
          } 
    }, 
    async setLikesFirst({commit ,state,rootState},item){

        // console.log("item",item)
        if (item && item.trim().charAt(0) == "[") {  
            let p = JSON.parse(item)  
            // commit("setLike",p)
          
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
    async getLikes({state,dispatch,commit,rootState},payload){ 
        if(rootState.user.auth && rootState.user.auth.id){
            try{ 
                await axios({
                    url: process.env.baseURL+"Favorites",
                    method: "get",
                    params: {
                    limit: 10,
                    lang: 'NONE',
                    filter: { fav_owner_user: ["=",rootState.user.auth.id] },
                    fields: "id,fav_content,fav_total,fav_owner_user,fav_list,uye_fav_type,pdb_user",
                    sort: ["created_on,DESC"]
                    } 
                }).then(response=>{
                    let a = response.data.formattedData
                    let likes=[]
                    // console.log("a",a)
                    a.forEach(k=>{
                        console.log("k")
                        let fav_content= JSON.parse(k.fav_content)
                        fav_content.forEach(f=>{
                            let item = {...f, list:k.fav_list,favoriteId:k.id}
                            likes.push(item)
                        });
                    }) 
                    console.log("likes",likes)
                    if(likes){
                       commit("setLike", likes); 
                   }
                })
             }
             catch(err){
                 console.log("Err",err)
             }
        }else{  
            let likes = window.localStorage.getItem("likes");
            if(likes){
                dispatch("setLikesFirst", likes); 
            }
        }
    },
}


export const store = new Vuex.Store({
    strict: false,
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
            search, 
            poll,
            exam 
    }
});