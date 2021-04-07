<template>
  <div class="forum-panel" >
    <div class="forum-header">
      <el-menu
        :router=useRouter
        background-color="#fafafa"
        default-active="/login/login" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/login/login" style="width: 50%;">登录</el-menu-item>
        <el-menu-item index="/login/register" style="width: 50%;">注册</el-menu-item>
      </el-menu>
    </div>
    <div class="line"></div>
    <div class="forum-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data(){
    return{
      useRouter: true,
    }
  },
  methods:{
    handleSelect(){
    }
  },
  created() {
    let token = localStorage.getItem("token")
    if (token == "null" || token == null){
      this.$router.push('/login/login')
    }else{
      this.$message.warning("当前已有用户登录！请先注销即可访问登录界面！")
      this.$router.push("/")
    }

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.forum-panel
  margin: auto
  width: 1228px
  margin-top: 30px
  border: 1px solid rgba(0,0,0,.1)
  border-radius: 8px
  text-align center
  overflow: hidden
  .forum-header
    padding: 0px
    background-color: #fafafa
    line-height 60px
    font-size: 18px
    position: relative
</style>
