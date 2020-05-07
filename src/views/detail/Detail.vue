<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll class="content"
            ref="scroll"
            :type="3"
            @scroll="detailScroll">
      <detail-swiper :top-images="topImages" ref="sw" ></detail-swiper>
      <detail-goods-desc :goods="goods" />
      <detail-shop :shop="shop" />
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"/>
    <detail-bottom-bar @addCart="addCart" />
  </div>
</template>

<script>

  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./detailChildComps/DetailNavBar";
  import DetailSwiper from "./detailChildComps/DetailSwiper";
  import DetailGoodsDesc from "./detailChildComps/DetailGoodsDesc";
  import DetailShop from "./detailChildComps/DetailShop";
  import DetailGoodsInfo from "./detailChildComps/DetailGoodsInfo";
  import DetailParamInfo from "./detailChildComps/DetailParamInfo";
  import DetailCommentInfo from "./detailChildComps/DetailCommentInfo";
  import DetailBottomBar from "./detailChildComps/DetailBottomBar";

  import {getDetailData, getRecommends, Goods, Shop, GoodsParams}
  from "network/detail";
  import {itemImgListenerMixin, BackTopMixin} from "common/mixins";
  import {debounce} from "common/utils";

  import {mapActions} from "vuex";

  import GoodsList from "components/content/goods/GoodsList";

  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        theme: [],
        getTheme: null,
        currentIndex: 0
      }
    },
    mixins: [itemImgListenerMixin, BackTopMixin],
    components: {
      Scroll,
      GoodsList,
      DetailShop,
      DetailNavBar,
      DetailSwiper,
      DetailGoodsDesc,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailBottomBar,
      DetailCommentInfo,
    },
    methods: {
      ...mapActions({
        add: 'addShop'
      }),
      imageLoad() {
        this.$refs.scroll.refresh();
        this.getTheme();
      },
      detailScroll(position) {
        this.isShow = (-position) > 1200;
        //导航栏联动效果
        const y = -position;
        const l = this.theme.length;

        for(let i = 0; i < l - 1; i++) {
          // console.log(i);
          // console.log(typeof i);//number类型

          //第一种做法
          // if(this.currentIndex !== i && (i < l - 1 &&
          // y >= this.theme[i] && y < this.theme[i+1] ||
          //   i === l - 1 && y >= this.theme[i])) {
          //   console.log(i);
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = i;
          // }

          //第二种做法
          if(this.currentIndex !== i &&
            y >= this.theme[i] && y < this.theme[i+1]) {
            // console.log(i);
            this.currentIndex = i;
            this.$refs.nav.currentIndex = i;
            // console.log(this.currentIndex);
          }

        }

      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.theme[index]);
        this.currentIndex = index;
      },
      addCart() {
        const cart = {};
        cart.id = this.id;
        cart.img = this.topImages[0];
        cart.title = this.goods.title;
        cart.desc = this.goods.desc;
        cart.price = this.goods.realPrice;
        // console.log('+');
        // this.$store.dispatch('addShop', cart);
        // this.showWindow = true;
        // setTimeout(() => {
        //   this.showWindow = false
        // }, 2000);
        this.add(cart).then(rs => {
          this.$toast.show(rs, 1500);
        });
      }
    },
    created() {
      this.id = this.$route.query.id;
      getDetailData(this.id).then(rs => {
        // console.log(rs);
        //轮播图数据
        this.topImages = rs.result.itemInfo.topImages;

        const data = rs.result;
        //商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo);
        //商家数据
        this.shop = new Shop(data.shopInfo);
        //商品描述
        this.detailInfo = data.detailInfo;
        //商品参数
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
        //用户评价信息
        if (data.rate.cRate !==0) {
          this.commentInfo = data.rate.list[0];
        }
      });

      //获取推荐数据
      getRecommends().then(rs =>{
        // console.log(rs);
        this.recommends = rs.data.list;
      });

      //新建一个防抖函数，来获取各个组件的offsetTop
      this.getTheme = debounce(() => {
        this.theme = [];
        this.theme.push(this.$refs.sw.$el.offsetTop);
        this.theme.push(this.$refs.param.$el.offsetTop);
        this.theme.push(this.$refs.comment.$el.offsetTop);
        this.theme.push(this.$refs.recommend.$el.offsetTop);

        //第二种做法：在数组的最后加上一个最大的zhi，让判断简化，提高性能，空间换时间
        this.theme.push(Number.MAX_VALUE);

        // console.log(this.theme);
      }, 100);
    },
    destroyed() {
      this.$bus.$off('imageLoad', this.method);
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
  }
  .content {
    position: relative;
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>
