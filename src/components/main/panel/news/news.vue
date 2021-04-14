<template>
  <div class="news">
    <div class="news-header">
      <h5>商城公告</h5>
    </div>
    <div style="padding: 0px 20px">
      <el-collapse accordion>
        <el-collapse-item v-for="news in newsList" v-bind:key="news.id">
          <template slot="title">
            <span style="font-size: 16px">{{ news.title }}</span>
            <el-divider direction="vertical"></el-divider>
            <span style="float: end">{{ news.createTime | formatDate }}</span>
          </template>
          <div>{{ news.content }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div style="text-align: center;margin-top: 30px">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsList: [],
      total: 0,
      pageInfo: {
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.getNews()
    },
    getNews() {
      this.axios.post("/news/getAllEnabled", this.pageInfo)
          .then(res => {
            if (res.data.code == 1) {
              this.newsList = res.data.data.list
              this.total = res.data.data.total
            } else {
              this.$notify.error({
                title: "失败",
                message: "获取公告信息失败！"
              })
            }
          })
    }
  },
  created() {
    this.getNews()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.news
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

  .news-header
    background-color: #fafafa
    line-height 60px
    font-size: 18px
    position: relative
    padding-left: 30px
</style>

