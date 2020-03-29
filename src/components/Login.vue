<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区 :model是传输数据，v-model是双向绑定，rluers是表单验证 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- 用户名 prop添加验证表单规则 -->
        <el-form-item prop="username">
          <!-- prefix-icon前面的图标 -->
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-s-goods"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否正确
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      // 重置用户名密码,先把表单form绑定 ref=“”，然后绑定按钮调用 $refs的重置属性resetFields()
      this.$refs.loginFormRef.resetFields()
    },
    // 表单登录之前的验证 调用 $refs 的validate函数，进行表单的预验证
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // 登录请求，判断valid是否weitrue进行请求，然后用 async修饰为异步函数 用 await 进行直接得到有用数据
        // 我们只要其中的 data 数据，所以对它进行重新声明，来获取端口号。
        // this.$http 是配置的axios根路径，在 min.js中
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登陆失败! ') // element 消息弹框
        this.$message.success('登陆成功')
        // 将登陆后的 token 身份识别码 保存到客户端的 sessionStorage 中
        // 项目中除了登陆之外的API接口，必须在登录之后才能访问
        // token 只应该在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 通过编程式导航转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff; //背景色白色
  //圆角边框
  border-radius: 3px;
  //绝对定位
  position: absolute;
  left: 50%;
  top: 50%;
  //位移
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee; //边框线 大小，样式，颜色
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd; //盒子的阴影 向外扩展10px
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: wheat;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px; //外边距
  box-sizing: border-box;
}
</style>
