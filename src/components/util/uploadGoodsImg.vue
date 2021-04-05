<template>
  <div>
    <el-upload
        :limit="limit"
        :action="baseUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "uploadGoodsImg",
  data() {
    return {
      dialogVisible: false,
      limit: 1,
      baseUrl: this.$GLOBAL.UploadGoodsImgPath,
      imageUrl: '',
      fileList: []
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.$message.success("商品图片上传成功！")
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('submitGoodsImage', res.data)
    },
    beforeUpload(file) {
      const isJPG = file.type.toString().includes('image');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('只能上传图片作为头像!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>

</style>
