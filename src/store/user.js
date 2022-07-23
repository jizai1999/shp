// 登录与注册模块
// 详情小仓库
import {
  reqGetCode,
  reqUserLogin,
  reqUserRegister,
  reqUserInfo,
  reqLogout,
} from "@/API";
import { setToken, getToken, removeToken } from "@/util/token";
const state = {
  code: "",
  // token:localStorage.getItem('token'),
  token: getToken(),
  // token: "",
  userInfo: {},
};
const mutations = {
  GTECODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 清除本地的存储数据
  CLEAR(state) {
    state.token = "";
    (state.userInfo = []), removeToken();
  },
};
const actions = {
  //  获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    console.log(result);
    if (result.code == 200) {
      commit("GTECODE", result.data);
      return "获取成功";
    } else {
      return Promise.reject(new Error("获取失败"));
    }
  },
  // 用户注册
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data);
    if (result.code == 200) {
      return "注册成功";
    } else {
      return Promise.reject(new Error("注册失败"));
    }
  },
  // 用户登录[token]
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    console.log(result);
    // 服务器下发token，用户唯一标识
    // 将来通过token找服务器要用户信息进行展示
    if (result.code == 200) {
      // 登录后已经获取到token
      commit("USERLOGIN", result.data.token);
      // 持久化储存token
      // localStorage.setItem("TOKEN", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    // 提交用户信息
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    let result = await reqLogout();
    console.log("111", result);
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
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
