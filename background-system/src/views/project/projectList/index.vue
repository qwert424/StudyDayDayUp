<template>
  <div class="blogList-container">
    <!-- 项目列表 -->
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
          <el-table-column fixed label="项目名称" width="250">
            <template slot-scope="scope">
              <a
                slot="reference"
                class="projectName"
                @click.prevent="handleProjectClick(scope.row)"
                target="_blank"
                href="#"
                >{{ scope.row.name }}</a
              >
            </template>
          </el-table-column>
          <el-table-column prop="description" label="项目介绍" width="400">
          </el-table-column>
          <el-table-column label="预览图" width="230" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 150px"
                :src="scope.row.thumb"
                fit="contain"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="order"
            label="权重值"
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
                content="GitHub"
                :hide-after="1000"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="iconfont icon-github"
                  circle
                  size="mini"
                  class="githubItem"
                  @click="handelGitHubClick(scope.row)"
                ></el-button>
              </el-tooltip>
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
import { getProject, deleteProject } from "@/api/project";
// import { baseURL } from "@/basis_URL";
import getPage from "@/mixins/pageData.js";
export default {
  mixins: [getPage([])],
  data() {
    return {
      pageSize: 8, //每页显示多少条
    };
  },
  methods: {
    // 获取数据
    async fetchData() {
      this.data = [];
      this.isloading = true;
      const resp = await getProject();
      if (resp.code !== 0 || resp.msg !== "") {
        this.$message.error("项目资源获取失败!");
        return;
      }
      this.data = resp.data.map((item) => {
        // const formatThumb = item.thumb === "" ? "" : `${baseURL}${item.thumb}`;
        return {
          ...item,
          // formatThumb,
        };
      });
      this.totalBlog = this.data.length;
      this.data = this.data.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.isloading = false;
      // 删除项目时可能出现下面情况
      if (this.currentPage > this.AllPageSize) {
        this.currentPage = this.AllPageSize;
        this.fetchData();
      }
    },
    // 删除项目
    handelDelectClick(data) {
      this.$confirm("此操作将永久删除项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const resp = await deleteProject(data.id);
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
    // 添加项目
    handelEditClick(data) {
      this.$router.push({
        path: `editProject/${data.id}`,
      });
    },
    // 跳转对应项目地址
    handleProjectClick(data) {
      window.open(data.url);
    },
    handelGitHubClick(data) {
      window.open(data.github);
    },
  },
};
</script>

<style  lang="scss" scoped>
.data-container {
  padding: 30px;
  .projectName {
    cursor: pointer;
  }
  .githubItem {
    background: #666;
    border: 1px solid #666;
  }
}
.page-container {
  margin: 10px 20px;
}
</style>