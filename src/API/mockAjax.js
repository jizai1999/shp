//  对于axios二次封装
import axios from "axios";
//  引入进度条//nprogress属性start进度条开始  done:进度条结束
import nprogress from "nprogress";
//  引入进度条样式
import "nprogress/nprogress.css";
// 利用axios对象的方法create,去创建一个axios实例
const requests = axios.create({
  // 配置对象  baseURL基于哪个路径
  baseURL: "/mock",
  // 代表请求超时时间
  timeout: 5000,
});
//  请求拦截器:
requests.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start();
  //  config: 配置对象里面有一个属性很重要,headers请求头
  return config;
});
//  响应拦截器
requests.interceptors.response.use(
  (res) => {
    //   进度条结束
    nprogress.done();
    //  成功回调函数
    return res.data;
  },
  (error) => {
    //   失败回调函数
    return Promise.reject(new Error("请求失败"));
  }
);

// 对外暴露
export default requests;
