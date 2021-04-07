<template>
  <el-table
      :data="orderList"
      style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品总数;">
            <span>{{ props.row.totalNum }}</span>
          </el-form-item>
          <el-form-item label="订单总价；">
            <span>{{ props.row.totalPrice }}元</span>
          </el-form-item>
          <el-form-item label="收货地址：">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="收货电话：">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="下单人：">
            <span>{{ props.row.orderUser.name }}</span>
          </el-form-item>
          <el-form-item label="订单备注：">
            <span>{{ props.row.remarks }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
        label="订单编号">
      <template slot-scope="scope">
        <el-button type="text" @click="toOrderItemPage(scope.row.id)">{{ scope.row.id }}</el-button>
      </template>
    </el-table-column>
    <el-table-column
        label="收货人"
        width="200"
        prop="name">
    </el-table-column>
    <el-table-column
        label="下单时间"
        prop="createDate">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "orderList",
  props:{
    orderList:{
      type: Array
    }
  },
  data(){
    return{

    }
  },
  methods: {
    toOrderItemPage(orderId){
      this.$emit("toOrderItemPage",orderId)
    }
  },
  watch:{
    orderList(){
      console.log("订单信息更新了！")
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>