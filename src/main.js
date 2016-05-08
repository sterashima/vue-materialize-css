import Vue from "vue";
import tooltip from "../methods/tooltip.js"
import tabs    from "../components/tabs.vue"
import tab     from "../components/tab.vue"

window.onload = ()=>{
new Vue({
    el : '#main',
    methods : {
        tooltip
    },
    components : {
        tabs,
        tab
    }
    
})
}
