import { reqTradeInfo, reqAddressInfo } from "@/API";
const state = {
  address: [],
  tradeInfo: {},
};
const mutations = {
  GETADDRESSINFO(state, address) {
    state.address = address;
  },
  GETTRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
};
const actions = {
  // 用户地址信息
  async getAddressInfo({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETADDRESSINFO", result.data);
      return "ok";
    } else {
    }
  },
  //  获取订单交易页信息
  async getTradeInfo({ commit }) {
    let result = await reqTradeInfo();
    if (result.code == 200) {
      commit("GETTRADEINFO", result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
