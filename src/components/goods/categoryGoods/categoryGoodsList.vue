<template>
  <div class="hot-goods">
    <div class="hot-header">
      <h5>{{ listName }}</h5>
    </div>
    <goods-card :goods-list="goodsList"></goods-card>
    <div v-if="goodsList.length > 0" style="width: 100%;text-align: center;margin-top: 30px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 16, 32, 64]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total">
      </el-pagination>
    </div>
    <no-result v-else/>
  </div>
</template>

<script>
import goodsCard from '../goodsCard'
import NoResult from "@/components/goods/noResult";

export default {
  name: "categoryGoodsList",
  components: {NoResult, goodsCard},
  props: {
    listName: {
      default: '商品列表'
    }
  },
  data() {
    return {
      keywords: this.$route.params.keywords,
      goodsList: [],
      categoryId: this.$route.params.categoryId,
      currentPage: 1,
      pageSize: 16,
      total: 0,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getGoodsData(val, this.currentPage)
    },
    handleCurrentChange(val) {
      this.getGoodsData(this.pageSize, val)
    },
    getGoodsData(pageSize, currentPage) {
      this.axios.post("/goods/getByCategoryId", {
        categoryId: this.categoryId,
        pageSize: pageSize,
        currentPage: currentPage
      }).then(res => {
        if (res.data.code == 1) {
          this.goodsList = res.data.data.list
          this.total = res.data.data.total
          console.log("获取分类数据成功！")
        } else {
          console.log("获取分类商品数据失败！")
        }
      })
    }
  },
  created() {
    console.log("路由获取到的商品分类id：" + this.categoryId)
    this.getGoodsData(this.pageSize, this.currentPage)
  },
  watch: {
    "$route.params.categoryId": {
      handler(newValue) {
        this.categoryId = newValue
        this.getGoodsData(this.pageSize, this.currentPage)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.hot-goods
  width: 1228px
  margin auto
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