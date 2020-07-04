<!-- 
    这里负责选项卡
 -->

<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" 
        class="tab-control-item" 
        :class="{active:index === currentIndex}"
        @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
  
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            currentIndex:0,//这里为了来处理点击时添加上active的class
        }
    },
    methods: {
        itemclick(index) {//这个方法获取到点击当前这个index等于currentIndex来添加上active
            this.currentIndex = index;
            this.$emit('tabClick',index);//子组件给父组件传出自定义事件
        }
    },
}
</script>

<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item {
        flex: 1;
    }
    .tab-control-item span {
        padding: 5px;
    }

    .active {
        color: var(--color-high-text);
    }

    .active span{
        border-bottom: 2px solid var(--color-high-text);
    }

</style>