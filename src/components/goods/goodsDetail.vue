<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="商品详情" style="margin: 30px 0px 30px 10%">
      </el-page-header>
    </el-header>
    <el-container>
      <el-aside width="50%">
        <el-image
            style="width: 500px; height: 400px;margin-top: 10%"
            :src="this.$GLOBAL.imgServerPath+goods.image.url"
            fit="contain"></el-image>
      </el-aside>
      <el-main>
        <goods-detail-card :goods="goods"></goods-detail-card>
      </el-main>

    </el-container>
    <el-footer>
      <el-row :gutter="20">
        <el-col :span="6">-</el-col>
        <el-col :span="6">
          <buy-right-now-btn :goods-id="goodsId"/>
        </el-col>
        <el-col :span="6">
          <el-button icon="el-icon-shopping-cart-2" @click="addToCart">加入购物车</el-button>
        </el-col>
        <el-col :span="6">-</el-col>
      </el-row>
    </el-footer>
    <comm-info :goods-id="goodsId"/>
  </el-container>
</template>

<script>
import GoodsDetailCard from "@/components/goods/goodsDetailCard/goodsDetailCard";
import BuyRightNowBtn from "@/components/goods/buyRightNow/BuyRightNowBtn";
import CommInfo from "@/components/goods/comments/commInfo";

export default {
  name: "goodsDetail",
  components: {CommInfo, BuyRightNowBtn, GoodsDetailCard},
  data() {
    return {
      goods: null,
      goodsId: this.$route.params.goodsId
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    addToCart() {
      let token = localStorage.getItem('token')
      if (token == "null" || token == null) {
        this.$message.warning("添加商品到购物车失败！请先登录！")
      } else {
        this.axios.post("/cart/addGoodsToCart", {
          goodsid: this.$route.params.goodsId,
          userId: token
        })
            .then(res => {
              if (res.data.code == 1) {
                this.$notify({
                  title: '成功',
                  message: '成功添加一条商品信息到购物车！',
                  type: 'success'
                });
              }
            })
      }
      console.log("goodsId:" + this.goodsid)
    }
  },
  mounted() {
    console.log("商品id：" + this.$route.params.goodsId)
    this.axios.get("/goods/" + this.$route.params.goodsId)
        .then(res => {
          if (res.data.code == 1) {
            this.goods = res.data.data
          } else {
            this.$message.error("未获取到商品！")
          }
        })
  }
}
</script>

<style scoped>
.el-footer {
  color: #333;
  line-height: 60px;
  text-align: center;
}

.el-aside {
  background-color: rgb(237, 237, 237);
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

.el-container {
  margin: auto;
  width: 1228px;
  margin-bottom: 40px;
  margin-top: 10px;
}
</style>
