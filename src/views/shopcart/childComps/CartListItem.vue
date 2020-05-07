<template>
  <div class="clItem" >
    <div class="button">
      <check-button :isShow="item.isCheck" @click.native="checkClick" />
    </div>
    <div class="image">
      <img :src="item.img">
    </div>
    <div class="info">
      <div class="omit title">{{item.title}}</div>
      <div class="omit">{{item.desc}}</div>
      <div class="price">
        <span>{{item.price | showPrice}}</span>
        <span>{{item.count | showCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showPrice(value) {
        return '￥' + value;
      },
      showCount(value) {
        return 'x' + value;
      }
    },
    methods: {
      checkClick() {
        this.$store.commit('checkClick', this.item);
      }
    }
  }
</script>

<style scoped>
  .clItem {
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #aaaaaa;
  }
  .button {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    width: 100px;
  }
  .image img {
    height: 100px;
    width: 80px;
    border-radius: 5px;
  }
  .info {
    width: calc(100% - 105px);
    display: flex;
    flex-direction: column;
    margin-left: 5px;
  }
  .omit {
    flex: 1;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }
  .title {
    font-weight: 700;
  }
  .price {
    display: flex;
    width: 100%;
  }
  .price span {
    display: inline-block;
    flex: 1;
  }
  .price>:first-child {
    text-align: left;
    color: #FD802F;
  }
  .price>:last-child {
    text-align: right;
    margin-right: 5px;
  }
</style>
