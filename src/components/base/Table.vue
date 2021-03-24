<template>
  <div>
    <!--批量操作栏，勾选行时显示-->
    <div v-if="_config.enableMultiSelect && selection.length > 0" class="multi-menu">
      <span style="margin-left: 12px">已选中{{ selection.length }}项</span>
      <el-divider direction="vertical" />
      <slot name="multiSelectMenu" :selection="selection" />
      <i class="el-icon-close btn-close" @click="clearSelection" />
    </div>
    <!--顶部操作栏占位，勾选行时不显示-->
    <div v-else-if="_config.enableMultiSelect || $slots.topMenu" class="top-menu">
      <slot name="topMenu" />
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      v-bind="elAttrs"
      v-on="listeners"
      class="base-table"
      :cell-style="cellStyle"
      :row-class-name="tableRowClassName"
    >
      <el-table-column v-if="_config.enableMultiSelect" type="selection" width="55" />
      <el-table-column v-if="_config.showIndexColumn" label="序号" type="index" :index="changeIndex()" width="70">
      </el-table-column>
      <base-table-column v-for="column in columns" :key="column.prop" :column="column">
        <slot v-if="column.slot" slot-scope="props" :name="column.prop" v-bind="props" />
        <slot v-if="column.slot" slot="header" slot-scope="props" :name="column.prop + '-header'" v-bind="props" />
      </base-table-column>
      <el-table-column v-if="_config.showHandler" v-bind="handlerColumn">
        <slot slot-scope="{ row, $index }" name="handler" :row="row" :index="$index" />
      </el-table-column>
    </el-table>
    <base-table-pagination
      v-if="page"
      :page="page"
      :page-config="pageConfig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
const elTableAttrs = [
  "size",
  "width",
  "height",
  "maxHeight",
  "fit",
  "stripe",
  "border",
  "rowKey",
  "context",
  "showHeader",
  "showSummary",
  "sumText",
  "summaryMethod",
  "rowClassName",
  "rowStyle",
  "cellClassName",
  "cellStyle",
  "headerRowClassName",
  "headerRowStyle",
  "headerCellClassName",
  "headerCellStyle",
  "highlightCurrentRow",
  "currentRowKey",
  "emptyText",
  "expandRowKeys",
  "defaultExpandAll",
  "defaultSort",
  "tooltipEffect",
  "spanMethod",
  "selectOnIndeterminate",
  "indent",
  "treeProps",
  "lazy",
  "load"
];

export default {
  name: "BaseTable",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: Boolean,
    config: {
      type: Object,
      default: () => ({})
    },
    pageConfig: { type: Object, default: () => ({}) },
    page: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      selection: []
    };
  },
  computed: {
    _config() {
      return Object.assign(
        {
          enableMultiSelect: false,
          showHandler: false,
          handlerColumn: {},
          highlightSelect: true,
          showIndexColumn: false,
          tooltipEffect: "dark"
        },
        this.config
      );
    },
    // 操作列配置
    handlerColumn() {
      return Object.assign(
        {
          label: "操作",
          minWidth: 100,
          fixed: "right"
        },
        this._config.handlerColumn
      );
    },
    // el-table组件属性
    elAttrs() {
      const copy = {};
      for (const key in this._config) {
        if (elTableAttrs.includes(key)) {
          copy[key] = this._config[key];
        }
      }
      if (this._config.highlightSelect) {
        Object.assign(copy, {
          "row-class-name": this.rowClassName
        });
      }
      return copy;
    },
    // el-table监听事件
    listeners() {
      return Object.assign({}, this.$listeners, {
        select: this.handleSelect,
        "select-all": this.handleSelectAll
      });
    }
  },
  watch: {
    // 如果当前数据有已被选中的则设置为已勾选
    data: function(val) {
      this.$nextTick(() => {
        if (val.length > 0 && this.selection.length > 0) {
          val.forEach((row) => {
            if (this.selection.findIndex((item) => this._getRowKey(item) === this._getRowKey(row)) >= 0) {
              this.$refs["table"].toggleRowSelection(row, true);
            }
          });
        }
      });
    }
  },
  methods: {
    cellStyle({ row, columnIndex }) {
      // 状态列字体颜色
      // 联盟链审批管理
      if (columnIndex == 6 && row.status == "未通过") {
        return "color: #F44F38";
      }
      // 应用审批管理
      if (row.statusName && columnIndex == 6 && (row.statusName.indexOf("失败") != -1 || row.statusName == "未通过")) {
        return "color: #F44F38";
      }
      return "color: #333333";
    },
    changeIndex() {
      return (this.page.currentPage - 1) * this.page.size + 1;
    },
    _getRowKey(row) {
      const config = this._config;
      if (typeof config.rowKey === "function") {
        return config.rowKey(row);
      } else if (typeof config.rowKey === "string") {
        return this._.get(row, config.rowKey);
      } else {
        return row.id;
      }
    },
    handleCurrentChange(val) {
      this.data = [];
      this.page.currentPage = val;
      this.$emit("current-page-change", val);
    },
    handleSizeChange(val) {
      this.$emit("page-size-change", val);
    },
    handleSelect(selection, row) {
      if (selection.includes(row)) {
        this.selection.push(row);
      } else {
        this.selection.splice(this.selection.indexOf(row), 1);
      }
      this.$emit("select", this.selection, row);
    },
    handleSelectAll(selection) {
      let index;
      this.data.forEach((row) => {
        index = this.selection.findIndex((item) => this._getRowKey(item) === this._getRowKey(row));
        // 全选时
        if (selection.length > 0 && index < 0) {
          this.selection.push(row);
          // 全不选时
        } else if (selection.length === 0 && index >= 0) {
          this.selection.splice(index, 1);
        }
      });
      this.$emit("select-all", this.selection);
    },
    // 高亮当前选中行
    rowClassName({ row }) {
      for (let index = 0; index < this.selection.length; index++) {
        if (this.selection[index] === row) {
          return "row__active";
        }
      }
      return "";
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    clearSelection() {
      this.selection = [];
      this.$refs["table"].clearSelection();
    },
    toggleRowSelection() {
      return this.$refs["table"].toggleRowSelection(...arguments);
    },
    toggleAllSelection() {
      return this.$refs["table"].toggleAllSelection(...arguments);
    },
    toggleRowExpansion() {
      return this.$refs["table"].toggleRowExpansion(...arguments);
    },
    setCurrentRow() {
      return this.$refs["table"].setCurrentRow(...arguments);
    },
    clearSort() {
      return this.$refs["table"].clearSort(...arguments);
    },
    clearFilter() {
      return this.$refs["table"].clearFilter(...arguments);
    },
    doLayout() {
      return this.$refs["table"].doLayout(...arguments);
    },
    sort() {
      return this.$refs["table"].sort(...arguments);
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .row__active {
  background: #f7fcff;
}
::v-deep .el-table__row.statistics-warning-row {
  background: #f6f7fa;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: #ecf3fe;
}
::v-deep .el-table__body tr.hover-row > td {
  background: #ecf3fe;
}
.base-table ::v-deep th {
  font-weight: 400;
  color: #666666;
  font-size: 13px;
  border: 0px;
  padding: 0;
  div {
    line-height: 40px;
  }
}
.base-table ::v-deep td {
  font-weight: 400;
  font-size: 13px;
  color: #333333;
  border: 0px;
  padding: 0;
  div {
    line-height: 46px;
  }
  button {
    border: 0;
    width: 28px;
    background: transparent;
    color: #5394ec;
    height: 20px;
    font-size: 13px;
    padding: 0;
    margin: 0 5px;
  }
}
.multi-menu {
  display: inline-block;
  width: 100%;
  line-height: 40px;
  height: 40px;
  margin-bottom: 12px;
  .el-button {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.btn-close {
  line-height: 40px;
  margin-right: 10px;
  float: right;
  cursor: pointer;
}
.top-menu {
  height: 40px;
  margin-bottom: 12px;
}
</style>
