<template>
  <div class="nav">
    <div class="inner clearfix">
      <div class="leftbox">
        <ul>
          <li>
            <el-link @click="toCategoryGoodsPage(0)">全部商品</el-link>
          </li>
          <li v-for="category in categoryList" v-bind:key="category.id">
            <el-link @click="toCategoryGoodsPage(category.id)">{{ category.categoryName }}</el-link>
          </li>
        </ul>
      </div>
      <div class="gouwuche">
        <el-badge :value="cartNum" class="item">
          <el-button size="small" icon="el-icon-shopping-cart-2" @click="toCart">购物车</el-button>
        </el-badge>
      </div>
      <div class="searchBox">
        <search/>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "@/components/main/navigation/search/search";

export default {
  name: 'nav',
  components: {Search},
  data() {
    return {
      categoryList: [],
      cartNum: 0,
      token: localStorage.getItem("token"),
    }
  },
  methods: {
    toCart() {
      if (this.token == "null") {
        this.$message.warning("还没有登录！请登陆后查看购物车！")
      } else {
        this.$router.push("/cart/" + this.token)
      }
    },
    toCategoryGoodsPage(categoryId) {
      console.log("去到分类商品页面" + categoryId)
      this.$router.push("/categoryGoods/" + categoryId)
    }
  },
  created() {
    //获取购物车商品数量
    if (this.token != "null") {
      console.log("获取购物车总数的token" + this.token)
      this.axios.post("/cart/getGoodsTotalNum", {token: this.token})
          .then(res => {
            if (res.data.code == 1) {
              this.cartNum = res.data.data
            } else {
              console.log("用户未创建购物车！")
            }
          })
    }
    //获取商品的分类，用于导航栏
    this.axios.get("/category/getAllEnabled")
        .then(res => {
          if (res.data.code == 1) {
            this.categoryList = res.data.data
          } else {
            this.$message.warning("获取导航栏分类信息失败！")
          }
        })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.nav
  height: 90px
  //position: relative
  width: 100%

  .inner
    margin: 0 auto
    width: 1220px

    .leftbox
      float: left
      padding-top: 37px

      li
        float: left
        padding-left: 42px
        line-height: 16px
        font-size: 14px

        &:first-child
          padding-left: 9px

        &:hover
          color: rgb(118, 156, 234)
          cursor: pointer;


.gouwuche
  float: right
  padding-top: 37px
  width: 104px
  height: 40px

.searchBox
  float right
  width 200px
  padding-top 37px
  margin-right 20px

  .logo
    float: left
    background: url(cart.png) no-repeat
    text-indent 31px
    line-height 20px
    font-size 14px

  .cartnum
    margin-left: 5px
    display: inline-block
    line-height: 18px
    height: 18px
    width: 18px
    background-color: rgba(6, 6, 6, 0.4)
    text-indent 5px
    border-radius: 10px
    color: white
    font-size: 12px

.clearfix: :after
  content: " ";
  display: block;
  clear: both;
  height: 0;

</style>
