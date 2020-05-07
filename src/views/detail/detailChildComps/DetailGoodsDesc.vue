<template>
  <div v-if="Object.keys(goods).length > 0" class="desc">
    <div class="title">{{goods.title}}</div>
    <div class="price">
      <span>{{goods.newPrice}}</span>
      <span>{{goods.oldPrice}}</span>
      <span>{{goods.discount}}</span>
    </div>
    <div class="columns">
      <span v-for="item in goods.columns" :key="item">{{item}}</span>
    </div>
    <div class="services">
      <div v-for="item in goods.services" :key="item.name" class="item">
        <img :src="item.icon" v-if="item.icon" >
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsDesc",
    props: {
      goods: {
        type:Object,
        default() {
          return {}
        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .desc {
    margin-top: 10px;
    padding: 0 5px 0;
    border-bottom: 3px solid #e6e6e6;
  }
  .title {
    font-size: 15px;
    color: #000;
  }
  .price {
    margin-top: 10px;
    font-size: 10px;
  }
  div.price>:first-child {
    padding-top: 5px;
    font-size: 20px;
    color: var(--color-high-text);
    /*margin-right: 3px;*/
  }
  div.price>:first-child+span {
    text-decoration: line-through;
  }
  div.price>:last-child {
    background-color: var(--color-high-text);
    color: #fff;
    padding: 5px;
    border-radius: 10px;
    margin-left: 3px;
    /*margin-bottom: 10px;*/
    position: relative;
    top: -8px;
  }
  .columns {
    display: flex;
    text-align: center;
    font-size: 13px;
    margin: 10px 5px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid #b3b3b3;
  }
  .columns span {
    flex: 1;
  }
  .columns>:first-child {
    text-align: left;
  }
  .columns>:last-child {
    text-align: right;
  }
  .services {
    display: flex;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .services .item {
    flex: 1;
    font-size: 10px;
    display: inline-block;
  }
  .services>:first-child {
    text-align: left;
  }
  .services>:last-child {
    text-align: right;
  }
  .services img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 3px;
  }
</style>
