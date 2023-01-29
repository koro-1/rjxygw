<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="用户名"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="success" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },

      // 登录成功或失败的标志位
      loginFlag: false,

      // 标记除登录页面外，其他页面获取到了用户信息的状态标志位
      getUserInfoFlag: true,

      // 后端返回的登陆成功的用户的详细信息
      userInfo: {},
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return

        const result = await this.$http.post('/login', this.loginForm) 
         
        this.userInfo = result.data.data

        if (result.data.status !== 200) return this.$message.error('登录失败！')
        const _this = this;
        const jwt = result.headers["authorization"];
        const userInfor = result.data.data;
        //提交到仓库
        _this.$store.commit("setToken", jwt);
        _this.$store.commit("setUserInfo", userInfor);
        this.$message.success('登录成功！')
        alert(JSON.stringify(_this.$store.getters.getUserInfo));

        this.loginFlag = true

        // // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        // //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        // //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', result.headers.authorization)
        
        // 2. 通过编程式导航跳转到后台主页，并传递用户信息
        var that = this

        this.$router.push({
          path: '/home',
          query: {
            userInfo: that.userInfo,
          },
        })


        
        // 保存登录成功的状态
        window.sessionStorage.setItem('isLogin', this.loginFlag)

        // 标记除登录页面外，其他页面获取到了用户信息的状态
        window.sessionStorage.setItem('isGetUserInfo', this.getUserInfoFlag)
      })
    },

    // 注册
    register() {
      this.$router.push('/register')
    },
  },
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
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
