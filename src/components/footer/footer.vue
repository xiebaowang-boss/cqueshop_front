<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
        <ul class="footer-nav clearfix">
          <li v-for="item in footerlist" v-bind:key="item">
            <h3>{{item.dt}}</h3>
            <ul>
              <li v-for="dlitem in item.dl" v-bind:key="dlitem">
                <a href="#">{{dlitem}}</a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="service">
          <p>400-619-0909</p>
          <span>周一至周日9:00-18:00(仅收市话费)</span>
        </div>
        <div class="language"></div>
      </div>
      <div class="copyright">
        <span>Copyright © 2017, Smartisan Digital Co., Ltd. All Rights Reserved.北京锤子数码科技有限公司</span>
        <ul class="firstul clearfix">
          <li><a href="#">法律声明</a></li>
          <li><a href="#">隐私条款</a></li>
          <li><a href="#">开发者中心</a></li>
        </ul>
        <ul class="secondul">
          <li>京ICP备14041720号-1</li>
          <li>京ICP证140622号</li>
          <li>京公网安备11010502025474</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .clearfix:after
    content:"\200B"
    display:block
    height:0
    clear:both;
  .footer
    background-color: #fafafa
    margin-top: 60px
    border-top: 1px solid #e6e6e6
    .container
      width: 1220px
      .siteinfo
        padding: 100px 0 32px
        .footer-nav
          li
            float: left
            width: 149px
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
<script>
  export default {
    data () {
      return {
        footerlist: [{
          'dt': '订单服务',
          'dl': ['购买方式', '支付方式', '送货政策']
        }, {
          'dt': '服务支持',
          'dl': ['售后服务', '维修门店', '零售门店']
        }, {
          'dt': '自助服务',
          'dl': ['热点咨询', '预约购买', '订单物流']
        }, {
          'dt': '媒体中心',
          'dl': ['新闻动态', '官方视频', '图片资源']
        }, {
          'dt': '关于公司',
          'dl': ['公司简介', '加入我们', '联系我们']
        }, {
          'dt': '关注我们',
          'dl': ['新浪微博', '官方微信', '官方贴吧']
        }
        ]
      }
    },
    components: {

    }
  }
</script>
