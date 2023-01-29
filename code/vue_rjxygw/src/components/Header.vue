<template>
    <el-container>
    <el-header class="headerBox">
        <!-- 版心 -->
        <div class="w">
            <!-- 学校名字图片容器 -->
            <div class="college-name">
                <div class="top-name">
                    <img src="../assets/xiaoming.png" alt="" />
                </div>
                <img class="cxcy-image" src="../assets/cxcy.png" alt="" />
            </div>
            <!-- 校训容器 -->
            <div class="xiaoxun-box">
                <img class="xiaoxun-image" src="../assets/xiaoxun.png" alt="" />
            </div>
        </div>
        <!-- 搜索 -->
        <div class="searchBox">
            <el-input
                    placeholder="请输入内容，回车搜索"
                    prefix-icon="el-icon-search"
                    v-model="input"
                    @keyup.enter.native="search()"
            >
            </el-input>
        </div>
    </el-header>
    <!-- 导航栏 S -->
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#fff"
    >
        <!-- 遍历1级数据 -->
        <el-submenu :index="i + ''" v-for="(item, i) in navData" :key="i">
            <template slot="title">{{ item.moduleName }}</template>
            <!-- 遍历2级数据（即下拉菜单） -->
            <el-menu-item
                    :index="i + '-' + key"
                    v-for="(i, key) in navDataChildren[i]"
                    :key="key"
            ><el-menu-item :index="i + '-' + key" @click="open(i)">{{
                i.name
                }}</el-menu-item></el-menu-item
            >
        </el-submenu>
    </el-menu>
    </el-container>

</template>

<script>
    export default {
        // 生命周期开始初始化页面
        created() {
            this.getNavBarData()

        },

        data() {
            return {
                // 导航被选择项
                activeIndex: '1',
                // 通知公告默认选项
                activeName: '0',
                // 搜索的输入框
                input: '',
                // footer右侧无边框列表列表的尺寸
                size: '',
                // 一级导航栏数据
                navData: [],
                // 一级导航栏下设数据
                navDataChildren: [],
                // 走马灯区图片
                pmdData: [],
                // 新闻动态数据
                xwList: [],
                // 工作室数据列表
                gzsData: [],
            }
        },

        methods: {
            // 导航栏点击提示消息弹出（临时性，后期相应功能上线时删除）
            open(i) {
                this.$router.push('/download')
               /* if(i.name.equals('文件下载')){

                }else
                this.$message('加急开发中，敬请期待！')*/
            },

            // 获取导航栏数据
            async getNavBarData() {
                const { data: res } = await this.$http.get('/module/query')

                // 给一级导航栏数据赋值
                this.navData = res.list

                // 将 一级导航栏数据 的下设子数组提取出来
                var arr = []
                var obj = this.navData // this.navData 是原数据

                for (let i in obj) {
                    let o = []
                    o = obj[i].submoduleList
                    arr.push(o) // 已经把子数组提取出，封装到新数组 arr
                }

                // 把提取出的子数组赋值
                this.navDataChildren = arr
            },

            // 获取跑马灯数据（即轮播图）
            async getPmdData() {
                const { data: res } = await this.$http.get('/banner/query')
                let i = 0
                // 提取后端返回的数据并且拼接，形成img的完整url，封装成数组保存
                while (i < res.list.length) {
                    var baseUrl = 'https://ruanjianxy.jxau.edu.cn'
                    let src = baseUrl + res.data[i].src
                    this.pmdData.push(src)
                    i++
                }
            },

            // 获取新闻动态数据
            async getXwData() {
                var id = 1
                const { data: res } = await this.$http.get(`/blog/type/${id}`)
                this.xwList = res.data.slice(-4) // 截取最后5个元素展示在主页
                console.log(this.xwList)
            },

            // 获取工作室列表
            async getGzsData() {
                var id = 2
                const { data: res } = await this.$http.post(`/studio/query?id=${id}`)

                var temp = res.list

                // 数组操作必要的暂存数据的容器
                var banyueStudio = [] // 将来从工作室列表数据中抽取出的半月工作室数据存放在此
                var obj = temp // temp 是原数据，赋值给obj 便于遍历

                // 遍历数据 找到半月工作室
                for (let i in obj) {
                    let o = []
                    if (temp[i].name == '半月工作室') {
                        o = obj[i]
                        banyueStudio.push(o)
                        // 再删除掉半月工作室
                        delete temp[i]
                    }
                }

                // 构造将半月工作室永远放第一个的工作室列表数据（即gzsData）,并且只要前4项
                this.gzsData = temp

                // banyueStudio 是一个只有一个内容的对象数组，而 this.gzsData 也是一个对象数组
                // 要把 banyueStudio 的唯一一个对象抽取出来放到this.gzsData 对象数组中
                this.gzsData = [banyueStudio[0], ...this.gzsData].slice(0, 6)
            },
            // 搜索按钮事件
            search() {
                //回车后要干的业务代码
                // console.log('搜索框输入的内容是: ' + this.input)
                this.open()
                this.input = ''
            },

            // 处理导航菜单点击事件
            handleSelect(key, keyPath) {

                this.activeIndex = key
            },
        },
    }
</script>

<style lang="less" scoped>
    .my-label {
        background: #e1f3d8;
    }

    .my-content {
        background: #fde2e2;
    }
    // 全局链接去掉下划线
    a {
        text-decoration: none;
    }

    // header 容器
    .headerBox {
        width: 100%;
        height: 211px !important;
        position: relative;
        background: linear-gradient(to right, rgb(40, 129, 101), rgb(218, 170, 88));
        // background: linear-gradient(to right, rgb(151, 150, 240), rgb(251, 199, 212));
        display: flex;
        align-items: center;
        justify-content: center;
    }

    // header 版心容器
    .w {
        width: 1200px;
        display: flex;
        align-items: center;
        position: relative;
    }

    // logo 容器
    .logo-image-box {
        width: 100px;
        height: 100px;
    }

    // logo图片
    .logoImage {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    // 学院名字图片容器
    .college-name {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        margin-left: 105px;
    }

    // 学院名字的图片容器
    .top-name {
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    // 创新创业平台这几个字
    .cxcy-image {
        width: 85%;
    }

    // 校训
    .xiaoxun-box {
        margin-left: 369px;
    }

    // 搜索容器
    .searchBox {
        position: absolute;
        left: 1270px;
        top: 158px;
        display: inline-block;
        width: 202px;
    }

    // 走马灯区 S
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

    .image {
        height: 99%;
        width: 100%;
    }
    // 走马灯区 E

    // 其他新闻区
    // 统一设置几大新闻区的公共样式
    .newsBoxItem {
        width: 90%;
        margin-left: 80px;
        margin-top: 20px;
    }

    // 标题
    .newsheader h3 {
        color: #016599;
        font-size: 18px;
        font-weight: 900;
    }

    // “查看更多” 文字链接
    .el-link {
        margin-top: 20px;
    }

    // 查看更多
    .xwLookMore {
        color: #016599;
    }

    // 工作室logo和描述容器
    .logo_text_box {
        display: flex;
    }

    // 工作室logo图片
    .gzsImg {
        border: 1px solid #dadada;
        box-shadow: 2px 2px 5px #c1c1c1;
        width: 66px;
        height: 66px;
        border-radius: 54px;
    }

    // 工作室简介描述
    .gzsMs {
        margin: 20px;
    }

    // 底部footer区
    .el-footer {
        display: flex;
    }

    // 左侧二区
    .left {
        flex: 1;
        display: flex;
    }

    // 底部学院名字图片容器
    .college-name-footer {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        margin-left: 105px;
    }

    // 底部学院名字的图片容器
    .top-name-footer {
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    // 底部创新创业平台这几个字
    .cxcy-image-footer {
        width: 85%;
    }

    // 二维码区对应的文本
    .left-span {
        font-size: 14px;
        margin-top: 6px;
    }

    // 左侧二维码图片容器
    .imgBox {
        width: 130px;
        height: 130px;
        margin-left: 30px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    // 左侧二维码图片
    .img {
        width: 100px;
        height: 100px;
        border-radius: 20px 0 20px 0;
    }

    // 右侧通讯方式区
    .right {
        flex: 1;
    }

    // 底部布局容器
    .el-footer {
        padding-top: 35px;
        height: 188px !important;
        color: #303133;
    }
</style>
