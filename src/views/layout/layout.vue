<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="el-icon-s-fold icon" @click="bol = !bol"></div>
      <img class="logo" src="@/assets/img/layout_logo2.png" alt="" />
      <div class="title1">黑马面面</div>
      <div class="nouse"></div>
      <img class="avatar" :src="baseUrl + '/' + $store.state.userInfo.avatar" alt="" />
      <div class="title2">{{$store.state.userInfo.username }}，您好</div>
      <el-button type="primary" @click="exit">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="auto" class="left">
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          :collapse="bol"
        >
          <el-menu-item index="/layout/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/layout/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, logout } from '@/api/layout.js'
import { localRemove } from '@/utils/local.js'
export default {
  data () {
    return {
      userInfo: '',
      baseUrl: process.env.VUE_APP_URL,
      bol: false
    }
  },
  created () {
    // 调用用户信息接口
    // 1：在api中定义获取用户信息接口  2：首先导入该定义的方法  3：调用
    getUserInfo().then(res => {
      this.$store.state.userInfo = res.data
      window.console.log(res)
    })
  },
  methods: {
    //   退出
    
    exit () {
      this.$confirm('你真的要退出该网站吗?','友情提示',{
        confrimButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
 logout().then(() => {
        // 删除token
        localRemove()
        //跳转至登陆页
        this.$router.push('/')
      })
      })
      
     
    
    }
  
  }
}
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    .nouse {
      flex: 1;
    }
    .icon {
      font-size: 20px;
    }
    .logo {
      height: 28px;
      margin: 0 12px 0 22px;
    }
    .title1 {
      font-size: 22px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
    }
    .avatar {
      width: 43px;
      height: 43px;
    }
    .title2 {
      font-size: 14px;
      margin: 0 38px 0 9px;
    }
    // box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
  }
  .left {
    // box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
  }
  .main {
    background: #e8e9ec;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
