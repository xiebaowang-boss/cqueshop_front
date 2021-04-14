<template>
  <div>
    <el-button @click="dialogFormVisible = true">立即购买</el-button>
    <el-dialog title="填写订单相关收货信息" :visible.sync="dialogFormVisible">
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
        <el-form-item label="数量">
          <el-input-number v-model="orderInfo.num" :min="1" :max="99"></el-input-number>
        </el-form-item>
        <el-form-item label="送货方式" prop="sengType">
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
        <el-button type="primary" @click="buyOne(goodsId)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BuyRightNowBtn",
  props: {
    goodsId:{
      type: String
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      sendTypeList:[],
      orderInfo: {
        name: '',
        phone: '',
        address: '',
        remarks: '',
        sendTypeId:'',
        num: 1,
        userId: localStorage.getItem("token")
      },
      rules: {
        name: [
          {required: true, message: '请输入收货人姓名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        phone: [
          {type: "number", required: true, message: '请输入收货人电话号码', trigger: 'change'},
          {min: 11, max: 11, message: '请正确输入电话号码', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '输入收货地址', trigger: 'change'},
          {min: 3, max: 20, message: '请正确输入收获地址', trigger: 'blur'}
        ],
        sendType:[
          {required: true, message: '请选择送货方式', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    buyOne(goodsId) {
      this.axios.post("/goods/buyOne/" + goodsId, this.orderInfo)
          .then(res => {
            if (res.data.code == 1) {
              this.$notify.success({
                title: '购买成功',
                message: '订单详情信息请将鼠标移至右上角头像处查看！'
              })
              this.dialogFormVisible = false
              this.resetForm("orderInfo")
            } else {
              this.$notify.error({
                title: '购买失败',
                message: '购买商品失败！'
              })
            }
          })
    },
    selectChange() {
      this.$forceUpdate()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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