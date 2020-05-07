<template>
  <div class="side-bar">
    <div v-for="(item, index) in sideData"
         @click="sideClick(index)"
         :class="{active: currentIndex === index}">
      {{item.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategorySideBar",
    props: {
      sideData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      sideClick(index) {

        //判断是否点击的是同一个区域
        if(this.currentIndex !== index) {
          this.currentIndex = index;
          this.$emit('sideClick', index);
          // this.$bus.$emit('sideClick', index);
        }
      }
    }
  }
</script>

<style scoped>
  .side-bar {

    text-align: center;
  }
  .side-bar div {
    padding: 10px 0;
  }
  .active {
    background-color: #fff;
    color: var(--color-tint);
  }
</style>
