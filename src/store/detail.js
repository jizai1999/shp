// 详情小仓库
import { reqGoodsInfo, reqShopCart } from "@/API";
// 登录身份
import { getToken } from "@/util/token";
// 游客身份
import { getUUID } from "@/util/uuid_token";
const state = {
  goodInfo: {},
  token: getToken(),
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  // 获取产品详情信息的actions
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    console.log(result);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  async addCart({ commit }, { skuId, skuNum }) {
    let result = await reqShopCart(skuId, skuNum);
    console.log(result);
    if (result.code == 200) {
      return result.message;
    } else {
      return result.message;
    }
  },
};
const getters = {
  // 路径导航简化数据
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 产品售卖属性简化
  spuSaleAttrList() {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
