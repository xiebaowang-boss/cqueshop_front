<template>
  <div>
    <el-button size="small" plain @click="dialogFormVisible = true">发表评论</el-button>
    <el-dialog title="发表评论" :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="comment" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="商品评分" prop="rate">
          <el-rate
              v-model="comment.rate"
              :colors="colors">
          </el-rate>
        </el-form-item>
        <el-form-item label="评价内容" prop="content">
          <el-input
              type="textarea"
              autosize
              placeholder="请输入评价"
              v-model="comment.content">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commentHandler">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "addComment",
  props: {
    goodsId: String,
    orderItemId: String
  },
  data(){
    return{
      dialogFormVisible: false,
      formLabelWidth: "120px",
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      comment: {
        rate: 0,
        content: "",
        user: {
          id: localStorage.getItem("token")
        },
        goods: {
          id: this.goodsId,
        }
      },
      rules: {
        rate: [
          { required: true, message: '请填写评分', trigger: 'blur' },
        ],
        content: [
          { required: true, min: 1, max: 255,message: '请正确填写商品评论信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    commentHandler(){
      this.axios.post("/comment/addFromOrderItem/"+this.orderItemId,this.comment)
      .then(res => {
        if (res.data.code == 1){
          this.$notify.success({
            title: "发表成功",
            message: "成功发表了一条商品评论信息！"
          })
          this.dialogFormVisible = false
          this.$emit("sendCommSuccess")
        }else{
          this.$notify.error({
            title: "发表失败",
            message: "发表商品评论信息失败！"
          })
        }
      })
    }
  },
  watch:{
    orderItemId(newValue){
      console.log("新的订单详情ID："+newValue)
    }
  }
}
</script>

<style scoped>

</style>