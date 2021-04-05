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
          style="width: 100%;height: 50%"
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
                style="width: 250px; height: 100px;margin: auto"
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

      </el-table>
    </el-main>
    <el-footer v-if="cartItem.length > 0">
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
          <el-button>立即购买</el-button>
        </el-col>
        <el-col :span="6">-</el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      cartItem: [],
      token: this.$route.params.token,
      showsummary: true,
      imgServerPath: this.$GLOBAL.imgServerPath
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    delCart() {
      this.axios.get("/cart/del/" + localStorage.getItem("token"))
          .then(res => {
            if (res.data.code == 1) {
              this.$notify({
                title: '成功',
                message: '成功清空购物车！',
                type: 'success'
              });
              window.location.reload()
            } else {
              this.$notify({
                title: '错误',
                message: '清空购物车失败！',
                type: 'error'
              });
            }
          })

    }
  },
  created() {
    if (localStorage.getItem("token") == "null") {
      this.$message.warning("当前未登录，正在跳转到首页！")
      this.$router.push("/")
    }
  },
  mounted() {
    this.axios.get("/cart/get/" + this.token)
        .then(res => {
          if (res.data.code == 1) {
            this.cartItem = res.data.data
          } else {
            this.$message.warning("购物车暂无商品！")
          }
        })
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