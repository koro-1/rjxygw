<template>
  <div>
      <Header></Header>
      <div class="content">

          <div v-for="o in filesContents" :key="o" class="new-meta-box">
             <h1>
                 <el-link type="info" :href='o.url'> {{o.description }}</el-link>
                 <h1> {{o.gmtCreate===null?"":o.gmtCreate.substr(0,10)}}</h1>
             </h1>
              <
          </div>

          <el-pagination class="pager" background layout="prev, pager, next"
                         :current-page="currentPage"
                         :page-size="pageSize"
                         :total="total"
                         @current-change="getPage">
          </el-pagination>
      </div>
      <Footer></Footer>
  </div>
</template>
<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    export default {
        components: { Header,Footer },

        data() {
            return {
                filesContents: {},
                currentPage: 1,
                total: 0,
                pageSize: 5,

            };
        },

        methods: {
            getPage(currentPage) {
                const _this = this;
                _this.$axios.post("/files/getfilelist?currentPage=" + currentPage).then(res => {
                    console.log(res.data)
                    _this.filesContents = res.data.data.records;
                    _this.currentPage = res.data.data.current;
                    _this.total = res.data.data.total;
                    _this.pageSize = res.data.data.size;
                });
            }
        },
        created() {
            this.getPage(1);
        }
    };
</script>
<style>

    .content {
        padding: 20px 15px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 80%;
        min-height: 700px;
        margin: auto;
    }
    .new-meta-box{
        -webkit-transition: all 0.1s ease;
        font-size: 0.8125rem;
        padding-top: px;
        padding-bottom: 2px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: auto;
    }
</style>