<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container" v-for="(first, index1) in floor" :key="index1">
      <div class="title clearfix">
        <h3 class="fl">{{ first.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(second, index2) in first.navList"
              :key="index2"
            >
              <a href="#tab1" data-toggle="tab">{{ second.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(jdlist, index3) in first.keywords" :key="index3">
                  {{ jdlist }}
                </li>
              </ul>
              <img :src="first.imgUrl" />
            </div>
            <Carousel :list="first.carouselList"></Carousel>
            <!-- <div class="floorBanner">
              <div class="swiper-container" ref="Swiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(image, index5) in first.carouselList"
                    :key="index5"
                  >
                    <img :src="image.imgUrl" />
                  </div>
                </div>
                如果需要分页器
                <div class="swiper-pagination"></div>

                如果需要导航按钮
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div> -->
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-2.png" />
              </div>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-3.png" />
              </div>
            </div>
            <div class="split center">
              <img src="./images/floor-1-4.png" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-5.png" />
              </div>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-6.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
export default {
  name: "LouCeng",
  components: {
    Carousel,
  },

  data() {
    return {
      floor: [],
    };
  },
  mounted() {
    const floor = [
      {
        id: "001",
        name: "家用电器",
        keywords: [
          "节能补贴",
          "4K电视",
          "空气净化器",
          "IH电饭煲",
          "滚筒洗衣机",
          "电热水器",
        ],
        imgUrl: "/images/floor-1-1.png",
        navList: [
          {
            url: "#",
            text: "热门",
          },
          {
            url: "#",
            text: "大家电",
          },
          {
            url: "#",
            text: "生活电器",
          },
          {
            url: "#",
            text: "厨房电器",
          },
          {
            url: "#",
            text: "应季电器",
          },
          {
            url: "#",
            text: "空气/净水",
          },
          {
            url: "#",
            text: "高端电器",
          },
        ],
        carouselList: [
          {
            id: "0011",
            imgUrl: "/images/floor-1-b01.png",
          },
          {
            id: "0012",
            imgUrl: "/images/floor-1-b02.png",
          },
          {
            id: "0013",
            imgUrl: "/images/floor-1-b03.png",
          },
        ],
        recommendList: [
          "/images/floor-1-2.png",
          "/images/floor-1-3.png",
          "/images/floor-1-5.png",
          "/images/floor-1-6.png",
        ],
        bigImg: "/images/floor-1-4.png",
      },
      {
        id: "002",
        name: "手机通讯",
        keywords: [
          "节能补贴2",
          "4K电视2",
          "空气净化器2",
          "IH电饭煲2",
          "滚筒洗衣机2",
          "电热水器2",
        ],
        imgUrl: "/images/floor-1-1.png",
        navList: [
          {
            url: "#",
            text: "热门2",
          },
          {
            url: "#",
            text: "大家电2",
          },
          {
            url: "#",
            text: "生活电器2",
          },
          {
            url: "#",
            text: "厨房电器2",
          },
          {
            url: "#",
            text: "应季电器2",
          },
          {
            url: "#",
            text: "空气/净水2",
          },
          {
            url: "#",
            text: "高端电器2",
          },
        ],
        carouselList: [
          {
            id: "0011",
            imgUrl: "/images/floor-1-b01.png",
          },
          {
            id: "0012",
            imgUrl: "/images/floor-1-b02.png",
          },
          {
            id: "0013",
            imgUrl: "/images/floor-1-b03.png",
          },
        ],
        recommendList: [
          "/images/floor-1-2.png",
          "/images/floor-1-3.png",
          "/images/floor-1-5.png",
          "/images/floor-1-6.png",
        ],
        bigImg: "/images/floor-1-4.png",
      },
    ];
    setTimeout(() => {
      this.floor = floor;
    }, 1000);
  },
  // watch: {
  //   floor: {
  //     // 立即监听，页面加载就监听一次，不管数据是否发生变化
  //     immediate: true,
  //     handler(newValue, oldValue) {
  //       this.$nextTick(() => {
  //         var mySwiper = new Swiper(this.$refs.Swiper, {
  //           loop: true, // 循环模式选项
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //             paginationClickable: true,
  //           },
  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
