<template>
  <div class="pagination">
    <!-- 当展示页为第一页时点击失效 -->
    <button :disabled="pageNo == 1" @click="$emit('getpageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="Number(startNumAndEndNum.start) > 1"
      @click="$emit('getpageNo', 1)"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分，连续页码 -->
    <div
      v-for="(page, index) in Number(startNumAndEndNum.end)"
      :key="index"
      @click="$emit('getpageNo', page)"
    >
      <button
        :class="{ active: pageNo == page }"
        v-if="index >= Number(startNumAndEndNum.start - 1)"
      >
        {{ page }}
      </button>
    </div>
    <button v-if="startNumAndEndNum.end <= totalPage - parseInt(continues / 2)">
      ···
    </button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getpageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getpageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "PaginaTion",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //   数据总共需要展示多少页   Math.ceil返回值大于或等于给定数字的最小整数，向上取整
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页的起始页与结束页
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      //   定义两个变量来存储起始页数字和结束页数字
      let start = 0,
        end = 0;
      // 判断总页数是否大于连续页码数  不正常情况，连续页码页大于总页码数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      }
      //   正常情况，连续页码小于等于总页码页   parseInt取整
      else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 不正常情况start出现0或负数
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
    // bianliye() {
    //   return this.startNumAndEndNum.end - this.startNumAndEndNum.start + 1;
    // },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: #409eff;
}
</style>
