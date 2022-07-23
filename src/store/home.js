//  home模块仓库
//  引入 reqCategoryList
import { reqCategory, reqGetBannerList } from "@/API";
//  state:储存数据的位置
const state = {
  categoryList: [],
  // 轮播图数组
  // bannerList: [],
};
//  mutations:修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  // GETBANNERLIST(state, bannerList) {
  //   state.bannerList = bannerList;
  // },
};
// action :处理action,可以写自己的业务逻辑,也可以处理异步
const actions = {
  //  通过api里面的接口函数调用，向服务发送请求，获取数据
  async categoryList({ commit }) {
    let result = await reqCategory();
    if (result.code >= 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  // 获取首页轮播图的数据
  async getBannerList() {
    let result = await reqGetBannerList();
    console.log(result);
    if (result.code >= 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
};

// getters理解为计算属性,用于简化储存数据,让组件获取存储数据更方便
const getters = {};

//对外暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
