<!--
ComponentName TheMenu
Description Menu
author
date 2020/12/7
-->
<template>
  <el-menu class="menu" default-active="1-1">
    <el-submenu index="1">
      <template slot="title">
        <span :class="`iconfont menu-icon`"></span>
        <span>红包管理</span>
      </template>
      <el-menu-item index="1-1">
        <!-- <i class="el-icon-menu"></i> -->
        <span style="padding-left: 10px;">红包列表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "TheLayoutMenu"
};
</script>

<style scoped lang="scss">
.el-menu {
  overflow-x: hidden;
  border: none;
  color: #c2c7d3;
  .el-menu--inline {
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }

  .el-menu-item {
    color: #c2c7d3;
    background-color: #24292f !important;
    height: 50px;
    line-height: 50px;
    font-size: 13px;
    min-width: 170px;
    * {
      vertical-align: baseline;
    }
    .menu-icon {
      margin-right: 5px;
    }
    span {
      font-size: 13px;
    }
  }

  .el-menu-item.is-active {
    background-color: #545e6a !important;
    color: #ffffff;
    font-size: 13px;
    .menu-icon {
      color: #ffffff;
      margin-right: 5px;
      font-size: 14px;
    }
  }

  ::v-deep .is-active {
    .el-submenu__title {
      color: #ffffff;
      padding-left: 10px;
      .menu-icon {
        color: #ffffff;
        margin-right: 5px;
        font-size: 14px;
      }
      .el-submenu__icon-arrow {
        margin-top: -1px;
      }
    }
  }
  ::v-deep .el-submenu__title {
    height: 54px;
    font-size: 13px;
    color: #c2c7d3;
    background-color: #24292f;
    .menu-icon {
      margin-right: 5px;
      font-size: 14px;
    }
    .el-submenu__icon-arrow {
      margin-top: -1px;
    }
  }
}
</style>
