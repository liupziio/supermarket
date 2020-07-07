<!--
    负责详情页
 -->
<template>
  <div id="detail">
    <!-- 子组件传属性需要驼峰标识，而事件需要一致 -->
      <!-- 导航选项卡栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

        <!-- better-scroll区域 -->
        <scroll class="content" ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll">
        <!-- <ul>
            <li v-for="(item,index) in $store.state.cartList" :key="index">
                {{item}}
            </li>
        </ul> -->

            <!-- 轮播图 -->
            <detail-swiper :top-images="topImages" />
            <!-- 商品基本信息 -->
            <detail-base-info :goods="goods" />
            <!-- 商品店铺信息 -->
            <detail-shop-info :shop="shop" />
            <!-- 商品详情信息 -->
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
            <!-- 商品参数信息 -->
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <!-- 商品评论信息 -->
            <detail-comment-info ref="comment" :comment-info="commentInfo" />
            <!-- 商品推荐信息 -->
            <goods-list ref="recommend" :goods="recommends"/>
        
        </scroll>
    <!-- 底部的工具栏 -->
    <detail-bottom-bar @addCart="addToCart"/>
     <back-top @click.native="backClick" v-show="isShowBackTop" /><!-- 回到顶部子组件,.native给组件绑定一个原生的点击事件 -->
  
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar'    //导入导航栏组件
import DetailSwiper from './childComps/DetailSwiper'    //导入轮播图组件
import DetailBaseInfo from './childComps/DetailBaseInfo'   //导入商品基本信息组件
import DetailShopInfo from './childComps/DetailShopInfo'    //导入商品店铺信息组件
import DetailGoodsInfo from './childComps/DetailGoodsInfo'    //导入商品详情组件
import DetailParamInfo from './childComps/DetailParamInfo'    //导入商品参数信息组件
import DetailCommentInfo from './childComps/DetailCommentInfo'    //导入商品评论信息组件
import GoodsList from 'components/content/goods/GoodsList'    //导入商品推荐信息组件
import DetailBottomBar from './childComps/DetailBottomBar'    //导入详情页的底部工具栏组件
import { mapActions } from 'vuex';//用于映射store的actions中的事件

import Scroll from 'components/common/scroll/Scroll'//引入封装的better-scroll


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail' //详情页请求的数据
import {debounce} from "common/utils" //导入防抖函数
import {backTopMixin} from "common/mixin" //导入混入函数

// import Toast from 'components/common/toast/Toast'

export default {
    name: "Detail",
    components:{
        DetailNavBar,//导航栏组件
        DetailSwiper,//轮播图组件
        DetailBaseInfo,//商品基本信息组件
        DetailShopInfo,//商品店铺信息组件
        Scroll,//滚动效果better-scroll
        DetailGoodsInfo,//商品详情组件
        DetailParamInfo,//商品参数信息组件
        DetailCommentInfo,//商品评论信息组件
        GoodsList,//商品推荐信息组件
        DetailBottomBar,//详情页的底部工具栏组件
        // Toast,
        
    },
    mixins:[backTopMixin],//混入函数
    data() {
        return {
            iid: null,//用来各个详情的iid
            topImages:[],//用来存储轮播图
            goods: {},//用来存储商品基本信息
            shop: {},//用来存储商品店铺信息
            detailInfo: {},//用来存储商品详情信息
            paramInfo : {},//用来存储商品参数信息
            commentInfo: {},//用来存储评论信息
            recommends:[],//用来存储推荐信息
            themeTopYs:[], //用来存储点击时标题选项卡滚到到哪
            getThemeTopY: null,//用来当作获取offsetTop距离
            currentIndex: 0,//用来存储滚动的的导航index
            // message: '',
            // show: false,
        
        }
    },
    created() {
    //1.保存传入的iid
        //把this.$route.params.iid参数传给this.iid
        //$route活跃
        this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            console.log(res);
            //0.获取数据
            const data = res.result
            //1.获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages

            //2.获取商品信息的对象
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        
            //3.获取店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //4.保存商品的详情数据
            this.detailInfo = data.detailInfo

            //5.获取商品参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //6.获取商品评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }

        //1.这里获取的值不对，因为  this.$refs.params.$el还有没渲染
            // this.themeTopYs.push(0);
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

            // console.log(this.themeTopYs)
          
        //2.这里获取值不对，因为图片没有加载完
            // this.$nextTick(() => {//数据加载完执行
                
            //     //处理详情导航选项卡点击的offsetTop
            //     this.themeTopYs = []
                
            //     //offsetTop值不对是因为图片没有加载完

            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

            //     console.log(this.themeTopYs)
            // })
        })  

    //3.请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        }),
    //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
        //点击标题滚动到对应位置
        this.getThemeTopY = debounce(() => {

            this.themeTopYs = []             
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
            this.themeTopYs.push(Number.MAX_VALUE)

            console.log(this.themeTopYs)
        },100)


    
    },
        mounted() {//页面加载完成后执行的函数

            //做防抖操作
            const refresh = debounce(this.$refs.scroll.refresh,50)

        //监听item中图片加载完成
            //利用$bus事件总线来监听GoodsListItem组件传出来的itemImageLoad事件
            this.$bus.$on('detailItemImageLoad',() => {
            // console.log('--- -----------');
            //等图片加载完成刷新一次scroll
            //this.$refs.scroll && this.$refs.scroll.refresh()
            //   console.log('我是Detail的防抖');
            refresh()
            
            }) 
        
        },  
    methods: {
        ...mapActions(['addCart']),//把actions中的addCart映射出来


        imageLoad() {//处理防抖,滚动卡顿,detailgoods发出的事件
            // console.log('-----')

        //刷新scroll
            this.$refs.scroll.refresh()
            
        //调用获取offsetTop值
            this.getThemeTopY()

        },
    //点击导航去往相应的位置
        titleClick(index) {//详情页的导航选项卡使用
            // console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000)
        },
    //内容滚动显示正确的标题
        contentScroll(position) {//这里要注意动态绑定:probeType='3'才会实时监听滚动位置变化
            // console.log(position)
          //1.获取y值
            const positionY = -position.y
          //2.positionY和主题中的值进行对比
            // [0, 2877, 3729, 4019, __ob__: O0bserver]
            let length = this.themeTopYs.length
            for(let i = 0; i< length; i++) {
                // console.log(i)
                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ) {
                    this.currentIndex = i
                    //这里是让DetailNavBar的currentIndex与这个的currentIndex相同
                    this.$refs.nav.currentIndex = this.currentIndex
                }
                
            }

            //3.是否显示回到顶部
            this.listenShoBackTop(position)
        },
    //加入购物车按钮
        addToCart() {
            // console.log('加入购物车')
          //1.获取购物车需要显示的商品信息
            const product = {}

            product.image = this.topImages[0]   //商品图片
            product.title = this.goods.title    //商品标题
            product.desc = this.goods.desc      //商品描述
            product.price = this.goods.realPrice //商品价格
            product.iid = this.iid              //商品iid

            // console.log(product)
          //2.将商品加入购物车  (1.mapActions 2.Promise )
            // this.$store.commit('addCart',product)
            //Vuex的actions需要dispatch来传

            //1.通过 mapActions 映射出来完成功能
            this.addCart(product).then(res => {
                // this.show = true
                // this.message = res
                console.log(res);
                // setTimeout(() => {
                //     this.show = false
                //     this.message = ''

                // },1000)

            //点击加入购物车弹出toast
                this.$toast.show(res)//还有一个默认时间是1000

                console.log(this.$toast)
            })

            //2. 通过 actions 传出来的 Promise 的 resolve 完成功能
            // this.$store.dispatch('addCart',product).then(res => {
            //     console.log(res);
                
            // })
        }
    },


}
</script>

<style scoped>
#detail {
    /* 把tab-bar盖上 */
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
}

/*  */
.detail-nav {
    position: relative;
    z-index: 11;
    background-color: #fff;
}

/* scroll滚动必须有一个高度 */
.content{
    /* 一个是顶部选项卡的44px, 一个是底部工具栏的49px 一共93px */
    height: calc(100% - 93px);
}


</style>