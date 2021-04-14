<template>
  <div>
    <div style="text-align: center;margin-top: 30px">
      <h3>商品评论</h3>
      <el-divider></el-divider>
    </div>
    <div v-if="commentList.length > 0">
      <el-card  v-for="comment in commentList" v-bind:key="comment.id" class="box-card">
        <el-rate
            v-model="comment.rate"
            disabled
            show-score
            text-color="#ff9900"
            :colors="colors"
            score-template="{value}"
            style="float: right">
        </el-rate>
        <span style="float: right">评分：</span>
        <div class="text item">
          {{ '@'+ comment.user.name }}
        </div>
        <div class="text item">
          {{ '评语：'+ comment.content }}
        </div>
        <div class="text item">
          {{ comment.createTime | formatDate }}
        </div>
      </el-card>
    </div>

    <div v-else style="text-align: center">
      <span>当前商品暂无评论</span>
    </div>
    <div v-if="commentList.length > 0" class="pageInfo">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "commInfo",
  props:{
    goodsId: String
  },
  data(){
    return{
      total: 0,
      commentList:[],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      pageInfo:{
        currentPage: 1,
        pageSize: 10,
      }
    }
  },
  methods:{
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getGoodsComments()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.getGoodsComments()
      console.log(`当前页: ${val}`);
    },
    getGoodsComments(){
      this.axios.post("/comment/getByGoodsId/"+this.goodsId,this.pageInfo)
          .then(res => {
            if (res.data.code == 1){
              this.commentList = res.data.data.list
              this.total = res.data.data.total
            }else {
              this.$notify.error({
                title: "失败",
                message: "获取商品评论失败！"
              })
            }
          })
    }
  },
  created() {
    this.getGoodsComments()
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 1220px;
  margin-top: 10px;
}
.pageInfo{
  width: 1220px;
  background-color: white;
  padding: 20px 0px;
  text-align: center;
  margin-top: 20px;
}
</style>