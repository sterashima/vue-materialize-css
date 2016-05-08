<style scoped>
.tabs {
    width : 100%;
}
</style>
<template>
<div>
    <ul class="tabs">
        <li @click="select(tab.id)" class="tab col" v-for="(index, tab) in $children">
            <a :class="{active : 'active == tab.id'}" href="javascript:void(0)">{{tab.header}}</a>
        </li>
        <div class="indicator"></div>
    </ul>

    <slot></slot>
</div>
</template>
<script>
export default {
    data : ()=> {
        return {
            active   : null,
            children : {},
            indicator: {
                left:  '0',
                right: '0'
            }
        }
    },
    methods : {
        select: function(id){
            this.$broadcast('materialize-tab-select', id)
            const target    = this.$el.querySelectorAll('li.tab')[this.children[id]]
            const parent    = target.parentElement;
            const indicator = this.$el.querySelector('.indicator')
            this.moveIndicator(
                this.indicator.left, target.offsetLeft,
                this.indicator.right, parent.offsetWidth - target.offsetLeft - target.offsetWidth
            );
        },
        getId : ()=>{
            return `vue-materialize-tab-${Math.floor( Math.random() * 10000000000 )}`;
        },
        moveIndicator :  function(left, newLeft, right, newRight) {
            const indicator = this.$el.querySelector('.indicator');
            if ((newLeft - left) >= 0) {
                Velocity(indicator, 
                    {right: newRight}, 
                    {duration: 300, queue: false, easing: 'easeOutQuad'}
                );
                Velocity(indicator, 
                    {left: newLeft}, 
                    {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90}
                );
            }
            else {
                Velocity(indicator, 
                    {left: newLeft}, 
                    {duration: 300, queue: false, easing: 'easeOutQuad'});
                Velocity(indicator, 
                    {right: newRight}, 
                    {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
            }
        }
    },
    ready : function(){
        this.$children.forEach((child,index)=>{
            child.id = child.id || this.getId();
            this.children[child.id] = index;
        });
        this.active = this.$children[0].id;
        this.select(this.$children[0].id)
        this.$broadcast('materialize-tab-select',this.$children[0].id);
    }
    
}
</script>