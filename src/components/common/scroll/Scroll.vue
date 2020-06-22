<!-- 
    这里负责better-scroll滚动顺滑的封装
 -->

<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type:Number,
            default: 0,
        },
        pullUpLoad:{
            type:Boolean,
            default: false,
        }
    },
    data() {
        return {
            scroll: null,
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,//实时监测位置
            click: true,//click可以点击
            pullUpLoad: this.pullUpLoad//上拉加载更多

        })
        // 2.监听滚动的位置
        this.scroll.on('scroll',(position) => {
            // console.log(position);
            this.$emit('scroll', position)
            
        })
        
        // this.scroll.scrollTo(0,0)
        
        // 3.监听上拉加载更多
        this.scroll.on('pullingUp',() =>{
            // console.log('上拉');
            this.$emit('pullingUp')//把事件发出去
            
        })


    },
    methods: {
        scrollTo(x,y,time=1000) {//定义一个方法,滚动到哪里
            this.scroll.scrollTo(x,y,time)
        },

        finishPullUp(){
            //这个的scroll的finishPullUp方法,这个方法可以多次上拉请求数据
            this.scroll.finishPullUp()
        }
    },

}
</script>

<style scoped>

</style>