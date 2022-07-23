//  配置路由
import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由
import routes from "./routes";

Vue.use(VueRouter);

// 先把VueRouter原型对象的push，先保存一份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//  重写push/replace
//  第一个参数：告诉原来push，你往哪跳（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //  call与apply区别：
    //  相同点：都可以调用函数一次，都可以篡改函数上下文一次
    //  不同点：call与apply传递参数：call传递参数用逗号隔开，apply传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //代表真:代表着两个形参接受参数【箭头函数】
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//  创建并暴露路由
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // ...滚动行为 返回y = 0 ，代表滚动条在最上方
    return { y: 0 };
  },
});
// 全局守卫：前置守卫【在路由跳转之间进行判断】
router.beforeEach(async (to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  next();
  // 获取用户登录token，登录就有token，没登录就没有token
  let token = store.state.user.token;
  // 用户信息
  let name = store.state.user.userInfo.name;
  if (token) {
    // 用户登录了还想去login，不能放行
    if (to.path == "/login") {
      // next("/home");
    }
    // 登录了但去的不是login
    else {
      // 如果有用户信息，则放行
      if (name) {
        console.log("1113233");
        next();
      }
      // 没有用户信息，派发请求获取用户信息
      else {
        try {
          // 获取用户信息成功,放行
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token过期，获取不到用户信息，重新登录
          // 1.清除token
          await store.dispatch("userLogin");
          next("/login");
        }
      }
    }
  }
});

export default router;
