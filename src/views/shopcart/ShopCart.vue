<template>
    <div id="shopCart">
      <nav-bar class="cartNav">
        <div slot="center">购物街({{getCount}})</div>
      </nav-bar>
      <div v-if="have" class="show">
        <cart-list />
        <cart-bottom-bar class="bottom" />
      </div>
      <div v-else class="no-goods">
        <div>购物车没有商品哦！</div>
      </div>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from "vuex";

  export default {
    name: "ShopCart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        goods: 'getGoods',
        getCount: 'getCartLength'
      }),
      have() {
        return this.goods.length;
      }
    }
  }
</script>

<style scoped>
  #shopCart {
    height: 100vh;
    width: 100%;
  }
  .cartNav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .bottom {
    background-color: #eee;
  }
  .show {
    height: calc(100% - 93px);
  }
  .no-goods {
    text-align: center;
    height: calc(100% - 93px);
    line-height: calc(100vh - 93px);
  }
</style>
