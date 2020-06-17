<template>
  <div class="login">
    <div class="left">
      <div class="top">
        <img class="logo" src="@/assets/img/login_logo.png" alt />
        <span class="t1">黑马面面</span>
        <div class="line"></div>
        <span class="t2">用户登陆</span>
      </div>
      <el-form :model="form">
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.code"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="code" src="http://127.0.0.1/heimamm/public/captcha?type=login" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.isChecked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">登陆</el-button>
          <br />
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="right" src="/assets/img/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: "", //手机号
        password: "", //密码
        isChecked: false
      }
    };
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 148, 250, 1),
    rgba(2, 198, 250, 1)
  );
  display: flex;
  //   水平方向处理
  justify-content: space-around;
  //侧方向处理
  align-items: center;
  .left {
    box-sizing: border-box;
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 28px;
      .logo {
        width: 22px;
        height: 17px;
      }
      .t1 {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(13, 12, 12, 1);
        margin: 0 14px 0 17px;
      }
      .line {
        width: 1px;
        height: 28px;
        margin-right: 14px;
        background: rgba(199, 199, 199, 1);
      }
      .t2 {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(13, 12, 12, 1);
      }
    }
    .login-form {
      .el-input__inner {
        height: 45px;
      }
      .el-form-item {
        margin-bottom: 25px;
      }
      .code {
        width: 100%;
        height: 45px;
      
      }
    }
    .btn {
      width: 100%;
      &:nth-child(1) {
        margin-bottom: 26px;
      }
    }
  }
  .right {
    width: 633px;
    height: 435px;
  }
}
</style>