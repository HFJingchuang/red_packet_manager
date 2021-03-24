<template>
  <div>
    <el-dialog
      class="create-dialog"
      center
      :visible.sync="visible"
      :title="title"
      :top="top"
      :width="width"
      :show-close="showClose"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="escape"
    >
      <div class="dialog-content">
        <slot></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.showAddModal
    };
  },
  props: {
    title: {
      type: String,
      default: () => ""
    },
    top: {
      type: String,
      default: "15vh"
    },
    width: {
      type: String,
      default: "600px"
    },
    showClose: {
      type: Boolean,
      default: () => false
    },
    closeOnClickModal: {
      type: Boolean,
      default: () => false
    },
    escape: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>

<style lang="scss">
.create-dialog {
  .el-dialog__header {
    height: 50px;
    background: #24292f;
    color: #fff;
    font-size: 14px;
    text-align: center;
    padding: 0;
    display: flex;
    .el-dialog__title {
      margin: auto;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
      line-height: 22px;
      letter-spacing: 0px;
    }
  }
  .dialog-content {
    font-size: 13px;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 5px;
    textarea {
      height: 90px;
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-button {
        width: 140px;
        height: 40px;
        border-radius: 4px;
      }
      .confirm {
        border: 0px;
      }
    }
    .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
  .el-icon-close:before {
    font-family: "iconfont";
    color: #fff;
    content: "\e612";
    font-size: 16px;
  }
  .el-dialog__headerbtn {
    align-self: center;
    top: auto;
  }
}
</style>
