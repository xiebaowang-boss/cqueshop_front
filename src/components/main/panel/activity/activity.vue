<template>
  <div class="imgs ">
    <ul class="activity-box">
      <li v-for="url in imgUrls" v-bind:key="url">
        <img :src="url.url" alt="What? No images... ">
      </li>
    </ul>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .imgs
    margin-top: 30px

    .activity-box
      border: 1px solid rgba(0,0,0,.14)
      border-radius 8px
      height: 200px
      overflow: hidden
      cursor: pointer
      box-sizing border-box

      li
        box-sizing border-box
        width: 25%
        height: 200px
        float: left
        position: relative
        border-right: 1px solid rgba(0,0,0,.14)
        z-index: 200
        &:last-child
          border-right: 0

        img
          width: 100%
          height: 100%
          &:hover
            box-shadow: 0 3px 15px -10px red
            opacity: 1
            transition: 0.5s
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
    components: {},
    created() {
      //this.axios.get("/image/")
    }

  }
</script>
