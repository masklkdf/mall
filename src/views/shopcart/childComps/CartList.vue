<template>
  <div class="cartList">
    <scroll class="cartScroll" ref="clScroll">
      <cart-list-item v-for="item in goods" :item="item" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";

  import {mapGetters} from "vuex";

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters({
        goods: 'getGoods'
      })
    },
    deactivated() {
      this.$refs.clScroll.refresh();
    }
  }
</script>

<style scoped>
  .cartList {
    height: calc(100% - 40px);
    width: 100%;
  }
  .cartScroll {
    height: 100%;
    overflow: hidden;
  }
</style>
