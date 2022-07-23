import { reqGetSearchInfo } from "@/API";
//  search 模块仓库
//  state:储存数据的位置
const state = {
  searchList: {},
};
//  mutations:修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
// actionss :处理actions,可以写自己的业务逻辑,也可以处理异步
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    console.log(result);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// getters理解为计算属性,用于简化储存数据,让组件获取存储数据更方便
// 为简化数据而生
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};

//对外暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
