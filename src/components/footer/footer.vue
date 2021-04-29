<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
        <ul class="footer-nav clearfix">
          <li v-for="item in footerlist" v-bind:key="item.name">
            <h1>{{ item.dt }}</h1>
            <ul style="margin-top: 10px">
              <li v-for="dlitem in item.dl" v-bind:key="dlitem.name">
                <div>
                  <img :src="dlitem.img"/>
                  <a :href="dlitem.url">{{ dlitem.name + dlitem.author }}</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <div class="service">
          <p>社区杂货网店</p>
        </div>
        <div class="language"></div>
      </div>
      <div class="copyright">
        <span>Copyright © 2021  @海盗船长蟹老板</span>
        <ul class="firstul clearfix">
          <li><a href="#">社区杂货网店</a></li>
        </ul>
        <ul class="secondul">
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      footerlist: [{
        'dt': '社区杂货网店在代码仓库',
        'dl': [
          {
            name: 'Gitee',
            author: '@xiebaowang_boss',
            img: require('../../assets/images/footer/Gitee.png'),
            url: 'https://gitee.com/xiebaowang_boss'
          },{
            name: 'Github',
            author: '@xiebaowang_boss',
            img: require('../../assets/images/footer/GitHub.png'),
            url: 'https://github.com/xiebaowang-boss'
          }
        ]
      },{
        'dt': '联系我',
        'dl': [
          {
            name: 'QQ',
            author: '@1210579586',
            img: require('../../assets/images/footer/QQ.png'),
            url: '#'
          },{
            name: 'Wechat',
            author: '@x1210579586',
            img: require('../../assets/images/footer/WECHAT.png'),
            url: '#'
          }
        ]
      }
      ]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.clearfix:after
  content: "\200B"
  display: block
  height: 0
  clear: both;

.footer
  margin-top: 60px
  border-top: 1px solid #e6e6e6
  background-color white

  .container
    width: 1220px

    .siteinfo
      padding: 100px 0 32px

      .footer-nav
        li
          float: left
          width: 300px

          h3
            color: #646464
            font-size: 12px
            padding: 0 0 14px

          ul
            li
              font-size: 12px
              color: #c3c3c3
              padding: 4px 0

              a
                color: #969696

      .service
        position: absolute
        top: 100px
        right: 0

        p
          font-size: 30px
          line-height: 1
          color: #646464
          text-align: right

        span
          font-size: 12px
          color: #cabdbd

    .copyright
      color: #434d55
      font-size: 12px
      padding: 40px 0
      border-top: 1px solid #e6e6e6

      span
        float: left
        margin-right: 10px

      .firstul
        li
          float: left
          border-left: 1px solid #ccc
          padding: 0 10px

          a
            color: #5079d9

      .secondul
        li
          float: left
          color: #CABDBD
          padding: 0 10px

          &:first-child
            padding-left: 0
</style>
