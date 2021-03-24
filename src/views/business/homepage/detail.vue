<template>
  <div class="admin" id="adminManage">
    <base-title style="margin-top: 4px; margin-bottom: 20px">
      <template #btn>
        <div>
          <span class="select-tilte">交易哈希:</span>
          <el-input v-model="hash" class="input-width" placeholder="输入交易哈希" :clearable="true"></el-input>
          <span class="select-tilte">抢红包地址:</span>
          <el-input v-model="beneficiary" class="input-width" placeholder="输入抢红包地址" :clearable="true"></el-input>
          <el-button class="search-btn" @click="getPacketById">查询</el-button>
        </div>
      </template>
    </base-title>
    <div class="packet-info">
      <span style="color: #333333">红包基本信息</span>
      <hr />
      <el-row>
        <el-col :span="12" style="display: grid">
          <div class="item-info-div">
            <label class="item-label">创建者：</label>
            <div class="item-content">{{ detail.creator }}</div>
          </div>
          <div class="item-info-div">
            <label class="item-label">交易哈希：</label>
            <div class="item-content">{{ detail.hash }}</div>
          </div>
          <div class="item-info-div">
            <label class="item-label">红包数量：</label>
            <div class="item-content">{{ detail.num }}</div>
          </div>
          <div class="item-info-div">
            <label class="item-label">红包金额：</label>
            <div class="item-content">{{ detail.amount }}</div>
          </div>
        </el-col>
        <el-col :span="12" style="display: grid">
          <div class="item-info-div">
            <label class="item-label">红包币种：</label>
            <div class="item-content">{{ detail.coinType }}</div>
          </div>
          <div class="item-info-div">
            <label class="item-label">剩余红包份数：</label>
            <div class="item-content">{{ detail.remainder ? detail.remainder : 0 }}</div>
          </div>
          <div class="item-info-div" v-if="detail.isRefund">
            <label class="item-label">到期退款额：</label>
            <div class="item-content">{{ detail.refund }}</div>
          </div>
          <div class="item-info-div" v-if="detail.isRefund">
            <label class="item-label">退款哈希：</label>
            <div class="item-content">{{ detail.refundHash }}</div>
          </div>
          <div class="item-info-div">
            <label class="item-label">红包备注：</label>
            <div class="item-content">{{ decodMemo(detail.remark) }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <base-table
        :data="table.data"
        :columns="table.columns"
        :config="table.config"
        :page="table.page"
        @current-page-change="currentChange"
        @cell-click="cellClick"
      >
      </base-table>
    </div>
  </div>
</template>

<script>
import { getPacketById } from "@/api/business";
export default {
  name: "DevOpsManage",
  data() {
    return {
      hash: "",
      beneficiary: "",
      detail: {},
      table: {
        data: [],
        columns: [
          {
            label: "抢红包时间",
            minWidth: "140",
            prop: "updatedAt"
          },
          {
            label: "抢红包地址",
            minWidth: "220",
            prop: "beneficiary"
          },
          {
            label: "抢红包金额",
            minWidth: "100",
            prop: "amount"
          },
          {
            label: "交易哈希",
            minWidth: "380",
            prop: "hash"
          }
        ],
        config: {
          showIndexColumn: true,
          showHandler: false,
          handlerColumn: {
            label: "操作",
            fixed: "right",
            align: "center",
            width: "115",
            headerAlign: "center"
          }
        },
        page: {
          size: 10,
          total: 0,
          currentPage: 1
        }
      }
    };
  },
  methods: {
    //点击复制内容
    cellClick(row, column) {
      if (column.property == "hash" || column.property == "beneficiary") {
        this.$copyText(row[column.property]).then(
          () => {
            this.msgSuccess("复制成功");
          },
          () => {
            this.msgError("复制失败");
          }
        );
      }
    },
    //查询
    getPacketById() {
      let params = {
        pageSize: this.table.page.size,
        pageNum: this.table.page.currentPage,
        hash: this.hash,
        beneficiary: this.beneficiary
      };
      getPacketById(this.$route.query.id, params).then((res) => {
        this.table.data = res.data.data.list;
        this.table.page.total = res.data.data.total;
        this.detail = res.data.data.packet;
      });
    },
    async currentChange(val) {
      this.table.page.currentPage = val;
      this.getPacketById();
    },
    decodMemo(memo) {
      if (memo) {
        return Buffer.from(memo, "hex").toString();
      }
    }
  },
  created() {
    this.getPacketById();
  }
};
</script>

<style lang="scss">
#adminManage {
  .el-dialog__body {
    position: relative;
  }
  .el-dialog__body {
    position: relative;
  }
  .el-select-dropdown__item {
    width: 330px;
  }
  .norequire.e.el-form-item__label {
    margin-right: 8em;
  }
  .admin {
    .create {
      padding: 12px 14px;
    }
  }
  .packet-info {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
  }
  .item-info-div {
    padding: 8px 0;
  }
  .item-label {
    text-align: left;
    vertical-align: middle;
    float: left;
    color: #666666;
    line-height: 24px;
    font-size: 13px;
    box-sizing: border-box;
    width: 114px;
  }
  .item-content {
    line-height: 24px;
    padding-left: 114px;
    padding-right: 50px;
    color: #333333;
    position: relative;
    font-size: 13px;
  }
  .el-tabs__header {
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0px;
    background: #fff;
  }
  .el-table .cell {
    padding-left: 20px;
    padding-right: 15px;
  }
  .el-icon-minus:before {
    font-family: "iconfont";
    color: #bcc1d3;
    padding-right: 5px;
    content: "\e616";
    font-size: 5px;
  }
  .el-icon-view:before {
    font-family: "iconfont";
    color: #bcc1d3;
    padding-right: 5px;
    content: "\e615";
    font-size: 5px;
  }
  .input-width {
    min-width: 140px;
    width: 140px;
    margin-right: 20px;
    ::v-deep .el-input__inner {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  .select-tilte {
    width: 28px;
    height: 20px;
    margin-right: 5px;
    font-size: 13px;
    font-weight: 400;
    text-align: left;
    color: #505050;
    line-height: 20px;
  }
}
.search-btn {
  font-size: 13px;
  width: 50px;
  height: 40px;
  padding: 10px 11px;
  color: #ffffff;
  background: #5394eb;
  border-radius: 4px;
  border: 0px;
}
</style>
