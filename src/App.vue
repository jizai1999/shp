<template>
  <div id="app">
    <Header v-show="$route.meta.show"></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发送请求，获取数据，存储于仓库中,派发一个action，获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
