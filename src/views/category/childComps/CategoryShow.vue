<template>
  <div class="cate-show">
    <CategoryShowItem v-for="item in goods" :content="item" />
  </div>
</template>

<script>
  import CategoryShowItem from "./CategoryShowItem";

  export default {
    name: "CategoryShow",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      CategoryShowItem
    }
  }
</script>

<style scoped>
  .cate-show {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
