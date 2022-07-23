import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
//三级联动---全局组件
import TypeNav from "@/components/TypeNav";
import PaginaTion from "@/components/PaginaTion";
// 引入仓库
import store from "@/store";
// 引入swiper样式
import "swiper/css/swiper.css";
// 统一接口api文件夹里的请求函数,统一引入
import * as API from "@/API";
// 注册组件  第一个参数为全局组件名，第二为哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(PaginaTion.name, PaginaTion);
// 引入Mock Server.js ----mock数据
import "@/mock/mockServer";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 全局事件总线,$bus就是当前应用的vm
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册
  router,
  store,
}).$mount("#app");
