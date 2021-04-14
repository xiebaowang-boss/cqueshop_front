<template>
  <el-popover
    placement="bottom-end"
    trigger="hover"
    :open-delay='open_delay'
    :close-delay='close_delay'>
    <el-card v-if="isLogin" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>用户:{{ '   '+user.name }}</span>
        <el-button @click="logout" type="text" style="float: right; padding: 3px 0">注销</el-button>
      </div>
      <div  class="text item">
        {{ '用户名：'+user.username }}
      </div>
      <div  class="text item">
        {{ '邮箱：'+user.email }}
      </div>
      <div  class="text item" v-if="user.role == 1">
         角色：用户
      </div>
      <div  class="text item" v-if="user.status == 1">
         状态：正常
      </div>
      <div style="text-align: center;" >
        <el-button type="text" style=" padding: 3px 0">个人中心</el-button>
        <my-order/>
      </div>
    </el-card>
    <el-card v-else class="box-card" shadow="hover">
      <div class="clearfix">
        <span>用户尚未登录</span>
        <el-button style="float: right;" type="text">
          <router-link to="/login">去登录</router-link>
        </el-button>
      </div>
    </el-card>
    <el-avatar slot="reference" size="large" :src="avatarURL"></el-avatar>
  </el-popover>
</template>

<script>
import store from "../../../curUser/store";
import MyOrder from "@/components/header/User/myOrder";

export default {
  name: "user",
  components: {MyOrder},
  data() {
    return {
      open_delay: 100,
      close_delay: 200,
      user: '',
      isLogin: false,
      avatarURL: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    logout() {
      console.log("用户注销！")
      localStorage.setItem('token', null)
      console.log("token------"+localStorage.getItem('token'))
      store.commit('logout')
      location.reload()
    }
  },
  mounted() {
    if (localStorage.getItem("token") != null) {
      this.axios.post("/login/getUserInfoByToken", {token: localStorage.getItem("token")})
        .then(response => {
          if (response.data.code == 0) {
            console.log("此登录信息已过期：" + localStorage.getItem("token"))
            store.commit('logout')
            this.isLogin = false
          } else if (response.data.code == 1) {
            store.commit("login", localStorage.getItem("token"))
            this.avatarURL = this.$GLOBAL.imgServerPath + response.data.data.avatar.url
            this.user = response.data.data;
            this.isLogin = true
            //location.reload()
          }
        })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
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
  width: 300px;

}
</style>
