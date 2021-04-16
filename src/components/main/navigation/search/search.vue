<template>
  <el-input
      size="small"
      placeholder="请输入关键词"
      prefix-icon="el-icon-search"
      @keyup.enter.native="searchHandler"
      v-model="keywords"
      :maxlength="maxlength"></el-input>
</template>

<script>
export default {
  name: "search",
  data() {
    return{
      keywords: '',
      maxlength: 10
    }
  },
  methods: {
    searchHandler() {
      if (this.keywords == ''){
        return this.$message.info("请输入商品关键字！")
      }else {
        this.$router.push("/categoryGoods/search/"+this.keywords)
      }
    }
  },
}
</script>

<style scoped>

</style>