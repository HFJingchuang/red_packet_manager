<template>
  <div class="base-confirm-dialog">
    <el-dialog
      center
      :visible.sync="show"
      :title="title"
      width="600px"
      top="30vh"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="confirm-dialog-content">{{ content }}</div>
      <div class="confirm-dialog-btn">
        <div>
          <el-button class="cancel-btn" @click="cancel" :disabled="disabledBtn">取消</el-button>
          <el-button class="confirm-btn" @click="confirm" :disabled="disabledBtn">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BaseConfirmDialog",
  data() {
    return {
      show: false
    };
  },
  props: {
    // dialog标题
    title: {
      type: String,
      default: () => ""
    },
    // dialog文字内容
    content: {
      type: String,
      default: () => ""
    },
    disabledBtn: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
.base-confirm-dialog {
  ::v-deep .el-dialog__header {
    height: 50px;
    background: #24292f;
    padding: 0;
    span {
      height: 50px;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #fff;
      line-height: 50px;
    }
  }
  ::v-deep .el-dialog__body {
    padding: 60px 0 30px 0;
  }
  .confirm-dialog-content {
    height: 20px;
    font-size: 13px;
    font-weight: 400;
    color: #393939;
    line-height: 20px;
    text-align: center;
    margin-bottom: 60px;
  }
  .confirm-dialog-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    .cancel-btn {
      width: 140px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #e1e3ea;
      border-radius: 4px;
      color: #666666;
      font-size: 13px;
      &:hover {
        background: #ecf3fe;
        color: #5394eb;
        border: 1px solid #c9dffd;
      }
    }
    .confirm-btn {
      width: 140px;
      height: 40px;
      background: #5394eb;
      border-radius: 4px;
      color: #fff;
      float: right;
      margin-left: 60px;
      font-size: 13px;
      border: 0px;
    }
  }
}
</style>
