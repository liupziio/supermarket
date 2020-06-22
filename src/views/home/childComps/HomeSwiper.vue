<!-- 
  这里负责轮播图
 -->

<template>
     <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </swiper-item>
      </swiper>  
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'//导入封装的轮播图组件，默认导出的是文件夹下的index.js

export default {
    name: "HomeSwiper",
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

    }

}
</script>

<style>

</style>