<template>
  <div class="admin" id="adminManage">
    <base-title style="margin-top: 4px; margin-bottom: 20px">
      <template #btn>
        <div class="count">
          <div>
            <el-row class="monitor-detail">
              <img src="@/assets/devops/redpacket.svg" />
              <div>
                <span class="home_page_spn2">成功发送红包总数</span>
                <p class="home_page_spn1">{{ totalCount }}</p>
              </div>
            </el-row>
          </div>
          <div>
            <el-row class="monitor-detail">
              <img src="@/assets/devops/redpacket.svg" />
              <div>
                <span class="home_page_spn2">未抢完红包数量</span>
                <p class="home_page_spn1">{{ remainderCount }}</p>
              </div>
            </el-row>
          </div>
        </div>
        <div>
          <span class="select-tilte">交易哈希</span>
          <el-input v-model="hash" class="input-width" placeholder="输入交易哈希" :clearable="true"></el-input>
          <span class="select-tilte">创建地址</span>
          <el-input v-model="address" class="input-width" placeholder="输入创建地址" :clearable="true"></el-input>
          <el-button class="search-btn" @click="getPacketList">查询</el-button>
        </div>
      </template>
    </base-title>
    <base-table
      :data="table.data"
      :columns="table.columns"
      :config="table.config"
      :page="table.page"
      @current-page-change="currentChange"
      @cell-click="cellClick"
    >
      <template #handler="{ row }">
        <el-button type="info" round size="small" @click="detail(row)">详情</el-button>
      </template>
    </base-table>
  </div>
</template>

<script>
import { getPacketCount, getPacketList, getPacketRemainderCount } from "@/api/business";
export default {
  name: "DevOpsManage",
  data() {
    return {
      hash: "",
      address: "",
      totalCount: 0,
      remainderCount: 0,
      chainDetailPermi: "chain-list-detail-business",
      options: [],
      table: {
        data: [],
        columns: [
          {
            label: "创建时间",
            minWidth: "160",
            prop: "createdAt"
          },
          {
            label: "交易哈希",
            minWidth: "190",
            prop: "hash"
          },
          {
            label: "创建地址",
            minWidth: "190",
            prop: "creator"
          },
          // {
          //   label: "币种",
          //   minWidth: "100",
          //   prop: "coinType"
          // },
          {
            label: "类型",
            minWidth: "90",
            prop: "type"
          },
          // {
          //   label: "份数",
          //   minWidth: "100",
          //   prop: "num"
          // },
          // {
          //   label: "剩余份数",
          //   minWidth: "100",
          //   prop: "remainder"
          // },
          // {
          //   label: "总额",
          //   minWidth: "100",
          //   prop: "amount"
          // },
          {
            label: "是否退款",
            minWidth: "100",
            prop: "isRefund"
          },
          {
            label: "退款额",
            minWidth: "100",
            prop: "refund"
          }
        ],
        config: {
          showIndexColumn: true,
          showHandler: true,
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
    cellClick(row, column) {
      if (column.property == "hash" || column.property == "creator") {
        this.$copyText(row[column.property]).then(
          () => {
            this.msgSuccess("复制" + column.label + "成功");
          },
          () => {
            this.msgError("复制" + column.label + "失败");
          }
        );
      }
    },
    detail(row) {
      this.$router.push({
        path: "/detail",
        query: {
          id: row.id
        }
      });
    },
    getPacketList() {
      let params = {
        pageSize: this.table.page.size,
        pageNum: this.table.page.currentPage,
        hash: this.hash,
        address: this.address
      };
      getPacketList(params).then((res) => {
        this.table.data = res.data.data.list;
        this.table.data.forEach((item) => {
          item.type = item.type == 0 ? "普通红包" : "运气红包";
          item.isRefund = !item.isRefund ? "否" : "是";
          item.refund = !item.refund ? 0 : item.refund;
        });
        this.table.page.total = res.data.data.total;
      });
    },
    getPacketCount() {
      getPacketCount().then((res) => {
        this.totalCount = res.data.data;
      });
    },
    getPacketRemainderCount() {
      getPacketRemainderCount().then((res) => {
        this.remainderCount = res.data.data;
      });
    },
    async currentChange(val) {
      this.table.page.currentPage = val;
      this.getPacketList();
    }
  },
  created() {
    this.getPacketList();
    this.getPacketCount();
    this.getPacketRemainderCount();
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
    min-width: 130px;
    width: 130px;
    margin-right: 20px;
    ::v-deep .el-input__inner {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  .select-tilte {
    width: 28px;
    height: 20px;
    padding-right: 5px;
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
.monitor-detail {
  height: 50px;
  width: 180px;
  // background-color: #bba5a5;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.185);
  box-shadow: 1px 1px #e2e1e1;
  border-radius: 10px;

  img {
    height: 30px;
    width: 40px;
    margin-right: 5px;
  }
  div {
    display: flex;
    align-items: left;
    flex-direction: column;
    // justify-content: center;

    span {
      color: #999;
    }

    p {
      margin-top: 5px;
      color: #0a1c48;
    }
  }
}
.home_page_spn1 {
  font-size: 14px;
  color: #333333;
  font-weight: 600;
}
.home_page_spn2 {
  font-size: 12px;
  color: #999999;
  line-height: 18px;
}
.count {
  display: flex;
  flex: auto;
  margin-left: 20px;
}
</style>
