<!-- 
    这里负责装载全部小数据
 -->

<template>
    <div class="goods">
        
        <goods-list-item v-for="(item,index) in goods"
         :goods-item="item"
         :key="index"
         />
         <!-- {{goods}} -->
    </div>
  
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    // name: "GoodsList",
    components:{
        GoodsListItem,
    },
    props:{
        goods:{
            type:Array,
            default(){
                return[]
            }
        }
    }

}
</script>

<style>
    .goods{
        display: flex;
        flex-wrap: wrap;/* 设置包裹,和GoodsListItem组件中的goods-item宽度结合会设置一行多少个 */
        justify-content: space-around;/* 设置均等分 */
        padding: 2px;

    }
    

</style>