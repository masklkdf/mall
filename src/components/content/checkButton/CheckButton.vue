<template>
  <div class="button" :class="{checked: !isShow}">
    <img src="~assets/img/cart/tick.svg" v-show="isShow">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .checked {
    width: 20px;
    border: 1px solid #aaa;
  }
</style>
