import axios from 'axios'


const state = () => ({
    _pageDetail: [],
    get pageDetail() {
        return this._pageDetail;
    },
    set pageDetail(value) {
        this._pageDetail.push(value);
    },
    merhaba: "0"
});

const getters = {
    getPage: ({state},payload) => {
        return state.pageDetail.payload
    },
    getSub: ({state}) => {
        return state ? state.pageDetail : ''
       
    }
}

const mutations = {

    async setPage(state, payload) { 
        state.pageDetail = payload.v
        payload.callback(payload.v);
    }
}

const actions = {
    async  getSubPagesContent({ commit, state }, payload) {

        let topContentId = payload.tcid;
        let  slang = payload.lang;
        let resultOn = payload.r;
        
        if(topContentId=="autoSimilar"){
            topContentId = state.pages.pageData.SA_UstSayfa; 
        }else if(topContentId=="autoSub"){
            topContentId = state.pageData.wa_sayfa_Id; 
        }

        return new Promise((resolve, reject) => {
        // console.log("id miz: "+topContentId);
         axios({
            url: process.env.baseURL+"/graphql/direct",
            method: 'post',
            data: {
                query: `
                 {
                    pageDetails(pdb_categories: "`+ topContentId + `", wa_lang: "` + slang + `") {
                        SA_Baslik 
                        SA_Link
                        SA_Fotograf 
                    }
                  }
                `
            }
        }).then(response => { 
            // console.log(response.data.data) 
            const donen={};
            donen[resultOn] = response.data.data.pageDetails
           //const donen = {resultOn:response.data.data.pageDetails }
            commit("setPage", {v: donen, callback: resolve})
        }).catch(e => {
               console.log(e) 
        })

    });
    },

}

export default {
    state,
    getters,
    mutations,
    actions
}