<template>
  <div class="bottom-bar">
    <div>
      <img src="~assets/img/detail/service.svg" />
      <div>客服</div>
    </div>
    <div>
      <img src="~assets/img/detail/store.svg" />
      <div>店铺</div>
    </div>
    <div>
      <img src="~assets/img/detail/collection.svg" />
      <div>收藏</div>
    </div>
      <div class="cart big" @click="addCart">加入购物车</div>
      <div class="buy big">购买</div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addCart() {
        this.$emit('addCart');
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    z-index: 100;
    background-color: #fff;
    text-align: center;
    height: 49px;
  }
  /*.bottom-bar img {*/
  /*  outline-width:0px;*/
  /*  vertical-align:top;*/
  /*}*/
  div {
    flex: 2;
  }
  .big {
    height: 49px;
    line-height: 49px;
  }
  .cart {
    flex: 3;
    background-color: #FADA0F;
  }
  .buy {
    flex: 3;
    background-color: #FA7697;
    color: #fff;
  }
</style>
