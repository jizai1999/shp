const state = {
  aaa: [],
  floor:[],
};
const mutations = {
  setAaa(state, all) {
    state.aaa = all;
  },
  setFloor(state,floor){
    state.floor = floor;
    console.log("zzz",floor)
  }
};
const actions = {};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
