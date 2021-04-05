<template>
  <div class="header-main">
    <div class="container">
      <div class="header-logo">
        <a href="/"></a>
      </div>
      <div class="header-nav">
        <ul class="list ">
          <li v-for="item in headerItems" v-bind:key="item.item">
            <a href="#">{{ item.item }}</a>
          </li>
        </ul>
        <div class="account-panel">
          <user style="float: right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "./User/user";

export default {
  data() {
    return {
      headerItems: [
        {item: '在线商城'},
        {item: 'Smartisan M1 / M1L'},
        {item: 'Smartisan OS'},
        {item: '欢喜云'},
        {item: '应用下载'},
        {item: '官方论坛'}
      ],
    }
  },
  components: {
    user
  },
  methods: {
    loginIn: function () {
      this.num += 1
      console.log(this.num)
    }
  }
}
</script>
<style>

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}

.header-main {
  height: 100px;
  background: url(../../../static/header-bg.png) repeat-x left top;
}

.container {
  width: 1220px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.header-logo {
  float: left;
  padding-top: 25px;
}

.header-logo a {
  display: block;
  width: 50px;
  height: 50px;
  margin-left: -5px;
  background: url(crab.png) no-repeat;
  overflow: hidden;
}

.header-nav {
  float: right;
  line-height: 25px;
}

.header-nav .list {
  float: left;
  padding-top: 36px;
}

.header-nav .list li {
  float: left;
}

.header-nav ul li a {
  display: block;
  padding: 0 20px;
  line-height: 2.2;
  font-size: 14px;
  height: 28px;
  color: #9D9D9D;
}

.header-nav ul li:first-child a {
  color: white;
}

.header-nav ul li a:hover {
  color: white;
}

.account-panel {
  position: relative;
  float: left;
  padding: 39px 0 0 41px;
  margin-left: 20px;
  color: white;
  font-size: 14px;
}

.account-panel:before {
  position: absolute;
  left: 0;
  top: 44px;
  overflow: hidden;
  display: block;
  content: ' ';
  width: 1px;
  height: 13px;
  background-color: rgba(255, 255, 255, .12);
}

.account-panel a {
  display: block;
  color: #ffffff;
  background-color: #111;
  position: relative;
  top: -2px;
  width: 98px;
  height: 26px;
  border: 1px solid #2E2E2E;
  border-radius: 4px;
  line-height: 26px;
  opacity: 0.8;
  text-align: center;
}
</style>
