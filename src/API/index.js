//  API 统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax";

// 三级联动接口
export const reqCategory = () => {
  //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
  //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
  //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
  return requests({ method: "get", url: "/product/getBaseCategoryList" });
  // 简写
  // export const reqCategory = () =>requests.get("/product/getBaseCategoryList");
};
// 获取banner （home首页轮播图接口）
export const reqGetBannerList = () => {
  return mockRequests({ method: "get", url: "/banner" });
};
// 获取搜索模块数据  地址：/api/list   请求方式：post  带参数
// 当前这个接口，给服务器传递参数params，至少是一个空对象
// export const reqGetSearchInfo = (params) => {
//   return requests({
//     url: "/list",
//     method: "post",
//     data: params,
//   });
// };
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });

// 获取产品详情信息的接口 url：/api/item/{skuId}  请求方式：get
// export const reqGoodsInfo = "/item/";
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

//获取验证码接口  /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
// 注册接口  url:/api/user/passport/register  参数：phone，password，code
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });

// 登录接口
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });

// 获取用户信息--带着token找服务器要用户信息
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录
export const reqLogout = () =>
  requests({ url: "/user/passport/logout", method: "get" });

// 添加购物车(对已有物品进行数量改动)/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 购物车列表接口/api/cart/cartList
export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

//  删除购物车产品接口/api/cart/deleteCart/{skuId}DELETE
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

//切换商品选中状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdataCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "GET" });

//  获取订单交易页信息 /api/order/auth/trade
export const reqTradeInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

// 获取用户地址信息/api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

//  提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });
// 获取订单支付信息/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) =>
  requests({ url: `/order/auth/submitOrder/${orderId}`, method: "get" });
