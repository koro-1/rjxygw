
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>下载中心管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-upload
            class="upload-demo"
            drag
            action="http://127.0.0.1:8082/files/upload"
            show-file-list
            :before-upload="beforeUpload"
            :data=this.params>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">文件不超过50mb</div>
    </el-upload>
    <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="description">
    </el-input>

  </div>





</template>

<script>
  export default {

    data() {
      return {
        params: {},
        description: ''


      };
    },
    methods: {
      beforeUpload() {


        if (this.description===""){
          this.$message.error("请描述文件")
        }else
        this.params={"description":this.description}



      }
    },
  }
</script>

<style lang="less" scoped>

  .upload-demo{


    padding: 20px 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 80%;
    min-height: 700px;
    margin: auto;

  }
</style>