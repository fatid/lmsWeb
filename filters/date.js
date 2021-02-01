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