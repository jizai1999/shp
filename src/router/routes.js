import home from "@/views/home";
import login from "@/views/login";
import register from "@/views/register";
import search from "@/views/search";
import detail from "@/views/detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart/index";
import Trade from "@/views/Trade/index";
import Pay from "@/views/Pay/index";
export default [
  {
    path: "/home",
    component: home,
    meta: { show: true },
  },
  {
    path: "/login",
    component: login,
    meta: { show: false },
  },
  {
    path: "/register",
    component: register,
    meta: { show: false },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: search,
    meta: { show: true },
  },
  // 详情页
  {
    name: "detail",
    path: "/detail/:skuid",
    component: detail,
    meta: { show: true },
  },
  // 添加购物车
  {
    name: "AddCartSuccess",
    path: "/AddCartSuccess",
    component: AddCartSuccess,
    meta: { show: true },
  },
  // 购物车
  {
    name: "ShopCart",
    path: "/ShopCart",
    component: ShopCart,
    meta: { show: true },
  },
  // 订单结算
  {
    name: "Trade",
    path: "/Trade",
    component: Trade,
    meta: { show: true },
  },
  // 订单提交
  {
    name: "Pay",
    path: "/Pay",
    component: Pay,
    meta: { show: true },
  },
  {
    path: "*",
    redirect: "/home",
  },
];
