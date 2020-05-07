<template>
  <div class="d-shop">
    <div class="logo">
      <img :src="shop.logo" />
      <span>{{shop.name}}</span>
    </div>
    <div class="info">
      <div class="sale">
        <div>
          <span>{{shop.sells | showSale}}</span>
          <span>总销量</span>
        </div>
        <div>
          <span>{{shop.goodsCount}}</span>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="feedback">
        <div v-for="item in shop.score">
          <span>{{item.name}}</span>
          <span class="green" :class="{red:item.isBetter}">{{item.score}}</span>
          <span class="green" :class="{red:item.isBetter}">{{item.isBetter? '高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="enter">
      <span>进店逛逛</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShop",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showSale(value) {
        if (value < 10000) {
          return value;
        }else {
          return (value/10000).toFixed(1) + '万';
        }
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .d-shop {
    padding: 3px;
  }
  .logo {
    margin: 20px 0 20px;
  }
  .logo img {
    width: 50px;
    height:50px;
    border-radius: 50px;
    vertical-align: middle;
    border-width: 3px;
    border-color: #000;
    /*display: inline-block;*/
  }
  .logo span {
    margin-left: 10px;
    font-size: 16px;
  }
  .info {
    display: flex;
    color: #000;
    font-size: 13px;
  }
  .sale {
    flex: 1;
    display: flex;
    text-align: center;
    border-right: 1px solid #b3b3b3;
  }
  .sale div{
    margin-top: 15px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
  .feedback {
    flex: 1;
    padding-left: 5px;
  }
  .feedback div {
    display: flex;
    text-align: center;
    margin-top: 5px;
  }
  .feedback div span{
       flex: 1;
     }
  .feedback div>:first-child {
    flex: 2;
  }
  .feedback div>:first-child+span {
    text-align: left;
  }
  .green {
    color: green;
  }
  /*.green:last-child {*/
  /*  background-color: green;*/
  /*  color: #fff;*/
  /*}*/
  .red {
    color: red;
  }
  /*.red:last-child {*/
  /*  background-color: red;*/
  /*  color: #fff;*/
  /*}*/
  .enter {
    margin-top: 15px;
    text-align: center;
  }
  .enter span {
    display: inline-block;
    width: 50%;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    background-color: #e6e6e6;
  }
</style>
