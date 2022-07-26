<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread  面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索内容面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 split(":")[1]切割第一项  -->
            <li class="with-x" v-if="searchParams.tradmark">
              {{ searchParams.tradmark.split(":")[1] }}
              <i @click="removeTradmark">×</i>
            </li>
            <!-- 售卖属性值的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件 -->
        <SearchSelector @tradmarkInfo="tradmarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 判断谁应该有属性,通过判断 searchParams.order包含1还是2-->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <!-- 判断谁应该有箭头 -->
                  <a>
                    综合

                    <svg class="icon" v-show="isOne" aria-hidden="true">
                      <use xlink:href="#icon-jiantou_xiangxia"></use>
                    </svg>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格
                    <svg class="icon" v-show="isTwo" aria-hidden="true">
                      <use xlink:href="#icon-jiantou_xiangshang"></use>
                    </svg>

                    <!-- class="iconfont" :class="{ 'icon-UP': isAsc, 'icon-DOWN':
                    isDesc }" -->
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 点击图片，进入商品详情页，带着商品id传过去 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <PaginaTion
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            continues="5"
            @getpageNo="getpageNo"
          ></PaginaTion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./search/SearchSelector";
import { mapGetters, mapState } from "vuex";
import PaginaTion from "@/components/PaginaTion.vue";
export default {
  name: "search",
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序 初始状态应该是综合|降序  1代表综合，desc代表降序,2代表价格
        order: "1,desc",
        // 分页器
        pageNo: 1,
        // 每一页展示数据个数
        pageSize: 10,
        // 平台售卖属性操作带的参数
        props: [],
        tradmark: "",
      },
    };
  },
  components: {
    SearchSelector,
    PaginaTion,
  },
  // 先于mouted之前执行一次
  beforeMount() {
    // 整理带给服务器的参数
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;
    // Object.assign:es6新增的语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 派发请求
    this.getData();
  },
  computed: {
    //获取goodsList
    // ...mapState({
    //   goodsList: (start) => start.search.searchList.goodsList,
    // }),
    // mapGetters是数组写法，因为getters计算是没有划分模块
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 是否包含Asc
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    // 获取search模块展示产品一共多少数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 向服务器发送请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类搜索结果
    removeCategoryName() {
      // 制空所携带的所有参数，还需再向服务器发送请求
      // 制空之后的属性不必带给服务器，用undefined替换""值
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也需要修改：进行路由跳转(现在的路由只跳转到自己这里)
      // 严谨：本意是删除query，如果当路劲中出现paramas不应该删除,跳转时应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyword() {
      // 置空给服务器带的参数searchParams的keyword
      this.searchParams.keyword = undefined;
      // 再次发起请求
      this.getData();
      // 通知兄弟组件Header清除搜索框里的关键字
      this.$bus.$emit("clear");
      // 进行路由跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 自定义组件事件回调
    tradmarkInfo(tradmark) {
      // 整理品牌字段的参数  "id:品牌名称"
      this.searchParams.tradmark = `${tradmark.tmId}:${tradmark.tmName}`;
      // 再次发送请求
      this.getData();
    },
    // 清除品牌搜索
    removeTradmark() {
      this.searchParams.tradmark = undefined;
      // 再次发送请求
      this.getData();
    },
    // 收集平台售卖属性地方的回调(自定义事件)
    attrInfo(attr, attrValue) {
      // ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
      // 整理参数格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 判断数组里面是否存在该参数,数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        // 将该元素放到searchParams.props中
        this.searchParams.props.push(props);
      }

      // 再次发送请求
      this.getData();
    },
    // 清除售卖属性值
    removeAttr(index) {
      // 再次整理参数，再次发起请求
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 排序操作   flag形参：是一个标记代表用户点击的时综合1还是价格2
    changeOrder(flag) {
      // 接收起始值
      let originOrder = this.searchParams.order;
      // 接收1还是2
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      // 准备一个新的order属性值
      let newOrder = "";
      // 判断第一点击的是不是综合，后续判断多次点击的是不是同一个按钮
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 进入该判断，则价格初始为降序desc
        newOrder = `${flag}:${"desc"}`;
      }
      // 将新的order赋予searchParams.order
      this.searchParams.order = newOrder;
      this.getData();
    },
    //自定义事件 获取当前点击第几页
    getpageNo(pageNo) {
      // 整理参数
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  // 监听事件：监听组件实例身上属性的属性值的变化
  watch: {
    // 监听路由的信息是否是发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      // 再次发送请求之前需要再次整理带给服务器的参数
      // this.searchParams.category1Id = this.$route.query.category1Id;
      // this.searchParams.category2Id = this.$route.query.category2Id;
      // this.searchParams.category3Id = this.$route.query.category3Id;
      // this.searchParams.categoryName = this.$route.query.categoryName;
      // this.searchParams.keyword = this.$route.params.keyword;
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发起Ajax请求
      this.getData();
      // 每一次请求完毕，应清空该次请求的1，2，3级分类的id，以接收下一次请求的1，2，3级分类id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                .icon {
                  font-size: 14px;
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
