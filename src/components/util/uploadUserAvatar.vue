<template>
  <el-upload
    class="avatar-uploader"
    :action="baseUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :limit="limit"
    name="file">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>


<script>
export default {
  name: 'uploadUserAvatar',
  data() {
    return {
      limit:1,
      imageUrl: '',
      baseUrl: this.$GLOBAL.UploadUserAvatarPath,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$message.success("头像上传成功！")
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('submitUserAvatar', res.data)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type.toString().includes('image');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('只能上传图片作为头像!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
