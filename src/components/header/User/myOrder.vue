<template>
  <div>
    <el-button @click="drawer = true" type="text" style=" padding: 3px 0;margin-top: 10px;text-align: center">我的订单
    </el-button>
    <el-drawer
        @open="getOrderList"
        append-to-body
        title="我的订单"
        :visible.sync="drawer"
        size="50%"
        style="height: 100%">
      <div>
        <el-button icon="el-icon-refresh-right" @click="getOrderList" style="margin-left: 20px">刷新我的订单</el-button>
        <el-drawer
            title="订单详情"
            :append-to-body="true"
            :visible.sync="innerDrawer"
            size="40%">
          <order-detail-list @sendCommSuccess="sendCommSuccess($event)" :orderItemList="orderItemList"/>
          <div style="margin-top: 30px;text-align: center;float: bottom">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :total="inner.total"
                :page-size="inner.pageSize"
                :current-page="inner.currentPage"
                @current-change="handleInnerCurrentChange"
            ></el-pagination>
          </div>
        </el-drawer>
      </div>
      <order-list @toOrderItemPage="acceptOrderData($event)" :order-list="orderList"/>
      <div style="margin-top: 20px;text-align: center;float: bottom">
        <el-pagination
            background
            layout="total,prev, pager, next,jumper"
            :total="outer.total"
            :current-page="outer.currentPage"
            :page-size="outer.pageSize"
            @current-change="handleOuterCurrentChange"
        >
        </el-pagination>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import OrderList from "@/components/Order/orderList";
import OrderDetailList from "@/components/Order/orderDetailList";

export default {
  name: "myOrder",
  components: {OrderDetailList, OrderList},
  data() {
    return {
      orderId: '',
      drawer: false,
      innerDrawer: false,
      direction: 'rtl',
      orderList: [],
      orderItemList: [],
      outer: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      },
      inner: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    };
  },
  methods: {
    getOrderList() {
      //获取当前登录账号的订单信息
      this.axios.post("/order/getOrderByUserId/" + localStorage.getItem("token"), this.outer)
          .then(res => {
            if (res.data.code == 1) {
              this.orderList = res.data.data.list
              this.outer.total = res.data.data.total
              return res.data.code
            } else {
              this.$notify.error({
                title: '失败',
                message: '获取商品订单失败'
              })
            }
          })
    },
    acceptOrderData(orderId) {
      console.log("获取到的订单ID：" + orderId)
      this.orderId = orderId
      this.getOrderItemList(orderId)
    },
    getOrderItemList(orderId) {
      this.axios.post("/order/getOrderItemByOrderId/" + orderId, this.inner)
          .then(res => {
            if (res.data.code == 1) {
              this.orderItemList = res.data.data.list
              this.inner.total = res.data.data.total
              this.innerDrawer = true
            } else {
              this.$message.error("获取订单详情失败！")
            }
          })
    },
    handleOuterCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.outer.currentPage = val
      this.getOrderList()
    },
    handleInnerCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.inner.currentPage = val
      this.getOrderItemList(this.orderId)
    },
    sendCommSuccess(){
      this.getOrderItemList(this.orderId)
    }
  }
}
</script>

<style scoped>

</style>