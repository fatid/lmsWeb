import Vue from "vue"
import moment from "moment"

Vue.filter("date", (dateX) => {
    return moment(dateX).format("DD MMM YYYY")
})
Vue.filter("onlyDay", (dateX) => {
    return moment(dateX).format("DD")
})
Vue.filter("onlyMonthName", (dateX) => {
    return moment(dateX).format("MMM")
})
Vue.filter("minuteDuration", (d) => {
    let h = d ? Math.floor(d / 60) : 0;
    let m = d ? d  % 60  : 0; 

    let r = '';
    r += h ? h+' h.' : ''
    r += m ? m+' m.' : ''

    return r
})
