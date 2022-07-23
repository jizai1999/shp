<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <CommodityList></CommodityList>
    <YouLike></YouLike>
    <LouCeng></LouCeng>
    <TradeMark></TradeMark>
  </div>
</template>

<script>
import banner from "@/mock/mockServer.js";
import ListContainer from "./Home/ListContainer.vue";
import TodayRecommend from "./Home/TodayRecommend.vue";
import CommodityList from "./Home/CommodityList.vue";
import YouLike from "./Home/YouLike.vue";
import LouCeng from "./Home/LouCeng.vue";
import TradeMark from "./Home/TradeMark.vue";

export default {
  name: "home",
  mounted() {
    // 获取用户信息在首页显示
    // this.$store.dispatch("getUserInfo");每个页面都要派发请求，放在全局守卫去派发
    // this.$store.dispatch("getUserInfo");
  },
  components: {
    ListContainer,
    TodayRecommend,
    CommodityList,
    YouLike,
    LouCeng,
    TradeMark,
  },
};
</script>

<style></style>
