<!-- 首页模块的底部大图管理面板 -->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>底部大图管理</el-breadcrumb-item>
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
            @clear="getImgList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="imglist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="URL" prop="url"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="是否删除" prop="deleted"></el-table-column>
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
              content="删除用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
        <!-- prop是验证规则属性 -->
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addForm.nickname"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-input v-model="addForm.gender"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <el-input v-model="editForm.headshot"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="realname">
          <el-input v-model="addForm.realname"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phonenumber">
          <el-input v-model="addForm.phonenumber"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

        <el-form-item
          label="
        地址"
          prop="place"
        >
          <el-input v-model="addForm.place"></el-input>
        </el-form-item>

        <el-form-item label="身份" prop="identity">
          <el-input v-model="addForm.identity"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改的对话框 -->
    <el-dialog
      title="修改"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="URL">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-input v-model="editForm.gmtCreate"></el-input>
        </el-form-item>

        <el-form-item label="修改状态">
          <el-input v-model="editForm.gmtModified"></el-input>
        </el-form-item>

        <el-form-item label="删除状态">
          <el-input v-model="editForm.deleted"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 大图数据数组
      imglist: [],

      // 按id搜的结果
      searchList: [],

      // 用户总数数组
      total: 0,
      size: 5,
      // 搜索框内容
      seachContent: '',
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 控制查看用户详细信息的对话框的显示与隐藏
      RoleDetailedDialogVisible: false,
      // 控制根据id搜索用户对话框的显示与隐藏
      searchDetailedDialogVisible: false,

      // 添加用户的表单数据
      addForm: {
        nickname: '',
        gender: '',
        headshot: '',
        realname: '',
        phonenumber: '',
        email: '',
        place: '',
        identity: '',
      },

      // 修改信息
      editForm: {
        deleted: '',
        description: '',
        gmtCreate: '',
        gmtModified: '',
        id: '',
        name: '',
        url: '',
      },

      // 根据id搜索用户时的用户信息对象
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

      imageUrl: '',

      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectedRoleId: '',
    }
  },

  created() {
    this.getImgList()
  },

  methods: {
    // 获取底部大图数据
    async getImgList() {
      const { data: res } = await this.$http.get('/files/getbottompicture')

      if (res.status !== 200) {
        return this.$message.error('获取数据失败！')
      }

      // 后端返回的是一个单独的对象，我们使用框架需要的是数组，往预先设置好的数组里面push一个对象
      this.imglist.push(res.data)
    },

    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },

    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.put(
          '/Background/addNewUser',
          this.addForm
        )
        if (res.status !== 200) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取列表数据
        this.getImgList()
      })
    },

    // 展示编辑用户的对话框
    async showEditDialog(data) {
      this.editForm.deleted = data.deleted
      this.editForm.description = data.description
      this.editForm.gmtCreate = data.gmtCreate
      this.editForm.gmtModified = data.gmtModified
      this.editForm.id = data.id
      this.editForm.url = data.url
      this.editForm.name = data.name
      this.editDialogVisible = true
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 监听查看用户详情的对话框的关闭事件
    RoleDialogClosed() {},

    // 修改用户信息并提交
    editImg() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return

        console.log(this.editForm)

        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.post(
          '/files/updatebottompicture',
          this.editForm
        )

        console.log(res)

        if (res.status !== 200) {
          return this.$message.error('修改失败！')
        }

        this.$message.success('修改成功！')

        // 关闭对话框
        this.editDialogVisible = false

        // 刷新数据列表
        this.getImgList()
      })
    },

    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // console.log('删除用户' + id)
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
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
      const { data: res } = await this.$http.delete(
        '/Background/deleteUser/' + id
      )
      if (res.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getImgList()
    },

    // 搜索用户
    async searchUser() {
      if (this.seachContent === '') {
        return this.$message.error('请输入用户的ID！')
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
  },
}
</script>

<style lang="less" scoped></style>
