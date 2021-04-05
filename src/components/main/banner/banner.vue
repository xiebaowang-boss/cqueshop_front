<template>
  <div class="block">
    <el-carousel height="500px" style="border-radius: 10px;border: 1px solid rgba(0,0,0,.1)">
      <el-carousel-item v-for="item in indexImgs" :key="item.id">
        <img :src="imgServerPath+item.url"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
</style>
<script>

export default {
  data: function () {
    return {
      imgServerPath: this.$GLOBAL.imgServerPath,
      indexImgs: []
    }
  },
  created() {
    this.axios.get('/index/getCarouselImg').then(
      (response) => {
        this.indexImgs = response.data.data
      }
    )
  }
}
</script>
