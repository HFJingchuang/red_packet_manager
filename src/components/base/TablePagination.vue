<template>
  <div :class="['page-wrap', customClassName]">
    <el-pagination
      class="base-pagination"
      :current-page="page.currentPage"
      :page-size="page.size"
      :total="page.total"
      :page-sizes="_pageConfig.pageSizes"
      :layout="_pageConfig.layout"
      v-bind="elAttrs"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <el-button size="small" @click="saveCurrentChange">确认</el-button>
    </el-pagination>
  </div>
</template>

<script>
export const elPageAttrs = [
  "small",
  "pageCount",
  "pagerCount",
  "popperClass",
  "prevText",
  "nextText",
  "background",
  "disabled",
  "hideOnSinglePage"
];

export default {
  name: "BaseTablePagination",
  props: {
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        size: 3,
        total: 0
      })
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    _pageConfig() {
      return Object.assign(
        {
          pageSizes: [10, 20, 30, 50, 100],
          layout: "total,prev,pager,next,jumper,slot,->"
        },
        this.pageConfig
      );
    },
    customClassName() {
      return this._pageConfig.customClassName || "";
    },
    elAttrs() {
      const copy = {};
      for (const key in this._pageConfig) {
        if (elPageAttrs.includes(key)) {
          copy[key] = this._pageConfig[key];
        }
      }
      return copy;
    }
  },
  data: function() {
    return {
      customCurrentPage: this.page.currentPage
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.customCurrentPage = val;
      this.$emit("current-change", this.customCurrentPage);
    },
    handleSizeChange(val) {
      this.$emit("size-change", val);
    },
    saveCurrentChange() {
      // 不需要重复发送事件
      // this.$emit("current-change", this.customCurrentPage);
    }
  }
};
</script>

<style scoped>
.page-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  padding-right: 20px;
}
.el-button {
  width: 64px;
  height: 40px;
  background: #5394ec;
  color: #fff;
  margin-left: 20px;
  border: 0px;
}
.el-button:hover {
  color: #fff;
  background: #5394ec;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #5394ec;
}
.base-pagination /deep/ .el-pagination__total {
  color: #959595;
  line-height: 40px;
  height: 40px;
}
.base-pagination /deep/ .el-pagination__jump {
  color: #959595;
}
.base-pagination /deep/ .btn-prev {
  width: 40px;
  line-height: 40px;
  height: 40px;
  margin: 0;
  background: #fff;
  border: 1px solid #d9dbe8;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.base-pagination /deep/ .btn-next {
  width: 40px;
  line-height: 40px;
  height: 40px;
  margin: 0;
  background: #fff;
  border: 1px solid #d9dbe8;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.base-pagination /deep/ .el-pagination span:not([class*="suffix"]) {
  font-size: 13px;
}
.base-pagination /deep/ .el-pager li {
  width: 40px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-top: 1px solid #d9dbe8;
  border-bottom: 1px solid #d9dbe8;
  /* border-left: 1px solid #d9dbe8; */
  margin: 0;
  border-radius: 0;
}
/deep/ .el-pagination span:not([class*="suffix"]) {
  height: 40px;
  line-height: 40px;
}
/deep/ .el-pagination__editor {
  height: 40px;
  line-height: 40px;
  margin: 0 10px;
}
/deep/ .el-pagination__editor.el-input input {
  height: 40px;
  line-height: 40px;
}
</style>
