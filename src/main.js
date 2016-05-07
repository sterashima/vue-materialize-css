import Vue from "vue";
import tooltip from "../methods/tooltip.js"

window.onload = ()=>{
new Vue({
    el : '#main',
    methods : {
        tooltip : (event, message, pos, delay)=> {
            tooltip(event.target, message ,pos, delay)
        }
    }
})    
}
