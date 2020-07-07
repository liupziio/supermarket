<!-- 
  负责购物车页
 -->
<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'//这里是封装的上边购物街导航栏(多用)
import CartList from './chidComps/CartList'//商品列表组件
import CartBottomBar from './chidComps/CartBottomBar'//底部汇总组件

import { mapGetters } from 'vuex'//vuex的方法mapGetters可以把getters中的转为计算属性

export default {
    name: "Cart",
    components:{
      NavBar,//导航组件
      CartList,//商品列表组件
      CartBottomBar,//底部汇总组件

    },
    computed: {
      //mapGetters的两种语法
    //  ...mapGetters(['cartLength','cartList'])
      ...mapGetters({//第二种方法,给一个key不一样的名字
        length: 'cartLength',
      })
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;

}

</style>
