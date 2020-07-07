<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1" 
      class="copy-tab-control" 
      v-show="isTabFixed"
      />
    <!-- :probe-type="3"动态绑定Scroll组件的自定义属性 -->
    <!-- :pull-up-load="true"设置Scroll上拉 -->
    <scroll class="content"
             ref="scroll" 
             :probe-type="3" 
             @scroll="contentScroll"
             :pull-up-load="true"
             @pullingUp="loadMore"
             >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" /><!-- 轮播图  这里的:banners是子组件中的，后者是父组件的，应用了父通信子props-->
      <recommend-view :recommends="recommends"/><!-- 推荐图片  这里的:recommends是子组件中的，后者是父组件的，应用了父通信子props-->
      <feature-view/><!-- 本周推荐子组件 -->

      <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2" 
      />

      <goods-list :goods=" showGoods"/><!-- 商品数据 -->
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" /><!-- 回到顶部子组件,.native给组件绑定一个原生的点击事件 -->
  
  </div>
</template>

<script>

  /* 主页的独立组件 */
  import HomeSwiper from './childComps/HomeSwiper'//读取轮播图子组件
  import RecommendView from './childComps/RecommendView'//读取推荐图子组件
  import FeatureView from './childComps/FeatureView'//读取本周流行子组件

  /* 公用组件 */
  import NavBar from 'components/common/navbar/NavBar'//这里是封装的上边购物街导航栏(多用)
  import TabControl from 'components/content/tabControl/TabControl'//读取选项卡子组件(多用)
  import GoodsList from 'components/content/goods/GoodsList'//读取商品数据大的子组件(多用)
  import Scroll from 'components/common/scroll/Scroll'//这里是封装的滚动组件(多用)

  import {backTopMixin} from "common/mixin" //导入混入函数

  /* 主页的请求数据 */
  import {getHomeMultidata,getHomeGoods} from 'network/home' //导入home页请求的数据
  import {debounce} from "common/utils" //导入防抖函数


  export default {
    name: "Home",
    components:{
      NavBar,//头部导航
      TabControl,//选项卡
      GoodsList,//数据子组件
      Scroll,//滚动顺滑子组件
     
      
      
      HomeSwiper,//轮播图
      RecommendView,//推荐图
      FeatureView,//本周流行
       
      

    },
    mixins:[backTopMixin],
    data() {
      return {
        banners: [],    //这里来存储请求的轮播图数据
        recommends: [],  //这里来存储请求推荐图的数据
        goods: {
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        currentType: 'pop',//默认当前状态参数
        tabOffsetTop: 0,//用来存储tabControl的offsetTop
        isTabFixed: false, //用来设置吸顶效果
        saveY: 0,//用来保存home的Y轴位置


      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed(){ //销毁函数
      console.log('home_des');
      
    },
    activated() {//组件活跃时
      // console.log('在home中')
      //切换回来位置在X:0, Y:this.saveY,速度:0
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      
    },
    deactivated() {//组件离开时
      // console.log('离开home')
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY)
    },
    created() { //组件创建完成，执行生命周期函数
      // console.log(this)
        console.log('创建home')
      //1.请求轮播图和推荐图数据
        this.getHomeMultidata()
      //2.请求商品数据
        
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')



    },
    mounted() {//页面加载完成后执行的函数

        // const refresh = function (...args) {
        //   if(timer) clearTimeout(timer)
        //   timer = setTimeout(() => {
        //     func.apply(this,args)
        //   },delay)
        // }
        //给refresh做防抖操作
        const refresh = debounce(this.$refs.scroll.refresh,50)

      //监听item中图片加载完成
        //利用$bus事件总线来监听GoodsListItem组件传出来的itemImageLoad事件
        this.$bus.$on('itemImageLoad',() => {
          // console.log('--- -----------');
          //等图片加载完成刷新一次scroll
          //this.$refs.scroll && this.$refs.scroll.refresh()
          // console.log('我是home的防抖');
          refresh()
          
        }) 

       
    },
    methods: {
      /* 
        事件监听相关方法
       */
  

      //监听点击index来切换选项卡参数
      tabClick(index) {
       switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
          
       }
       //处理选项卡点击之后两个选项卡的状态一致
       this.$refs.tabControl1.currentIndex = index;
       this.$refs.tabControl2.currentIndex = index;
        
        
      },

      //监听滚动的值来控制回到顶部组件的出现与隐藏
      contentScroll(position){
        //1.判断BackTop是否显示
          //因为y轴滚动时是负数，所以加一个 - 号变成正数
          //这个的isShowBackTop = true/false
            this.listenShoBackTop(position)

        //2.决定tabContorl是否吸顶(position:fixed)
           this.isTabFixed = (-position.y) > this.tabOffsetTop
          //  console.log(this.isTabFixed);
          //  console.log(this.tabOffsetTop);
           

      },

      //上拉加载更多数据
      loadMore(){
        // console.log('上拉加载');
        //上拉时调用getHomeGoods方法中的这个currentType参数方法，
        //利用加页码方法
        this.getHomeGoods(this.currentType)
        
      },

      //监听轮播图加载完成之后获取tabControl的offsetTop
      swiperImageLoad() {
        //获取tabControl的offsetTop
          //给tabOffsetTop赋值
          //所有组件中都有一个属性$el：用于获取组件中的元素
          // console.log(this.$refs.tabControl.$el.offsetTop)
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },



      /*
        网络请求相关方法
      */

      //1.请求轮播图和推荐图数据
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners = res.data.banner.list; //这里的this指向整个这个组件对象,所以可以获取到组件中的data
          this.recommends = res.data.recommend.list; 

        })
        
      },
      //2.请求商品数据
      getHomeGoods(type){
        //定义page等于这个类型页码 +1 
        const page = this.goods[type].page + 1

        getHomeGoods (type,page).then(res => {
          // console.log(res);      
          //把res中的list推给goods[类型]中的list
          this.goods[type].list.push(...res.data.list)//三个点是push的方法,把数组解构,一个个加进去
          this.goods[type].page += 1 //这个类型页码 +1

          //多次上拉请求的数据,ref=scroll组件中的finishPullUp方法
          this.$refs.scroll.finishPullUp()

        })
      }

    },
  }
</script>

<style scoped>
/* 处理home整个div */
  #home {
    /* padding-top: 44px; */
    height: 100vh;/* vh => viewport height 视口*/
    position: relative;
  }

  /* 设置头部导航 */
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时 处理头部导航不滚动固定 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .copy-tab-control{
    position: relative;
    z-index: 9;
  }

  /* 处理选项卡的粘贴属性 */
  /* .tab-control {     //用了better-scroll不起效果
    position: sticky;滚动到一定位置会自己改成fixed
    top:44px;
    z-index: 9;
  } */




  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>
