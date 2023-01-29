<!-- 首页模块的双创先锋（工作室）管理面板 -->

<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>双创先锋管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入工作室 ID 进行搜索"
            v-model="seachContent"
            clearable
            @clear="getStudioList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchStudio()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加工作室</el-button
          >
        </el-col>
      </el-row>

      <!-- 工作室数据列表区域  -->
      <el-table :data="StudioList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="img"></el-table-column>
        <el-table-column label="简介" prop="introduction"></el-table-column>
        <el-table-column label="词条" prop="herf"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              effect="dark"
              content="修改信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip
              effect="dark"
              content="删除工作室"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeStudioById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加工作室的对话框 -->
    <el-dialog
      title="添加工作室"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>

        <el-form-item label="标识">
          <el-input v-model="addForm.img"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="addForm.introduction"></el-input>
        </el-form-item>

        <el-form-item label="词条">
          <el-input v-model="addForm.herf"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudio">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改工作室的对话框 -->
    <el-dialog
      title="修改工作室"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="标识">
          <el-input v-model="editForm.img"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="editForm.introduction"></el-input>
        </el-form-item>

        <el-form-item label="词条">
          <el-input v-model="editForm.herf"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 根据id搜工作室的对话框 （暂未开发） -->
    <el-dialog
      title="搜索结果"
      :visible.sync="searchDetailedDialogVisible"
      width="50%"
    >
      <el-form :model="searchForm" ref="searchFormRef" label-width="70px">
        <el-form-item label="ID">
          <el-input v-model="searchForm.id"></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>

        <el-form-item label="标识">
          <el-input v-model="searchForm.img"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="searchForm.introduction"></el-input>
        </el-form-item>

        <el-form-item label="词条">
          <el-input v-model="searchForm.herf"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="searchDetailedDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 工作室数据数组
      StudioList: [],

      // 按id搜的结果
      searchList: [],

      // 搜索框内容 （暂未开发）
      seachContent: '',

      // 添加工作室的表单数据
      addForm: {
        name: '',
        img: '',
        introduction: '',
        herf: '',
      },

      // 修改工作室信息的信息对象
      editForm: {
        id: '',
        name: '',
        img: '',
        introduction: '',
        herf: '',
      },

      // 根据id搜索工作室时的信息对象 （暂未开发）
      searchForm: {
        id: '',
        name: '',
        img: '',
        introduction: '',
        herf: '',
      },

      // 控制添加工作室对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改工作室对话框的显示与隐藏
      editDialogVisible: false,
      // 控制查看工作室详细信息的对话框的显示与隐藏
      RoleDetailedDialogVisible: false,
      // 控制根据id搜索工作室对话框的显示与隐藏 （暂未开发）
      searchDetailedDialogVisible: false,
    }
  },

  created() {
    this.getStudioList()
    
  },

  methods: {
    // 获取工作室数据列表
    async getStudioList() {
      const { data: res } = await this.$http.get('/studio/query')

      if (res.status != 200) {
        return this.$message.error('获取数据失败！')
      }

      this.StudioList = res.data
    },

    // 搜索工作室 （暂未开发）
    async searchStudio() {
      if (this.seachContent === '') {
        return this.$message.error('请输入工作室的ID！')
      } else {
        var id = parseInt(this.seachContent)
        const { data: res } = await this.$http.get(
          `/Background/findUserById?uid=${id}`
        )
        if (res.flag !== true) {
          return this.$message.error('没有此工作室！')
        }
        this.searchForm.email = res.data.email
        this.searchForm.gender = res.data.gender
        this.searchForm.headshot = res.data.headshot
        this.searchForm.identity = res.data.identity
        this.searchForm.nickname = res.data.nickname
        this.searchForm.phonenumber = res.data.phonenumber
        this.searchForm.place = res.data.place
        this.searchForm.realname = res.data.realname
        this.searchForm.uid = res.data.uid
        // 打开对话框
        this.searchDetailedDialogVisible = true
      }
    },

    // 添加工作室
    addStudio() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return

        // 可以发起添加工作室的网络请求
        const { data: res } = await this.$http.post(
          '/studio/addorupdate',
          this.addForm
        )

        if (res.status !== 200) {
          this.$message.error('添加工作室失败！')
        }

        this.$message.success('添加工作室成功！')

        // 隐藏添加工作室的对话框
        this.addDialogVisible = false

        // 重新获取工作室列表数据
        this.getStudioList()
      })
    },

    // 修改工作室信息
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return

        // 请求对象
        var query = {
          name: this.editForm.name,
          img: this.editForm.img,
          introduction: this.editForm.introduction,
          herf: this.editForm.herf,
        }

        // 发起修改工作室信息的数据请求
        const { data: res } = await this.$http.post(
          '/studio/addorupdate',
          query
        )

        if (res.status !== 200) {
          return this.$message.error('更新工作室信息失败！')
        }

        this.$message.success('更新工作室信息成功！')

        // 删除当前的这条数据，因为后端把新增和修改的接口做的是同一接口，如果不同时删除的话会出现一个修改前的数据和修改后的数据同框出现
        await this.$http.get('/studio/delete/' + this.editForm.id)

        // 关闭对话框
        this.editDialogVisible = false

        // 刷新数据列表
        this.getStudioList()
      })
    },

    // 展示修改工作室的对话框
    showEditDialog(data) {
      this.editForm.herf = data.herf
      this.editForm.id = data.id
      this.editForm.img = data.img
      this.editForm.introduction = data.introduction
      this.editForm.name = data.name
      this.editDialogVisible = true
    },

    // 根据Id删除对应的工作室信息
    async removeStudioById(id) {
      // 弹框询问工作室是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该工作室, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      // 如果工作室确认删除，则返回值为字符串 confirm
      // 如果工作室取消了删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$http.get('/studio/delete/' + id)
      if (res.status !== 200) {
        return this.$message.error('删除工作室失败！')
      }
      this.$message.success('删除工作室成功！')

      this.getStudioList()
    },

    // 监听添加工作室对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },

    // 监听修改工作室对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 监听查看工作室详情的对话框的关闭事件
    RoleDialogClosed() {},
  },
}
</script>

<style lang="less" scoped></style>
