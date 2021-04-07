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
      console.log("开始搜索")
      this.$router.push("/categoryGoods/search/"+this.keywords)
    }
  },
}
</script>

<style scoped>

</style>