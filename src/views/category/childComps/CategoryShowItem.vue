<template>
  <div class="cate-show-item">
    <a :href="content.link">
      <img v-lazy="showImage" @load="imageLoad">
      <div>
        <p>{{content.title}}</p>
        <div v-if="content.price">
          <span class="price">{{content.price}}</span>
          <span class="collect">{{content.cfav}}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "CategoryShowItem",
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
        this.$bus.$emit('itemLoad');
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
  .cate-show-item {
    text-align: center;
    padding: 3px;
    font-size: 12px;
    width: 48%;
  }
  .cate-show-item img {
    width: 100%;
    border-radius: 5px;
  }
  .cate-show-item p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .cate-show-item .price {
    color: var(--color-high-text);
  }
  .cate-show-item .collect::before {
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
