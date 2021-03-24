<!--
ComponentName TheToolbar
Description Toolbar
author
date 2020/12/7
-->
<template>
  <div class="right-section">
    <div class="logo"></div>
    <div class="title">
      <span>红包后端管理系统</span>
      <div class="title-info">
        <div class="title-logout">
          <span class="admin iconfont icon-admin"></span>
          <span class="arrow-down iconfont " :class="showMenu ? 'icon-head-arrow-up' : 'icon-head-arrow-down'"></span>
          <div class="down-menu" v-show="showMenu">
            <div class="menu-info">
              <p class="info-username">系统管理员</p>
            </div>
            <div class="menu-item" @click="logoutUser" @mouseenter="activeIndex = 1" @mouseleave="activeIndex = ''">
              <div class="item-icon">
                <img
                  v-if="activeIndex === 1"
                  src="../../assets/images/person/logoutActive.png"
                  width="14"
                  height="14"
                />
                <img v-else src="../../assets/images/person/logout.png" width="14" height="14" />
              </div>
              <p>退出登录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/api/user";

export default {
  name: "TheLayoutToolbar",
  data() {
    return {
      escape: true,
      intervalId: null,
      firstUpdatePassWord: false,
      isDot: false,
      showMenu: false,
      activeIndex: "",
      isNotice: false
    };
  },
  methods: {
    handleCommand(command) {
      this[command]();
    },
    logoutUser() {
      logout().then(() => {
        this.$router.push({
          path: "/login"
        });
        localStorage.clear();
      });
    }
  },
  mounted() {
    let _this = this;
    let titleLogout = document.getElementsByClassName("title-logout")[0];
    let downMenu = document.getElementsByClassName("down-menu")[0];
    let timer = null;
    downMenu.onmouseover = function() {
      _this.showMenu = true;
    };
    titleLogout.onmouseover = function() {
      clearTimeout(timer);
      _this.showMenu = true;
    };
    titleLogout.onmouseout = function() {
      timer = setTimeout(() => {
        _this.showMenu = false;
      }, 100);
    };
  }
};
</script>

<style scoped lang="scss">
.right-section {
  width: 100%;
  line-height: 60px;
  text-align: right;
  display: flex;
  .logo {
    width: 170px;
    height: 60px;
    padding: 0px 35px;
    box-sizing: border-box;
    background: #25292f;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    flex: 1;
    background: #fff;
    display: flex;
    padding-left: 10px;
    box-sizing: border-box;
    justify-content: space-between;
    box-shadow: 1px 0px 16px 0px rgba(213, 219, 236, 0.5);
    z-index: 10;
    span {
      &:nth-of-type(1) {
        font-size: 22px;
        font-weight: 600;
        color: #575757;
      }
    }
    .title-info {
      display: flex;
      align-items: center;
      ::v-deep .el-badge__content.is-dot {
        height: 6px;
        width: 6px;
        padding: 0;
        border-radius: 50%;
      }
      .admin {
        margin-left: 15px;
        margin-right: 9px;
        font-size: 30px;
        color: #5193ed;
      }
      .notice {
        font-size: 16px;
        color: #666666;
      }
      .arrow-down {
        font-size: 20px;
        color: #666666;
        -webkit-transform-origin-x: 0;
        -webkit-transform: scale(0.25);
        transform: scale(0.25);
      }
      .title-item {
        line-height: 13px;
        cursor: pointer;
      }
      .el-icon-bell {
        color: #333;
        font-size: 22px;
        cursor: pointer;
      }
      .title-logout {
        position: relative;
        cursor: pointer;
        color: #606266;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          color: #6f6f6f;
        }
        .down-menu {
          margin-right: 10px;
          width: 150px;
          height: 109px;
          background: #fff;
          position: absolute;
          z-index: 999;
          top: 70px;
          right: 10px;
          border-radius: 8px;
          box-shadow: 0px 1px 16px 0px rgba(213, 219, 236, 0.5);
          .menu-info {
            height: 45px;
            border-bottom: 1px solid #f2f3f7;
            line-height: normal;
            padding-left: 20px;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            .info-username {
              font-size: 16px;
              color: #212121;
              font-weight: 400;
            }
            .info-phone {
              font-size: 14px;
              color: #a9a9a9;
              font-weight: normal;
              margin-top: 3px;
            }
          }
          .menu-item {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #f2f3f7;
            color: #666666;
            text-align: left;
            display: flex;
            align-items: center;
            padding-left: 20px;
            font-size: 14px;
            .item-icon {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              margin-right: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              .icon-child {
                width: 6px;
                height: 6px;
                background: #9fa3a9;
                border-radius: 50%;
              }
            }
            p {
              color: #333;
              &:hover {
                color: #5193ed;
              }
            }
          }
          .menu-item:hover {
            background: #ecf3fe;
            color: #5394eb;
          }
          .menu-item:last-child {
            border-bottom: none;
          }
          .menu-item:last-child:hover {
            border-radius: 0 0 8px 8px;
          }
        }
      }
    }
  }
  .user-modal {
    .user-info {
      padding-left: 30px;
      .item-info {
        display: flex;
        align-items: center;
        font-size: 14px;
        p {
          width: 110px;
          color: #505050;
        }
        span {
          color: #393939;
          flex: 1;
          line-height: normal;
        }
      }
    }
  }
  ::v-deep .el-dialog__close {
    color: #fff;
  }
  ::v-deep .el-dialog__headerbtn {
    top: 17px;
  }
  .update-pass {
    .el-form-item__label {
      color: #4b4f59;
    }
    .btns {
      .cancel {
        background: #b2b9c2;
        color: #fff;
      }
      .confirm {
        background: #5394ec;
        color: #fff;
      }
    }
  }
}
</style>
