<template>
  <el-table
      :data="orderItemList"
      border
      style="width: 100%"
      empty-text="购物车暂无商品"
      :show-summary="showsummary"
      row-key="goods.id"
  >
    <el-table-column
        label="商品图片"
        width="140"
    >
      <template slot-scope="scope">
        <el-image
            style="width: 140px; height: 100px;margin: auto"
            :src="imgServerPath+scope.row.goods.image.url"
            fit="contain"
            :preview-src-list=[imgServerPath+scope.row.goods.image.url]
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column
        prop="goods.name"
        label="商品名称"
        width="100">
    </el-table-column>
    <el-table-column
        label="成交价格（元）">
      <template slot-scope="scope">
        ￥ <span style="color: red">{{ scope.row.goods.nowprice }}</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="num"
        label="商品数量">
    </el-table-column>
    <el-table-column
        label="成交总价（元）"
        prop="totalPrice">
    </el-table-column>
    <el-table-column
        label="评论">
      <template slot-scope="scope">
        <add-comment v-if="scope.row.isComm == 0" @sendCommSuccess="sendCommSuccess($event)" :order-item-id="scope.row.id" :goods-id="scope.row.goods.id"/>
        <el-button v-else @click="isComm" type="success" icon="el-icon-check" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import AddComment from "@/components/Order/comment/addComment";

export default {
  name: "orderDetailList",
  components: {AddComment},
  props: {
    orderItemList: {
      type: Array
    }
  },
  data() {
    return {
      showsummary: true,
      imgServerPath: this.$GLOBAL.imgServerPath
    }
  },
  methods:{
    sendCommSuccess(){
      this.$emit("sendCommSuccess")
    },
    isComm(){
      this.$message.info("当前商品已经评论过了！")
    }
  },
  watch: {
    orderItemList(newValue) {
      console.log("订单详情数据更新了！")
      this.orderItemList = newValue
    }
  }
}
</script>

<style scoped>

</style>