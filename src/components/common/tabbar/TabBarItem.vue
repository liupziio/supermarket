<!--
iio
主要负责：tabbar导航栏中个别小的组件分布,
-->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name = "item-icon"></slot> <!-- 据名插槽img -->
    </div>
      <div v-else>
        <slot name = "item-icon-active"></slot>  <!-- 据名插槽活跃的img -->
      </div>
      <div :style="activeStyle" > <!-- 因为替换插槽时，插槽会彻底被替换，所以外边套一个div动态绑定class -->
        <slot name = "item-text"></slot>  <!-- 据名插槽text -->
      </div>
      </div>
</template>
<script>
export default {
  name:'TabBaritem',
  props:{//自定义属性
    path:String,//定义一个path类型为String
    activeColor:{//定义一个属性,来自定义颜色
      type:String,
      default:'red'
    }
  },
  data () {
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive(){//动态决定isActive活跃是true还是flase
      //'/home'.indexfo('/home') =>true
      //'/home'.indexfo('/cart') =>flase
      //'/home'.indexfo('/profile') =>flase
      //indexOf方法检索的字符串值没有出现，则该方法返回 -1。找到就不要返回-1
      //返回  在这个活跃的路由中找到this的path时候给我返回true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      //如果这个处于活跃，那么color===this.activeColor否则是一个默认的空的
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick(){//点击时这个路由的路径是这个的path
      this.$router.replace(this.path)
    }
  },
}
</script>

<style>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    /* line-height: 49px; */
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;/*去除掉图片下边自带的三个像素 */
    margin-bottom: 2px;
  }

  /* .active{
    color: red;
  } */
</style>