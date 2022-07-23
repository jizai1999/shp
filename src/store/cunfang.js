const state = {
  aaa: [],
};
const mutations = {
  setAaa(state, all) {
    state.aaa = all;
    console.log("kaishi", all);
  },
};
const actions = {};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
