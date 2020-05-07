<template>
    <div class="tabBarItem" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="isColor"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data() {
      return {

      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path);
        // console.log('click');
      }
    },
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1;
      },
      isColor() {
        return this.isActive ? {color: this.activeColor} : {};
      }
    }
  }
</script>

<style scoped>
  .tabBarItem {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .tabBarItem img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 3px;
  }
</style>
