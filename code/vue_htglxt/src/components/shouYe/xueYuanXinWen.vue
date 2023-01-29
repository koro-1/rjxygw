<!-- 首页模块的学院新闻管理面板 -->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学院新闻管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入新闻 ID 进行搜索"
            v-model="seachContent"
            clearable
            @clear="getXwData"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchNews()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加新闻</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="xwList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="概述" prop="description"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 更多信息按钮 -->
            <el-tooltip
              effect="dark"
              content="详细信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="info"
                icon="el-icon-document"
                size="mini"
                @click="showRoleDetailed(scope.row)"
              ></el-button>
            </el-tooltip>

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
                @click="removeNewsById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加新闻的对话框 -->
    <el-dialog
      title="添加新闻"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
        <!-- prop是验证规则属性 -->
        <el-form-item label="标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>

        <el-form-item label="概述">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>

        <el-form-item label="正文">
          <el-input v-model="addForm.content"></el-input>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="addForm.author"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNews">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改新闻的对话框 -->
    <el-dialog
      title="修改新闻"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>

        <el-form-item label="概述">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>

        <el-form-item label="正文">
          <el-input v-model="editForm.content"></el-input>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="editForm.author"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNews">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看详细信息的对话框 -->
    <el-dialog
      title="查看详情"
      :visible.sync="RoleDetailedDialogVisible"
      width="50%"
      @close="RoleDialogClosed"
    >
      <el-form :model="lookForm" ref="editFormRef" label-width="70px">
        <el-form-item label="新闻ID">
          <el-input v-model="lookForm.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="lookForm.author" disabled></el-input>
        </el-form-item>

        <el-form-item label="作者ID">
          <el-input v-model="lookForm.userId" disabled></el-input>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="lookForm.title" disabled></el-input>
        </el-form-item>

        <el-form-item label="概述">
          <el-input v-model="lookForm.description" disabled></el-input>
        </el-form-item>

        <el-form-item label="正文">
          <el-input v-model="lookForm.content" disabled></el-input>
        </el-form-item>

        <el-form-item label="类型ID">
          <el-input v-model="lookForm.type_id" disabled></el-input>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-input v-model="lookForm.gmtCreate" disabled></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-input v-model="lookForm.status" disabled></el-input>
        </el-form-item>

        <el-form-item label="更新时间">
          <el-input v-model="lookForm.gmtModified" disabled></el-input>
        </el-form-item>

        <el-form-item label="是否删除">
          <el-input v-model="lookForm.deleted" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="RoleDetailedDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 根据id搜索新闻的对话框 -->
    <el-dialog
      title="搜索结果"
      :visible.sync="searchDetailedDialogVisible"
      width="50%"
    >
      <el-form :model="searchForm" ref="searchFormRef" label-width="70px">
        <el-form-item label="ID">
          <el-input v-model="searchForm.uid"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="searchForm.nickname"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-input v-model="searchForm.gender"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <el-input v-model="searchForm.headshot"></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="searchForm.realname"></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="searchForm.phonenumber"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="searchForm.email"></el-input>
        </el-form-item>

        <el-form-item
          label="
        地址"
        >
          <el-input v-model="searchForm.place"></el-input>
        </el-form-item>

        <el-form-item label="身份">
          <el-input v-model="searchForm.identity"></el-input>
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
import axios from 'axios'
export default {
  data() {
    return {
      // 新闻数据列表
      xwList: [],

      token: '',

      // 按id搜的结果 (暂未开发)
      searchList: [],

      // 搜索框内容
      seachContent: '',

      // 添加新闻的表单数据
      addForm: {
        title: '',
        description: '',
        content: '',
        author: '',
        
      },

      // 修改新闻
      editForm: {
        title: '',
        description: '',
        content: '',
        author: '',
        id: '',
      },

      // 查看新闻详细信息时的信息对象
      lookForm: {
        author: '',
        content: '',
        deleted: '',
        description: '',
        gmtCreate: '',
        gmtModified: '',
        id: '',
        status: '',
        title: '',
        type_id: '',
        userId: '',
      },

      // 根据新闻id搜索时的新闻信息对象(暂未开发)
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

      // 控制添加新闻的对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 控制查看新闻的详细信息的对话框的显示与隐藏
      RoleDetailedDialogVisible: false,
      // 控制根据id搜索新闻对话框的显示与隐藏
      searchDetailedDialogVisible: false,
    }
  },

  created() {
    this.getXwData()
    this.token = sessionStorage.getItem('token')
  },

  methods: {
    // 获取新闻数据status
    async getXwData() {
      var id = 1

      const { data: res } = await this.$http.get(`/blog/type/` + id)

      if (res.status != 200) {
        return this.$message.error('获取数据失败！')
      }

      this.xwList = res.data

      console.log(this.xwList)
    }, 

    // 搜索新闻 (暂未开发)
    async searchNews() {
      if (this.seachContent === '') {
        return this.$message.error('请输入新闻的ID！')
      } else {
        var id = parseInt(this.seachContent)
        const { data: res } = await this.$http.get(
          `/Background/findUserById?uid=${id}`
        )
        if (res.flag !== true) {
          return this.$message.error('没有此新闻！')
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

    // 添加新闻
     addNews() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return

        console.log(this.addForm)

        // 可以发起添加的网络请求
        const { data: res } = await this.$http.post('/blog/edit', this.addForm,{
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })

        console.log(res)

        if (res.status != 200) {
          this.$message.error('添加新闻失败！')
        }

        this.$message.success('添加新闻成功！')

        // 隐藏添加的对话框
        this.addDialogVisible = false

        // 刷新新闻数据列表
        this.getXwData()
      })
    },

    // 修改新闻
    editNews() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return

        // 发起修改新闻的数据请求
        const { data: res } = await this.$http.post('/blog/edit', this.editForm)

        if (res.status !== 200) {
          return this.$message.error('修改新闻失败！')
        }

        this.$message.success('修改新闻成功！')

        // 关闭对话框
        this.editDialogVisible = false

        // 刷新新闻数据列表
        this.getXwData()
      })
    },

    // 修改新闻
    // editNews() {
    //   this.$refs.editFormRef.validate(async (valid) => {
    // if (!valid) return

    // // 发起修改新闻的数据请求
    // var that = this

    // console.log(sessionStorage.getItem('token'))
    // console.log(that.editForm)

    // axios
    //   .post('/blog/edit', that.editForm, {
    //     headers: {
    //       Authorization: sessionStorage.getItem('token'),
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })

    // if (res.status !== 200) {
    //   return this.$message.error('修改新闻失败！')
    // }

    // this.$message.success('修改新闻成功！')

    // 关闭对话框
    // this.editDialogVisible = false

    // 刷新新闻数据列表
    // this.getXwData()
    //   })
    // },

    // 根据Id删除对应的新闻信息
    async removeNewsById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该新闻, 是否继续?',
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

      const { data: res } = await this.$http.get('/blog/delete/' + id)

      if (res.status !== 200) {
        return this.$message.error('删除新闻失败！')
      }

      this.$message.success('删除新闻成功！')

      this.getXwData()
    },

    // 展示编辑的对话框
    showEditDialog(data) {
      this.editForm.title = data.title
      this.editForm.description = data.description
      this.editForm.content = data.content
      this.editForm.author = data.author
      this.editForm.id = data.id
      this.editDialogVisible = true
    },

    // 展示查看详细信息的对话框
    async showRoleDetailed(detailedInformation) {
      this.lookForm = detailedInformation
      this.RoleDetailedDialogVisible = true
    },

    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 监听查看用户详情的对话框的关闭事件
    RoleDialogClosed() {},
  },
}
</script>

<style lang="less" scoped></style>
