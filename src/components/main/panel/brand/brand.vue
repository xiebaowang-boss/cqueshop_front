<template>
  <div class="brand-goods">
    <div class="hot-header">
      <h5>商城最新商品</h5>
    </div>
    <el-container>
      <el-aside width="500px">
        <el-carousel height="300px" indicator-position="outside">
          <el-carousel-item v-for="goods in goodsList" :key="goods.id">
            <el-image
                width="234"
                height="270"
                style="padding: 20px"
                :src="imgServerPath+goods.image.url"
                fit="contain"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-aside>
      <el-main>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="goods in goodsList" v-bind:key="goods.id" :title="goods.name" :name="goods.id">
            <div>{{ goods.desc }}</div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgServerPath: this.$GLOBAL.imgServerPath,
      goodsList: [],
      activeName: ''
    }
  },
  components: {},
  created() {
    //获取最新商品5个 对应5个图
    this.axios.get("/index/getUpdateGoods")
        .then(res => {
          if (res.data.code == 1) {
            this.goodsList = res.data.data
          } else {
            this.$message.error("Server Error In getUpdateGoods!")
          }
        })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.brand-goods
  margin-top: 30px
  border: 1px solid rgba(0, 0, 0, .1)
  border-radius: 8px
  overflow: hidden
  background-color: white

  .hot-header
    background-color: #fafafa
    line-height 60px
    font-size: 18px
    position: relative
    padding-left: 30px

  .official-box
    .bigPic
      box-sizing: border-box
      border-top: 1px solid rgba(0, 0, 0, .1)
      border-right: 1px solid rgba(0, 0, 0, .1)
      height: 429px
      width: 50%
      float: left

      img
        width: 100%
        height: 100%

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
}
</style>

