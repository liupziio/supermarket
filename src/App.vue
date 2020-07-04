<template>
  <div id="app">
    <!-- keep-alive保持状态 exclude排除-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
    name: 'app',
    components:{
      MainTabBar,
    }
}
</script>


<style scoped>
  @import "assets/css/base.css";
</style>
