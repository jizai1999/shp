import Vue from "vue";
import Vuex from "vuex";
//  使用插件
Vue.use(Vuex);
//  引入小模块仓库数据
import home from "./home";
import search from "./search";
import detail from "./detail";
import user from "./user";
import CartList from "./CartList";
import Trade from "./Trade";
import cunfang from "./cunfang";

//创建并暴露对外暴露
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    user,
    CartList,
    Trade,
    cunfang,
  },
});
