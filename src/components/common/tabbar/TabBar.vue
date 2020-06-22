<!--
iio
主要负责：tabbar导航栏总体
-->

<template>
    <div id="tab-bar">
      <slot></slot><!-- 设置一个插槽 -->
     
    </div>
   
</template>

<script>
export default {
    name:'TabBar',

}
</script>

<style>
  #tab-bar{
    display:flex;
    background-color: #f6f6f6;
    position: fixed;/*移动到底部 */
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  }


</style>