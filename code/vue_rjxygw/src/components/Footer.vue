<template>
    <el-footer>
        <!-- 左侧二维码区（暂且注释，后期有相关公众号再解开注释） -->
        <div class="left">
            <!-- 学校名字图片容器 -->
            <div class="college-name-footer">
                <div class="top-name-footer">
                    <img src="../assets/xiaoming-footer.png" alt="江西农业大学" />
                </div>
                <img
                        class="cxcy-image-footer"
                        src="../assets/cxcy-footer.png"
                        alt="江西农业大学创新创业平台"
                />
            </div>

            <!-- <div class="imgBox">
              <img
                class="img"
                src="https://ruanjianxy.jxau.edu.cn/_upload/tpl/0b/a4/2980/template2980/images/xiaoma.jpg"
                alt=""
              />
              <span class="left-span">江农小码</span>
            </div>
            <div class="imgBox">
              <img
                class="img"
                src="https://ruanjianxy.jxau.edu.cn/_upload/tpl/0b/a4/2980/template2980/images/xiaomaguanq.jpeg"
                alt=""
              />
              <span class="left-span">小码官Q</span>
            </div>
            <div class="imgBox">
              <img
                class="img"
                src="	https://ruanjianxy.jxau.edu.cn/_upload/tpl/0b/a4/2980/template2980/images/ruanjianzhisheng.png"
                alt=""
              />
              <span class="left-span">软件之声</span>
            </div>
            <div class="imgBox">
              <img
                class="img"
                src="https://ruanjianxy.jxau.edu.cn/_upload/tpl/0b/a4/2980/template2980/images/douyin.png
    "
                alt=""
              />
              <span class="left-span">软件新媒体</span>
            </div> -->
        </div>
        <!-- 右侧通讯方式区 -->
        <div class="right">
            <el-descriptions
                    class="margin-top"
                    :column="2"
                    :size="size"
                    direction="vertical"
            >
                <el-descriptions-item
                        label-class-name="my-label"
                        content-class-name="my-content"
                        label="地址"
                >中国江西省南昌市青山湖区蛟桥镇庐山中大道888号</el-descriptions-item
                >
                <el-descriptions-item
                        label="邮编"
                        label-class-name="my-label"
                        content-class-name="my-content"
                >330044</el-descriptions-item
                >
                <el-descriptions-item
                        label="技术支持"
                        label-class-name="my-label"
                        content-class-name="my-content"
                >江西农业大学软件学院 半月工作室</el-descriptions-item
                >
                <el-descriptions-item
                        label="版权所有"
                        label-class-name="my-label"
                        content-class-name="my-content"
                >江西农业大学创新创业平台</el-descriptions-item
                >
            </el-descriptions>
        </div>
    </el-footer>
</template>


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