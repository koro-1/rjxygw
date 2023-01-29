<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>江西农业大学创新创业学院后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>{{ mulDataList1[0].sidebarname }}</span>
            </template>
            <el-menu-item
              :index="'/0' + item.susortid"
              v-for="item in mulDataList1[0].detail"
              :key="item.susortid"
              @click="saveNavState('/0' + item.susortid)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.susoname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 单级菜单 ; index当作跳转地址 -->
          <el-menu-item
            :index="'/' + item.sideid"
            v-for="item in sigDataList"
            :key="item.sideid"
          >
            <i :class="iconsObj[item.sideid]"></i>
            <span slot="title">{{ item.sidebarname }}</span>
          </el-menu-item>

          <!-- 多级菜单列表 二级菜单 ; index当作跳转地址-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-more"></i>
              <span>{{ mulDataList1[1].sidebarname }}</span>
            </template>
            <el-menu-item
              :index="'/0' + item.susortid"
              v-for="item in mulDataList1[1].detail"
              :key="item.susortid"
              @click="saveNavState('/0' + item.susortid)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.susoname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-zoom-in"></i>
              <span>{{ mulDataList1[2].sidebarname }}</span>
            </template>
            <el-menu-item
              :index="'/0' + item.susortid"
              v-for="item in mulDataList1[2].detail"
              :key="item.susortid"
              @click="saveNavState('/0' + item.susortid)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.susoname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>{{ mulDataList1[3].sidebarname }}</span>
            </template>
            <el-menu-item
              :index="'/0' + item.susortid"
              v-for="item in mulDataList1[3].detail"
              :key="item.susortid"
              @click="saveNavState('/0' + item.susortid)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.susoname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>{{ mulDataList1[4].sidebarname }}</span>
            </template>
            <el-menu-item
              :index="'/0' + item.susortid"
              v-for="item in mulDataList1[4].detail"
              :key="item.susortid"
              @click="saveNavState('/0' + item.susortid)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.susoname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span>{{ mulDataList1[5].sidebarname }}</span>
            </template>
            <el-menu-item
              :index="'/0' + item.susortid"
              v-for="item in mulDataList1[5].detail"
              :key="item.susortid"
              @click="saveNavState('/0' + item.susortid)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.susoname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-magic-stick"></i>
              <span>{{ mulDataList1[6].sidebarname }}</span>
            </template>
            <el-menu-item
              :index="'/0' + item.susortid"
              v-for="item in mulDataList1[6].detail"
              :key="item.susortid"
              @click="saveNavState('/0' + item.susortid)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.susoname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 登录页面传来的用户信息
      userInfo: {
        // email: '',
        // id: '',
        // username: '',
        // avatar:''
      },

      // 侧边栏数据
      sidebarDataList: [],

      // 单级侧边栏数据
      sigDataList: [
        {
          sidebarname: '通知公告',
          sideid: 1,
        },
        {
          sidebarname: '新闻动态',
          sideid: 2,
        },
        {
          sidebarname: '政策文件',
          sideid: 3,
        },
        {
          sidebarname: '党建工作',
          sideid: 4,
        },
        {
          sidebarname: '下载中心',
          sideid: 5,
        },
      ],

      // 多级侧边栏数据
      mulDataList1: [
        {
          sideid: 6,
          sidebarname: '首页',
          detail: [
            {
              susortid: 61,
              susoname: '轮播图',
            },
            {
              susortid: 62,
              susoname: '学院新闻',
            },
            {
              susortid: 63,
              susoname: '双创先锋',
            },
            {
              susortid: 64,
              susoname: '底部大图',
            },
          ],
        },
        {
          sideid: 7,
          sidebarname: '学院概况',
          detail: [
            {
              susortid: 71,
              susoname: '学院介绍',
            },
            {
              susortid: 72,
              susoname: '学院领导',
            },
          ],
        },

        {
          sideid: 8,
          sidebarname: '组织机构',
          detail: [
            {
              susortid: 81,
              susoname: '办公电话',
            },
            {
              susortid: 82,
              susoname: '机构设置',
            },
            {
              susortid: 83,
              susoname: '部门职责',
            },
          ],
        },
        {
          sideid: 9,
          sidebarname: '师资队伍',
          detail: [
            {
              susortid: 91,
              susoname: '导师介绍',
            },
            {
              susortid: 92,
              susoname: '教研室介绍',
            },
            {
              susortid: 93,
              susoname: '师资培训',
            },
          ],
        },
        {
          sideid: 10,
          sidebarname: '双创教育',
          detail: [
            {
              susortid: 101,
              susoname: '学分管理',
            },
            {
              susortid: 102,
              susoname: '课程体系',
            },
            {
              susortid: 103,
              susoname: '教学管理制度',
            },
          ],
        },
        {
          sideid: 11,
          sidebarname: '双创实践',
          detail: [
            {
              susortid: 111,
              susoname: '双创项目',
            },
            {
              susortid: 112,
              susoname: '竞赛活动',
            },
            {
              susortid: 113,
              susoname: '众创空间',
            },
            {
              susortid: 114,
              susoname: '基地建设',
            },
            {
              susortid: 115,
              susoname: '大学生项目孵化',
            },
          ],
        },
        {
          sideid: 12,
          sidebarname: '成果展示',
          detail: [
            {
              susortid: 121,
              susoname: '特色项目',
            },
            {
              susortid: 122,
              susoname: '双创榜样',
            },
          ],
        },
      ],

      // 是否折叠
      isCollapse: false,

      // 被激活的链接地址
      activePath: '',

      // 一级菜单图标对象
      iconsObj: {
        1: 'iconfont icon-user',
        2: 'iconfont icon-tijikongjian',
        3: 'iconfont icon-danju',
        4: 'iconfont icon-lock_fill',
        5: 'iconfont icon-user',
      },
    }
  },

  created() {
    this.getUserInfo()

    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    // 获取登录页面传来的用户信息
    getUserInfo() {
      // 阀门，控制 this.userInfo = this.$route.query 只执行一次
      let valve = sessionStorage.getItem('isGetUserInfo')

      // 因为页面一刷新就会重新执行getUserInfo，但没有退出的刷新会导致this.$route.query是个空对象，进而导致this.userInfo被空对象覆盖
      // 所以需要一个阀门来控制，只有从登录界面跳转到home页面才会执行getUserInfo
      if (valve) {
        this.userInfo = this.$route.query
      }

      // 防止再次执行this.userInfo = this.$route.query，将空数据覆盖掉this.userInfo
      window.sessionStorage.setItem('isGetUserInfo', false)
    },

    // 退出登录
    logout() {
      window.sessionStorage.clear()
      // 退出后，应该修改标志位，以期下次登录时候会重新赋值
      window.sessionStorage.setItem('isGetUserInfo', true)
      this.$router.push('/login')
    },

    // 获取侧边栏数据
    async getList() {
      const { data: res } = await this.$http.get('/Background/getSidebar')

      this.sidebarDataList = res.data

      this.sigDataList = this.sidebarDataList.slice(
        0,
        this.sidebarDataList.length - 1
      )

      // 将原数据的最后一个（就是多级数组）单独拿出来
      this.mulDataList = this.sidebarDataList.pop()
      if (res.flag == !true) return this.$message.error('获取数据失败！')
    },

    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
