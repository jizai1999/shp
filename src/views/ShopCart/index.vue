<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(list, index1) in cartInfoList"
          :key="index1"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="list.isChecked == 1"
              @change="getCheckedById(list, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="list.imgUrl" />
            <div class="item-msg">
              {{ list.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">￥{{ list.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('jian', -1, list)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="list.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, list)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('jia', +1, list)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ list.skuNum * list.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="getDeleteById(list)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('Trade')"
            >结算</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入节流
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((element) => {
        sum += element.skuNum * element.skuPrice;
      });
      return sum;
    },
    isAllCheck() {
      // 遍历数组里的isChecked，如果有一个不是1，则返回false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改某个产品的个数
    // cart哪一个产品【身上的id】手速快，用节流
    handler: throttle(async function (type, num, list) {
      switch (type) {
        case "jia":
          // 带给服务器的变化的量
          num = 1;
          break;
        case "jian":
          // 带给服务器的变化的量,购买个数大于1，才可以传递-1，
          // 如果出现产品个数小于1等于1，传递数为0
          num = list.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 判断用户输入量
          if (isNaN(num) || num < 1) {
            num = 0;
            // 正常情况，小数，取整，用户输入量减去起始量
          } else {
            num = parseInt(num) - list.skuNum;
          }
          // num = isNaN(num) || num < 1 ? 0 : parseInt(num) - list.skuNum;
          break;
        default:
          break;
      }
      try {
        await this.$store.dispatch("addCart", {
          skuId: list.skuId,
          skuNum: num,
        });
        this.getData();
      } catch (error) {}
    }, 1000),
    // 删除某一个产品
    async getDeleteById(list) {
      try {
        await this.$store.dispatch("getDeleteById", list.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改某一个产品选中状态
    async getCheckedById(list, event) {
      let params = {
        skuId: list.skuId,
        isChecked: event.target.checked ? "1" : "0",
      };
      //发请求:修改商品的勾选的状态
      try {
        await this.$store.dispatch("getCheckedById", params);
        this.getData();
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 16%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 11%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
