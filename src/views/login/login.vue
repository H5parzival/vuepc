<template>
  <div class="login">
    <div class="left">
      <div class="top">
        <img class="logo" src="@/assets/img/login_logo.png" alt="" />
        <span class="t1">黑马面面</span>
        <div class="line"></div>
        <span class="t2">用户登陆</span>
      </div>
    </div>
    <div class="right" src="@/assets/img/login_banner_ele.png"></div>
  </div>
</template>

<script>
export default {};
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
  //水平方向处理
  display: flex;
  justify-content: space-around;
  //垂直方向处理
  align-items: center;
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .top {
      display: flex;
      align-items: center;
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
  }
  .right {
    width: 633px;
    height: 435px;
  }
}
</style>