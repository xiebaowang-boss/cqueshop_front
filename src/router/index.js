import Vue from 'vue'
import VueRouter from 'vue-router'
import inner from "../components/main/inner";

Vue.use(VueRouter)


// 2. 定义路由
const routes = [
  {
    path: '/',
    name: "index",
    component: inner
  },
  {
    path: '/login',
    name: 'loginpage',
    component: () => import('../components/login/loginPage'),
    children:[
      {
        path:'login',
        name:'login',
        component: () => import('../components/login/login'),
      },{
        path:'register',
        name:'register',
        component: () => import('../components/login/register'),
      }
    ]
  },
  {
    path: "/goodsDetail/:goodsId",
    name: "goodsDetail",
    component: () => import('../components/goods/goodsDetail'),

  },
  {
    path: "/cart/:token",
    name: "cart",
    component: () => import('../components/Cart/cart')
  },
  {
    path: "/categoryGoods",
    name: "categoryGoods",
    component: () => import('../components/goods/categoryGoods/categoryGoods'),
    children: [
      {
        path: ":categoryId",
        name:"categoryId",
        component: () => import('../components/goods/categoryGoods/categoryGoodsList')
      },
      {
        path: "search/:keywords",
        name: "search",
        component: ()  => import('../components/goods/searchResult/searchResult')
      }
    ]
  }
]

// 3. 创建 index 实例，然后传 `routes` 配置
export default new VueRouter({
  routes: routes // (缩写) 相当于 routes: routes
})


