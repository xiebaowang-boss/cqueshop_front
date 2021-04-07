<template>
  <div>
    <el-button @click="dialogFormVisible = true">立即购买</el-button>
    <el-dialog title="填写订单相关收货信息" :visible.sync="dialogFormVisible" :destroy-on-close="destroyonclose">
      <el-form :model="orderInfo" :rules="rules" ref="orderInfo" :label-width="formLabelWidth">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="orderInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="orderInfo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="orderInfo.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单备注">
          <el-input v-model="orderInfo.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="buyCart">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "readyToBuy",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      destroyonclose: true,
      orderInfo: {
        name: '',
        phone: '',
        address: '',
        remarks: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { type:"number",required: true,message: '请输入收货人电话号码', trigger: 'change' },
          { min: 11, max: 11,message: '请正确输入电话号码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '输入收货地址', trigger: 'change' },
          {min: 3, max: 20, message: '请正确输入收获地址', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    buyCart(){
      this.axios.post("/cart/placeAnOrderFromCart/"+localStorage.getItem("token"),this.orderInfo)
      .then(res => {
        if (res.data.code == 1){
          this.$notify.success({
            title: '购买成功',
            message: '订单详情信息请将鼠标移至右上角头像处查看！'
          })
          this.dialogFormVisible = false
          this.$router.go(0)
        }else{
          this.$notify.error({
            title: '购买失败',
            message: '购物车结账失败！'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>