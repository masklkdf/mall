<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment">
    <div class="nav">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div class="info">
      <div class="user">
        <img :src="commentInfo.user.avatar">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="message">{{commentInfo.content}}</div>
      <div class="time">
        <span>{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="img" v-if="commentInfo.hasOwnProperty('images')">
        <img :src="item" v-for="item in commentInfo.images">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {

        const date = new Date(value * 1000);
        return formatDate(date, 'yyyy/MM/dd hh:mm:ss');
      }
    }
  }
</script>

<style scoped>
  .comment {
    margin: 0 10px 0;
  }
  .nav {
    border-bottom: 1px solid #666666;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    text-align: center;
  }
  .nav>:first-child {
    flex: 1;
    text-align: left;
  }
  .nav>:last-child {
    flex: 1;
    text-align: right;
  }
  .user {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .info .user img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    vertical-align: middle;
  }
  .info .user span {
    margin-left: 10px;
    font-size: 16px;
  }
  .time {
    margin: 10px 0;
  }
  .time>:first-child~span {
    margin-left: 5px;
  }
  .img img {
    width: 60px;
    height: 60px;
  }
  .img>:first-child~img {
    margin-left: 3px;
  }
</style>
