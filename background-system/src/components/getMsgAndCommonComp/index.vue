<!-- 留言板和评论组件 -->
<template>
  <div class="MsgAndCommon-container">
    <!--留言板和评论分类表 -->
    <template>
      <el-table
        :data="data"
        style="width: 100%"
        stripe
        border
        v-loading="isloading"
      >
        <el-table-column
          type="index"
          :index="1 + (currentPage - 1) * pageSize"
          label="序号"
          width="80"
          fixed
          align="center"
        ></el-table-column>
        <el-table-column label="头像" width="100" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 70px"
              :src="scope.row.avatar"
              fit="contain"
            ></el-image> </template
        ></el-table-column>
        <el-table-column
          fixed
          prop="nickname"
          label="昵称"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="blog.title"
          v-if="ifShowTitle"
          label="评论文章"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          align="center"
          width="340"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="评论时间"
          align="center"
          width="250"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              :hide-after="1000"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="handleDelectClick(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页容器 -->
    <div class="page-container">
      <el-pagination
        background
        layout="  prev, pager, next, ->,jumper,sizes,total"
        :total="totalBlog"
        :page-count="AllPageSize"
        :page-size="pageSize"
        :pager-count="9"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :hide-on-single-page="AllPageSize === 1 ? true : false"
        @size-change="handelSizeChange"
        @current-change="handelCurrentChange"
        @prev-click="handelPrevClick"
        @next-click="handelNextClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
  <script>
import { getCommon, deleteCommon } from "@/api/common";
import { getMessage, deleteMessage } from "@/api/message";
import getPage from "@/mixins/pageData.js";
import { formatDate } from "@/utils/tool";
import { baseURL } from "@/basis_URL";
export default {
  mixins: [getPage([])],
  props: ["mode"],
  data() {
    return {
      inputValue: "", //输入框内容
      select: "", //多选框内容
      pageSize: 5, //每页显示多少条
      form: {}, // 编辑页面数据
      ifShowTitle: false, // 展示评论文章名
    };
  },
  methods: {
    //  获取数据
    async fetchData() {
      this.data = [];
      this.isloading = true;
      let resp;
      if (this.mode === "common") {
        resp = await getCommon(this.currentPage, this.pageSize);
      } else {
        resp = await getMessage(this.currentPage, this.pageSize);
      }
      if (resp.data.rows[0].blog) {
        this.ifShowTitle = true;
      }
      this.totalBlog = resp.data.total;
      this.isloading = false;
      resp.data.rows.map((item) => {
        item.createDate = formatDate(item.createDate);
        item.avatar = baseURL + item.avatar;
      });
      this.data = resp.data.rows;
      // 删除文章分类时可能出现下面情况
      if (this.currentPage > this.AllPageSize) {
        this.currentPage = this.AllPageSize;
        this.fetchData();
      }
    },
    // 删除评论
    async handleDelectClick(data) {
      this.$confirm("此操作将永久删除评论,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let resp;
          if (this.mode === "common") {
            resp = await deleteCommon(data.id);
          } else {
            resp = await deleteMessage(data.id);
          }
          if (resp.code === 0) {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
  
  <style>
.el-select-dropdown {
  text-align: center;
}
</style>
  <style lang="scss" scoped>
.MsgAndCommon-container {
  padding: 30px;
  .input-container {
    width: 50%;
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    .select-container {
      width: 80px;
    }
  }
  .page-container {
    margin: 10px 0;
  }
}
</style>