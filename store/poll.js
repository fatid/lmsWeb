import axios from 'axios' 
const Cookies =   require('js-cookie')
import { encode, decode } from 'js-base64';

const state = () => ({
    votes: [],
    voteResult:{}
});

const mutations= {
    setPollResult(state, payload){
       state.voteResult = payload 
    }
}
const actions = {

async saveVote({ commit, dispatch, state },payload){
    let vote = payload &&  payload.vote  ? payload.vote : null
    let question = payload &&  payload.question  ? payload.question : null
    let vt = window.localStorage.getItem("vt");
    let vtObj = vt ? decode(vt) : [];

    if(vote && question && vtObj && !vtObj.includes(question)){
         await axios({
            url: process.env.baseURL+'custom/setVote',
            method: "put",
            data: {
                vote,
                question,
            }
        })
            .then(response => { 
                if(response.data.status == 'success'){ 
                     commit("setPollResult", { result: "Successfuly voted!", status:'success'  });
                    
                     vtObj.push(question);
                     window.localStorage.setItem("vt",encode(vtObj));
                }else{
                    commit("setPollResult", { result: "The was a problem. Please try again !", status:'fail'   })  
                }
            })
            .catch(e => {
                console.log("ERR", e);
                commit("setPollResult", { result: "The was a problem. Please try again !", status:'fail'   })  
            });
    }else{
        commit("setPollResult", { result: "You've already voted!", status:'fail'  });
    }
},

}
export default {
    state,
    mutations,
    actions
}