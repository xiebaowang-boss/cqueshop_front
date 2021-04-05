<template>
  <div class="hot-goods">
    <div class="hot-header">
      <h5>热门商品</h5>
    </div>
    <div class="hot-box">
      <ul>
        <li v-for="url in imgUrls">
          <img :src="url.url" alt="What? No images... ">
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .hot-goods
    margin-top: 30px
    border: 1px solid rgb(237,237,237)
    border-radius: 8px
    overflow: hidden
    height: 500px
    .hot-header
      background-color: #fafafa
      line-height 60px
      font-size: 18px
      position: relative
      padding-left: 30px
      h5::after
        content: " "
        height: 1px
        width: 100%
        color: red
</style>
<script>
  export default {
    data () {
      return {
        imgUrls: [
          {'url': 'static/imgs/activity/a1.jpg'},
          {'url': 'static/imgs/activity/a2.jpg'},
          {'url': 'static/imgs/activity/a3.jpg'},
          {'url': 'static/imgs/activity/a4.jpg'}
        ]
      }
    },
    components: {}
  }
</script>
