<template>
  <div>
    <el-button @click="uploadGoodsFormVisible=true">新增商品</el-button>
    <el-dialog title="新增商品" :visible.sync="uploadGoodsFormVisible" center :destroy-on-close="destroyonclose">
      <el-form :model="goodsInfo" :rules="rules" ref="goodsInfo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input v-model="goodsInfo.desc"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="goodsInfo.category.id" @change="selectChange" placeholder="请选择商品分类">
            <el-option v-for="(category,index) in categoryList" :key="index" :label="category.categoryName"
                       :value="category.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="oriprice">
          <el-input type="number" v-model="goodsInfo.oriprice"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <upload-goods-img @submitGoodsImage="acceptGoodsImage($event)"></upload-goods-img>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('goodsInfo')">立即添加</el-button>
          <el-button @click="uploadGoodsFormVisible=false">取  消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import UploadGoodsImg from "../../util/uploadGoodsImg";

export default {
  name: "uploadGoods",
  components: {UploadGoodsImg},
  data() {
    return {
      destroyonclose: true,
      uploadGoodsFormVisible: false,
      categoryList: [],
      goodsInfo: {
        name: '',
        desc: '',
        image: null,
        oriprice: '',
        category: {
          id: ''
        }
      },
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        image: [
          {required: true, message: '请上传商品图片', trigger: 'change'}
        ],
        oriprice: [
          {required: true, message: '请输入商品价格', trigger: 'change'}
        ],
        category: [
          {required: true, message: '请选择商品类别', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请输入商品描述', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    selectChange() {
      this.$forceUpdate()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/goods/add", this.goodsInfo)
              .then(res => {
                console.log(res.data.code)
                this.uploadGoodsFormVisible = false
                if (res.data.code == 1) {
                  this.$refs[formName].resetFields();
                  this.$message.success("成功添加了一条商品信息！")
                } else {
                  this.$message.error("添加商品信息失败！请联系管理员！")
                }
              })
        } else {
          this.$message.warning("请检查所填写的商品信息！")
          return false;
        }
      });
    },
    acceptGoodsImage(data) {
      this.goodsInfo.image = data
    }
  },
  created() {
    this.axios.get("/category/getAllEnabled")
        .then(res => {
          this.categoryList = res.data.data;
        })
  }
}
</script>
