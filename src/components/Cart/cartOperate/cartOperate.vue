<template>
  <el-row :gutter="20">
    <el-col :span="6">-</el-col>
    <el-col :span="6">
      <el-popconfirm
          title="确定清空购物车吗？"
          @confirm="delCart"
      >
        <el-button slot="reference" icon="el-icon-delete" style="color: red">清空购物车</el-button>
      </el-popconfirm>
    </el-col>
    <el-col :span="6">
      <ready-to-buy @paySuccess="paySuccess($event)"/>
    </el-col>
    <el-col :span="6">-</el-col>
  </el-row>
</template>

<script>
import ReadyToBuy from "@/components/Cart/cartOperate/readyToBuy";
export default {
  name: "cartOperate",
  components: {ReadyToBuy},
  methods:{
    delCart() {
      this.axios.get("/cart/del/" + localStorage.getItem("token"))
          .then(res => {
            if (res.data.code == 1) {
              this.$notify({
                title: '成功',
                message: '成功清空购物车！',
                type: 'success'
              });
              this.$emit("clearCart")
            } else {
              this.$notify({
                title: '错误',
                message: '清空购物车失败！',
                type: 'error'
              });
            }
          })

    },
    paySuccess(){
      this.$notify.success({
        title: '结算成功',
        message: '订单详情信息请将鼠标移至右上角头像处查看！'
      })
      this.$emit("paySuccess")
    },
  }
}
</script>

<style scoped>

</style>