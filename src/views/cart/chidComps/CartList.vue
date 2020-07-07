<!-- 
    负责装载购物车中的商品
 -->
<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
          <cart-list-item
           v-for="(item,index) in cartList" :key="index"
           :item-info="item"
           />
      </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'//引入封装的better-scroll
import CartListItem from './CartListItem'//导入转载每一个小数据的子组件

import { mapGetters } from 'vuex'//vuex的方法mapGetters可以把getters中的转为计算属性

export default {
    name: 'CartList',
    components:{
        Scroll,//滚动的better-scroll
        CartListItem,//每一个小数据
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activated() {
        // console.log('购物车')
        this.$refs.scroll.refresh()
    },



}
</script>

<style scoped>
    .cart-list {
    /* 顶部导航44px，底部选项卡49px，底部汇总40px */
        height: calc(100% - 133px);
    }

    .content {
        height: 100%;
        overflow: hidden;
    }
</style>