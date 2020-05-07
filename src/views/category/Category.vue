<template>
  <div id="category">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
   <div class="main">
     <scroll class="cate-side-scroll">
       <category-side-bar :side-data="sideData"
                          class="cate-side"
                          @sideClick="sideClick"/>
     </scroll>
     <scroll class="cate-view-scroll"
             ref="scroll"
             :type="3"
             @scroll="scroll">
       <category-show :goods="dataList" class="cate-show" />
       <tab-control :titles="['综合', '新品', '销量']"
                    @tabClick="tabClick"
                    ref="control1" />
       <category-show :goods="showRecommend" class="cate-goods"/>
     </scroll>
   </div>
    <back-top v-show="isShow" @click.native="backTop" />
    <tab-control :titles="['综合', '新品', '销量']"
                 class="cate-tab2"
                 @tabClick="tabClick"
                 ref="control2"
                 v-show="isTop" />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";

  import CategorySideBar from "./childComps/CategorySideBar";
  import CategoryShow from "./childComps/CategoryShow";

  import {getCategory, getSubCategory, getCategoryDetail} from "network/category";

  import {itemImgListenerMixin, BackTopMixin} from 'common/mixins';
  import BackTop from "../../components/content/backTop/BackTop";
  import {debounce} from "../../common/utils";

  export default {
    name: "Category",
    data() {
      return {
        //侧边栏数据
        sideData: [],
        //图片数据
        dataList: [],
        //推荐数据
        rds: {
          pop: [],
          new: [],
          sell: []
        },
        currentIndex: 0,
        tabIndex: 0,
        method: null,
        isTop: false
      }
    },
    components: {
      NavBar,
      Scroll,
      TabControl,
      CategoryShow,
      CategorySideBar
    },
    created() {

      this._getCategory();
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 100);
      this.method = () => {
        refresh();
      };
      this.$bus.$on('itemLoad', this.method);

    },
    deactivated() {
      this.$bus.$off('imageLoad', this.method);
    },
    mixins: [BackTopMixin],
    methods: {
      sideClick(index) {

        this.currentIndex = index;
        this._getSubCategory(this.sideData[index].maitKey);

      },
      tabClick(index) {
        this.tabIndex = index;

        this.$refs.control1.currentIndex = index;
        this.$refs.control2.currentIndex = index;

      },
      scroll(position) {

        this.isShow = (-position) > 1200;

        this.isTop = (-position) >= this.$refs.control1.$el.offsetTop;

      },
      _getCategory() {
        getCategory().then(rs => {
          // console.log(rs);
          this.sideData = rs.data.category.list;

          // console.log(this.sideData);



          //请求数据
          this._getSubCategory(this.sideData[this.currentIndex].maitKey);


        });
      },
      _getSubCategory(maitKey) {

        //初始化推荐数组/清空数组
        this.rds['pop'] = [];
        this.rds['new'] = [];
        this.rds['sell'] = [];

        getSubCategory(maitKey).then(rs => {
          this.dataList = rs.data.list;


          this._getCategoryDetail('pop');
          this._getCategoryDetail('sell');
          this._getCategoryDetail('new');


        });


      },
      _getCategoryDetail(type) {
        const miniWallkey = this.sideData[this.currentIndex].miniWallkey;

        getCategoryDetail(miniWallkey, type).then(rs => {
          // console.log(rs);

          this.rds[type] = rs;
          // console.log(this.recommends[type]);

        });


      }
    },
    computed: {
      showRecommend() {
        const type = this.judge;
        return this.rds[type];
      },
      judge() {
        let index = this.tabIndex;
        let type = 'pop';
        switch (this.tabIndex) {
          case 0:type = 'pop';break;
          case 1:type = 'new';break;
          case 2:type = 'sell';break;
        }
        return type;
      },
    },
    destroyed() {
      this.$bus.$off('itemLoad', this.method);
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
    width: 100vw;
  }
  .cate-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .main {
    display: flex;
    height: calc(100% - 93px);
    width: 100%;
    position: relative;
  }
  .cate-side-scroll {
    height: 100%;
    overflow: hidden;
    width: 100px;
  }
  .cate-side {
    background-color: #eee;
  }
  .cate-view-scroll {
    position: relative;
    height: 100%;
    width: calc(100% - 100px);
    overflow: hidden;
  }

  .cate-tab2 {
    width: calc(100% - 100px);
    position: fixed;
    top: 44px;
    right: 0;
  }

  .cate-show {
    width: 200px;
  }

  .cate-goods {
    width: 100%;
  }
</style>
