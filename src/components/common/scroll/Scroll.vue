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
        probeType:{//这个需要等于3才会实时监听位置
            type:Number,
            default: 0,
        },
        pullUpLoad:{//为了上拉加载更多
            type:Boolean,
            default: false,
        },
    },
    data() {
        return {
            scroll: null,
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,//实时监测位置//probeType是0，1时是无效的
            click: true,//click可以点击
            pullUpLoad: this.pullUpLoad//上拉加载更多

        })

        // 2.监听滚动的位置
        if (this.probeType === 2 || this.probeType ===3){
            this.scroll.on('scroll',(position) => {
            // console.log(position);
            this.$emit('scroll', position)
            
        })
        }
        
        console.log(this.scroll);

        // this.scroll.refresh()
        
        
        // this.scroll.scrollTo(0,0)
        
        // 3.监听scroll滚动到底部
        if (this.pullUpLoad){//如果有是才去监听
                this.scroll.on('pullingUp',() =>{
                // console.log('上拉');
                this.$emit('pullingUp')//把事件发出去
                
            })
        }


    },
    methods: {
        scrollTo(x,y,time=1000) {//定义一个方法,滚动到哪里
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
    
        refresh(){
            // console.log('---')
            //给scroll做一次刷新
            this.scroll && this.scroll.refresh()
        },

        finishPullUp(){
            //这个的scroll的finishPullUp方法,这个方法可以多次上拉请求数据
            this.scroll && this.scroll.finishPullUp()
        },
        getScrollY(){
            //如果this.scroll有值就返回this.scroll.y否则返回0
            return this.scroll ? this.scroll.y :0
        }

    },

}
</script>

<style scoped>

</style>