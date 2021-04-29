<template>
  <el-row>
    <el-col :span="6" style="padding: 10px" v-for="goods in goodsList" v-bind:key="goods.id" :push="push"
            :offset="offset">
      <el-card shadow="hover" style="margin: 0px 0px 5px 5px;">

        <el-image
            class="image"
            style="width: 234px; height: 270px;"
            :src="imgServerPath+goods.image.url"
            fit="contain"
            :preview-src-list=[imgServerPath+goods.image.url]
        ></el-image>
        <div style="padding: 10px;margin-top: 10px">
          <div class="goodsName">{{ goods.name }}</div>

          <div>
            <span style="color: red">￥&nbsp;{{ goods.nowprice }}</span>
            <span style="float: right;font-size: 12px">{{goods.category.categoryName }}</span>
          </div>

        </div>
        <el-button @click="goodsDetail(goods.id)">查看详情</el-button>
        <el-button icon="el-icon-shopping-cart-2" @click="addToCart(goods.id)"></el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "goodsCard",
  props: ["goodsList"],
  data() {
    return {
      imgServerPath: this.$GLOBAL.imgServerPath,
      push: 0,
      offset: 0
    };
  },
  methods: {
    goodsDetail(goodsid) {
      console.log("goodsId:" + goodsid)
      this.$router.push("/goodsDetail/" + goodsid)
    },
    addToCart(goodsid) {
      let token = localStorage.getItem('token')
      if (token == "null" || token == null){
        this.$message.warning("添加商品到购物车失败！请先登录！")
      }else {
        this.axios.post("/cart/addGoodsToCart", {
          goodsid: goodsid,
          userId: token
        })
        .then(res => {
          if (res.data.code == 1){
            this.$notify({
              title: '成功',
              message: '成功添加一条商品信息到购物车！',
              type: 'success'
            });
          }
        })
      }
      console.log("goodsId:" + goodsid)
    }
  },
  watch:{
    goodsList(){
        console.log("goodscard数据更新！")
    }
  }
}
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}
.goodsName{
  display: block;
  height: 50px;
}
</style>