import Vue from "vue" 

Vue.filter("max", (str,max=100) => {
    return str.substring(0, max);
})
 