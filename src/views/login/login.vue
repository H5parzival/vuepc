<template>
  <div class="login">
    <div class="left">
      <div class="top">
        <img class="logo" src="@/assets/img/login_logo.png" alt="" />
        <span class="t1">黑马面面</span>
        <div class="line"></div>
        <span class="t2">用户登陆</span>
      </div>
      <!-- 验证步骤
      1：在el-form上加一个 :rules="rules"
      2:在需要验证的子项（el-form-item）上加一个prop(它的值为v-model后面的值的key)
      3:写验证规则 
         required:必填
         message:错误信息
         trigger:"blur/change"
         min:最小长度
         max:最大长度   
      来一个form全局验证
      1：在el-form上定义一个ref   
      2:访问el-form的this======this.$refs.form
        this.$refs.form.validate(result=>{
          result==true  验证通过
          result===false  验证不通过
        })
       -->
      <el-form class="login-form" :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                v-model="form.code"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <!-- 验证码刷新
              1：写一个点击事件
              2：点击事件来一个src的值加入一个随机数
               -->
              <img class="code" @click="refreshCode" :src="codeUrl" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isChecked">
          <el-checkbox v-model="form.isChecked"
            >我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
              type="primary"
              >隐私条款</el-link
            ></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="toLogin"
            >登陆</el-button
          >
          <br />
          <!-- 父元素操作子组件data值
          父访问子组件this  1:在子组件身上定义一个ref属性 
                           2：this.$refs.值====子组件this
                             this.$refs.值.isShow=true  显示注册页面
          
           -->
          <el-button
            class="btn"
            type="primary"
            @click="$refs.register.isShow = true"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <img class="right" src="@/assets/img/login_banner_ele.png" alt="" />
    <!-- 对话框 -->
    <register ref="register"></register>
  </div>
  <!-- 组件套用组件
  1：导入
  2：注册  components:{}
  3:使用
   -->
</template>

<script>
import register from './register'
import { login } from '@/api/login.js'
import { localSave, localGet } from '@/utils/local.js'
export default {
  name: 'Login',
  components: {
    register
  },
  created () {
    // 访问环境变量
    window.console.log('环境变量：', process.env.VUE_APP_URL)

    // 已有token直接跳转至layout
    if (localGet()) {
      this.$router.push('/layout')
    }
  },
  data () {
    return {
      codeUrl: process.env.VUE_APP_URL + '/captcha?type=login',
      form: {
        phone: '', //手机号
        password: '', //密码
        code: '', //验证码
        isChecked: ''
      },
      rules: {
        /*
        自定义表单验证
        1：el-form上加一个 :rules="rules"  :model="form"
        2:需要验证的项加一个（el-form-item）   prop="需要验证项的key值"
        3:rules:{
          需要验证项的key值:[
            {required:true,message:"出错信息",trigger:"change/blur"},
            {min:最小长度，max:"最大长度"},
            {validator:(rule,value,callback)=>{
              如果验证通过  callback()
              如果验证不通过  callback(new Error("错误信息"))   callback("错误信息")
            }}
          ]
        }        
        
        */

        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              if (reg.test(value)) {
                callback()
              } else {
                callback('请正确输入手机号')
              }
            },
            trigger: 'change'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'change' }
        ],
        isChecked: [
          //值为false时才触发这个验证
          { required: true, message: '请勾选协议', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value === true) {
                callback()
              } else {
                callback('请勾选协议')
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 登陆
    toLogin () {
      this.$refs.form.validate(result => {
        window.console.log(result)
        if (!result) {
          //弹框提示一下
          this.$message({
            message: '验证不通过',
            type: 'warning'
          })
        } else {
          // this.$message('验证通过')
          /*
          验证通过，调用登陆接口
          1：在相应api里定义接口调用方法
          2：在login.vue中导入该方法
          3：使用该方法
          */
          login(this.form).then(res => {
            window.console.log('登陆成功信息：', res)
            this.$message.success('登陆成功')
            // 获取到了token需要存储起来
            localSave('token', res.data.token)
            // 路由跳转
            this.$router.push('/layout')
            // this.$message(localGet())
            // window.localStorage.setItem('token', res.data.token)
          })
        }
      })
    },
    //验证码刷新
    refreshCode () {
      this.codeUrl =
        process.env.VUE_APP_URL + '/captcha?type=login&ttt=' + Date.now()
    }
  }
}
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
      .btn {
        width: 100%;
        &:nth-child(1) {
          margin-bottom: 26px;
        }
      }
    }
  }
  .right {
    width: 633px;
    height: 435px;
  }
}
</style>
