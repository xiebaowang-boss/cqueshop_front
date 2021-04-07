<template>
  <div class="hot-goods">
    <div class="hot-header">
      <h5>热门商品</h5>
    </div>
        <goods-card :goods-list="goodsList"></goods-card>
  </div>
</template>
<script>
import goodsCard from '../../../goods/goodsCard.vue'

export default {
  data() {
    return {
      goodsList: []
    }
  },
  components: {
    goodsCard
  },
  created() {
    this.axios.get("/goods/getHot")
        .then(res => {
          if (res.data.code == 1) {
            this.goodsList = res.data.data;
          } else {
            this.$message.error("Server Error!")
          }
        })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.hot-goods
  margin-top: 30px
  border: 1px solid rgba(0, 0, 0, .1)
  border-radius: 8px
  overflow: hidden
  height: auto
  background-color: white
  padding-bottom: 30px
  h5
    margin-top 0px
    padding 10px 0px 0px 0px
    font-size 18px
  .hot-header
    background-color: #fafafa
    line-height 60px
    font-size: 18px
    position: relative
    padding-left: 30px
</style>

