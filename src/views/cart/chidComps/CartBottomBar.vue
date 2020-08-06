<!-- 负责购物车底部的购物车数量统计与计算的 -->
<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button 
          :is-checked="isSelectAll" class="check-button"
          @click.native="checkClick"
          />
            <span>全选</span>
        </div>

      <div class="price">
          合计:{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
          去计算:({{checkLength}})
      </div>

  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'//选中的对勾图片的子组件

import { mapGetters } from 'vuex'//vuex的方法mapGetters可以把getters中的转为计算属性

export default {
    name: 'CartBottomBar',
    components:{
        CheckButton,//选中的对勾图片的子组件
    },
    computed: {
        ...mapGetters(['cartList']),

        //合计的计算属性
        totalPrice(){
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
               return preValue + item.price * item.count
            },0).toFixed(2)
        },

        //处理多少个商品去计算
        checkLength() {
            return this.cartList.filter(item => item.checked).length
        },

        //商品全选的状态
        isSelectAll() {
            //做商品全选与有一个不选，全选按钮的状态的三种方法

            //1.使用filter过滤
            if(this.cartList.length === 0) return false
                return !(this.cartList.filter(item => !item.checked).length)
            
            //2.使用find
            // if(this.cartList.length === 0) return false
            //     return !this.cartList.find(item => !item.checked)

            //3.使用普通遍历
            // if(this.cartList.length === 0) return false
            // for(let item of this.cartList) {
            //    if(!item.checked) {
            //        return false
            //    }
            // }
            // return true
        
        },
       
    },
     methods: {
            checkClick() {
                if(this.isSelectAll){   //全选中
                    this.cartList.forEach(item => item.checked = false)
                } else {    //有部分或者都没选中
                     this.cartList.forEach(item => item.checked = true)
                }
            },
            calcClick(){
                if(this.isSelectAll){  //全没选中
                    this.$toast.show('功能开发中~',1000)//使用自定义的文字和时间
                } 
                else{
                    this.$toast.show('购物车是空的哦~',1000)//使用自定义的文字和时间
                }
            }
        },
    


}
</script>

<style scoped>
   .bottom-bar {
        position: relative;
        display: flex;
        /* bottom: 76px; */
        height: 40px;
        line-height: 40px;
        background-color: #eee;
        font-size: 14px;
  }

    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price {
        margin-left: 20px;
        flex: 1;
    }

    .calculate {
        width: 90px;
        background-color: red;
        color: #fff;
        text-align:center
    }
</style>