import Vue from "vue"
import moment from "moment"

Vue.filter("date", (dateX,format="DD MMM YYYY") => {
    return moment(dateX).format(format)
})

Vue.filter("onlyDay", (dateX) => {
    return moment(dateX).format("DD")
})
Vue.filter("onlyMonthName", (dateX) => {
    return moment(dateX).format("MMM")
})
Vue.filter("formatTime", (dateX) => {
    let d = dateX / 60;
    let m = Math.floor(d);
    let s = dateX - m*60;
    m=m<10 ? '0'+m : m ;
    s=s<10 ? '0'+s : s ;
    return m+':'+s;
})
Vue.filter("minuteDuration", (d) => {
    let h = d ? Math.floor(d / 60) : 0;
    let m = d ? d  % 60  : 0; 

    let r = '';
    r += h ? h+' h.' : ''
    r += m ? m+' m.' : ''

    return r
})
