<!--
ComponentName TheLayout
Description layout
author fanglequn
date 2020/12/7
-->
<template>
  <div class="layout">
    <template v-if="$route.meta.noLayout">
      <router-view></router-view>
    </template>
    <el-container v-else-if="$route.path != '/'" class="container">
      <el-header class="header">
        <the-layout-toolbar ref="toolbar"></the-layout-toolbar>
      </el-header>
      <el-container>
        <el-aside width="170px" class="aside">
          <the-layout-menu></the-layout-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "TheLayout",
  data() {
    return {
      bindPermi: "/tenant/bind",
      disabled: false,
      bindInfo: {}
    };
  },
  methods: {
    showBindAccount() {
      this.$refs.bindModal.visible = true;
    },
    showAccountInfo() {
      if (this.length !== 0) {
        this.bindInfo = this.queryData;
        this.$refs.showModal.visible = true;
      }
    }
  },
  created() {},
  computed: {}
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
}
.container {
  height: 100vh;
}
.show-bind {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  line-height: 54px;
  text-align: center;
  font-size: 13px;
  position: fixed;
  bottom: 20px;
  width: 170px;
  cursor: pointer;
}
.show-bind img {
  padding-right: 12px;
}
.header {
  background: #212121;
  color: #fff;
  padding: 0px;
}
.aside {
  background: #25292f;
  color: #fff;
  font-size: 16px;
  position: relative;
}
.main {
  color: #212121;
  background: #fafafa;
  padding: 16px;
}
</style>
