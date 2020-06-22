<template>
  <!-- dialog对话框 
    el-dialog
     visible控制对话框是否显示
     title标题
     slot:对以前默认的东西（title/footer）重写 
     width:宽度  
     show-close:是否显示关闭按钮 
    -->
  <el-dialog
    :visible="isShow"
    width="600px"
    class="register"
    :show-close="false"
  >
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl + '/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="15">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <!-- offset左边偏移栏数，它要与该元素的span合并起才是所占拦数 -->
          <el-col :span="7" :offset="2">
            <img @click="refreshCode" class="code-img" :src="codeUrl" alt="" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="15">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="2">
            <!-- 获取验证码
            1：验证手机号与图形码都验证通过
               validateField(["手机号字段","图形码字段 "],error=>{
                 此处会执行二次
                 
               })
            2二次都通过后面才调用接口获取手机验证码

             -->
            <el-button @click="getPhoneCode" :disabled="totalTime < 60"
              >获取验证码<span v-if="totalTime != 60"
                >{{ totalTime }}秒</span
              ></el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="footer">
      <el-button @click="isShow = false">取消</el-button>
      <!-- 调用form表单全局验证
      1：form上加一个ref
      2:this.$refs.值.validate(result=>{ result==true})
       -->
      <el-button type="primary" @click="toRegister">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { sendsms, register } from '@/api/login.js'
export default {
  data () {
    return {
      isShow: false,
      baseUrl: process.env.VUE_APP_URL,
      codeUrl: process.env.VUE_APP_URL + '/captcha?type=sendsms',
      totalTime: 60,
      form: {
        avatar: '', //头像
        username: '', //用户名
        email: '', //邮箱
        phone: '', //手机号
        password: '', //密码
        code: '', //图形码
        rcode: '' //验证码
      },
      rules: {
        avatar: [{ required: true, message: '请上传头像', trigger: 'change' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        /*
        validator:(rule,value,callback)=>{
     rule:规则
     value:当前验证项的值
     callback:函数 特点：验证通过一定要调用callback()
                        验证不通过一定要调用callback(new Error("错误信息"))
                                           callback("错误信息")
        }
        */

        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
              if (reg.test(value)) {
                callback()
              } else {
                callback('请正确输入邮箱地址')
              }
            },
            trigger: 'change'
          }
        ],
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
            }
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        code: [{ required: true, message: '请输入图形码', trigger: 'change' }],
        rcode: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      },
      imageUrl: ''
    }
  },
  /*
  watch:{
    1：写出要侦听的值  this.isShow
    2:去掉该值this加上引号
       "isShow"(newVal,oldVal){
         newVal:当前值  oldVal上一次的值
       }
       this.$route.query
  }
  */

  watch: {
    isShow (newVal) {
      if (newVal == false) {
        //清理表单
        this.$refs.form.resetFields()
        this.imageUrl = ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      window.console.log(res)
      this.form.avatar = res.data.file_path
      //   validateField  部分元素表单验证
      //  第一个参数 字符串或者数组   ，第二个就是验证后的回调函数，如果error不为空，说明验证失败
      //注意：如果第一个参数是数组,有几项后面的回调函数就执行几次
      this.$refs.form.validateField(['avatar'])
    },
    beforeAvatarUpload (file) {
      let arr = ['image/jpeg', 'image/png']
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 点击注册
    toRegister () {
      this.$refs.form.validate(result => {
        if (!result) {
          this.$message.warning('请完整填写信息')
        } else {
          // 验证通过，调用注册接口
          register(this.form).then(() => {
            // window.console.log('注册结果：', res)
            // if (res.data.code == 200) {
            this.$message.success('注册成功')
            this.isShow = false
            // } else {
            // this.$message.error('注册失败')
            // }
          })
        }
      })
    },
    //获取手机验证码
    getPhoneCode () {
      let _isPass = 0
      this.$refs.form.validateField(['phone', 'code'], error => {
        window.console.log('error:', error)
        if (!error) {
          _isPass++
        }
      })
      if (_isPass == 2) {
        //验证通过
        // 调用接口获取验证码
        // api基本使用1：创建api文件夹并创建相应js文件 2：安装导入axios并创建副本 3：写接口调用相应fun并export,4:在相应页面导入并使用
        window.console.log(sendsms)
        //判断是否多长时间内调用
        //如果时间小于60，表示刚刚点过，不能点，disabled处理了
        this.totalTime--
        var inter = setInterval(() => {
          this.totalTime--
          if (this.totalTime <= 0) {
            clearInterval(inter)
            this.totalTime = 60
          }
        }, 1000)
        sendsms({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          //希望出错了信息也跑到这里来处理
          if (res.code == 200) {
            this.$message.success(res.data.captcha + '')
          } else {
            this.$message.error(res.message)
            this.refreshCode()
          }
        })
      }
      window.console.log(_isPass)
    },
    //点击刷新图形码
    refreshCode () {
      this.codeUrl =
        process.env.VUE_APP_URL + '/captcha?type=sendsms&twsdgsdg=' + Date.now()
    }
  }
}
</script>

<style lang="less">
.register {
  .title {
    height: 53px;
    background: linear-gradient(to right, #02c5fa, #1395fa);
    text-align: center;
    line-height: 53px;
    color: #fff;
    font-size: 14px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .footer {
    text-align: center;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .item-left {
    margin-left: 20px;
  }
  .code-img {
    width: 100%;
    height: 40px;
    border: 1px dashed #ccc;
  }
}
</style>
