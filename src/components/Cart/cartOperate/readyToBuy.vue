<template>
  <div>
    <el-button @click="dialogFormVisible = true">立即结算</el-button>
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
        <el-form-item label="送货方式" prop="sendType">
          <el-select v-model="orderInfo.sendTypeId" @change="selectChange" placeholder="请选择送货方式">
            <el-option v-for="(sendType,index) in sendTypeList" :key="index" :label="sendType.name"
                       :value="sendType.id"/>
          </el-select>
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
      sendTypeList:[],
      orderInfo: {
        name: '',
        phone: '',
        address: '',
        sendTypeId:'',
        remarks: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          {required: true,message: '请输入电话号码', trigger: 'blur'},
          {
            pattern: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: '输入收货地址', trigger: 'change' },
          {min: 3, max: 20, message: '请正确输入收获地址', trigger: 'blur'}
        ],
        sendType:[
          {required: true, message: '请选择送货方式', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    buyCart(){
      this.axios.post("/cart/placeAnOrderFromCart/"+localStorage.getItem("token"),this.orderInfo)
      .then(res => {
        if (res.data.code == 1){
          this.dialogFormVisible = false
          this.$emit("paySuccess")
        }else{
          this.$notify.error({
            title: '购买失败',
            message: '购物车结账失败！'
          })
        }
      })
    },
    selectChange() {
      this.$forceUpdate()
    },
    getSendTypeList(){
      this.axios.get("/sendType/getSendTypeEnabled")
      .then(res => {
        if (res.data.code == 1){
          this.sendTypeList = res.data.data
        }else{
          this.$notify.error({
            title: '失败',
            message: '获取送货方式失败！'
          })
        }
      })
    }
  },
  mounted() {
    this.getSendTypeList()
  }
}
</script>

<style scoped>

</style>