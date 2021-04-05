<template>
  <el-form
    style="padding: 60px;background-color: white"
    label-position="right"
    :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入用户名或者电话号码"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" placeholder="密码" :show-password='showPassword'></el-input>
    </el-form-item>
    <el-form-item style="margin-top: 50px">
      <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import store from "../../curUser/store";
export default {
  name: 'Login',
  data() {
    return {
      showPassword: true,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loding = true;
          this.axios.post('/login/userLogin', this.loginForm)
            .then(res => {
              if (res.data.code == 1){
                this.$message.success(res.data.msg)
                localStorage.setItem("token",res.data.data)
                store.commit("login",res.data.data)
                console.log('登录返回的用户token：' + res.data.data)
                this.$router.push("/").then(() => {
                  location.reload()
                } )
              }else {
                this.$message.warning(res.data.msg)
              }
            })
            .catch(reason => {
              this.$message.error("登录失败！网络超时！")
              console.log("登录失败的reson："+reason.toString())
            })
          this.loadding = false;
        } else {
          this.$message.warning("请规范填写登录信息！")
          return false;
        }
      });
    }
  }
}
</script>
