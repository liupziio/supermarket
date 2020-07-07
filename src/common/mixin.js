import BackTop from 'components/content/backTop/BackTop'//这里是回到顶部的小图片组件(多用)

export const backTopMixin = {
  components:{
    BackTop,//回到顶部的小图片组件
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick(){
      //通过ref来获取到scroll组件
      //点击时这个refs=scroll的组件中scrollTo方法
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShoBackTop(position) {
      //是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}

