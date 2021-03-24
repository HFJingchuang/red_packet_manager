<!--
ComponentName Login
Description Login
author fanglequn
date 2020/12/7
-->
<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="box-left">
        <div class="left-logo"></div>
      </div>
      <div class="box-right">
        <h3 class="title">登录</h3>
        <p class="desc">欢迎来到红包管理平台</p>
        <div class="right-form">
          <el-form :rules="rules" :model="form" ref="loginForm">
            <el-form-item prop="username">
              <div class="item-input">
                <img src="../../../assets/images/login/user.png" width="18" height="18" />
                <el-input v-model="form.nickname" placeholder="请输入手机号码/用户名"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="item-input">
                <img src="../../../assets/images/login/pass.png" width="18" height="18" />
                <el-input
                  type="password"
                  v-model="form.password"
                  @keyup.enter.native="login"
                  placeholder="请输入登录密码"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="item-text"></div>
            </el-form-item>
            <el-form-item>
              <div class="item-btn">
                <el-button type="primary" @click="login" :disabled="loginDisabled">登录</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { loginIn } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      form: {
        nickname: "",
        password: ""
      },
      rules: {
        nickname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入登录密码", trigger: "blur" }]
      },
      loginDisabled: false
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginDisabled = true;
          loginIn(this.form).then((res) => {
            if (res.data.status == 0) {
              this.loginDisabled = false;
              localStorage.setItem("user_login", res.data.data.nickname);
              this.$router.push({ path: "/index" });
            } else {
              this.loginDisabled = false;
              this.msgError("用户名或者密码错误");
            }
          }).ca;
        } else {
          this.loginDisabled = false;
          this.msgError("请输入用户名或者密码");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login-wrap {
  height: 100vh;
  background-image: url("../../../assets/images/login/bg.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  text-align: center;
  .login-box {
    width: 1024px;
    height: 520px;
    background: #fff;
    display: flex;
    margin: 0 auto;
    .box-left {
      width: 530px;
      background-image: url("../../../assets/images/login/left-bg.jpg");
      background-size: cover;
      height: 100%;
      .left-logo {
        padding-left: 30px;
        padding-top: 20px;
      }
    }
    .box-right {
      flex: 1;
      padding: 102px 102px;
      text-align: left;
      .title {
        color: #333;
        font-size: 18px;
        margin: 0;
      }
      .desc {
        color: #999;
        font-size: 13px;
        margin-top: 12px;
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .item-input {
        display: flex;
        height: 60px;
        line-height: 60px;
        align-items: flex-end;
        border-bottom: 1px solid #e0e0e0;
        img {
          margin-bottom: 10px;
        }
        .kaptcha {
          cursor: pointer;
        }
        ::v-deep .el-input {
          float: left;
          line-height: 15px;
          flex: 1;
        }
        ::v-deep .el-input__inner {
          border: none;
        }
      }
      .item-text {
        text-align: right;
        color: #788295;
        height: 30px;
        line-height: 30px;
        p {
          display: inline-block;
          cursor: pointer;
        }
      }
      .item-btn {
        .el-button {
          width: 100%;
          height: 50px;
        }
      }
    }
  }
  ::v-deep input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white insert !important;
    transition: background-color 5000s ease-in-out 0s; /*通过延时渲染背景色变相去除背景颜色*/
    caret-color: #fff; /*光标颜色*/
  }
}
</style>
