<template>
  <div class="bar">
    <div class="all">
      <check-button :is-show="isAll"
                    class="button"
                    @click.native="selectAll" />
      <div>全选</div>
    </div>
    <div class="price">
      合计：{{getPrice | showPrice}}
    </div>
    <div class="settlement"
         @click="calcClick">
      去计算({{getCheckedCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from "vuex";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters({
        goods: 'getGoods',
        getPrice: 'getTotalPrice',
        getCount: 'getCartLength',
        getCheckedCount: 'getCheckedLength'
      }),
      isAll() {
        if (this.goods.length === 0) {return false}
        return !this.goods.find(item => !item.isCheck);
      }
    },
    methods: {
      selectAll() {
        if(this.isAll) {
          this.goods.forEach(item => {item.isCheck = false});
        }else {
          this.goods.forEach(item => {item.isCheck = true});
        }
      },
      calcClick() {
        if(this.getCheckedCount === 0) {
          this.$toast.show('请选择商品', 2000);
        }
      }
    },
    filters: {
      showPrice(value) {
        return '￥' + value.toFixed(2);
      }
    }
  }
</script>

<style scoped>
  .bar {
    display: flex;
    height: 40px;
    line-height: 40px;

  }
  .all {
    display: flex;
    margin-left: 20px;
    width: 60px;
  }
  .button {
    line-height: 20px;
    position: relative;
    top: 9px;
  }
  .price {
    flex: 1;
    margin-left: 10px;
  }
  .settlement {
    width: 80px;
    text-align: center;
    background-color: var(--color-tint);
  }
</style>
