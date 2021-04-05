<template>
  <div>
    <el-upload
      :action=baseUrl
      name="file"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handlerSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="点击上传图片">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "uploadCarouselImg",
  data() {
    return {
      baseUrl: this.$GLOBAL.UploadIndexCarousePath,
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      const isIMG = file.type === 'image/*';
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file);
      if (!isIMG) {
        this.$message.error('上传的文件只能是图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isIMG && isLt2M;
    },
    handlerSuccess(res, file, fileList){
      console.log(res.data)
    }
  }
}
</script>

<style scoped>

</style>
