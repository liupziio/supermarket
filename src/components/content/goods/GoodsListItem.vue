<!-- 
  这里负责装载各个衣服小数据
 -->

<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load是监听图片加载完的方法，"绑定方法" -->
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        goodsItem:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad(){//监听图片加载完成
        //利用 $bus(事件总线) 发送出去一个图片加载完的自定义事件
        if(this.$route.path.indexOf('/detail')){
          this.$bus.$emit('itemImageLoad')
        } else if (this.$route.path.indexOf('/home')){
          this.$bus.$emit('detailItemImageLoad')
        }
        // this.$bus.$emit('itemImageLoad')
        
      },

      itemClick(){
        // this.$router.push({
        //   path: '/detail',
        //   query:{
        //     iid: this.goodsItem.iid
        //   }
        // })
        
        // this.$router.push('/detail/' + this.goodsItem.iid)

        if(this.$route.path.indexOf('/detail')){
          this.$router.push('/detail/' + this.goodsItem.iid)
        }
          
      }
      
    },
   

}
</script>

<style scoped>
 .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>