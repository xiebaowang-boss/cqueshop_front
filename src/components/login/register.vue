<template>
  <el-form
    style="padding: 60px;background-color: white"
    :status-icon="status_icon"
    label-position="right"
    :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
    <el-form-item label="昵称" prop="name">
      <el-input v-model="user.name" placeholder="请输入用户名或者电话号码"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="user.username" placeholder="请输入用户名(此用户名用于登录)" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="user.password" placeholder="请输入密码" :show-password='showPassword' autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="phone">
      <el-input type="tel" v-model="user.phone" placeholder="请输入电话号码"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="user.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <upload-user-avatar @submitUserAvatar="acceptUserAvatar($event)"></upload-user-avatar>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="user.sex">
        <el-radio-button label="男"></el-radio-button>
        <el-radio-button label="女"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item style="margin-top: 50px">
      <el-button type="primary" @click="submitForm('user')">立即注册</el-button>
      <el-button @click="resetForm('user')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadUserAvatar from "../util/uploadUserAvatar";

export default {
  name: "register",
  components: {UploadUserAvatar},
  data() {
    return {
      status_icon: true,
      showPassword: true,
      user: {
        name: '',
        username: '',
        password: '',
        sex: '',
        avatar: '',
        phone: '',
        email: ''
      },
      rules: {
        name:[{required: true,min:3,max:10,message: '请输入昵称,长度在3到10个字符',trigger: 'blur'}],
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
        phone:[
          {required: false, message: '请输入正确的电话号码', trigger: 'blur'},
          {min: 11,max: 11,message:'输入正确的电话号码',trigger: 'blur'}
        ],
        avatar:[
          {required: true, message: '请选择头像', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/login/userRegister', this.user)
            .then((response) => {
              console.log("用户注册" + response.data)
              if (response.data.code == 1){
                this.$message.success('恭喜你，注册成功！现在可以用这个账号进行登录啦！')
                this.$router.push('/login')
              }else {
                this.$message.error('注册失败！')
              }
            })
          .catch( reason => {
            this.$message.error('注册失败！网络超时！'+reason)
          })
        } else {
          this.$message.error('请检查所填写的用户信息！')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //接收上传头像组件上传的头像对象
    acceptUserAvatar(data){
      this.user.avatar = data;
    }
  }
}
</script>

<style scoped>

</style>
