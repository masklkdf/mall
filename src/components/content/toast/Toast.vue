<template>
  <div class="window" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "DetailPopWindow",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration=1500) {
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .window {
    position: fixed;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 10px 8px;
    border-radius: 5px;

    color: #fff;


    background-color: #000;
  }
</style>
