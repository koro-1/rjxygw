<!-- 注册界面 -->
<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 表单区域 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        label-width="0px"
        class="register_form"
      >
        <!-- 注册邮箱账号 -->
        <el-form-item>
          <el-input
            v-model="registerForm.email"
            prefix-icon="iconfont icon-danju"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>

        <!-- 用户名 -->
        <el-form-item>
          <el-input
            v-model="registerForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="用户名"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item>
          <el-input
            class="codeInputBox"
            v-model="registerForm.verificationcode"
            prefix-icon="iconfont icon-tijikongjian"
            placeholder="验证码"
          ></el-input>
          <el-button class="getCodeBtn" type="warning" plain @click="getCode"
            >获取</el-button
          >
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
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
      registerForm: {
        email: '',
        username: '',
        password: '',
        // 密文（加密过）验证码
        verificationencode: '',
        // 明文的验证码
        verificationcode: '',
      },
    }
  },
  methods: {
    // 获取密文（加密过）验证码
    async getCode() {
      var mail = this.registerForm.email
      const { data: res } = await this.$http.get(`/sendmail?email=${mail}`)
      this.registerForm.verificationencode = res.data
    },

    // 注册
    async register() {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return

        // 调用注册接口
        const { data: res } = await this.$http.post(
          '/register',
          this.registerForm
        )

        if (res.status !== 200) return this.$message.error('注册失败！')

        this.$message.success('注册成功！')

        // 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/login')
      })
    },

    // 点击重置按钮，重置表单
    resetRegisterForm() {
      this.$refs.registerFormRef.resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
.register_container {
  background-color: #2b4b6b;
  height: 100%;
}

.register_box {
  width: 450px;
  height: 350px;
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

.register_form {
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

// 验证码那行输入框
.codeInputBox {
  width: 80%;
}

// 获取验证码按钮
.getCodeBtn {
  margin-left: 10px;
}
</style>
