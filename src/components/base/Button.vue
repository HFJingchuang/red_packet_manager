<template>
  <el-button :style="{ width: width + 'px' }" class="base-button">{{ title }}</el-button>
</template>

<script>
export default {
  name: "BaseButton",
  data() {
    return {
      width: 100
    };
  },
  props: {
    title: {
      type: String,
      default: "按钮"
    }
  },
  watch: {
    title: function() {
      this.setBtnWidth();
    }
  },
  created() {
    this.setBtnWidth();
  },
  methods: {
    // 根据按钮标题设置按钮宽度
    setBtnWidth() {
      let length = this.title.length;
      if (length <= 4) {
        this.width = 80;
      } else if (length <= 6) {
        this.width = 100;
      } else if (length == 7) {
        this.width = 120;
      } else {
        this.width = (length - 1) * 20;
      }
    }
  }
};
</script>

<style scoped>
.base-button {
  height: 40px;
  background: #5394ec;
  border-radius: 4px;
  padding: 10px 0;
}
.base-button /deep/ span {
  text-align: center;
  height: 20px;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  letter-spacing: 0px;
}
</style>
