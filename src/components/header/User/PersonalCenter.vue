<template>
  <div>
    <el-button @click="dialogVisible = true" type="text" style=" padding: 3px 0">个人中心</el-button>
    <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="50%"
        @open="getUserinfo(userId)"
        append-to-body
    >
      <el-form
          :status-icon="status_icon"
          label-position="right"
          :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="user.username" placeholder="请输入用户名(此用户名用于登录)" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input disabled v-model="user.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="user.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="user.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="user.sex">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('user')">保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
name: "PersonalCenter",
  props: {
    userId: String
  },
  data() {
    return {
      status_icon: true,
      dialogVisible: false,
      user: {
        name: '',
        username: '',
        sex: '',
        phone: '',
        email: ''
      },
      rules: {
        name: [{required: true, min: 3, max: 10, message: '请输入昵称,长度在3到10个字符', trigger: 'blur'}],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 20, message: '长度在 5 到 20 个字符,推荐使用邮箱', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {
            pattern: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/admin/user/update', this.user)
              .then((res) => {
                if (res.data.code == 1) {
                  this.$notify.success({
                    title: "修改成功",
                    message: "已成功保存了用户信息！"
                  })
                  this.dialogVisible = false
                } else {
                  this.$message.error(res.data.msg)
                }
              })
        } else {
          this.$message.error('请检查所填写的用户信息！')
          return false;
        }
      });
    },
    async getUserinfo(userId) {
      this.axios.get("/admin/user/get/" + userId)
          .then(res => {
            if (res.data.code == 1){
              this.user = res.data.data
            }else{
              this.$message.error("获取用户信息失败！")
            }
          })
    }
  }
}
</script>

<style scoped>

</style>