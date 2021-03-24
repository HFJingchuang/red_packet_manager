<template>
  <div class="item-content">
    <span ref="spanBox" :class="{ expansion: active && status }"> {{ longTextContent }}</span>
    <span v-if="active && status">...</span>
    <span
      style="color: #5394eb;cursor: pointer;text-align: left;line-height: 24px;padding-left: 16px;"
      v-if="active"
      @click="status = !status"
    >
      {{ status ? "展开全文" : "收起全文" }}<i :class="status ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: true,
      active: false,
      message: ""
    };
  },
  props: {
    longTextContent: {
      type: String,
      default: () => ""
    }
  },
  watch: {
    longTextContent: function() {
      this.$nextTick(() => {
        this.status = true;
        this.active = false;
        if (this.$refs.spanBox.offsetHeight > 48) {
          this.active = true;
        }
      });
    }
  },
  updated() {
    // this.$nextTick(() => {
    //   if (this.$refs.spanBox.offsetHeight > 48) {
    //     this.active = true;
    //   }
    // });
  }
};
</script>

<style scoped>
.expansion {
  max-height: 48px;
  text-overflow: clip;
  white-space: pre-line;
  overflow-y: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.item-content {
  line-height: 24px;
  padding-left: 114px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding-right: 50px;
}
</style>
