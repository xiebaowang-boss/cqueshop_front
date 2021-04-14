<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><b>{{ goods.name }}</b></span>
    </div>
    <div class="text item">
      {{ '商品所属分类：' + goods.category.categoryName }}
    </div>
    <div class="text item">
      {{ '商品描述：' + goods.desc }}
    </div>
    <div class="text item">
      商品原价：￥
      <span style="text-decoration: line-through">{{ goods.oriprice }}</span>
    </div>
    <div class="text item">
      商品现价：￥
      <span style="color: red">{{ goods.nowprice }}</span>
    </div>
    <div class="text item">
      上架时间： {{ goods.createtime | formatDate }}
    </div>
    <div class="text item" v-if="goods.status == 1">
      商品状态： 在售
    </div>
    <div class="text item">
      {{ '销量：' + goods.salesVolume }}
    </div>

  </el-card>
</template>

<script>

export default {
  name: "goodsDetailCard",
  props: ["goods"]
}
</script>

<style scoped>
.text {
  font-size: 18px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin: auto;
  margin-top: 10%;
  border-radius: 8px;
}
</style>