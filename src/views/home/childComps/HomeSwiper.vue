<!-- 
  这里负责轮播图
 -->

<template>
     <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>  
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'//导入封装的轮播图组件，默认导出的是文件夹下的index.js

export default {
    name: "HomeSwiper",
    data() {
      return {
        isLoad: false,
      }
    },
    props: {//父子组件通信,
        banners: {//让这个banners等于父组件的banners
            type: Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem,

    },
    methods: {
      imageLoad(){
        if(!this.isLoad){//加上if判断isLoad取反，来控制发出自定义事件的次数，只需要一次即可
          // console.log('aaa');
          this.$emit('swiperImageLoad')//发出自定义事件
          this.isLoad = true //自定义事件发完，这个的isLoad直接设置成true,不再进入if语句
        }
        
        
      }
    },


}
</script>

<style scoped>

</style>