/* 
利用mockjs来mock数据接口
*/
import Mock from "mockjs";
import banner from "./banner.json";
import LouCeng from "./LouCeng.json";

// 提供广告位轮播数据的接口,第一个参数请求地址，第二个参数：请求数据
Mock.mock("./mock/banner", {
  code: 200,
  data: banner,
});

// 提供所有楼层数据的接口
Mock.mock("./mock/LouCeng", {
  code: 200,
  data: LouCeng,
});
