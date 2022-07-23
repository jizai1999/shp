import { reqCartList, reqDeleteCartById, reqUpdataCheckedById } from "@/API";
import { getUUID } from "@/util/uuid_token";
//  search 模块仓库
//  state:储存数据的位置
const state = {
  cartList: [],
  uuid_token: getUUID(),
};
//  mutations:修改state的唯一手段
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
// actionss :处理actions,可以写自己的业务逻辑,也可以处理异步
const actions = {
  // 购物车列表
  async getCartList({ commit }) {
    let result = await reqCartList();
    console.log("///", result);
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  // 删除
  async getDeleteById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //  切换商品选中状态
  async getCheckedById({ commit }, skuId, isChecked) {
    let result = await reqUpdataCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
// getters理解为计算属性,用于简化储存数据,让组件获取存储数据更方便
// 为简化数据而生
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

//对外暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
