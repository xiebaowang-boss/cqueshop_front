<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="购物车" style="margin: 30px 0px 30px 0px">
      </el-page-header>
    </el-header>
    <el-main>
      <el-table
          :data="cartItem"
          border
          :height=" cartItem.length > 0 ? '' : 255 "
          style="width: 100%"
          empty-text="购物车暂无商品"
          :show-summary="showsummary"
          row-key="goods.id"
      >
        <el-table-column
            label="商品图片"
            width="180"
        >
          <template slot-scope="scope">
            <el-image
                style="width: 250px; height: 100px"
                :src="imgServerPath+scope.row.goods.image.url"
                fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="goods.name"
            label="商品名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="goods.desc"
            label="商品描述">
        </el-table-column>
        <el-table-column
            label="商品原价（元）"
            width="180">
          <template slot-scope="scope">
            ￥ <span style="text-decoration: line-through">{{ scope.row.goods.oriprice }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="商品现价（元）">
          <template slot-scope="scope">
            ￥ <span style="color: red">{{ scope.row.goods.nowprice }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="num"
            label="商品数量">
        </el-table-column>
        <el-table-column
            label="商品总价（元）"
            prop="totalPrice">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm
                title="确定删除从购物车删除此件商品吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                  size="small"
                  type="danger"
                  slot="reference">
                删除商品
              </el-button>
            </el-popconfirm>
          </template>

        </el-table-column>

      </el-table>
    </el-main>
    <el-footer v-if="cartItem.length > 0">
      <cart-operate @paySuccess="paySuccess($event)" @clearCart="clearCart($event)"/>
    </el-footer>
  </el-container>
</template>

<script>
import CartOperate from "@/components/Cart/cartOperate/cartOperate";

export default {
  name: "cart",
  components: {CartOperate},
  data() {
    return {
      cartItem: [],
      token: this.$route.params.token,
      showsummary: true,
      imgServerPath: this.$GLOBAL.imgServerPath
    }
  },
  methods: {
    paySuccess(){
      this.getCart()
    },
    goBack() {
      this.$router.back()
    },
    async handleDelete(index, row) {
      console.log("index:" + index + "--key:" + row.key + "--goodsid" + row.goods.id)
      this.axios.post("/cart/delGoodsFromCart", {
        goodsId: row.goods.id,
        userId: localStorage.getItem("token")
      }).then(res => {
        if (res.data.code == 1) {
          this.$notify.success({
            title: "删除成功",
            message: "成功从购物车当中删除一条商品信息！"
          })
          this.getCart()
        }else {
          this.$notify.error({
            title: "删除失败",
            message: res.data.msg
          })
        }
      })
    },
    async getCart() {
      this.axios.get("/cart/get/" + this.token)
          .then(res => {
            if (res.data.code == 1) {
              this.cartItem = res.data.data
            } else {
              //使购物车数据刷新
              this.cartItem = new Array()
            }
          })
    },
    clearCart(){
      this.getCart()
    }
  },
  mounted() {
    if (localStorage.getItem("token") == "null") {
      this.$message.warning("当前未登录，正在跳转到首页！")
      this.$router.push("/")
    }else {
      this.getCart()
    }
  }
}
</script>

<style scoped>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  color: #333;
  text-align: center;
  padding: 0px;
  margin-top: 30px;
  border: 1px solid rgba(0, 0, 0, .14);
  border-radius: 8px
}

.el-container {
  margin: auto;
  width: 1228px;
  margin-bottom: 40px;
  margin-top: 10px;
}

.el-footer {
  margin-top: 50px;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.el-button {
  border: 1px solid rgba(0, 0, 0, .14);
  border-radius: 8px
}
</style>