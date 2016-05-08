<template>
<div v-show="show">
    <slot></slot>
</div>
</template>
<script>
export default {
    props : {
        header : {
            type     : String,
            required : true
        },
        id: {
            type     : String
        }
    },
    data : function(){
        return {
            show : false
        }
    },
    events : {
        'materialize-tab-select' : function (id){
            if(this.id == id) return this.select();
            this.show = false;
        }
    },
    ready : function(){
        
    },
    methods : {
        select : function(){
            this.show = true
        }
    }
}
</script>