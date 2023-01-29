<!-- 首页模块的轮播图管理面板 -->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入图片 ID 进行搜索"
            v-model="seachContent"
            clearable
            @clear="getLbtList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchLbt()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加图片</el-button
          >
        </el-col>
      </el-row>

      <!-- 轮播图列表区域lbtList -->
      <el-table :data="lbtList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="URL" prop="url"></el-table-column>
        <el-table-column label="标题" prop="tittle"></el-table-column>
        <el-table-column label="来源" prop="src"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              effect="dark"
              content="修改"
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
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeLbtById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加轮播图的图片的对话框 -->
    <el-dialog
      title="添加轮播图"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
        <el-form-item label="URL">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="addForm.tittle"></el-input>
        </el-form-item>
        <el-form-item label="src">
          <el-input v-model="addForm.src"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLbt">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改轮播图的对话框 -->
    <el-dialog
      title="修改URL"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="editForm.tittle"></el-input>
        </el-form-item>
        <el-form-item label="src">
          <el-input v-model="editForm.src"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLbt">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 根据id搜索轮播图的对话框 -->
    <el-dialog
      title="搜索结果"
      :visible.sync="searchDetailedDialogVisible"
      width="50%"
    >
      <el-form :model="searchForm" ref="searchFormRef" label-width="70px">
        <el-form-item label="ID">
          <el-input v-model="searchForm.uid"></el-input>
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
      // 按id搜的结果 (暂未开发)
      searchList: [],

      // 轮播图数据数组
      lbtList: [],

      // 搜索框内容 (暂未开发)
      seachContent: '',

      // 添加轮播图的表单数据
      addForm: {
        id: '',
        src: '',
        url: '',
        tittle: '',
      },

      // 修改轮播图信息时，通过scope.row传递数据，以便回显数据
      editForm: {
        id: '',
        src: '',
        url: '',
        tittle: '',
      },

      // 根据id搜索轮播图的信息对象(暂未开发)
      searchForm: {
        nickname: '',
        gender: '',
        headshot: '',
        realname: '',
        phonenumber: '',
        email: '',
        place: '',
        identity: '',
      },

      // 控制添加轮播图的对话框的显示与隐藏
      addDialogVisible: false,

      // 控制修改轮播图的对话框的显示与隐藏
      editDialogVisible: false,

      // 控制根据轮播图id搜索轮播图对话框的显示与隐藏
      searchDetailedDialogVisible: false,
    }
  },

  created() {
    // 获取轮播图数据
    this.getLbtList()
  },

  methods: {
    // 获取轮播图数据
    async getLbtList() {
      const { data: res } = await this.$http.get('/banner/query')
      if (res.status != 200) {
        return this.$message.error('获取数据失败！')
      }
      this.lbtList = res.data
    },

    // 搜索轮播图(暂未开发)
    async searchLbt() {
      if (this.seachContent === '') {
        return this.$message.error('请输入图片的ID！')
      } else {
        var id = parseInt(this.seachContent)
        const { data: res } = await this.$http.get(
          `/Background/findUserById?uid=${id}`
        )
        if (res.status !== 200) {
          return this.$message.error('没有此用户！')
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

    // 添加轮播图
    async addLbt() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 可以发起添加轮播图的网络请求
        const { data: res } = await this.$http.post(
          '/banner/addorupdate',
          this.addForm
        )

        if (res.status !== 200) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')

        // 隐藏添加用户的对话框
        this.addDialogVisible = false

        // 重新获取轮播图列表数据
        this.getLbtList()
      })
    },

    // 修改轮播图
    async editLbt() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return

        // 请求对象
        var query = {
          src: this.editForm.src,
          url: this.editForm.url,
          tittle: this.editForm.tittle,
        }

        // 发起修改轮播图的数据请求
        const { data: res } = await this.$http.post(
          '/banner/addorupdate',
          query
        )

        if (res.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }

        this.$message.success('更新用户信息成功！')

        // 删除当前的这条数据，因为后端把新增和修改的接口做的是同一接口，如果不同时删除的话会出现一个修改前的数据和修改后的数据同框出现
        await this.$http.get('/banner/delete/' + this.editForm.id)

        // 关闭对话框
        this.editDialogVisible = false

        // 刷新数据列表
        this.getLbtList()
      })
    },

    // 根据轮播图Id删除对应的轮播图
    async removeLbtById(lbtid) {
      var id = lbtid

      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该张图片, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$http.get('/banner/delete/' + id)

      if (res.status !== 200) {
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功！')

      this.getLbtList()
    },

    // 展示编辑轮播图的对话框，并从参数中回显数据
    showEditDialog(data) {
      this.editForm.id = data.id
      this.editForm.src = data.src
      this.editForm.url = data.url
      this.editForm.tittle = data.tittle
      this.editDialogVisible = true
    },

    // 监听添加轮播图对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },

    // 监听修改轮播图对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 监听查看轮播图详情的对话框的关闭事件
    RoleDialogClosed() {},
  },
}
</script>

<style lang="less" scoped></style>
