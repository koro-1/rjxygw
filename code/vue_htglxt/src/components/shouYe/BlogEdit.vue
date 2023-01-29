<template>
  <div>
    <Header></Header>
    <div class="edit-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="简介" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor   v-model="ruleForm.content" ref="md" @imgAdd="imgAdd"></mavon-editor>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

export default {

  data() {
    return {
      ruleForm: {
        title: "",
        description: "",
        content: "",
        author: this.$store.getters.getUserInfo.username
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入摘要（简介）", trigger: "blur" }
        ],
        content: [{ required: true, trigger: "blur" }]
      }
    };
  },
  methods: {


    imgAdd(pos, $file) {
      //新建form表单类型的数据
      let formData = new FormData();
      //将我们上传的图片地址$file加进表单里面，命名为“file”（参数名字与后端相匹配）
      formData.append("file", $file);
      alert(localStorage.getItem("token"));

      this.$axios
              .post("/files/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: localStorage.getItem("token")

                }
              }).then((res) => {
        if (res.status === 200) {
          // 将后端返回的url放在md中图片的指定位置
          this.$refs.md.$img2Url(pos, res.data.data);
        } else {
          this.$message.error(res.message);
        }
      });
      //访问后台服务器方法
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert(JSON.stringify(this.ruleForm))
          const _this = this;
          this.$axios
            .post("/blog/edit", this.ruleForm, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })
            .then(res => {
              this.$alert("操作成功", "消息提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$message({
                    type: "info",
                    message: '操作成功！已返回首页！'
                  });
                  _this.$router.push("/blog");
                }
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    let blogId = this.$route.params.blogId
    if(blogId){
      this.$axios.get("/blog/"+blogId).then(res=>{
        let blog = res.data.data
        this.ruleForm.id = blog.id
        this.ruleForm.title = blog.title
        this.ruleForm.description = blog.description
        this.ruleForm.content = blog.content
      })
    }
  }
};
</script>

<style scoped>
.edit-content {
  text-align: center;
  clear: both;
}

</style>