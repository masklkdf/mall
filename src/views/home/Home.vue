<template>
    <div id="home">
      <nav-bar class="home_nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl"
                   class="fixed"
                   v-show="isTop"/>
      <scroll class="content"
              ref="scroll"
              @scroll="contentScroll"
              :type="3"
              :isPull="true"
              @pullingUpLoad="pullingUpLoad">
        <home-swiper :banners="banners"
                     @imageLoad="imageLoad" />
        <home-r-view :recommends="recommends" />
        <feature-view />
        <tab-control :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"/>
        <goods-list :goods="showGoods" />
      </scroll>
      <back-top @click.native="backTop" v-show="isShow"/>
    </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComs/HomeSwiper";
  import Scroll from "components/common/scroll/Scroll";

  //工具
  import {getHomeMultidata, getHomeData} from "network/home";
  import {itemImgListenerMixin, BackTopMixin} from "common/mixins";


  //home子组件
  import HomeRView from "./childComs/HomeRView";
  import FeatureView from "./childComs/FeatureView";

  //业务组件
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: 'pop',
        isTop: false,
        offset: 0,
        position: 0
      }
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.position, 0);
    },
    deactivated() {
      this.position = this.$refs.scroll.position;

      this.$bus.$off('imageLoad', this.method);

    },
    created() {
      //请求轮播图数据
      this.getHomeMultidata();

      //请求列表数据
      this.getHomeData('pop');
      this.getHomeData('new');
      this.getHomeData('sell');


    },
    mounted() {
      this.tabClick(0);
    },
    mixins: [itemImgListenerMixin, BackTopMixin],
    methods: {

      /**
       * 网络请求
       */
      getHomeMultidata() {
        getHomeMultidata().then(rs => {
          // console.log(rs);
          this.banners = rs.data.banner.list;
          this.recommends = rs.data.recommend.list;
        });
      },
      getHomeData(type) {
        const page = this.goods[type].page;
        getHomeData(type, page+1).then(rs => {
          // console.log(rs);
          this.goods[type].list.push(...rs.data.list);
          this.$refs.scroll.finishLoad();
        });
        this.goods[type].page++;
      },

      /**
       * 事件监听的方法
       */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0: this.currentType = 'pop';break;
          case 1: this.currentType = 'new';break;
          case 2: this.currentType = 'sell';break;
        }
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        this.isShow = position < -1200;
        this.isTop = (-position) >= this.offset;
      },
      pullingUpLoad() {
        this.getHomeData(this.currentType);
      },
      imageLoad() {
        this.offset = this.$refs.tabControl2.$el.offsetTop;
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home_nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 对于原生的浏览器滚动才需要fixed */
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  /*.sticky {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*}*/

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
    height: calc(100% - 93px);
    overflow: hidden;
  }

  .fixed {
    position: relative;
    z-index: 8;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  position: relative;*/
  /*  !*margin-top: 44px;*!*/
  /*  !*overflow: hidden;*!*/
  /*}*/
</style>
