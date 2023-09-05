<template>
  <div class="blogList-container">
    <!-- 文章列表 -->
    <div class="data-container">
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
          <el-table-column fixed prop="title" label="文章名称" width="250">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title="首图预览"
                width="160"
                trigger="hover"
              >
                <el-image
                  style="width: 130px; height: 130px"
                  :src="scope.row.formatThumb"
                  fit="contain"
                  :preview-src-list="srcList"
                ></el-image>
                <a
                  slot="reference"
                  class="essayTitle"
                  @click.prevent="handleEssayClick(scope.row)"
                  target="_blank"
                  href="#"
                  >{{ scope.row.title }}</a
                >
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" width="400">
          </el-table-column>
          <el-table-column
            prop="category.name"
            label="所属分类"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="scanNumber"
            label="浏览量"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="commentNumber"
            label="评论量"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="formatTime"
            label="创建时间"
            width="230"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                :hide-after="1000"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  size="mini"
                  @click="handelEditClick(scope.row)"
                ></el-button>
              </el-tooltip>
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
                  @click="handelDelectClick(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- <el-dialog
        title="首页 标语"
        :visible.sync="centerDialogVisible"
        width="45%"
        center
      >
        <el-form :model="form">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label=" 描述">
            <el-input
              type="textarea"
              v-model="form.description"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="首页中图">
                <uploadComp v-model="form.midImg"></uploadComp> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="首页大图">
                <uploadComp v-model="form.bigImg"></uploadComp> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false" class="PopUpBtn"
            >取 消</el-button
          >
          <el-button type="primary" @click="handleEditConfirm" class="PopUpBtn"
            >确 定</el-button
          >
        </span>
      </el-dialog> -->
    </div>
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
        :page-sizes="[8, 16, 24, 32]"
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
import { getBlog, deleteBlog } from "@/api/blog";
import { formatDate } from "@/utils/tool";
import { baseURL, FrontEndURL } from "@/basis_URL";
export default {
  data() {
    return {
      isloading: false, //加载数据中
      data: [], //数据
      totalBlog: 0, //总文章数
      currentPage: 1, //当前页
      pageSize: 8, //每页显示多少条
      srcList: [], //预览图数组
      // centerDialogVisible: false, //控制弹框
    };
  },
  computed: {
    AllPageSize() {
      //总页数
      return Math.ceil(+this.totalBlog / this.pageSize);
    },
  },
  methods: {
    // 获取数据
    async fetchData() {
      this.data = [];
      this.isloading = true;
      const resp = await getBlog(this.currentPage, this.pageSize);
      this.srcList = [];
      this.data = resp.data.rows.map((item) => {
        const formatTime = formatDate(item.createDate);
        const formatThumb = `${baseURL}${item.thumb}`;
        this.srcList.push(formatThumb);
        return {
          ...item,
          formatTime,
          formatThumb,
        };
      });
      this.totalBlog = resp.data.total;
      this.isloading = false;
      // 删除文章时可能出现下面情况
      if (this.currentPage > this.AllPageSize) {
        this.currentPage = this.AllPageSize;
      }
    },
    // 删除文章
    handelDelectClick(data) {
      this.$confirm(
        "此操作将永久删除文章，该文章下的所有评论将会被一同删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const resp = await deleteBlog(data.id);
          if (resp.data === true) {
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
    // 跳转对应文章
    handleEssayClick(data) {
      window.open(`${FrontEndURL}/blog/${data.id}`);
    },
    // 分页相关操作
    handelSizeChange(pageSize) {
      this.pageSize = parseInt(pageSize);
      this.currentPage = 1;
      this.fetchData();
    },
    handelCurrentChange(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    handelPrevClick() {
      this.currentPage--;
    },
    handelNextClick() {
      this.currentPage++;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style  lang="scss" scoped>
.data-container {
  padding: 30px;
}
.page-container {
  margin: 10px 20px;
}
.essayTitle {
  cursor: pointer;
}
</style>