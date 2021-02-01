import axios from 'axios'
import {KurumsalSayfalar} from '@/transformers/KurumsalSayfalar'

const state = () => ({
  pageData: [],
  BreadCrumb: [],
  Similar: [],
  SubPages: [],
  Pages: [],
  categoryLinkPath: ''
})

const getters = {
  getPageData() {
    return state.pageData;
  },
  getBreadcrumb() {
    return state.BreadCrumb;
  },
  getSimilar() {
    
    return state.Similar;
  },
  getSubPages() {
    return state.SubPages;
  },
  getPages() {
    return state.Pages;
  }
}

const mutations = {

  async setValues(state, payload) {
    state.pageData = payload;
  },

  async setBreadcrumb(state, payload) {
    state.BreadCrumb = payload.v;
    payload.callback(payload.v);
  },
  setSimilar(state, payload) {
    console.log("in setSimila " + payload);
    state.Similar = payload.v;
    payload.callback(payload.v);
  },
  setSubPages(state, payload) {
    state.SubPages = payload.v;
    payload.callback(payload.v);
  },
  setPages(state, payload) {
    state.Pages = payload.v;
    payload.callback(payload.v);
  },
  setcategoryLinkPath(state, payload) {
    state.categoryLinkPath = payload;
  }

}

const actions = {

  async searchCounter({ commit, dispatch, state }, payload) {

    let key = payload.key; 
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL+"custom/searchCounter",
        method: 'put',
        data: { 
            key: key, 
        }  
      }).then(response => {

      })
    })
  },
  async setNewVisit({ commit, dispatch, state }, payload) {

    let currentUrl = payload.url;
    let pageId = payload.pageId;
    let slang = payload.lang;
    let contentId = payload.contentId;
    let visited = process.client ? window.localStorage.getItem("visited") : '[]';
    let list = []
    if(visited && visited.charAt(0)=="["){
        list = JSON.parse(visited);
    }

    if(list.find(k=> k.contentId==contentId)){
      // console.log("Visited before")
    }else{
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL+"custom/setNewVisit",
        method: 'put',
        data: {
            pageId: pageId,
            contentId: contentId,
            url: currentUrl,
            lang:slang  
        }  
      }).then(response => {

        list.push({
          pageId: pageId,
          contentId: contentId,
          url: currentUrl,
          lang:slang,
          date:Date.now()
        })
        // localStorage.setItem("visited", JSON.stringify(list));
      })
    })
    }
  },
  async getPageInfo({ commit, dispatch, state }, payload) {
  //  console.log("here we are getPageInfo")
     let currentUrl = ""
     let slang = ""
     let mainUrl="";
     let donen = {SA_Tag:"",SA_Title:"404",SA_Description:"404",SA_Keywords:"404",SA_Baslik:"404",SA_UstSayfa:"",SA_Fotograf:"",SA_Yazilar:"",created_on:"",created_by:"",id:"0",status:"1"}
      
     
     if (typeof (payload.url) == "undefined" && process.client) {
      currentUrl = window.location.pathname;  
      mainUrl = window.location.pathname;
    } else { 
      mainUrl = payload.url;
      currentUrl = payload.url;
      slang = payload.lang;
    }
   
    while (currentUrl.charAt(0) === '/') { currentUrl = currentUrl.substr(1); }
      currentUrl = currentUrl.split("/");
      slang = currentUrl[0];
      let total = currentUrl.length;
      currentUrl = currentUrl[total - 1];

 
     if(currentUrl==""){  currentUrl="home"; }else
     if(currentUrl=="/"){  currentUrl="home"; }

     //console.log({
     //   limit: '1',
     //   lang:slang,
     //   filter:{'SA_Link':['=',currentUrl]},
     //   fields:'SA_Tag,SA_Title,SA_Description,SA_Keywords,SA_Baslik,SA_UstSayfa,SA_Fotograf,SA_Yazilar,created_on,created_by,id,status',
     //   sort:['sort,DESC', 'created_on,ASC']
     // })

     
      await axios({
        url: process.env.baseURL+"all_links",
        method: 'get',
        params: {
            limit: '1',
            lang:slang,
            filter:{'wa_full_path':['=',currentUrl],'wa_lang':['=',slang]}, 
            fields:'wa_full_path,wa_content_id,wa_MainGroup,wa_sayfa_Id,wa_sayfa_Id.SA_Tag,wa_sayfa_Id.SA_Galeri,wa_sayfa_Id.SA_Title,wa_sayfa_Id.SA_Description,wa_sayfa_Id.SA_Keywords,wa_sayfa_Id.SA_Baslik,wa_sayfa_Id.SA_UstSayfa,wa_sayfa_Id.SA_Fotograf,wa_sayfa_Id.SA_Yazilar,wa_sayfa_Id.created_on,wa_sayfa_Id.updated_on,wa_sayfa_Id.created_by,wa_sayfa_Id.id,wa_sayfa_Id.status,wa_sayfa_Id.SA_UstSayfa',
            sort:['wa_sayfa_Id,ASC']
        }  
      }).then(async response => {
            donen = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData[0]:  donen;
            donen = await KurumsalSayfalar.fetch(donen)
            commit("setValues", donen)
            // resolve(donen); 
        return donen


      }).catch(e => {
        // console.log(e)
        commit("setValues", donen)
        return donen
      })
      
  },

  getRelatedPages({ commit, getters, state }, payload) {

    let exclude = "";
    let limit = 10;
    let offset = 0;
    let pageId = ""
    let slang = "tr"
    return new Promise((resolve, reject) => {
    if (typeof (state.pageData.id) == "undefined") {

    } else {

      exclude = state.pageData.id;
      if (payload.limit != "undefined" && !isNaN(parseFloat(payload.limit)) && isFinite(payload.limit)) { limit = payload.limit; }
      if (payload.offset != "undefined" && !isNaN(parseFloat(payload.offset)) && isFinite(payload.offset)) { offset = payload.offset; }
      if (payload.show == "similar" && payload.topId && payload.topId != "") {
        pageId = payload.topId;
        slang = payload.lang;
      }else
      if (payload.show == "similar" && state.pageData.SA_UstSayfa != "") {
        pageId = state.pageData.SA_UstSayfa;
        slang = payload.lang;
      } else {  // showSub
        pageId = state.pageData.id;
        slang =  payload.lang;
      } 
      // let donen = { wa_pagetitle: "404 Hata Sayfası", wa_title: "404", wa_description: "404 HAtası", wa_keywords: "404 hata sayfası", wa_content_id: "", wa_lang: "" }
      // console.log(pageId + " / BURADAYIZ / " + slang + " / " + limit + " / " + offset + " / " + exclude);
      
      axios({
        url: process.env.baseURL+"KurumsalSayfalar",
        method: 'get',
        params: {
            limit,
            lang:slang,
            // filter:{'SA_UstSayfa':['=',pageId],'pdb_language':['=',slang]},
            filter:{SA_UstSayfa:[{'SA_UstSayfa':['=',pageId]},{'SA_SubCategory':['LIKE',pageId]}],'pdb_language':['=',slang],"status":['=',1]},
            fields:'SA_Title,SA_Description,SA_Keywords,SA_Baslik,id,status,SA_Link',
            sort:['sort,DESC', 'created_on,ASC']
        }  
      })
      .then(response => {
        // console.log("response",response.data.formattedData);

       
        let donen = response.data && response.data.formattedData  ? response.data.formattedData:  [];
        // donen = KurumsalSayfalar.fetchCollection(donen) 
        // commit("setValues", donen)
      
        console.log("similar",donen,response);
        if (payload.show == "similar") {
          commit("setSimilar", {v:donen, callback: resolve})
        } else {
          commit("setSubPages", {v:donen, callback: resolve})
        }     
        resolve(donen);  

      }).catch(e => {

      })
    }
  });

  },

  getPagesFromTags({ commit, getters, state }, payload) {

    let tag = payload.tag;
    let limit = 10;
    let offset = 0;
    let slang = "tr"

    return new Promise((resolve, reject) => {

    // , limit: ` + limit + `, offset: ` + offset + `
    // let donen = { wa_pagetitle: "404 Hata Sayfası", wa_title: "404", wa_description: "404 HAtası", wa_keywords: "404 hata sayfası", wa_content_id: "", wa_lang: "" }
    // console.log(pageId + " / BURADAYIZ / " + slang + " / " + limit + " / " + offset + " / " + exclude);
    axios({
      url: process.env.baseURL+"/graphql/direct",
      method: 'post',
      data: {
        query: `
                 {
                  pageDetails(tag: "`+ tag + `", wa_lang: "` + slang + `") { 
                      pdb_language 
                      SA_Yazilar
                      SA_Fotograf
                      SA_Baslik
                      SA_Subtitle
                      pdb_categories
                      SA_UstSayfa
                      SA_Link
                    }
                  } 
                `
      }
    }).then(response => {

      if (response.data.data.pageDetails[0]) {
        let donen = response.data.data.pageDetails

        commit("setPages", {v:donen,callback:resolve})

      }
    }).catch(e => {

    })

  });
  },

  async BreadCrumMaker({ commit, state }, payload) {

    let topPage = payload.topPage;
    let slang = payload.lang;
    let db = payload.db;
    let callback = payload.callback
 
    let donen = {};

    await axios({
      url: process.env.baseURL+"/graphql/direct",
      method: 'post',
      data: {
        query: `
             {
              pageDetails(topPages: "`+ topPage + `", pdb_language: "` + slang + `", pdb_status:1,db: "` + db + `") { 
                SA_Baslik
                SA_Link 
              }
            }`
      }
    }).then(response => {
      
      if (response.data.data.pageDetails) { donen = response.data.data.pageDetails }
      commit("setBreadcrumb", {v:donen,callback})

    }).catch(e => {
      console.log(e)
    });
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
