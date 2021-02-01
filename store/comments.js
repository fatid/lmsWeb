import axios from 'axios'


const state = () => ({
  pageData: [],
  Average: [],
  AddComment:[],
  AllComments:[]
})

const getters = {

  getComments: (state) => {
    return state.AllComments
  },
  getAddedComment: (state) => {
    return state.AddComment
  },
  getAverage: (state) => {
    return state.Average
  }
}

const mutations = {
  setValues(state, payload) {
    //console.log(payload)
    state.AllComments = payload.v;
    payload.callback(payload.v);
  },
  setComment(state, payload) {
    //console.log(payload)
    state.AddComment = payload.v;
    payload.callback(payload.v);
  },
  setComments(state, payload) {
    state.AllComments = payload;
  },
  setAverage(state, payload) {
    //console.log(payload)
    state.Average = payload.v;
    payload.callback(payload.v);
  }
}

const actions = {
  postComment({ commit }, payload) {
    let sendobj = {}
    sendobj.name = payload.form.name ? payload.form.name : 'NoName';
    sendobj.surname = payload.form.surname ? payload.form.surname : 'NoName';
    sendobj.phone = payload.form.phone;
    sendobj.email = payload.form.email;
    sendobj.message = payload.form.message;
    sendobj.negative = payload.form.negative;
    sendobj.job = payload.form.job;
    sendobj.company = payload.form.company;
    sendobj.reply = payload.form.reply;
    sendobj.points1 = payload.form.points1 ? payload.form.points1 : 10;
    sendobj.points2 = payload.form.points2 ? payload.form.points2 : 0;
    sendobj.points3 = payload.form.points3 ? payload.form.points3 : 0;
    sendobj.points4 = payload.form.points4 ? payload.form.points4 : 0;
    sendobj.points5 = payload.form.points5 ? payload.form.points5 : 0;
    sendobj.points6 = payload.form.points6 ? payload.form.points6 : 0;
    sendobj.points7 = payload.form.points7 ? payload.form.points7 : 0;
    sendobj.points8 = payload.form.points8 ? payload.form.points8 : 0;
    sendobj.points9 = payload.form.points9 ? payload.form.points9 : 0;
    sendobj.db = payload.db ? payload.db : '1' 
    sendobj.mainId = payload.pageData.wa_content_id ? payload.form.wa_content_id : 0;
    sendobj.pageId = payload.pageData.wa_sayfa_Id ? payload.form.wa_sayfa_Id : 0;
    let sended = {
      name: "",
      title: "Üzgünüz",
      text: "Masajınız alınırken bir sorunla karşılaştık.",
      status: "false"
    }
    return new Promise((resolve, reject) => {

      axios({
        url: process.env.baseURL + "/graphql/direct",
        method: "post",
        data: {
          query:
            `mutation{ 
                postComment(
                      name:"` + sendobj.name + `",
                      surname: "` + sendobj.surname + `", 
                      phone: "` + sendobj.phone + `", 
                      email:"` + sendobj.email + `", 
                      job:"` + sendobj.job + `", 
                      company:"` + sendobj.company + `", 
                      db:"`+sendobj.db+`"
                      points1:"` + sendobj.points1 + `", 
                      points2:"` + sendobj.points2 + `", 
                      points3:"` + sendobj.points3 + `", 
                      points4:"` + sendobj.points4 + `", 
                      points5:"` + sendobj.points5 + `", 
                      points6:"` + sendobj.points6 + `", 
                      points7:"` + sendobj.points7 + `", 
                      points8:"` + sendobj.points8 + `", 
                      points9:"` + sendobj.points9 + `", 

                      message:"` + sendobj.message + `",
                      reply:"` + sendobj.reply + `", 
                      negative: "` + sendobj.negative + `", 
                      mainId:"` + sendobj.mainId + `", 
                      pageId: "` + sendobj.pageId + `", 
                  ){  pdb_Id }
          }
          `
        }
      })
        .then(response => {
          //console.log(response.status);
          if (response.status === 200) {
            //console.log(response.status); 
            sended.name = sendobj.name
            sended.title = "Congratulations"
            sended.status = "ok"
            sended.text = "Masajınız başarıyla alındı. Teşekkürler"
            commit("setComment", { v: sended, callback: resolve })
            return sended;
          }
        })
        .catch(err => {
          console.log("Error:" + err);
          commit("setComment", { v: sended, callback: resolve })
        });
    });
  },

  getAverage({ commit }, payload) {

    let limit = payload.limit ? payload.limit : 10;
    let db = payload.db ? payload.db : 1;
    let pid = payload.pid ? payload.pid : '';
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL + "/graphql/direct",
        method: 'post',
        data: {
          query: `
                 {
                  commentAvg(yhc_Main: "`+ pid + `",db: "` + db + `") {
                        yhc_pAvg
                        yhc_TotalCom
                        yhc_GroupId
                    }
                  }
                `
        }
      }).then(response => {
        //console.log(response)
        // console.log(response.data.data.page[0])
        const donen = response.data.data.commentAvg[0]

        commit("setAverage", { v: donen, callback: resolve })
        return donen;
      }).catch(e => {
        console.log(e)
      })
    });
  },
  getComments({ commit }, payload) {

    let limit = payload.limit ? payload.limit : 10;
    let db = payload.db ? payload.db : 1;
    let pid = payload.pid ? payload.pid : '';
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.baseURL + "/graphql/direct",
        method: 'post',
        data: {
          query: `
                 {
                    comments(yh_PageId: "`+ pid + `",db: "` + db + `" ,limit: ` + limit + `, pdb_status:1) {
                        yh_Name
                        yh_Surname
                        yh_Company
                        yh_job
                        yh_Icon
                        yh_Message
                        yh_NegativeComment
                        yh_PointsAvg
                    }
                  }
                `
        }
      }).then(response => {
        //console.log(response)
        // console.log(response.data.data.page[0])
        const donen = response.data.data.comments

        commit("setValues", { v: donen, callback: resolve })
        return donen;
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