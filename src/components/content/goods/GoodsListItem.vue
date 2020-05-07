<template>
  <div class="item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad">
    <div>
      <p>{{content.title}}</p>
      <div v-if="content.price">
        <span class="price">{{content.price}}</span>
        <span class="collect">{{content.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      content: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.content.image ||this.content.img || this.content.show.img
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('imageLoad');
      },
      itemClick() {
        // this.$router.push('/detail/' + this.content.iid);
        this.$router.push({
          path: '/detail',
          query: {
            id: this.content.iid
          }
        });
      }
    }
  }
</script>

<style scoped>
  .item {
    text-align: center;
    padding: 3px;
    font-size: 12px;
    width: 48%;
  }
  .item img {
    width: 100%;
    border-radius: 5px;
  }
  .item p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item .price {
    color: var(--color-high-text);
  }
  .item .collect::before {
    content:"";
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    display: inline-block;
    /*background-size: 14px;*/
    width: 14px;
    height: 14px;
    margin-left: 10px;
    position: relative;
    top: 2.5px;
  }
</style>
