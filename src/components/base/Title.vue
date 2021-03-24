<template>
  <div>
    <div class="base-title">
      <span class="base-title-text" v-if="!parentTitle">{{ name }}</span>
      <span class="base-title-text" v-else>
        <span class="parent-title-text" @click="toParent">{{ parentTitle }} >></span>
        {{ name }}</span
      >
      <!-- <div class="base-spacer"></div> -->
      <slot name="btn"></slot>
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTitle",
  data() {
    return {
      parentPath: "",
      parentTitle: "",
      name: ""
    };
  },
  props: {
    query: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    this.parentPath = "";
    this.parentTitle = "";
    this.name = "";
    this.getRouteCfg();
  },
  methods: {
    // 获取路由
    getRouteCfg() {
      let meta = this.$route.meta;
      if (meta.parentTitle) {
        this.parentPath = meta.parentPath;
        this.parentTitle = meta.parentTitle;
      }
      this.name = this.$route.name;
    },
    // 跳转上级页面
    toParent() {
      this.$router.push({
        path: this.parentPath,
        query: this.query
      });
    }
  }
};
</script>

<style scoped lang="scss">
.base-title {
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 40px;
  font-size: 13px;
  .base-title-text {
    color: #333333;
  }
  .parent-title-text {
    cursor: pointer;
    color: #999999;
  }
  .parent-title-text:hover {
    color: #333333;
  }
  .base-spacer {
    flex-grow: 1;
  }
}
</style>
